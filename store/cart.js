import { defineStore } from 'pinia';

// Sales channel ID constant
const SALES_CHANNEL_ID = 'sc_01JXKD7XG54XCQDSNGJH7G6QJC';
// API key constant for new SDK v2.8.4
const API_KEY = 'pk_7e3c4e2dfd3bd840783526f27a6c8ee7cd642d80b30fcad16dc62bbdd2f6548d';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: null,
    cart: null,
    isCartOpen: false,
  }),
  getters: {
    // Get total number of items in cart
    itemCount: (state) => {
      if (!state.cart?.items) return 0;
      return state.cart.items.reduce((total, item) => total + item.quantity, 0);
    },
    // Get cart total amount
    cartTotal: (state) => {
      if (!state.cart?.total) return 0;
      return state.cart.total;
    },
    // Check if cart has items
    hasItems: (state) => {
      return state.cart?.items?.length > 0;
    },
    // Get formatted cart total
    formattedTotal: (state) => {
      if (!state.cart?.total) return '$0.00';
      return `$${state.cart.total.toFixed(2)}`;
    }
  },
  actions: {
    async initializeCart() {
      const { $medusa } = useNuxtApp();
      this.cartId = localStorage.getItem('cart_id');
      
      console.log('[CART] 🔍 initializeCart - existing cartId:', this.cartId);

      if (this.cartId) {
        try {
          console.log('[CART] ➤ Retrieving existing cart:', this.cartId);
          
          const { cart } = await $medusa.store.cart.retrieve(
            this.cartId,
            {}, // query parameters
            { "x-publishable-api-key": API_KEY } // headers
          );
          this.cart = cart;
          console.log('[CART] ✅ Cart retrieved successfully:', cart.id);
        } catch (e) {
          console.log('[CART] ❌ Failed to retrieve cart, clearing:', e.message);
          console.log('[CART] 📋 Error details:', e.response?.status, e.response?.data);
          localStorage.removeItem('cart_id');
          this.cartId = null;
          this.cart = null;
        }
      }
    },
    
    async createCart() {
      const { $medusa } = useNuxtApp();
      if (this.cartId) {
        console.log('[CART] ⚠️ Cart already exists, skipping creation:', this.cartId);
        return;
      }
      
      console.log('[CART] 🚀 Creating new cart...');
      
      try {
        // The create call should be empty. Medusa infers the region and sales channel.
        const { cart } = await $medusa.store.cart.create(
          {}, // body
          {}, // query parameters  
          { "x-publishable-api-key": API_KEY } // headers
        );
        
        this.cart = cart;
        this.cartId = cart.id;
        localStorage.setItem('cart_id', cart.id);
        console.log('[CART] ✅ Cart created successfully:', cart.id);
      } catch (error) {
        console.error('[CART] ❌ Error creating cart:', error.response?.data || error.message);
        throw error;
      }
    },
    
    async addProductToCart({ variantId, quantity }) {
      const { $medusa } = useNuxtApp();
      
      console.log('[CART] 🛒 addProductToCart called:', { variantId, quantity });
      
      try {
        // Ensure we have a cart
        if (!this.cartId) {
          console.log('[CART] 🔄 No cart exists, creating new cart...');
          await this.createCart();
        }
        
        const payload = {
          variant_id: variantId,
          quantity: quantity,
          
        };
        
        console.log('[CART] 🚀 Adding product to cart...');
        console.log('[CART] 📦 Request payload:', JSON.stringify(payload, null, 2));
        console.log('[CART] 🔧 Using cartId:', this.cartId);
        
        const { cart } = await $medusa.store.cart.createLineItem(
          this.cartId, 
          payload,
          {}, // query parameters
          { "x-publishable-api-key": API_KEY } // headers
        );
        
        this.cart = cart;
        console.log('[CART] ✅ Product added to cart successfully:', { variantId, quantity });
        console.log('[CART] 📊 Updated cart:', cart);
        return { success: true };
      } catch (error) {
        console.error('[CART] ❌ Error adding product to cart:', error);
        console.error('[CART] 📋 Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          url: error.config?.url
        });
        
        // If cart is invalid, try creating a new one
        if (error.response?.status === 404) {
          console.log('[CART] 🔄 Cart not found (404), creating new cart and retrying...');
          this.cartId = null;
          localStorage.removeItem('cart_id');
          await this.createCart();
          // Retry adding the product
          return this.addProductToCart({ variantId, quantity });
        }
        throw error;
      }
    },
    
    // Remove item from cart
    async removeFromCart(lineItemId) {
      const { $medusa } = useNuxtApp();
      
      console.log('[CART] 🗑️ removeFromCart called:', lineItemId);
      
      try {
        if (!this.cartId) {
          console.log('[CART] ⚠️ No cart to remove from');
          return;
        }
        
        const { deleted, parent: cart } = await $medusa.store.cart.deleteLineItem(
          this.cartId, 
          lineItemId,
          { "x-publishable-api-key": API_KEY } // headers
        );
        this.cart = cart;
        console.log('[CART] ✅ Item removed from cart:', lineItemId);
      } catch (error) {
        console.error('[CART] ❌ Error removing item from cart:', error);
        throw error;
      }
    },
    
    // Update item quantity in cart
    async updateCartItem(lineItemId, quantity) {
      const { $medusa } = useNuxtApp();
      
      console.log('[CART] 📝 updateCartItem called:', { lineItemId, quantity });
      
      try {
        if (!this.cartId) {
          console.log('[CART] ⚠️ No cart to update');
          return;
        }
        
        const payload = { quantity: quantity };
        console.log('[CART] 📦 Request payload:', JSON.stringify(payload, null, 2));
        
        const { cart } = await $medusa.store.cart.updateLineItem(
          this.cartId, 
          lineItemId, 
          payload,
          {}, // query parameters
          { "x-publishable-api-key": API_KEY } // headers
        );
        this.cart = cart;
        console.log('[CART] ✅ Cart item updated:', { lineItemId, quantity });
      } catch (error) {
        console.error('[CART] ❌ Error updating cart item:', error);
        throw error;
      }
    },
    
    // Clear entire cart
    clearCart() {
      console.log('[CART] 🧹 clearCart called');
      this.cart = null;
      this.cartId = null;
      localStorage.removeItem('cart_id');
      console.log('[CART] ✅ Cart cleared');
    },
    
    // Toggle cart sidebar visibility
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
      console.log('[CART] 👁️ Cart sidebar toggled:', this.isCartOpen ? 'open' : 'closed');
    },

    // Add this new action inside the 'actions' object
    async updateCartDetails({ customer, vehicle }) {
      if (!this.cartId) return;
      const { $medusa } = useNuxtApp();

      const payload = {
        // Use the customer's email for the cart
        email: customer.email,
        // Use the customer's name and phone for the shipping address
        shipping_address: {
          first_name: customer.name,
          last_name: 'Customer', // Medusa requires a last name, use a placeholder
          phone: customer.phone,
        },
        // Store vehicle info in the cart's metadata
        metadata: {
          vehicle_year: vehicle.year,
          vehicle_make: vehicle.make,
          vehicle_model: vehicle.model,
        },
      };

      try {
        // First, update the cart with customer and shipping details
        const { cart } = await $medusa.store.cart.update(
          this.cartId, 
          payload,
          {}, // query parameters
          { "x-publishable-api-key": API_KEY } // headers
        );
        this.cart = cart;
        console.log('[CART] ✅ Cart details updated successfully.');

        // Auto-select the pickup shipping method after updating cart details
        await this.addShippingMethod();
        
      } catch (e) {
        console.error('[CART] ❌ Error updating cart details:', e);
      }
    },

    // Auto-select pickup shipping method
    async addShippingMethod() {
      if (!this.cartId) return;

      console.log('[CART] 🚚 Adding shipping method...');
      
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
          const errorData = await response.text();
          console.error('[CART] ❌ Error response from shipping method API:', response.status, errorData);
          throw new Error(`Failed to add shipping method: ${response.status} ${errorData}`);
        }

        const data = await response.json();
        console.log('[CART] ✅ Shipping method added successfully:', data);
        
        // Update local cart state with the response that includes shipping methods
        if (data.cart) {
          this.cart = data.cart;
        }
        
      } catch (error) {
        console.error('[CART] ❌ Error adding shipping method:', error);
        throw error;
      }
    },

    // Create payment session for Stripe
    async createPaymentSession() {
      if (!this.cartId) {
        console.error('[CART] ❌ No cart ID available for payment session');
        return null;
      }

      const { $medusa } = useNuxtApp();
      
      console.log('[CART] 💳 Creating payment session...');
      
      try {
        const { payment_collection } = await $medusa.store.payment.initiatePaymentSession(
          this.cart, 
          {
            provider_id: 'pp_stripe_stripe'
          },
          {}, // query parameters
          { "x-publishable-api-key": API_KEY } // headers
        );
        
        // Find the Stripe payment session
        const stripeSession = payment_collection.payment_sessions?.find(session => session.provider_id === 'pp_stripe_stripe');
        
        if (stripeSession) {
          console.log('[CART] ✅ Payment session created successfully');
          return stripeSession.data.client_secret;
        } else {
          console.error('[CART] ❌ No Stripe payment session found');
          return null;
        }
      } catch (error) {
        console.error('[CART] ❌ Error creating payment session:', error.response?.data || error.message);
        throw error;
      }
    },

    // Complete the cart/order
    async completeCart() {
      if (!this.cartId) {
        console.error('[CART] ❌ No cart ID available for completion');
        return null;
      }

      const { $medusa } = useNuxtApp();
      
      console.log('[CART] 🎉 Completing cart...');
      
      try {
        const result = await $medusa.store.cart.complete(
          this.cartId,
          {}, // query parameters
          { "x-publishable-api-key": API_KEY } // headers
        );
        
        // Check if completion was successful
        if (result.type === 'order') {
          // Order placed successfully
          const { order } = result;
          
          // Clear the cart after successful completion
          this.cart = null;
          this.cartId = null;
          localStorage.removeItem('cart_id');
          
          console.log('[CART] ✅ Order completed successfully:', order.id);
          return order;
        } else {
          // Error occurred during completion
          console.error('[CART] ❌ Error completing cart:', result.error);
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('[CART] ❌ Error completing cart:', error.response?.data || error.message);
        throw error;
      }
    }
  },
}); 