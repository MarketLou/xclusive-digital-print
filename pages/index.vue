<template>
  <div class="digital-printing-page">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img 
          src="/images/Digital-printing.jpg" 
          alt="Professional Roland digital printer producing high-quality custom graphics and signage"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
        <div class="hero-content">
        <div class="hero-container">
          <h1 class="hero-title">Precision Digital Printing</h1>
          <div class="hero-cta">
            <NuxtLink to="/contact" class="btn btn-primary">Get Your Custom Quote</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Menu Section -->
    <section class="products-menu-section">
      <div class="container">
        <div class="products-menu-tabs">
          <div class="tab-header" :class="{ 'active': activeTab === 0 }" @click="setActiveTab(0)">
            <h3>Banners</h3>
          </div>
          <div class="tab-header" :class="{ 'active': activeTab === 1 }" @click="setActiveTab(1)">
            <h3>Decals & Adhesive Graphics</h3>
          </div>
          <div class="tab-header" :class="{ 'active': activeTab === 2 }" @click="setActiveTab(2)">
            <h3>Signs & Displays</h3>
          </div>
        </div>

        <div class="tab-content">
          <!-- Banners Tab -->
          <div v-if="activeTab === 0" class="tab-pane">
            <div class="menu-grid">
              <div class="menu-item">
                <h4>Vinyl Banners Single Sided</h4>
                <p>Weather-resistant outdoor banners perfect for events and storefronts</p>
                <NuxtLink to="/products/vinyl-banners" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Double Sided Banner</h4>
                <p>Maximum visibility with printing on both sides</p>
                <NuxtLink to="/products/double-sided-banner" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Pop Up Banners</h4>
                <p>Portable retractable banners for trade shows and presentations</p>
                <NuxtLink to="/products/pop-up-banners" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Canvas</h4>
                <p>High-quality canvas prints for artistic displays and presentations</p>
                <NuxtLink to="/products/canvas" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Backdrops</h4>
                <p>Professional photography and event backdrops in any size</p>
                <NuxtLink to="/products/backdrops" class="menu-item-link">Learn More</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Decals & Adhesive Graphics Tab -->
          <div v-if="activeTab === 1" class="tab-pane">
            <div class="menu-grid">
              <div class="menu-item">
                <h4>Custom Car Decals</h4>
                <p>Precision-cut vinyl decals for automotive applications</p>
                <NuxtLink to="/products/custom-car-decals" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>3M Controltac Vinyl Decals</h4>
                <p>Premium repositionable vinyl for professional installations</p>
                <NuxtLink to="/products/3m-controltac-vinyl-decals" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Custom Car Wrap</h4>
                <p>Full and partial vehicle wraps with photorealistic quality</p>
                <NuxtLink to="/products/custom-car-wrap" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Perforated Vinyl</h4>
                <p>See-through window graphics for vehicles and storefronts</p>
                <NuxtLink to="/products/perforated-vinyl" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Window Cling</h4>
                <p>Static-cling graphics that apply without adhesive</p>
                <NuxtLink to="/products/window-cling" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Wall Stickers</h4>
                <p>Removable interior graphics for offices and retail spaces</p>
                <NuxtLink to="/products/wall-stickers" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Fabric / Wallpaper</h4>
                <p>Textile printing for interior design and soft signage</p>
                <NuxtLink to="/products/fabric-wallpaper" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Stickers</h4>
                <p>Custom stickers in any shape, size, or finish</p>
                <NuxtLink to="/products/stickers" class="menu-item-link">Learn More</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Signs & Displays Tab -->
          <div v-if="activeTab === 2" class="tab-pane">
            <div class="menu-grid">
              <div class="menu-item">
                <h4>Wholesale Magnetic Signs</h4>
                <p>Removable magnetic signs for vehicle advertising</p>
                <NuxtLink to="/products/wholesale-magnetic-signs" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Yard Signs</h4>
                <p>Corrugated plastic signs for real estate and campaigns</p>
                <NuxtLink to="/products/yard-signs" class="menu-item-link">Learn More</NuxtLink>
              </div>
              <div class="menu-item">
                <h4>Construction Signs</h4>
                <p>Durable safety and informational signage for job sites</p>
                <NuxtLink to="/products/construction-signs" class="menu-item-link">Learn More</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="introduction-section">
      <div class="container">
        <div class="intro-layout">
          <div class="intro-text">
            <h2>Xclusive Digital Printing</h2>
            <p>For years, you've trusted us as the masters of surface perfection, dedicating our craft to achieving flawless automotive finishes with industry-leading paint protection and ceramic coatings. We believe that every surface is a canvas for potential. Today, we are proud to extend that same obsession with precision, quality, and vibrant detail to a new dimension: Custom Digital Printing.</p>
            <p>We are bringing our unmatched expertise in material science and meticulous application from the world of high-end vehicles to the world of high-impact graphics. Whether you're looking to elevate your brand with stunning banners and signs, transform a space with custom wall graphics, or turn your vehicle into a mobile masterpiece, our new digital printing division is your partner in making a powerful and lasting impression. Welcome to the next evolution of aesthetic excellence.</p>
          </div>
          <div class="intro-image">
            <img 
              src="/images/Webp-images-converted/black_logo-removebg-preview.webp" 
              alt="Xclusive Auto Detailing logo"
              class="xclusive-logo"
            />
            <img 
              src="/images/roland-logo.png" 
              alt="Roland logo - our professional printing equipment brand"
              class="roland-logo"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <section class="technology-section">
      <div class="container">
        <div class="tech-intro-layout">
          <div class="tech-intro-text">
            <h2>Our Roland Printing Process</h2>
            <p>Delivering exceptional results requires an investment in exceptional technology. That is why we have built our digital printing services around the state-of-the-art Roland TrueVIS VG-640 large-format printer/cutter. We ensure that every project, from the smallest decal to the largest backdrop, is produced with a level of quality that reflects our own high standards and yours.</p>
          </div>
          <div class="tech-intro-image">
            <img 
              src="/images/Digital-print-icon.png" 
              alt="Digital printing icon representing our precision printing services"
              class="tech-icon"
            />
          </div>
        </div>

        <!-- Desktop Table View -->
        <div class="features-table-desktop">
          <table class="features-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Technical Capability</th>
                <th>What This Means for Your Project</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>FlexFire™ Printheads</strong></td>
                <td>Four high-precision printheads fire ink droplets with optimized waveform control and placement accuracy.</td>
                <td><strong>Incredible Detail & Clarity:</strong> Your designs, logos, and photographs are rendered with razor-sharp lines and lifelike detail that commands attention and reflects professionalism.</td>
              </tr>
              <tr>
                <td><strong>TrueVIS TR2 Inks</strong></td>
                <td>An expanded color gamut, including configurations with Light Cyan and Light Magenta, certified by 3M™ and Avery Dennison™.</td>
                <td><strong>Vibrant, Accurate Color:</strong> We can achieve brighter, richer colors and hit specific brand tones with remarkable consistency, ensuring your graphics perfectly represent your vision.</td>
              </tr>
              <tr>
                <td><strong>High-Resolution Printing</strong></td>
                <td>Capable of printing at resolutions up to 1200×1200 dpi.</td>
                <td><strong>Photorealistic Quality:</strong> Images and complex gradients are smooth and stunningly realistic, making your graphics indistinguishable from professional photography.</td>
              </tr>
              <tr>
                <td><strong>Integrated Print & Cut</strong></td>
                <td>The machine seamlessly transitions from printing to precisely contour cutting with advanced registration technology.</td>
                <td><strong>Perfectly Shaped Graphics:</strong> Your custom decals, stickers, and logos are cut with flawless accuracy, eliminating waste and ensuring professional-grade results.</td>
              </tr>
              <tr>
                <td><strong>Versatile Media Handling</strong></td>
                <td>Accommodates a vast range of materials up to 64 inches wide, from paper and vinyl to canvas and specialty substrates.</td>
                <td><strong>The Right Material for Every Job:</strong> We can print on the ideal material for your specific need, whether it's outdoor durability, indoor elegance, or specialty applications.</td>
              </tr>

            </tbody>
          </table>
        </div>

        <!-- Mobile Card View -->
        <div class="features-cards-mobile">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-header" @click="toggleFeature(index)">
              <h3>{{ feature.name }}</h3>
              <span class="toggle-icon" :class="{ 'expanded': expandedFeatures[index] }"></span>
            </div>
            <div class="feature-content" :class="{ 'expanded': expandedFeatures[index] }">
              <div class="feature-tech">
                <h4>Technical Capability:</h4>
                <p>{{ feature.technical }}</p>
              </div>
              <div class="feature-benefit">
                <h4>Your Benefit:</h4>
                <p v-html="feature.benefit"></p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <div class="container">
        <div class="section-heading">
          <h2>Our Printing Products</h2>
          <p>Whether you need to command attention at an event, brand your fleet, or transform a space, our digital printing solutions are crafted with the same precision you've come to expect from us. Explore our capabilities and discover how we can help you achieve your goals.</p>
        </div>

        <div class="products-grid">
          <!-- Banners Category -->
          <div class="product-category">
            <div class="category-header">
              <h3>Banners</h3>
            </div>
            <div class="product-list">
              <div class="product-item">
                <h4>Vinyl Banners Single Sided</h4>
                <p>Weather-resistant outdoor banners perfect for events and storefronts</p>
                <NuxtLink to="/products/vinyl-banners" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Double Sided Banner</h4>
                <p>Maximum visibility with printing on both sides</p>
                <NuxtLink to="/products/double-sided-banner" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Pop Up Banners</h4>
                <p>Portable retractable banners for trade shows and presentations</p>
                <NuxtLink to="/products/pop-up-banners" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Canvas</h4>
                <p>High-quality canvas prints for artistic displays and presentations</p>
                <NuxtLink to="/products/canvas" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Backdrops</h4>
                <p>Professional photography and event backdrops in any size</p>
                <NuxtLink to="/products/backdrops" class="product-link">Learn More</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Decals & Adhesive Category -->
          <div class="product-category">
            <div class="category-header">
              <h3>Decals & Adhesive Graphics</h3>
            </div>
            <div class="product-list">
              <div class="product-item">
                <h4>Custom Car Decals</h4>
                <p>Precision-cut vinyl decals for automotive applications</p>
                <NuxtLink to="/products/custom-car-decals" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>3M Controltac Vinyl Decals</h4>
                <p>Premium repositionable vinyl for professional installations</p>
                <NuxtLink to="/products/3m-controltac-vinyl-decals" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Custom Car Wrap</h4>
                <p>Full and partial vehicle wraps with photorealistic quality</p>
                <NuxtLink to="/products/custom-car-wrap" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Perforated Vinyl</h4>
                <p>See-through window graphics for vehicles and storefronts</p>
                <NuxtLink to="/products/perforated-vinyl" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Window Cling</h4>
                <p>Static-cling graphics that apply without adhesive</p>
                <NuxtLink to="/products/window-cling" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Wall Stickers</h4>
                <p>Removable interior graphics for offices and retail spaces</p>
                <NuxtLink to="/products/wall-stickers" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Fabric / Wallpaper</h4>
                <p>Textile printing for interior design and soft signage</p>
                <NuxtLink to="/products/fabric-wallpaper" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Stickers</h4>
                <p>Custom stickers in any shape, size, or finish</p>
                <NuxtLink to="/products/stickers" class="product-link">Learn More</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Signs Category -->
          <div class="product-category">
            <div class="category-header">
              <h3>Signs & Displays</h3>
            </div>
            <div class="product-list">
              <div class="product-item">
                <h4>Wholesale Magnetic Signs</h4>
                <p>Removable magnetic signs for vehicle advertising</p>
                <NuxtLink to="/products/wholesale-magnetic-signs" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Yard Signs</h4>
                <p>Corrugated plastic signs for real estate and campaigns</p>
                <NuxtLink to="/products/yard-signs" class="product-link">Learn More</NuxtLink>
              </div>
              <div class="product-item">
                <h4>Construction Signs</h4>
                <p>Durable safety and informational signage for job sites</p>
                <NuxtLink to="/products/construction-signs" class="product-link">Learn More</NuxtLink>
              </div>
        </div>
      </div>
    </div>

        <div class="products-cta">
          <NuxtLink to="/contact" class="btn btn-primary">Get Quote for Your Products</NuxtLink>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-heading">
          <h2>The Ultimate Digital Printing FAQ</h2>
          <p>We understand that ordering custom printed materials can bring up a lot of questions. Here are the answers to our most frequently asked questions, organized by category to help you find exactly what you need.</p>
        </div>

        <div class="faq-container">
          <!-- FAQ Categories -->
          <div class="faq-categories">
            <button 
              v-for="(category, index) in faqCategories" 
              :key="index"
              class="category-btn"
              :class="{ 'active': activeCategory === index }"
              @click="setActiveCategory(index)"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- FAQ Items -->
          <div class="faq-items">
            <div 
              v-for="(item, index) in faqCategories[activeCategory]?.items || []" 
              :key="index"
              class="faq-item"
            >
              <div class="faq-question" @click="toggleFAQ(index)">
                <h3>{{ item.question }}</h3>
                <span class="faq-toggle" :class="{ 'expanded': expandedFAQs[index] }"></span>
              </div>
              <div class="faq-answer" :class="{ 'expanded': expandedFAQs[index] }">
                <p v-html="item.answer"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Bring Your Vision to Life?</h2>
          <p>From concept to completion, our digital printing experts are here to help you create stunning graphics that make a lasting impression. Contact us today for your free custom quote.</p>
          <div class="cta-buttons">
            <NuxtLink to="/contact" class="btn btn-primary">Get Your Free Quote Today</NuxtLink>
            <a href="tel:+15026321758" class="btn btn-secondary">Call (502) 632-1758</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// SEO Configuration
