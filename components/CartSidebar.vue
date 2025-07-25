<template>
  <div class="cart-sidebar-overlay" :class="{ 'open': cartStore.isCartOpen }" @click="closeCart">
    <div class="cart-sidebar" :class="{ 'open': cartStore.isCartOpen }" @click.stop>
      <!-- Cart Header -->
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="close-cart-btn" @click="closeCart" aria-label="Close cart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Cart Content -->
      <div class="cart-content">
        <!-- Empty Cart State -->
        <div v-if="!cartStore.hasItems" class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <button class="continue-shopping-btn" @click="closeCart">
            Continue Shopping
          </button>
        </div>

        <!-- Cart With Items -->
        <div v-else class="cart-with-items">
          <!-- Progress Steps -->
          <div class="progress-steps">
            <div class="step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
              <span class="step-number">1</span>
              <span class="step-label">Items</span>
            </div>
            <div class="step" :class="{ 'active': currentStep >= 2, 'completed': currentStep > 2 }">
              <span class="step-number">2</span>
              <span class="step-label">Info</span>
            </div>
            <div class="step" :class="{ 'active': currentStep >= 3 }">
              <span class="step-number">3</span>
              <span class="step-label">Payment</span>
            </div>
          </div>

          <!-- Step Content -->
          <div class="step-content">
            <!-- Step 1: Cart Items -->
            <div v-if="currentStep === 1" class="cart-step">
              <CartItems />
              
              <div class="step-actions">
                <button class="continue-btn" @click="goToNextStep" :disabled="!cartStore.hasItems">
                  Continue to Information
                </button>
              </div>
            </div>

            <!-- Step 2: Customer & Vehicle Information -->
            <div v-if="currentStep === 2" class="cart-step">
              <div class="info-forms">
                <CustomerInfo @update-customer-info="updateCustomerInfo" />
                
                <!-- Vehicle Info (only show for automotive products) -->
                <VehicleInfo 
                  v-if="hasAutomotiveProducts" 
                  @update-vehicle-info="updateVehicleInfo" 
                />
              </div>
              
              <div class="step-actions">
                <button class="back-btn" @click="goToPreviousStep">
                  Back to Cart
                </button>
                <button class="continue-btn" @click="goToNextStep" :disabled="!isInfoComplete">
                  Continue to Payment
                </button>
              </div>
            </div>

            <!-- Step 3: Payment -->
            <div v-if="currentStep === 3" class="cart-step">
              <PaymentInfo />
              
              <div class="step-actions">
                <button class="back-btn" @click="goToPreviousStep">
                  Back to Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '~/store/cart'
import CartItems from '~/components/cart/CartItems.vue'
import CustomerInfo from '~/components/cart/CustomerInfo.vue'
import VehicleInfo from '~/components/cart/VehicleInfo.vue'
import PaymentInfo from '~/components/cart/PaymentInfo.vue'

const cartStore = useCartStore()

// Current step in the checkout process
const currentStep = ref(1)

// Customer and vehicle information
const customerInfo = ref({})
const vehicleInfo = ref({})

// Computed properties
const hasAutomotiveProducts = computed(() => {
  if (!cartStore.hasItems) return false
  
  const automotiveKeywords = ['car', 'vehicle', 'auto', 'wrap', 'decal', 'magnetic']
  return cartStore.cart.items.some(item => {
    const title = (item.title || item.variant?.product?.title || '').toLowerCase()
    return automotiveKeywords.some(keyword => title.includes(keyword))
  })
})

const isInfoComplete = computed(() => {
  const hasCustomerInfo = customerInfo.value.name && customerInfo.value.email && customerInfo.value.phone
  const hasVehicleInfo = !hasAutomotiveProducts.value || 
    (vehicleInfo.value.year && vehicleInfo.value.make && vehicleInfo.value.model)
  
  return hasCustomerInfo && hasVehicleInfo
})

// Methods
const closeCart = () => {
  cartStore.toggleCart()
  // Reset to step 1 when closing
  setTimeout(() => {
    currentStep.value = 1
  }, 300)
}

const goToNextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const updateCustomerInfo = (info) => {
  customerInfo.value = { ...info }
  console.log('[CART-SIDEBAR] Customer info updated:', customerInfo.value)
}

const updateVehicleInfo = (info) => {
  vehicleInfo.value = { ...info }
  console.log('[CART-SIDEBAR] Vehicle info updated:', vehicleInfo.value)
}

// Watch for cart changes to reset step if cart becomes empty
watch(() => cartStore.hasItems, (hasItems) => {
  if (!hasItems && currentStep.value > 1) {
    currentStep.value = 1
  }
})
</script>

<style scoped>
.cart-sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.cart-sidebar-overlay.open {
  opacity: 1;
  visibility: visible;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1501;
}

.cart-sidebar.open {
  transform: translateX(0);
}

/* Cart Header */
.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #161D2D;
}

.close-cart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-cart-btn:hover {
  background: #e9ecef;
}

/* Cart Content */
.cart-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Empty Cart */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  flex: 1;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-cart h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #333;
}

.empty-cart p {
  margin: 0 0 2rem 0;
  color: #666;
  font-size: 1rem;
}

.continue-shopping-btn {
  background: #004dff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continue-shopping-btn:hover {
  background: #0040d9;
}

/* Cart with Items */
.cart-with-items {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e5e5;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  position: relative;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 15px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: #e5e5e5;
  z-index: 1;
}

.step.completed:not(:last-child)::after {
  background: #004dff;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5e5e5;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
}

.step.active .step-number {
  background: #004dff;
  color: white;
}

.step.completed .step-number {
  background: #28a745;
  color: white;
}

.step-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.step.active .step-label {
  color: #004dff;
  font-weight: 600;
}

/* Step Content */
.step-content {
  flex: 1;
  overflow-y: auto;
}

.cart-step {
  padding: 1.5rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.info-forms {
  flex: 1;
  overflow-y: auto;
}

/* Step Actions */
.step-actions {
  padding: 1.5rem 0 0 0;
  margin-top: auto;
  border-top: 1px solid #e5e5e5;
  display: flex;
  gap: 1rem;
}

.back-btn,
.continue-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e5e5e5;
}

.back-btn:hover {
  background: #e9ecef;
}

.continue-btn {
  background: #004dff;
  color: white;
}

.continue-btn:hover:not(:disabled) {
  background: #0040d9;
}

.continue-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cart-sidebar {
    max-width: 100%;
  }
  
  .progress-steps {
    padding: 1rem;
  }
  
  .step-number {
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }
  
  .step-label {
    font-size: 0.7rem;
  }
  
  .cart-step {
    padding: 1rem;
  }
  
  .step-actions {
    flex-direction: column;
  }
  
  .back-btn,
  .continue-btn {
    width: 100%;
  }
}
</style> 