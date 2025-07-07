# Shop Page Implementation - Product Requirements Document & How-To Guide

## 🎯 **Project Overview**

This document provides comprehensive instructions for implementing a fully functional e-commerce shop page that matches the current Xclusive Auto Detailing website. The shop includes product browsing, category filtering, cart management, customer information collection, and payment processing.

## 📋 **Product Requirements Document (PRD)**

### **Core Features Required:**

1. **Product Catalog System**
   - Display products in responsive grid layout
   - Category-based filtering via sidebar
   - Product variant selection (different sizes, options)
   - Dynamic pricing based on selected variants
   - Product search and pagination support

2. **Shopping Cart Functionality**
   - Add/remove products from cart
   - Quantity adjustment controls
   - Real-time cart total calculation
   - Persistent cart across browser sessions
   - Fixed cart icon with item count badge

3. **Customer Data Collection**
   - Customer information form (name, email, phone)
   - Vehicle information form (year, make, model)
   - Form validation and error handling
   - Auto-save form data to cart metadata

4. **User Interface & Experience**
   - Responsive design (mobile/tablet/desktop)
   - Smooth animations and transitions
   - Loading states for all async operations
   - Error handling with user-friendly messages
   - Accessibility compliance (ARIA labels, keyboard navigation)

5. **E-commerce Integration**
   - Medusa.js backend integration
   - Stripe payment processing
   - Order management and completion
   - Inventory tracking and availability

## 🛠 **Technical Requirements**

### **Technology Stack:**
- **Frontend**: Nuxt 3 with Vue 3 Composition API
- **State Management**: Pinia
- **E-commerce Backend**: Medusa.js
- **Payment Processing**: Stripe
- **Styling**: Scoped CSS with responsive design
- **API Communication**: Medusa JS SDK v2.8.4

### **Performance Requirements:**
- Initial page load: < 3 seconds
- Product filtering: < 500ms response time
- Cart operations: < 1 second response time
- Mobile-responsive design for all screen sizes

## 📁 **Complete File Structure & Implementation**

### **1. Dependencies (package.json additions)**

```json
{
  "dependencies": {
    "@medusajs/js-sdk": "^2.8.4",
    "pinia": "^2.1.7",
    "@pinia/nuxt": "^0.5.1"
  }
}
```

### **2. Nuxt Configuration (nuxt.config.ts)**

```typescript
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    // ... other modules
  ],
  
  // Proxy for Medusa API (optional)
  nitro: {
    devProxy: {
      '/api/medusa': {
        target: 'https://xclusive-medusa-production.up.railway.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path: string) => path.replace(/^\/api\/medusa/, '')
      }
    }
  }
})
```

### **3. Medusa Plugin (plugins/medusa.js)**

```javascript
import Medusa from "@medusajs/js-sdk";

export default defineNuxtPlugin(() => {
  const medusa = new Medusa({
    baseUrl: "https://xclusive-medusa-production.up.railway.app"
    // publishableApiKey removed - must be passed manually in each request
  });

  console.log('✅ Medusa JS SDK v2.8.4 initialized successfully');
  console.log('🔑 API Key will be passed manually in request headers');

  return {
    provide: {
      medusa,
    },
  };
});
```

### **4. Cart Store (store/cart.js)**