useHead({
  title: 'Professional Digital Printing Services | Roland Technology | Xclusive Auto',
  meta: [
    {
      name: 'description',
      content: 'Precision digital printing with Roland TrueVIS technology. Custom banners, decals, signs & graphics. Get your free quote today from Louisville\'s printing experts.'
    },
    {
      property: 'og:title',
      content: 'Professional Digital Printing Services | Roland Technology | Xclusive Auto'
    },
    {
      property: 'og:description',
      content: 'Louisville\'s premier digital printing service with Roland TrueVIS technology. Custom banners, vehicle wraps, signs, and graphics.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: '/images/Digital-printing.jpg'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://xclusiveautodetailing.com/services/digital-printing-services'
    }
  ]
});

definePageMeta({
  layout: 'default'
})

// Features data for mobile cards
const features = ref([
  {
    name: 'FlexFire™ Printheads',
    technical: 'Four high-precision printheads fire ink droplets with optimized waveform control and placement accuracy.',
    benefit: '<strong>Incredible Detail & Clarity:</strong> Your designs, logos, and photographs are rendered with razor-sharp lines and lifelike detail that commands attention and reflects professionalism.'
  },
  {
    name: 'TrueVIS TR2 Inks',
    technical: 'An expanded color gamut, including configurations with Light Cyan and Light Magenta, certified by 3M™ and Avery Dennison™.',
    benefit: '<strong>Vibrant, Accurate Color:</strong> We can achieve brighter, richer colors and hit specific brand tones with remarkable consistency, ensuring your graphics perfectly represent your vision.'
  },
  {
    name: 'High-Resolution Printing',
    technical: 'Capable of printing at resolutions up to 1200×1200 dpi.',
    benefit: '<strong>Photorealistic Quality:</strong> Images and complex gradients are smooth and stunningly realistic, making your graphics indistinguishable from professional photography.'
  },
  {
    name: 'Integrated Print & Cut',
    technical: 'The machine seamlessly transitions from printing to precisely contour cutting with advanced registration technology.',
    benefit: '<strong>Perfectly Shaped Graphics:</strong> Your custom decals, stickers, and logos are cut with flawless accuracy, eliminating waste and ensuring professional-grade results.'
  },
  {
    name: 'Versatile Media Handling',
    technical: 'Accommodates a vast range of materials up to 64 inches wide, from paper and vinyl to canvas and specialty substrates.',
    benefit: '<strong>The Right Material for Every Job:</strong> We can print on the ideal material for your specific need, whether it\'s outdoor durability, indoor elegance, or specialty applications.'
  }
])

