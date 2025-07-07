<template>
  <div class="customer-info-form">
    <h3>Customer Information</h3>
    <form @submit.prevent>
      <div class="form-group">
        <label for="customer-name">Name *</label>
        <input
          id="customer-name"
          v-model="customerData.name"
          type="text"
          placeholder="Enter your full name"
          required
          @input="emitUpdate"
        />
      </div>

      <div class="form-group">
        <label for="customer-email">Email *</label>
        <input
          id="customer-email"
          v-model="customerData.email"
          type="email"
          placeholder="Enter your email address"
          required
          @input="emitUpdate"
        />
      </div>

      <div class="form-group">
        <label for="customer-phone">Phone Number *</label>
        <input
          id="customer-phone"
          v-model="customerData.phone"
          type="tel"
          placeholder="Enter your phone number"
          required
          @input="emitUpdate"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Define emits
const emit = defineEmits(['update-customer-info'])

// Reactive customer data
const customerData = reactive({
  name: '',
  email: '',
  phone: ''
})

// Emit updated data whenever form changes
const emitUpdate = () => {
  emit('update-customer-info', { ...customerData })
}
</script>

<style scoped>
.customer-info-form {
  margin-bottom: 2rem;
}

.customer-info-form h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #004dff;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #004dff;
  box-shadow: 0 0 0 3px rgba(0, 77, 255, 0.1);
}

.form-group input::placeholder {
  color: #999;
}

.form-group input:invalid {
  border-color: #dc3545;
}

.form-group input:valid {
  border-color: #28a745;
}
</style> 