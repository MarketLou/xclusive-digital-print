# Stripe Payment Integration Help Guide

## 🚨 **MISSING COMPONENT ISSUE**

The screenshot shows the cart is working, but the **Stripe payment component is not visible**. This component should appear below the cart items when there are products in the cart.

## 📝 **EXACT COMPONENT NAME**

The missing component is: **`components/cart/PaymentInfo.vue`**

This component should have been copied from the original project. If it's missing, **FLAG ME DOWN IN ALL CAPS** - you'll need the complete component code.

## 🔧 **Required Dependencies**

Make sure these are installed in `package.json`:

```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.4.0",
    "@stripe/vue-stripe-js": "^1.0.7"
  }
}
```

If these are not installed, run:
```bash
npm install @stripe/stripe-js @stripe/vue-stripe-js
```

## 🔑 **Stripe Configuration Requirements**

### 1. **Environment Variables Needed**
Create a `.env` file with your Stripe keys:

```env
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

⚠️ **IF YOU DON'T HAVE STRIPE KEYS, FLAG ME DOWN IN ALL CAPS** - you'll need to set up a Stripe account.

### 2. **Nuxt Configuration**
Add to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    }
  }
})
```

## 🧩 **How PaymentInfo.vue Should Integrate**

### **In CartSidebar.vue, verify this line exists:**

```vue
<template>
  <div class="cart-sidebar">
    <!-- ... other cart content ... -->
    
    <!-- Customer Information Form -->
    <CustomerInfo @update-customer-info="handleCustomerUpdate" />

    <!-- Vehicle Information Form -->
    <VehicleInfo @update-vehicle-info="handleVehicleUpdate" />

    <!-- THIS LINE MUST BE PRESENT: -->
    <PaymentInfo v-if="cartStore.hasItems" />
    
  </div>
</template>
```

### **Import Statement Required:**
```vue
<script setup>
import PaymentInfo from '~/components/cart/PaymentInfo.vue';
// ... other imports
</script>
```

## 🛠 **Troubleshooting Checklist**

### **Issue 1: Component Not Showing**
**Check these in order:**

1. ✅ **File exists**: `components/cart/PaymentInfo.vue` exists in project
2. ✅ **Import added**: PaymentInfo is imported in CartSidebar.vue
3. ✅ **Template includes**: `<PaymentInfo v-if="cartStore.hasItems" />` exists
4. ✅ **Items in cart**: Cart actually has items (cartStore.hasItems returns true)

### **Issue 2: Stripe Not Loading**
**Check these:**

1. ✅ **Dependencies installed**: @stripe/stripe-js and @stripe/vue-stripe-js
2. ✅ **Environment variables**: STRIPE_PUBLISHABLE_KEY is set
3. ✅ **Nuxt config**: runtimeConfig includes Stripe keys
4. ✅ **Console errors**: Check browser console for Stripe-related errors

### **Issue 3: Payment Not Processing**
**Check these:**

1. ✅ **Medusa backend**: Payment provider configured for Stripe
2. ✅ **Cart metadata**: Customer and vehicle info properly saved
3. ✅ **Shipping method**: Auto-pickup shipping method added
4. ✅ **Payment session**: Stripe payment session created successfully

## 📋 **Complete PaymentInfo.vue Component Structure**

**IF THE COMPONENT IS MISSING, FLAG ME DOWN IN ALL CAPS**

The component should include:
- Stripe Elements integration
- Credit card input fields
- Payment processing logic
- Error handling
- Loading states
- Integration with cart store

## 🔗 **Integration with Cart Store**

The PaymentInfo component uses these cart store methods:

```javascript
// These methods MUST exist in store/cart.js:
- cartStore.createPaymentSession()
- cartStore.completeCart() 
- cartStore.updateCartDetails()
- cartStore.hasItems (getter)
- cartStore.formattedTotal (getter)
```

