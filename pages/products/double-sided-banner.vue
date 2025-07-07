<template>
  <div class="page-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Double Sided Banner</h1>
          <p>Ultimate advertising impact with maximum visibility</p>
        </div>
      </div>
    </div>

    <section class="content-section">
      <div class="container">
        <div class="product-content">
          <div class="content-layout">
            <div class="image-section">
              <img src="/images/Digital-printing.jpg" alt="Professional double sided banner display" class="product-image">
            </div>
            <div class="text-section">
              <h2>Double Sided Banner</h2>
              <p>Our double sided banners offer the ultimate in advertising impact, known for their complete opacity and maximum visibility. Crafted with a built-in blockout layer, these banners ensure your graphics are bold and legible from any direction with zero show-through. Featuring crisp, vibrant printing on both sides, our banners provide a dynamic and professional display ideal for high-traffic areas. With a variety of finishing options, these banners can help you capture attention from all angles, leading to more exposure, more opportunities, and increased customer engagement.</p>
            </div>
          </div>
          
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
  title: 'Double Sided Banner | Professional Printing Services',
  meta: [
    { name: 'description', content: 'Double sided banners with complete opacity and maximum visibility. Built-in blockout layer ensures bold graphics with zero show-through.' }
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
  margin-top: 72px;
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

.content-layout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.image-section {
  flex: 0 0 auto;
  max-width: 400px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.text-section {
  flex: 1;
}

.text-section h2 {
  font-size: 2.5rem;
  color: #161D2D;
  margin-bottom: 2rem;
}

.product-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 2rem;
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

  .content-layout {
    flex-direction: column;
    gap: 2rem;
  }

  .image-section {
    max-width: 100%;
  }

  .text-section h2 {
    font-size: 2rem;
    text-align: center;
  }

  .cta-section {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 