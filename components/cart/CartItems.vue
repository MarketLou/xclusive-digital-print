<template>
  <div class="cart-items-display">
    <div v-if="cartStore.hasItems" class="items-list">
      <div 
        v-for="item in cartStore.cart.items" 
        :key="item.id"
        class="cart-item"
      >
        <!-- Product Image -->
        <div class="item-image">
          <img 
            :src="item.variant?.product?.thumbnail || '/images/placeholder-product.svg'" 
            :alt="item.title || item.variant?.product?.title"
            @error="handleImageError"
          />
        </div>

        <!-- Item Details -->
        <div class="item-details">
          <h4 class="item-title">{{ item.title || item.variant?.product?.title }}</h4>
          <p v-if="item.variant?.title" class="item-variant">{{ item.variant.title }}</p>
          <p class="item-price">{{ formatPrice(item.unit_price) }} each</p>
        </div>

        <!-- Quantity Controls -->
        <div class="quantity-controls">
          <button 
            class="quantity-btn"
            :disabled="updatingItems[item.id]"
            @click="updateQuantity(item, item.quantity - 1)"
          >
            -
          </button>
          <span class="quantity">{{ item.quantity }}</span>
          <button 
            class="quantity-btn"
            :disabled="updatingItems[item.id]"
            @click="updateQuantity(item, item.quantity + 1)"
          >
            +
          </button>
        </div>

        <!-- Item Total & Remove -->
        <div class="item-actions">
          <p class="item-total">{{ formatPrice(item.total) }}</p>
          <button 
            class="remove-btn"
            :disabled="removingItems[item.id]"
            @click="removeItem(item)"
            aria-label="Remove item"
          >
            <span v-if="removingItems[item.id]">...</span>
            <span v-else>🗑️</span>
          </button>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <div class="summary-row">
          <span>Items ({{ cartStore.itemCount }}):</span>
          <span>{{ cartStore.formattedTotal }}</span>
        </div>
        <div class="summary-row total-row">
          <strong>Total: {{ cartStore.formattedTotal }}</strong>
        </div>
        
        <!-- Clear Cart Button -->
        <button 
          class="clear-cart-btn"
          @click="clearEntireCart"
          :disabled="clearingCart"
        >
          <span v-if="clearingCart">Clearing...</span>
          <span v-else>Clear Cart</span>
        </button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty</p>
      <p class="empty-cart-subtitle">Add some products to get started!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()

// Track loading states for individual items
const removingItems = ref({})
const updatingItems = ref({})
const clearingCart = ref(false)

// Format price helper function
const formatPrice = (amount) => {
  if (!amount) return '$0.00'
  return `$${amount.toFixed(2)}`
}

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = '/images/placeholder-product.svg'
}

// Remove item from cart with confirmation
const removeItem = async (item) => {
  if (removingItems.value[item.id]) return
  
  // Optional: Add confirmation dialog
  const productName = item.title || item.variant?.product?.title || 'this item'
  if (!confirm(`Are you sure you want to remove "${productName}" from your cart?`)) {
    return
  }
  
  removingItems.value[item.id] = true
  
  try {
    await cartStore.removeFromCart(item.id)
    console.log('[CART-ITEMS] ✅ Item removed successfully')
  } catch (error) {
    console.error('[CART-ITEMS] ❌ Error removing item:', error)
    alert('Failed to remove item. Please try again.')
  } finally {
    removingItems.value[item.id] = false
  }
}

// Update item quantity
const updateQuantity = async (item, newQuantity) => {
  if (newQuantity <= 0) {
    // If quantity is 0 or less, remove the item
    await removeItem(item)
    return
  }
  
  if (updatingItems.value[item.id]) return
  
  updatingItems.value[item.id] = true
  
  try {
    await cartStore.updateCartItem(item.id, newQuantity)
    console.log('[CART-ITEMS] ✅ Quantity updated successfully')
  } catch (error) {
    console.error('[CART-ITEMS] ❌ Error updating quantity:', error)
    alert('Failed to update quantity. Please try again.')
  } finally {
    updatingItems.value[item.id] = false
  }
}

// Clear entire cart
const clearEntireCart = async () => {
  if (clearingCart.value) return
  
  if (!confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) {
    return
  }
  
  clearingCart.value = true
  
  try {
    cartStore.clearCart()
    console.log('[CART-ITEMS] ✅ Cart cleared successfully')
  } catch (error) {
    console.error('[CART-ITEMS] ❌ Error clearing cart:', error)
    alert('Failed to clear cart. Please try again.')
  } finally {
    clearingCart.value = false
  }
}
</script>

<style scoped>
.cart-items-display {
  width: 100%;
}

.items-list {
  space-y: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
  margin-bottom: 0.75rem;
}

.item-image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  background: #f0f0f0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.item-variant {
  font-size: 0.8rem;
  color: #666;
  margin: 0 0 0.25rem 0;
}

.item-price {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #bbb;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  min-width: 24px;
  text-align: center;
  font-weight: 500;
  color: #333;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  flex-shrink: 0;
}

.item-total {
  font-weight: 600;
  color: #333;
  margin: 0;
  font-size: 0.9rem;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.remove-btn:hover:not(:disabled) {
  background: #fee;
  transform: scale(1.1);
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-summary {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #555;
}

.summary-row:last-child {
  margin-bottom: 0;
}

.total-row {
  font-size: 1.1rem;
  color: #333;
  padding-top: 0.5rem;
  border-top: 1px solid #dee2e6;
}

.clear-cart-btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.clear-cart-btn:hover:not(:disabled) {
  background: #c82333;
  transform: translateY(-1px);
}

.clear-cart-btn:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
}

.empty-cart {
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
}

.empty-cart p {
  margin: 0.5rem 0;
}

.empty-cart-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .cart-item {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .item-image {
    width: 50px;
    height: 50px;
  }
  
  .item-details {
    flex: 1;
    min-width: 120px;
  }
  
  .quantity-controls {
    order: 3;
    flex-basis: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .item-actions {
    align-items: center;
  }
}
</style> 