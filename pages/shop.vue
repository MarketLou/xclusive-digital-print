<template>
  <div class="shop-page">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Fixed Cart Toggle Button -->
    <button 
      class="cart-toggle-btn" 
      @click="cartStore.toggleCart()"
      :class="{ 'has-items': cartStore.itemCount > 0 }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span v-if="cartStore.itemCount > 0" class="cart-badge">{{ cartStore.itemCount }}</span>
    </button>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Shop Our Products</h1>
          <p>Browse our complete collection of digital printing and automotive services</p>
        </div>
      </div>
    </div>

    <!-- Main Shop Content -->
    <div class="shop-container">
      <div class="shop-layout">
        <!-- Left Column - Category Sidebar -->
        <div class="sidebar-column">
          <CategorySidebar @category-selected="handleCategorySelection" />
        </div>

        <!-- Middle Column - Product Display -->
        <div class="products-column">
          <ProductDisplay :selected-category-id="selectedCategoryId" />
        </div>

        <!-- Right Column - Cart Panel (Desktop Only) -->
        <div 
          class="cart-column" 
          :class="{ 'cart-open': cartStore.isCartOpen }"
        >
          <div class="cart-panel">
            <div class="cart-header">
              <h3>Shopping Cart</h3>
              <button class="close-cart-btn" @click="cartStore.toggleCart()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="cart-content">
              <div v-if="cartStore.itemCount === 0" class="empty-cart">
                <p>Your cart is empty</p>
                <p class="empty-cart-subtext">Add some products to get started!</p>
              </div>
              <div v-else class="cart-items-container">
                <CartItems />
                <div class="cart-actions">
                  <div class="cart-total">
                    <strong>Total: {{ formatPrice(cartStore.total) }}</strong>
                  </div>
                  <button 
                    class="checkout-btn"
                    @click="cartStore.openCheckout()"
                    :disabled="cartStore.itemCount === 0"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile/Overlay Cart Sidebar -->
    <CartSidebar />
  </div>
</template>

<script setup>
import { useCartStore } from '~/store/cart'

definePageMeta({
  layout: 'default'
})

// Initialize cart store
const cartStore = useCartStore()

// State for selected category
const selectedCategoryId = ref(null)

// Handle category selection from CategorySidebar
const handleCategorySelection = (categoryId) => {
  selectedCategoryId.value = categoryId
  console.log('Category selected:', categoryId)
}

// Helper function to format price
const formatPrice = (amount) => {
  if (!amount && amount !== 0) return '$0.00'
  return `$${(amount / 100).toFixed(2)}`
}

// Initialize cart on page load
onMounted(async () => {
  await cartStore.initializeCart()
})
</script>

<style scoped>
.shop-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.hero-section {
  position: relative;
  height: 40vh;
  min-height: 300px;
  background: linear-gradient(135deg, #161D2D 0%, #2a3441 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.3rem;
  color: white;
  opacity: 0.9;
}

.shop-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.shop-layout {
  display: grid;
  grid-template-columns: 300px 1fr 350px;
  gap: 2rem;
  min-height: 600px;
}

.sidebar-column {
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.products-column {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  min-height: 600px;
}

.cart-column {
  height: fit-content;
  position: sticky;
  top: 2rem;
  transition: all 0.3s ease;
}

.cart-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.cart-header {
  background: #161D2D;
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.close-cart-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.close-cart-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
}

.empty-cart {
  padding: 2rem;
  text-align: center;
  color: #666;
}

.empty-cart-subtext {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.cart-items-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cart-actions {
  padding: 1.5rem;
  border-top: 1px solid #f0f0f0;
  background: white;
}

.cart-total {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #161D2D;
}

.checkout-btn {
  width: 100%;
  background: #161D2D;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover:not(:disabled) {
  background: #2a3441;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Fixed Cart Toggle Button */
.cart-toggle-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #161D2D;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: none; /* Hidden on desktop, shown on mobile */
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999;
}

.cart-toggle-btn:hover {
  background: #2a3441;
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.cart-toggle-btn.has-items {
  background: #004dff;
}

.cart-toggle-btn.has-items:hover {
  background: #0040d9;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid white;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .shop-layout {
    grid-template-columns: 280px 1fr 320px;
  }
}

@media (max-width: 1024px) {
  .shop-layout {
    grid-template-columns: 250px 1fr;
  }
  
  .cart-column {
    display: none; /* Hide desktop cart on tablet */
  }
  
  .cart-toggle-btn {
    display: flex; /* Show mobile cart button */
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }

  .hero-content p {
    font-size: 1.1rem;
  }

  .shop-container {
    padding: 1rem;
  }

  .shop-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sidebar-column {
    position: static;
    order: 2;
  }

  .products-column {
    padding: 1rem;
    order: 1;
  }

  .cart-toggle-btn {
    width: 50px;
    height: 50px;
    top: 15px;
    right: 15px;
  }

  .cart-badge {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .shop-container {
    padding: 0.5rem;
  }

  .products-column {
    padding: 1rem;
    border-radius: 4px;
  }
}
</style> 