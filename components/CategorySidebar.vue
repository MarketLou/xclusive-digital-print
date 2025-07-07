<template>
  <div class="category-sidebar">
    <div class="sidebar-header">
      <h3>Categories</h3>
    </div>

    <div class="sidebar-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading categories...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>Failed to load categories</p>
        <button @click="fetchCategories" class="retry-button">Retry</button>
      </div>

      <!-- Categories List -->
      <div v-else class="categories-list">
        <!-- All Products Option -->
        <div 
          class="category-item"
          :class="{ active: selectedCategoryId === null }"
          @click="selectCategory(null)"
        >
          <span class="category-name">All Products</span>
        </div>

        <!-- Dynamic Categories -->
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-item"
          :class="{ active: selectedCategoryId === category.id }"
          @click="selectCategory(category.id)"
        >
          <span class="category-name">{{ category.name }}</span>
          <span v-if="category.category_children?.length" class="category-count">
            ({{ category.category_children.length }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define emits
const emit = defineEmits(['category-selected'])

// Reactive state
const categories = ref([])
const loading = ref(true)
const error = ref(false)
const selectedCategoryId = ref(null)

// Get Medusa client
const { $medusa } = useNuxtApp()

// Fetch categories from Medusa
const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = false
    
    const response = await $medusa.store.category.list(
      {}, // query parameters
      { 
        "x-publishable-api-key": "pk_7e3c4e2dfd3bd840783526f27a6c8ee7cd642d80b30fcad16dc62bbdd2f6548d" 
      } // headers
    )
    categories.value = response.product_categories || []
    
    console.log('Fetched categories:', categories.value)
  } catch (err) {
    console.error('Error fetching categories:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

// Handle category selection
const selectCategory = (categoryId) => {
  selectedCategoryId.value = categoryId
  emit('category-selected', categoryId)
}

// Fetch categories on component mount
onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.category-sidebar {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.sidebar-header {
  background: #161D2D;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.sidebar-content {
  padding: 1rem 0;
}

.loading-state,
.error-state {
  padding: 2rem 1.5rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #161D2D;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  background: #161D2D;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-button:hover {
  background: #2a3447;
}

.categories-list {
  max-height: 500px;
  overflow-y: auto;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.category-item:hover {
  background-color: #f8f9fa;
  padding-left: 2rem;
}

.category-item.active {
  background-color: #161D2D;
  color: white;
}

.category-item.active:hover {
  background-color: #2a3447;
}

.category-name {
  font-weight: 500;
  font-size: 1rem;
}

.category-count {
  font-size: 0.9rem;
  opacity: 0.7;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
}

.category-item.active .category-count {
  background: rgba(255, 255, 255, 0.2);
}

/* Scrollbar styling */
.categories-list::-webkit-scrollbar {
  width: 6px;
}

.categories-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.categories-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.categories-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 