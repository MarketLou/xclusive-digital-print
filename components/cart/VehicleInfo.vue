<template>
  <div class="vehicle-info-form">
    <h3>Vehicle Information</h3>
    <form @submit.prevent>
      <div class="form-group">
        <label for="vehicle-year">Year *</label>
        <input
          id="vehicle-year"
          v-model="vehicleData.year"
          type="text"
          placeholder="e.g., 2023"
          required
          @input="emitUpdate"
        />
      </div>

      <div class="form-group">
        <label for="vehicle-make">Make *</label>
        <input
          id="vehicle-make"
          v-model="vehicleData.make"
          type="text"
          placeholder="e.g., Toyota, Ford, BMW"
          required
          @input="emitUpdate"
        />
      </div>

      <div class="form-group">
        <label for="vehicle-model">Model *</label>
        <input
          id="vehicle-model"
          v-model="vehicleData.model"
          type="text"
          placeholder="e.g., Camry, F-150, X5"
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
const emit = defineEmits(['update-vehicle-info'])

// Reactive vehicle data
const vehicleData = reactive({
  year: '',
  make: '',
  model: ''
})

// Emit updated data whenever form changes
const emitUpdate = () => {
  emit('update-vehicle-info', { ...vehicleData })
}
</script>

<style scoped>
.vehicle-info-form {
  margin-bottom: 2rem;
}

.vehicle-info-form h3 {
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