// Expanded features state
const expandedFeatures = reactive({})

// Toggle feature expansion
const toggleFeature = (index) => {
  expandedFeatures[index] = !expandedFeatures[index]
}

// Products menu tabs state
const activeTab = ref(0)

// Set active tab
const setActiveTab = (index) => {
  activeTab.value = index
}

// FAQ data
const faqCategories = ref([
  {
    name: 'Artwork & File Preparation',
    items: [
      {
        question: 'What file format should I use for my artwork?',
        answer: 'We accept most common file formats including PDF, EPS, JPG and PNG files. Vector formats (EPS, PDF) are preferred for logos and text-heavy designs as they maintain crisp quality at any size.'
      },
      {
        question: 'What is resolution and why does it matter?',
        answer: 'Resolution refers to the number of pixels or dots per inch (DPI) in your image. For digital printing, we recommend 300 DPI at actual print size for photographs and detailed graphics. Lower resolution images may appear pixelated or blurry when printed.'
      },
      {
        question: 'Why do the colors on my screen look different from the printed result?',
        answer: 'Computer monitors use RGB (Red, Green, Blue) light to display colors, while printing uses CMYK (Cyan, Magenta, Yellow, Black) inks. This difference can cause color variations. We provide color-accurate proofs to ensure you approve the final colors before production.'
      },
      {
        question: 'What is a "bleed" and do I need one?',
        answer: 'A bleed is extra artwork that extends beyond the final cut line. It\'s essential for items that print to the edge (like business cards or stickers) to ensure no white borders appear after cutting. We typically require a 0.125" bleed around all edges.'
      },
      {
        question: 'Can you help me if I\'m not a designer?',
        answer: 'Absolutely! Our in house designer Chris can help create artwork from scratch or enhance your existing ideas. We offer design consultation and can work with logos, photos, or concept sketches to create professional-quality artwork for your project.'
      }
    ]
  },
  {
    name: 'Our Products & Process',
    items: [
      {
        question: 'How long will my order take to complete?',
        answer: 'Turnaround times vary by product and quantity. Simple items like business cards typically take 3-5 business days, while large format banners may take 5-7 business days. Rush services are available for urgent projects with additional fees.'
      },
      {
        question: 'Will I see a proof before my order is printed?',
        answer: 'Yes! We provide digital proofs for all custom orders. You\'ll receive a PDF proof showing exactly how your artwork will appear, including colors, layout, and any text. Production begins only after you approve the proof.'
      },
      {
        question: 'How durable are your outdoor banners and signs?',
        answer: 'Our outdoor materials are designed for long-term use. Vinyl banners typically last 2-5 years outdoors, while our premium materials can last even longer. We use UV-resistant inks and weather-resistant substrates to ensure your graphics maintain their vibrant appearance.'
      },
      {
        question: 'What is the difference between a vinyl decal and a window cling?',
        answer: 'Vinyl decals use permanent adhesive and are meant for long-term application on surfaces like vehicles, walls, or equipment. Window clings use static-cling technology (no adhesive) and can be easily removed and repositioned, making them perfect for temporary promotions or rental properties.'
      },
      {
        question: 'Can you print an exact Pantone (PMS) color?',
        answer: 'While our Roland TrueVIS system produces an incredibly wide color range, it uses CMYK + additional colors rather than spot color inks. We can match most Pantone colors very closely, and we\'ll provide a color proof for your approval before printing.'
      }
    ]
  }
])

