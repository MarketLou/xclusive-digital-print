<template>
  <div class="page-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Custom Heat Transfers</h1>
          <p>Direct-to-film transfers for easy application</p>
        </div>
      </div>
    </div>

    <section class="content-section">
      <div class="container">
        <div class="product-content">
          <h2>Custom Heat Transfers</h2>
          <p>Bring your designs to life with our custom heat transfer decals. These iron-on transfers are printed on direct-to-film (DTF) materials, ensuring both easy application and long-lasting results. Whether you're customizing for a team or a brand, you'll receive high-quality decals quickly and without hassle.</p>
          
          <h3>Our custom heat transfers offer:</h3>
          <ul class="features-list">
            <li>Compatibility with any fabric or color</li>
            <li>Full-color printing</li>
            <li>Machine washable durability</li>
            <li>Easy application with a heat press or iron</li>
          </ul>

          <p class="quote-note">For large orders, please contact us for a personalized price quote.</p>
          
          <div class="cta-section">
            <NuxtLink to="/contact" class="cta-button">Get Quote</NuxtLink>
            <NuxtLink to="/services/digital-printing-services" class="back-link">← Back to Services</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Custom Heat Transfers | Direct-to-Film Transfer Printing',
  meta: [
    { name: 'description', content: 'Custom heat transfer decals printed on DTF materials. Compatible with any fabric, full-color printing, machine washable and easy application.' }
  ]
})
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: var(--background-color);
}

.hero-section {
  position: relative;
  height: 50vh;
  min-height: 300px;
  background-color: #161D2D;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(22, 29, 45, 0.8);
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
  font-size: 1.2rem;
  color: white;
  opacity: 0.9;
}

.content-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.product-content {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-content h2 {
  font-size: 2.5rem;
  color: #161D2D;
  margin-bottom: 2rem;
  text-align: center;
}

.product-content h3 {
  font-size: 1.5rem;
  color: #161D2D;
  margin: 2rem 0 1rem 0;
}

.product-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 2rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.features-list li {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 0.8rem;
  padding-left: 2rem;
  position: relative;
}

.features-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #161D2D;
  font-weight: bold;
  font-size: 1.2rem;
}

.quote-note {
  font-style: italic;
  background-color: #f8f9fa;
  padding: 1rem;
  border-left: 4px solid #161D2D;
  margin: 2rem 0;
}

.cta-section {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.cta-button {
  background-color: #161D2D;
  color: white;
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #2a3447;
}

.back-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #161D2D;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .product-content {
    padding: 2rem;
  }

  .product-content h2 {
    font-size: 2rem;
  }

  .cta-section {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 