<template>
  <div class="product-display">
    <div class="display-header">
      <h2>{{ displayTitle }}</h2>
      <p v-if="!loading && products.length" class="product-count">
        {{ products.length }} product{{ products.length !== 1 ? 's' : '' }} found
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-grid">
        <div v-for="n in 6" :key="n" class="product-skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-price"></div>
            <div class="skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-content">
        <h3>Failed to load products</h3>
        <p>There was an error loading the products. Please try again.</p>
        <button @click="fetchProducts" class="retry-button">Retry</button>
      </div>
    </div>

    <!-- No Products State -->
    <div v-else-if="!products.length" class="empty-state">
      <div class="empty-content">
        <h3>No products found</h3>
        <p>{{ selectedCategoryId ? 'No products available in this category.' : 'No products available at the moment.' }}</p>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else class="products-grid">
      <div 
        v-for="product in products" 
        :key="product.id"
        class="product-card"
      >
        <!-- Product Image -->
        <div class="product-image">
          <img 
            :src="product.thumbnail || '/images/placeholder-product.svg'" 
            :alt="product.title"
            @error="handleImageError"
          />
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p v-if="product.description" class="product-description">
            {{ truncateDescription(product.description) }}
          </p>
          
          <!-- Product Variants and Pricing -->
          <div class="product-variants">
            <div v-if="product.variants?.length" class="variant-selector">
              <select 
                v-model="selectedVariants[product.id]" 
                class="variant-select"
                @change="updateSelectedVariant(product.id, $event.target.value)"
              >
                <option value="" disabled>Select option</option>
                <option 
                  v-for="variant in product.variants" 
                  :key="variant.id"
                  :value="variant.id"
                >
                  {{ variant.title }} - {{ formatPrice(variant.prices?.[0]?.amount) }}
                </option>
              </select>
            </div>
          </div>

          <!-- Price Display -->
          <div class="product-price">
            <span v-if="getSelectedVariantPrice(product)" class="current-price">
              {{ formatPrice(getSelectedVariantPrice(product)) }}
            </span>
            <span v-else-if="product.variants?.length" class="price-range">
              {{ getPriceRange(product) }}
            </span>
          </div>

          <!-- Add to Cart Button -->
          <button 
            class="add-to-cart-btn"
            :disabled="!canAddToCart(product) || addingToCart[product.id]"
            @click="addToCart(product)"
          >
            <span v-if="addingToCart[product.id]">Adding...</span>
            <span v-else>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useCartStore } from '~/store/cart';

// Define props
const props = defineProps({
  selectedCategoryId: {
    type: String,
    default: null,
  },
});

// Get Medusa client and cart store
const { $medusa } = useNuxtApp();
const cartStore = useCartStore();