// FAQ state management
const activeCategory = ref(0)
const expandedFAQs = reactive({})

const setActiveCategory = (index) => {
  activeCategory.value = index
  // Reset expanded FAQs when switching categories
  Object.keys(expandedFAQs).forEach(key => {
    expandedFAQs[key] = false
  })
}

const toggleFAQ = (index) => {
  expandedFAQs[index] = !expandedFAQs[index]
}
</script>

<style scoped>
/* === GLOBAL STYLES === */
.digital-printing-page {
  min-height: 100vh;
  background: #e9ecef;
}

/* === HERO SECTION === */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(22, 29, 45, 0.9) 0%, rgba(22, 29, 45, 0.7) 100%);
  z-index: 2;
}

.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  padding: 120px 1rem 2rem;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-cta {
  margin-top: 2rem;
}

/* === BUTTONS === */
.btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #203DFD;
  color: white;
}

.btn-primary:hover {
  background: #4460FE;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #203DFD;
}

/* === PRODUCTS MENU SECTION === */
.products-menu-section {
  padding: 4rem 0;
  background: #e9ecef;
}

.products-menu-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-radius: 50px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.tab-header {
  flex: 1;
  padding: 1.5rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  border: none;
}

.tab-header:hover {
  background: #e9ecef;
}