```javascript
import { defineStore } from 'pinia';

// Constants - REPLACE WITH YOUR VALUES
const SALES_CHANNEL_ID = 'sc_01JXKD7XG54XCQDSNGJH7G6QJC';
const API_KEY = 'pk_7e3c4e2dfd3bd840783526f27a6c8ee7cd642d80b30fcad16dc62bbdd2f6548d';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: null,
    cart: null,
    isCartOpen: false,
  }),
  
  getters: {
    itemCount: (state) => {
      if (!state.cart?.items) return 0;
      return state.cart.items.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotal: (state) => {
      if (!state.cart?.total) return 0;
      return state.cart.total;
    },
    hasItems: (state) => {
      return state.cart?.items?.length > 0;
    },
    formattedTotal: (state) => {
      if (!state.cart?.total) return '$0.00';
      return `$${state.cart.total.toFixed(2)}`;
    }
  },
  
  actions: {
    async initializeCart() {
      const { $medusa } = useNuxtApp();
      this.cartId = localStorage.getItem('cart_id');
      
      if (this.cartId) {
        try {
          const { cart } = await $medusa.store.cart.retrieve(
            this.cartId,
            {}, 
            { "x-publishable-api-key": API_KEY }
          );
          this.cart = cart;
        } catch (e) {
          localStorage.removeItem('cart_id');
          this.cartId = null;
          this.cart = null;
        }
      }
    },
    
    async createCart() {
      const { $medusa } = useNuxtApp();
      if (this.cartId) return;
      
      try {
        const { cart } = await $medusa.store.cart.create(
          {}, 
          {}, 
          { "x-publishable-api-key": API_KEY }
        );
        
        this.cart = cart;
        this.cartId = cart.id;
        localStorage.setItem('cart_id', cart.id);
      } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
      }
    },
    
    async addProductToCart({ variantId, quantity }) {
      const { $medusa } = useNuxtApp();
      
      try {
        if (!this.cartId) {
          await this.createCart();
        }
        
        const payload = {
          variant_id: variantId,
          quantity: quantity,
        };
        
        const { cart } = await $medusa.store.cart.createLineItem(
          this.cartId, 
          payload,
          {}, 
          { "x-publishable-api-key": API_KEY }
        );
        
        this.cart = cart;
        return { success: true };
      } catch (error) {
        if (error.response?.status === 404) {
          this.cartId = null;
          localStorage.removeItem('cart_id');
          await this.createCart();
          return this.addProductToCart({ variantId, quantity });
        }
        throw error;
      }
    },
    
    async removeFromCart(lineItemId) {
      const { $medusa } = useNuxtApp();
      
      try {
        if (!this.cartId) return;
        
        const { deleted, parent: cart } = await $medusa.store.cart.deleteLineItem(
          this.cartId, 
          lineItemId,
          { "x-publishable-api-key": API_KEY }
        );
        this.cart = cart;
      } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
      }
    },
    
    async updateCartItem(lineItemId, quantity) {
      const { $medusa } = useNuxtApp();
      
      try {
        if (!this.cartId) return;
        
        const payload = { quantity: quantity };
        
        const { cart } = await $medusa.store.cart.updateLineItem(
          this.cartId, 
          lineItemId, 
          payload,
          {}, 
          { "x-publishable-api-key": API_KEY }
        );
        this.cart = cart;
      } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
      }
    },
    
    clearCart() {
      this.cart = null;
      this.cartId = null;
      localStorage.removeItem('cart_id');
    },
    
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },

    async updateCartDetails({ customer, vehicle }) {
      if (!this.cartId) return;
      const { $medusa } = useNuxtApp();

      const payload = {
        email: customer.email,
        shipping_address: {
          first_name: customer.name,
          last_name: 'Customer',
          phone: customer.phone,
        },
        metadata: {
          vehicle_year: vehicle.year,
          vehicle_make: vehicle.make,
          vehicle_model: vehicle.model,
        },
      };

      try {
        const { cart } = await $medusa.store.cart.update(
          this.cartId, 
          payload,
          {}, 
          { "x-publishable-api-key": API_KEY }
        );
        this.cart = cart;
        await this.addShippingMethod();
      } catch (e) {
        console.error('Error updating cart details:', e);
      }
    },

    async addShippingMethod() {
      if (!this.cartId) return;
      
      try {
        const response = await fetch(`https://xclusive-medusa-production.up.railway.app/store/carts/${this.cartId}/shipping-methods`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
            'x-publishable-api-key': API_KEY
          },
          body: JSON.stringify({option_id: 'so_01JYF5ZEMNTNFMEDP4HAADXSEX'})
        });

        if (!response.ok) {
          throw new Error(`Failed to add shipping method: ${response.status}`);
        }

        const data = await response.json();
        if (data.cart) {
          this.cart = data.cart;
        }
      } catch (error) {
        console.error('Error adding shipping method:', error);
        throw error;
      }
    },

    async createPaymentSession() {
      if (!this.cartId) return null;

      const { $medusa } = useNuxtApp();
      
      try {
        const { payment_collection } = await $medusa.store.payment.initiatePaymentSession(
          this.cart, 
          {
            provider_id: 'pp_stripe_stripe'
          },
          {}, 
          { "x-publishable-api-key": API_KEY }
        );
        
        const stripeSession = payment_collection.payment_sessions?.find(session => session.provider_id === 'pp_stripe_stripe');
        
        if (stripeSession) {
          return stripeSession.data.client_secret;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error creating payment session:', error);
        throw error;
      }
    },

    async completeCart() {
      if (!this.cartId) return null;

      const { $medusa } = useNuxtApp();
      
      try {
        const result = await $medusa.store.cart.complete(
          this.cartId,
          {}, 
          { "x-publishable-api-key": API_KEY }
        );
        
        if (result.type === 'order') {
          const { order } = result;
          
          this.cart = null;
          this.cartId = null;
          localStorage.removeItem('cart_id');
          
          return order;
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Error completing cart:', error);
        throw error;
      }
    }
  },
});
```

## 🎨 **Component Implementation Guide**

### **Main Shop Page (pages/shop.vue)**

**Key Features:**
- Hero section with shop title
- Two-column layout (sidebar + products)
- Fixed cart icon with badge
- Responsive design

**Implementation Notes:**
- Uses CategorySidebar for filtering
- ProductDisplay shows filtered products
- CartSidebar slides in from right
- Initializes cart store on mount

### **CategorySidebar Component (components/CategorySidebar.vue)**

**Key Features:**
- Fetches categories from Medusa API
- "All Products" option to show everything
- Active state styling
- Loading and error states

**Implementation Notes:**
- Emits 'category-selected' event to parent
- Uses Medusa API with your publishable key
- Scrollable list with custom scrollbar styling

### **ProductDisplay Component (components/ProductDisplay.vue)**

**Key Features:**
- Responsive product grid
- Variant selection dropdowns
- Add to cart functionality
- Loading skeleton states
- Price range display

**Implementation Notes:**
- Watches for category changes via props
- Handles single and multi-variant products
- Shows price ranges for products with multiple options
- Integrates with cart store for adding products

### **CartSidebar Component (components/CartSidebar.vue)**

**Key Features:**
- Slide-out panel from right
- Contains all cart sub-components
- Responsive width (400px desktop, 100vw mobile)
- Customer and vehicle info forms

**Implementation Notes:**
- Controls visibility via cart store
- Passes data between sub-components
- Updates cart metadata with form data

### **Cart Sub-Components**

1. **CartItems.vue**: Item list with quantity controls and removal
2. **CustomerInfo.vue**: Name, email, phone collection
3. **VehicleInfo.vue**: Year, make, model selection
4. **PaymentInfo.vue**: Stripe payment processing

## 🚀 **Implementation Steps**

### **Phase 1: Setup (30 minutes)**
1. Install dependencies: `npm install @medusajs/js-sdk pinia @pinia/nuxt`
2. Create plugins/medusa.js with your API configuration
3. Update nuxt.config.ts to include Pinia module
4. Create store/cart.js with your API keys and endpoint

### **Phase 2: Core Components (2-3 hours)**
1. Create pages/shop.vue with layout structure
2. Build CategorySidebar.vue for product filtering
3. Build ProductDisplay.vue for product grid
4. Build CartSidebar.vue for cart management

### **Phase 3: Cart Functionality (2-3 hours)**
1. Create components/cart/CartItems.vue
2. Create components/cart/CustomerInfo.vue  
3. Create components/cart/VehicleInfo.vue
4. Create components/cart/PaymentInfo.vue

### **Phase 4: Integration & Testing (1-2 hours)**
1. Test all cart operations (add, remove, update)
2. Test category filtering
3. Test responsive design
4. Test payment flow (if applicable)

## 🔧 **Configuration Requirements**

### **Environment Variables Needed:**
- Medusa backend URL
- Medusa publishable API key
- Sales channel ID (if using multiple channels)
- Shipping method ID for pickup option

### **Medusa Backend Setup:**
- Products must be created with proper categories
- Product variants must have pricing configured
- Sales channels must be set up
- Shipping options must be configured
- Payment providers (Stripe) must be configured

## ⚠️ **Important Notes**

1. **API Key Security**: The publishable API key is safe for frontend use but should be environment-specific

2. **Error Handling**: All components include proper error handling for network failures and invalid states

3. **Loading States**: Every async operation shows appropriate loading indicators

4. **Mobile Responsiveness**: All components are designed mobile-first with breakpoint adjustments

5. **Accessibility**: Components include ARIA labels and keyboard navigation support

6. **SEO**: Shop page includes proper meta tags and structured data (implement as needed)

## 🐛 **Common Issues & Solutions**

**Cart Not Persisting**: Ensure localStorage is working and cart IDs are properly stored

**Products Not Loading**: Verify API key, backend URL, and network connectivity

**Payment Issues**: Check Stripe configuration and payment provider setup in Medusa

**Category Filtering**: Ensure categories are properly linked to products in Medusa backend

**Mobile Layout Issues**: Test responsive breakpoints and adjust CSS as needed

## 📊 **Success Criteria**

✅ **Functional Requirements Met:**
- Users can browse products by category
- Users can add/remove items from cart
- Cart persists across browser sessions
- Customer and vehicle info can be collected
- Responsive design works on all devices

✅ **Performance Requirements Met:**
- Page loads in under 3 seconds
- Cart operations complete in under 1 second
- Smooth animations and transitions
- No console errors or warnings

✅ **User Experience Requirements Met:**
- Intuitive navigation and interaction
- Clear feedback for all user actions
- Graceful error handling
- Accessible to users with disabilities

This implementation guide provides everything needed to create an exact replica of your shop page functionality. Follow the phases in order and test thoroughly at each step. 