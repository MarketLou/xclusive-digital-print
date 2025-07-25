<template>
  <div class="shop-page">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Fixed Cart Icon Button (floating) -->
    <button 
      class="cart-icon-btn" 
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
      <!-- SINGLE 2-COLUMN LAYOUT - No cart panel -->
      <div class="shop-layout-single">
        <!-- Left Column - Category Sidebar -->
        <div class="sidebar-column">
          <CategorySidebar @category-selected="handleCategorySelection" />
        </div>

        <!-- Right Column - Product Display (wider now) -->
        <div class="products-column-wide">
          <ProductDisplay :selected-category-id="selectedCategoryId" />
        </div>
      </div>
    </div>

    <!-- Cart Sidebar (the ONLY cart implementation) -->
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

.shop-layout-single {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  min-height: 600px;
}

.sidebar-column {
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.products-column-wide {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  min-height: 600px;
  /* Wider now that cart panel is removed */
}

/* Fixed Cart Icon Button */
.cart-icon-btn {
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
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999;
}

.cart-icon-btn:hover {
  background: #2a3441;
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.cart-icon-btn.has-items {
  background: #004dff;
}

.cart-icon-btn.has-items:hover {
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
  .shop-layout-single {
    grid-template-columns: 280px 1fr;
  }
}

@media (max-width: 1024px) {
  .shop-layout-single {
    grid-template-columns: 250px 1fr;
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

  .shop-layout-single {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sidebar-column {
    position: static;
    order: 2;
  }

  .products-column-wide {
    padding: 1rem;
    order: 1;
  }

  .cart-icon-btn {
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

  .products-column-wide {
    padding: 1rem;
    border-radius: 4px;
  }
}
</style> 