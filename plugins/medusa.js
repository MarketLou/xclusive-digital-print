import Medusa from "@medusajs/js-sdk";

export default defineNuxtPlugin(() => {
  const medusa = new Medusa({
    baseUrl: "https://xclusive-medusa-production.up.railway.app"
    // publishableApiKey removed - must be passed manually in each request
  });

  // SDK successfully initialized
  console.log('✅ Medusa JS SDK v2.8.4 initialized successfully');
  console.log('🔑 API Key will be passed manually in request headers');

  return {
    provide: {
      medusa,
    },
  };
}); 