// Reactive state
const products = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  
  const params = {
    // sales_channel_id is now configured globally in the Medusa plugin
    ...(props.selectedCategoryId && { category_id: props.selectedCategoryId })
  };
  
  try {
    const { products: fetchedProducts } = await $medusa.store.product.list(
      params, // query parameters
      { 
        "x-publishable-api-key": "pk_7e3c4e2dfd3bd840783526f27a6c8ee7cd642d80b30fcad16dc62bbdd2f6548d" 
      } // headers
    );
    products.value = fetchedProducts;
  } catch (e) {
    console.error("Error fetching products:", e);
    error.value = true;
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Watch for changes in the selected category ID and refetch products
watch(
  () => props.selectedCategoryId,
  () => {
    fetchProducts();
  },
  { immediate: true } // immediate:true runs the watcher on initial component load
);

// Additional reactive state for product interactions
const selectedVariants = ref({});
const addingToCart = ref({});

// Computed property for display title
const displayTitle = computed(() => {
  if (props.selectedCategoryId) {
    // We'll need to get the category name - for now show a generic title
    // TODO: Pass category name as prop or fetch it
    return `Category Products`;
  }
  return 'All Products';
});

// Helper function to truncate description
const truncateDescription = (description, maxLength = 100) => {
  if (!description) return '';
  return description.length > maxLength 
    ? description.substring(0, maxLength) + '...' 
    : description;
};

// Helper function to format price
const formatPrice = (amount) => {
  if (!amount && amount !== 0) return 'Price not available';
  return `$${amount.toFixed(2)}`;
};

// Helper function to handle image errors
const handleImageError = (event) => {
  event.target.src = '/images/placeholder-product.svg';
};

// Function to update selected variant
const updateSelectedVariant = (productId, variantId) => {
  selectedVariants.value[productId] = variantId;
};

// Function to get selected variant price
const getSelectedVariantPrice = (product) => {
  const selectedVariantId = selectedVariants.value[product.id];
  if (!selectedVariantId) return null;
  
  const variant = product.variants?.find(v => v.id === selectedVariantId);
  // Handle missing prices gracefully
  if (!variant?.prices?.length) return null;
  return variant.prices[0]?.amount || null;
};

// Function to get price range for products with multiple variants
const getPriceRange = (product) => {
  if (!product.variants?.length) return 'Price not available';
  
  const prices = product.variants
    .map(variant => variant.prices?.[0]?.amount)
    .filter(price => price !== undefined && price !== null)
    .sort((a, b) => a - b);
  
  if (prices.length === 0) return 'Price not available';
  if (prices.length === 1) return formatPrice(prices[0]);
  
  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];
  
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

// Function to check if product can be added to cart
const canAddToCart = (product) => {
  if (!product.variants?.length) return false;
  
  // If product has variants, user must select one
  if (product.variants.length > 1) {
    return selectedVariants.value[product.id] !== undefined;
  }
  
  // If product has only one variant, it can be added
  return true;
};

// Function to add product to cart
const addToCart = async (product) => {
  if (!canAddToCart(product)) return;
  
  let variantId;
  
  // If multiple variants, use selected variant
  if (product.variants.length > 1) {
    variantId = selectedVariants.value[product.id];
  } else {
    // If single variant, use that variant
    variantId = product.variants[0].id;
  }
  
  if (!variantId) return;
  
  // Set loading state
  addingToCart.value[product.id] = true;
  
  try {
    await cartStore.addProductToCart({ variantId, quantity: 1 });
    // Optional: Show success message
    console.log('Product added to cart successfully');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    // Optional: Show error message
  } finally {
    addingToCart.value[product.id] = false;
  }
};

// Function to add a product to the cart (legacy - keeping for compatibility)
const handleAddToCart = (variantId) => {
  if (!variantId) return;
  cartStore.addProductToCart({ variantId, quantity: 1 });
};
</script>

<style scoped>
.product-display {
  width: 100%;
}

.display-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.display-header h2 {
  margin: 0 0 0.5rem 0;
  color: #161D2D;
  font-size: 2rem;
  font-weight: 600;
}

.product-count {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.loading-state {
  width: 100%;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-skeleton {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  animation: pulse 1.5s ease-in-out infinite alternate;
}

.skeleton-image {
  height: 200px;
  background: #f0f0f0;
}

.skeleton-content {
  padding: 1rem;
}

.skeleton-title,
.skeleton-price,
.skeleton-button {
  height: 20px;
  background: #f0f0f0;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.skeleton-button {
  height: 40px;
  margin-top: 1rem;
}

@keyframes pulse {
  0% { opacity: 1; }
  100% { opacity: 0.6; }
}

.error-state,
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
}

.error-content,
.empty-content {
  max-width: 400px;
}

.error-content h3,
.empty-content h3 {
  color: #161D2D;
  margin-bottom: 1rem;
}

.retry-button {
  background: #161D2D;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.retry-button:hover {
  background: #2a3447;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.product-image {
  height: 200px;
  overflow: hidden;
  background: #f8f9fa;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
}

.product-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #161D2D;
  line-height: 1.4;
}

.product-description {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
}

.product-variants {
  margin-bottom: 1rem;
}

.variant-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
}

.variant-select:focus {
  outline: none;
  border-color: #161D2D;
}

.product-price {
  margin-bottom: 1rem;
}

.current-price {
  font-size: 1.3rem;
  font-weight: 600;
  color: #161D2D;
}

.price-range {
  font-size: 1.1rem;
  color: #666;
}

.add-to-cart-btn {
  width: 100%;
  background: #161D2D;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2a3447;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .display-header h2 {
    font-size: 1.5rem;
  }
}
</style> 