.tab-header.active {
  background: #203DFD;
  color: white;
}

.tab-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: inherit;
}

.tab-content {
  min-height: 200px;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.menu-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.menu-item h4 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.menu-item p {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  flex-grow: 1;
}

.menu-item-link {
  background: #203DFD;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  border: none;
  cursor: pointer;
}

.menu-item-link:hover {
  background: #1a33d1;
  color: white;
}

/* === INTRODUCTION SECTION === */
.introduction-section {
  padding: 5rem 0;
  background: #e9ecef;
}

.intro-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.intro-text {
  text-align: left;
}

.intro-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.intro-text p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.intro-text p:last-child {
  margin-bottom: 0;
}

.intro-image {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}

.xclusive-logo {
  width: 100%;
  max-width: 280px;
  height: auto;
  object-fit: contain;
}

.roland-logo {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: contain;
}

.intro-icon {
  max-width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
}

/* === CONTAINER & SECTIONS === */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-heading {
  text-align: center;
  margin-bottom: 4rem;
}

.section-heading h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.section-heading p {
  font-size: 1.25rem;
  color: #555;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.tech-intro {
  margin-top: 2rem;
  font-weight: 500;
}

/* === TECHNOLOGY SECTION === */
.technology-section {
  padding: 5rem 0;
  background: #e9ecef;
}

.tech-intro-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.tech-intro-text {
  text-align: left;
}

.tech-intro-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.tech-intro-text p {
  font-size: 1.25rem;
  color: #555;
  line-height: 1.6;
}

.tech-intro-image {
  text-align: center;
}

.tech-icon {
  max-width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
}

/* Desktop Table */
.features-table-desktop {
  display: none;
  margin-bottom: 3rem;
}

.features-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.features-table th {
  background: #161D2D;
  color: white;
  padding: 1.5rem;
  font-weight: 600;
  text-align: left;
}

.features-table td {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  vertical-align: top;
}

.features-table tr:nth-child(even) {
  background: #f8f9fa;
}

/* Mobile Cards */
.features-cards-mobile {
  display: block;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.feature-header {
  background: #161D2D;
  color: white;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.toggle-icon {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #203DFD;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.toggle-icon.expanded {
  transform: rotate(180deg);
}

.feature-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.feature-content.expanded {
  max-height: 400px;
}

.feature-tech, .feature-benefit {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.feature-benefit {
  border-bottom: none;
  background: #f8f9fa;
}

.feature-content h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #203DFD;
}

.feature-content p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}

.tech-cta {
  text-align: center;
}

/* === PRODUCTS SECTION === */
.products-section {
  padding: 5rem 0;
  background: #e9ecef;
}

.products-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-category {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
}

.category-header {
  background: #161D2D;
  color: white;
  padding: 1.5rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.product-list {
  padding: 1.5rem;
}

.product-item {
  padding: 1rem 0;
  border-bottom: 1px solid #e5e5e5;
}

.product-item:last-child {
  border-bottom: none;
}

.product-item h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.product-item p {
  margin: 0 0 0.5rem 0;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
}

.product-link {
  color: #203DFD;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}

.product-link:hover {
  text-decoration: underline;
}

.products-cta {
  text-align: center;
}

/* === FAQ SECTION === */
.faq-section {
  padding: 5rem 0;
  background: #e9ecef;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

.faq-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
  justify-content: center;
}

.category-btn {
  background: #f5f5f5;
  border: 2px solid #e5e5e5;
  color: #555;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.category-btn.active {
  background: #203DFD;
  color: white;
  border-color: #203DFD;
}

.category-btn:hover {
  border-color: #203DFD;
  color: #203DFD;
}

.category-btn.active:hover {
  color: white;
}

.faq-item {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.faq-question {
  background: #f5f5f5;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question:hover {
  background: #e9ecef;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  flex: 1;
  padding-right: 1rem;
}

.faq-toggle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid #203DFD;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.faq-toggle.expanded {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.expanded {
  max-height: 300px;
}

.faq-answer p {
  padding: 1.5rem;
  margin: 0;
  line-height: 1.6;
  color: #555;
  background: white;
}

/* === FINAL CTA SECTION === */
.final-cta-section {
  padding: 5rem 0;
  background: #161D2D;
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

/* === RESPONSIVE DESIGN === */

/* Tablets and larger screens */
@media (min-width: 768px) {
  .features-table-desktop {
    display: block;
  }
  
  .features-cards-mobile {
    display: none;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
  
  .faq-categories {
    gap: 1rem;
  }
  
  .category-btn {
    padding: 1rem 2rem;
  }
}

/* Desktop screens */
@media (min-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }
  
  .hero-text p {
    font-size: 1.4rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .products-menu-tabs {
    flex-direction: column;
    border-radius: 8px;
  }
  
  .tab-header {
    padding: 1rem;
  }
  
  .tab-header h3 {
    font-size: 1rem;
  }
  
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .menu-item {
    padding: 1rem;
    font-size: 0.95rem;
  }
  
  .intro-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .intro-text p {
    font-size: 1.1rem;
  }
  
  .intro-icon {
    max-height: 400px;
  }
  
  .tech-intro-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .tech-intro-text {
    text-align: center;
  }
  
  .tech-intro-text h2 {
    font-size: 2rem;
  }
  
  .tech-intro-text p {
    font-size: 1.1rem;
  }
  
  .tech-icon {
    max-height: 400px;
  }

  .section-heading h2 {
    font-size: 2rem;
  }
  
  .section-heading p {
    font-size: 1.1rem;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .faq-categories {
    flex-direction: column;
  }

  .category-btn {
    width: 100%;
    text-align: center;
  }
}

/* Small mobile screens */
@media (max-width: 480px) {
  .hero-content {
    padding: 100px 1rem 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .intro-text p {
    font-size: 1rem;
  }
  
  .intro-icon {
    max-height: 300px;
  }
  
  .tech-intro-text h2 {
    font-size: 1.75rem;
  }
  
  .tech-intro-text p {
    font-size: 1rem;
  }
  
  .tech-icon {
    max-height: 300px;
  }
  
  .introduction-section {
    padding: 3rem 0;
  }

  .section-heading h2 {
    font-size: 1.75rem;
  }
  
  .technology-section,
  .products-section,
  .faq-section,
  .final-cta-section {
    padding: 3rem 0;
  }
}
</style> 