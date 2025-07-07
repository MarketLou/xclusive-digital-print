<template>
  <div class="payment-info-form">
    <h3>Payment Information</h3>
    
    <!-- Cart Totals -->
    <div class="cart-totals">
      <div class="total-row">
        <span>Items ({{ cartStore.itemCount }}):</span>
        <span>{{ cartStore.formattedTotal }}</span>
      </div>
      <div class="total-row final-total">
        <span>Total:</span>
        <span>{{ cartStore.formattedTotal }}</span>
      </div>
    </div>

    <!-- Stripe Payment Element Container -->
    <div class="payment-element-container">
      <!-- Always render the stripe element -->
      <div id="stripe-payment-element"></div>
      
      <!-- Loading overlay -->
      <div v-if="isLoading" class="loading-overlay">
        <p>Loading payment form...</p>
      </div>
      
      <!-- Error overlay -->
      <div v-else-if="error" class="error-overlay">
        <p>{{ error }}</p>
        <button @click="initializePayment" class="retry-btn">Retry</button>
      </div>
    </div>

    <!-- Pay Now Button -->
    <button 
      class="pay-now-btn"
      :disabled="!canPay || isProcessing"
      @click="handlePayment"
    >
      <span v-if="isProcessing">Processing...</span>
      <span v-else>Pay Now {{ cartStore.formattedTotal }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()

// Component state
const isLoading = ref(true)
const isProcessing = ref(false)
const error = ref('')
const stripe = ref(null)
const elements = ref(null)
const clientSecret = ref('')

// Get Stripe publishable key from runtime config
const config = useRuntimeConfig()
const STRIPE_PUBLISHABLE_KEY = config.public.stripePublishableKey

// Computed properties
const canPay = computed(() => {
  return !isLoading.value && !error.value && stripe.value && elements.value && cartStore.hasItems
})

// Initialize payment when component becomes visible
onMounted(async () => {
  await nextTick()
  console.log('[PAYMENT] 🎯 Starting payment initialization...')
  await initializePayment()
})

// Initialize Stripe payment
const initializePayment = async () => {
  try {
    isLoading.value = true
    error.value = ''

    // Ensure we have a cart with items
    if (!cartStore.hasItems) {
      error.value = 'Your cart is empty'
      isLoading.value = false
      return
    }

    // Create payment session and get client secret
    console.log('[PAYMENT] Creating payment session...')
    clientSecret.value = await cartStore.createPaymentSession()
    
    if (!clientSecret.value) {
      error.value = 'Failed to create payment session'
      isLoading.value = false
      return
    }

    // Initialize Stripe
    console.log('[PAYMENT] Initializing Stripe...')
    stripe.value = await loadStripe(STRIPE_PUBLISHABLE_KEY)
    
    if (!stripe.value) {
      error.value = 'Failed to load Stripe'
      isLoading.value = false
      return
    }

    // Create elements instance
    elements.value = stripe.value.elements({
      clientSecret: clientSecret.value,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#004dff',
          colorBackground: '#ffffff',
          colorText: '#333333',
          colorDanger: '#dc3545',
          fontFamily: 'system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '6px'
        }
      }
    })

    // Wait for DOM element to be ready before mounting
    await nextTick()
    
    // DOM element check
    const stripeContainer = process.client ? document.getElementById('stripe-payment-element') : null
    if (!stripeContainer && process.client) {
      console.error('[PAYMENT] ❌ Stripe container element not found')
      error.value = 'Payment form container not available'
      isLoading.value = false
      return
    }

    // Create and mount payment element
    console.log('[PAYMENT] 🎯 Mounting Stripe payment element...')
    const paymentElement = elements.value.create('payment')
    paymentElement.mount('#stripe-payment-element')

    console.log('[PAYMENT] ✅ Payment form initialized successfully')
    isLoading.value = false

  } catch (err) {
    console.error('[PAYMENT] ❌ Error initializing payment:', err)
    error.value = 'Failed to initialize payment form'
    isLoading.value = false
  }
}

// Handle payment submission
const handlePayment = async () => {
  if (!canPay.value) return

  try {
    isProcessing.value = true
    console.log('[PAYMENT] 💳 Processing payment...')

    // Window location access
    const returnUrl = process.client ? `${window.location.origin}/thank-you` : '/thank-you'

    const { error: stripeError } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: returnUrl,
      },
    })

    if (stripeError) {
      console.error('[PAYMENT] ❌ Stripe payment error:', stripeError)
      error.value = stripeError.message || 'Payment failed'
      isProcessing.value = false
      return
    }

    // If we reach here, payment was successful
    console.log('[PAYMENT] ✅ Payment confirmed successfully')
    
    // Complete the cart/order in Medusa
    const order = await cartStore.completeCart()
    
    if (order) {
      console.log('[PAYMENT] 🎉 Order completed:', order.id)
      // The user will be redirected by Stripe to the return_url
    }

  } catch (err) {
    console.error('[PAYMENT] ❌ Error processing payment:', err)
    error.value = 'Payment processing failed'
    isProcessing.value = false
  }
}
</script>

<style scoped>
.payment-info-form {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
}

.payment-info-form h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #004dff;
  padding-bottom: 0.5rem;
}

.cart-totals {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #555;
}

.total-row:last-child {
  margin-bottom: 0;
}

.final-total {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  padding-top: 0.5rem;
  border-top: 1px solid #dee2e6;
}

.payment-element-container {
  position: relative;
  margin-bottom: 1.5rem;
  min-height: 60px;
}

.loading-overlay, .error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 2px solid #e1e5e9;
  z-index: 10;
}

.loading-overlay p, .error-overlay p {
  color: #333;
  margin: 0 0 1rem 0;
  text-align: center;
}

.error-overlay p {
  color: #dc3545;
}

.retry-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.retry-btn:hover {
  background: #5a6268;
}

.pay-now-btn {
  width: 100%;
  background: #004dff;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pay-now-btn:hover:not(:disabled) {
  background: #0040d9;
  transform: translateY(-1px);
}

.pay-now-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
}

/* Stripe element styling */
#stripe-payment-element {
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  background: white;
}
</style> 