**IF ANY OF THESE ARE MISSING FROM YOUR CART STORE, FLAG ME DOWN IN ALL CAPS**

## 🚨 **Critical Requirements Checklist**

Before the payment component will work, verify ALL of these:

### **Backend Requirements:**
- [ ] Medusa backend has Stripe payment provider configured
- [ ] Payment provider ID matches in cart store: `'pp_stripe_stripe'`
- [ ] Shipping methods are set up (pickup option)
- [ ] Sales channel is properly configured

**IF ANY BACKEND ITEMS ARE NOT SET UP, FLAG ME DOWN IN ALL CAPS**

### **Frontend Requirements:**
- [ ] PaymentInfo.vue component exists
- [ ] Stripe dependencies installed
- [ ] Environment variables configured
- [ ] Component imported in CartSidebar.vue
- [ ] Template includes PaymentInfo component

### **Cart State Requirements:**
- [ ] Cart has items (cartStore.hasItems = true)
- [ ] Customer info collected and saved
- [ ] Vehicle info collected and saved
- [ ] Shipping method added to cart

## 🔍 **Debugging Steps**

### **Step 1: Check Component Visibility**
Open browser dev tools and check if PaymentInfo component is in the DOM:

```javascript
// In browser console:
console.log('Cart has items:', cartStore.hasItems)
console.log('PaymentInfo element:', document.querySelector('[data-component="payment-info"]'))
```

### **Step 2: Check Cart Store State**
```javascript
// In browser console:
console.log('Cart store state:', cartStore.cart)
console.log('Customer info:', cartStore.cart?.email)
console.log('Shipping method:', cartStore.cart?.shipping_methods)
```

### **Step 3: Check Stripe Loading**
```javascript
// In browser console:
console.log('Stripe object:', window.Stripe)
```

## 🚨 **WHEN TO FLAG FOR HELP**

**FLAG ME DOWN IN ALL CAPS IF:**

1. ❌ **PaymentInfo.vue component file is completely missing**
2. ❌ **You don't have Stripe API keys (need to create Stripe account)**
3. ❌ **Medusa backend doesn't have Stripe configured**
4. ❌ **Cart store is missing payment-related methods**
5. ❌ **Component exists but shows console errors you can't resolve**
6. ❌ **Payment processing starts but fails with backend errors**

## 💡 **Quick Fix Attempts**

Try these first before flagging for help:

### **Fix 1: Force Component Visibility**
Temporarily remove the `v-if` condition:
```vue
<!-- Change this: -->
<PaymentInfo v-if="cartStore.hasItems" />

<!-- To this for testing: -->
<PaymentInfo />
```

### **Fix 2: Check Component Import**
Make sure import path is correct:
```vue
<script setup>
import PaymentInfo from '~/components/cart/PaymentInfo.vue'
// NOT: import PaymentInfo from './cart/PaymentInfo.vue'
</script>
```

### **Fix 3: Verify Cart Items**
Add debug info to see cart state:
```vue
<template>
  <div>
    <p>Debug: Has items = {{ cartStore.hasItems }}</p>
    <p>Debug: Item count = {{ cartStore.itemCount }}</p>
    <PaymentInfo v-if="cartStore.hasItems" />
  </div>
</template>
```

## 🎯 **Expected Final Result**

When working correctly, the cart sidebar should show:

1. **Cart Items** (✅ Working - visible in screenshot)
2. **Customer Info Form** (❓ Should be visible)
3. **Vehicle Info Form** (❓ Should be visible) 
4. **Payment Info Form** (❌ Missing - this is the problem)

The Payment Info section should include:
- Credit card number field
- Expiry date field
- CVC field
- Cardholder name field
- "Process Payment" button
- Total amount display

**IF THE PAYMENT SECTION IS STILL NOT VISIBLE AFTER FOLLOWING THIS GUIDE, FLAG ME DOWN IN ALL CAPS WITH THE SPECIFIC ERROR OR ISSUE YOU'RE SEEING.** 