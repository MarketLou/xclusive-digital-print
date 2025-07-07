<template>
  <nav class="main-navigation">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <NuxtLink to="/">
          <img 
            src="/images/Webp-images-converted/black_logo-removebg-preview.webp" 
            alt="Xclusive Digital Print Solutions"
            class="logo-image"
          />
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-desktop">
        <ul class="nav-menu">
          <li class="nav-item">
            <NuxtLink to="/shop" class="nav-link">Shop</NuxtLink>
          </li>
          
          <!-- Banners Dropdown -->
          <li class="nav-item dropdown" @mouseenter="showDropdown = 'banners'" @mouseleave="showDropdown = null">
            <span class="nav-link dropdown-trigger">
              Banners
              <svg class="dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <ul class="dropdown-menu" :class="{ 'show': showDropdown === 'banners' }">
              <li><NuxtLink to="/products/vinyl-banners" class="dropdown-link">Vinyl Banners Single Sided</NuxtLink></li>
              <li><NuxtLink to="/products/double-sided-banner" class="dropdown-link">Double Sided Banner</NuxtLink></li>
              <li><NuxtLink to="/products/pop-up-banners" class="dropdown-link">Pop Up Banners</NuxtLink></li>
              <li><NuxtLink to="/products/canvas" class="dropdown-link">Canvas</NuxtLink></li>
              <li><NuxtLink to="/products/backdrops" class="dropdown-link">Backdrops</NuxtLink></li>
            </ul>
          </li>

          <!-- Decals & Adhesive Graphics Dropdown -->
          <li class="nav-item dropdown" @mouseenter="showDropdown = 'decals'" @mouseleave="showDropdown = null">
            <span class="nav-link dropdown-trigger">
              Decals & Adhesive Graphics
              <svg class="dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <ul class="dropdown-menu" :class="{ 'show': showDropdown === 'decals' }">
              <li><NuxtLink to="/products/custom-car-decals" class="dropdown-link">Custom Car Decals</NuxtLink></li>
              <li><NuxtLink to="/products/3m-controltac-vinyl-decals" class="dropdown-link">3M Controltac Vinyl Decals</NuxtLink></li>
              <li><NuxtLink to="/products/custom-car-wrap" class="dropdown-link">Custom Car Wrap</NuxtLink></li>
              <li><NuxtLink to="/products/perforated-vinyl" class="dropdown-link">Perforated Vinyl</NuxtLink></li>
              <li><NuxtLink to="/products/window-cling" class="dropdown-link">Window Cling</NuxtLink></li>
              <li><NuxtLink to="/products/wall-stickers" class="dropdown-link">Wall Stickers</NuxtLink></li>
              <li><NuxtLink to="/products/fabric-wallpaper" class="dropdown-link">Fabric / Wallpaper</NuxtLink></li>
              <li><NuxtLink to="/products/stickers" class="dropdown-link">Stickers</NuxtLink></li>
            </ul>
          </li>

          <!-- Signs & Displays Dropdown -->
          <li class="nav-item dropdown" @mouseenter="showDropdown = 'signs'" @mouseleave="showDropdown = null">
            <span class="nav-link dropdown-trigger">
              Signs & Displays
              <svg class="dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <ul class="dropdown-menu" :class="{ 'show': showDropdown === 'signs' }">
              <li><NuxtLink to="/products/wholesale-magnetic-signs" class="dropdown-link">Wholesale Magnetic Signs</NuxtLink></li>
              <li><NuxtLink to="/products/yard-signs" class="dropdown-link">Yard Signs</NuxtLink></li>
              <li><NuxtLink to="/products/construction-signs" class="dropdown-link">Construction Signs</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Mobile Hamburger Button -->
      <button class="hamburger-btn" @click="toggleMobileMenu" :class="{ 'active': mobileMenuOpen }">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
      <ul class="mobile-nav">
        <li class="mobile-nav-item">
          <NuxtLink to="/shop" class="mobile-nav-link" @click="closeMobileMenu">Shop</NuxtLink>
        </li>
        
        <!-- Banners Mobile Section -->
        <li class="mobile-nav-item">
          <button class="mobile-dropdown-btn" @click="toggleMobileDropdown('banners')" :class="{ 'active': mobileDropdown === 'banners' }">
            Banners
            <svg class="mobile-dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul class="mobile-dropdown-menu" :class="{ 'open': mobileDropdown === 'banners' }">
            <li><NuxtLink to="/products/vinyl-banners" class="mobile-dropdown-link" @click="closeMobileMenu">Vinyl Banners Single Sided</NuxtLink></li>
            <li><NuxtLink to="/products/double-sided-banner" class="mobile-dropdown-link" @click="closeMobileMenu">Double Sided Banner</NuxtLink></li>
            <li><NuxtLink to="/products/pop-up-banners" class="mobile-dropdown-link" @click="closeMobileMenu">Pop Up Banners</NuxtLink></li>
            <li><NuxtLink to="/products/canvas" class="mobile-dropdown-link" @click="closeMobileMenu">Canvas</NuxtLink></li>
            <li><NuxtLink to="/products/backdrops" class="mobile-dropdown-link" @click="closeMobileMenu">Backdrops</NuxtLink></li>
          </ul>
        </li>

        <!-- Decals & Adhesive Graphics Mobile Section -->
        <li class="mobile-nav-item">
          <button class="mobile-dropdown-btn" @click="toggleMobileDropdown('decals')" :class="{ 'active': mobileDropdown === 'decals' }">
            Decals & Adhesive Graphics
            <svg class="mobile-dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul class="mobile-dropdown-menu" :class="{ 'open': mobileDropdown === 'decals' }">
            <li><NuxtLink to="/products/custom-car-decals" class="mobile-dropdown-link" @click="closeMobileMenu">Custom Car Decals</NuxtLink></li>
            <li><NuxtLink to="/products/3m-controltac-vinyl-decals" class="mobile-dropdown-link" @click="closeMobileMenu">3M Controltac Vinyl Decals</NuxtLink></li>
            <li><NuxtLink to="/products/custom-car-wrap" class="mobile-dropdown-link" @click="closeMobileMenu">Custom Car Wrap</NuxtLink></li>
            <li><NuxtLink to="/products/perforated-vinyl" class="mobile-dropdown-link" @click="closeMobileMenu">Perforated Vinyl</NuxtLink></li>
            <li><NuxtLink to="/products/window-cling" class="mobile-dropdown-link" @click="closeMobileMenu">Window Cling</NuxtLink></li>
            <li><NuxtLink to="/products/wall-stickers" class="mobile-dropdown-link" @click="closeMobileMenu">Wall Stickers</NuxtLink></li>
            <li><NuxtLink to="/products/fabric-wallpaper" class="mobile-dropdown-link" @click="closeMobileMenu">Fabric / Wallpaper</NuxtLink></li>
            <li><NuxtLink to="/products/stickers" class="mobile-dropdown-link" @click="closeMobileMenu">Stickers</NuxtLink></li>
          </ul>
        </li>

        <!-- Signs & Displays Mobile Section -->
        <li class="mobile-nav-item">
          <button class="mobile-dropdown-btn" @click="toggleMobileDropdown('signs')" :class="{ 'active': mobileDropdown === 'signs' }">
            Signs & Displays
            <svg class="mobile-dropdown-icon" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul class="mobile-dropdown-menu" :class="{ 'open': mobileDropdown === 'signs' }">
            <li><NuxtLink to="/products/wholesale-magnetic-signs" class="mobile-dropdown-link" @click="closeMobileMenu">Wholesale Magnetic Signs</NuxtLink></li>
            <li><NuxtLink to="/products/yard-signs" class="mobile-dropdown-link" @click="closeMobileMenu">Yard Signs</NuxtLink></li>
            <li><NuxtLink to="/products/construction-signs" class="mobile-dropdown-link" @click="closeMobileMenu">Construction Signs</NuxtLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

// Desktop dropdown state
const showDropdown = ref(null)

// Mobile menu state
const mobileMenuOpen = ref(false)
const mobileDropdown = ref(null)

// Mobile menu functions
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (!mobileMenuOpen.value) {
    mobileDropdown.value = null
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  mobileDropdown.value = null
}

const toggleMobileDropdown = (dropdown) => {
  mobileDropdown.value = mobileDropdown.value === dropdown ? null : dropdown
}

// Close mobile menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-navigation')) {
      mobileMenuOpen.value = false
      mobileDropdown.value = null
    }
  })
})
</script>

<style scoped>
/* === MAIN NAVIGATION === */
.main-navigation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* === LOGO === */
.nav-logo {
  flex-shrink: 0;
}

.logo-image {
  height: 60px;
  width: auto;
  filter: brightness(0) invert(1); /* Makes the logo white */
}

/* === DESKTOP NAVIGATION === */
.nav-desktop {
  display: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #203DFD;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-icon {
  transition: transform 0.3s ease;
}

.dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

/* === DESKTOP DROPDOWN === */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  min-width: 250px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 100;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.dropdown-link:hover {
  background: #f8f9fa;
  color: #203DFD;
}

/* === MOBILE HAMBURGER === */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  gap: 4px;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* === MOBILE MENU === */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(22, 29, 45, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  z-index: 999;
}

.mobile-menu.open {
  max-height: 500px;
}

.mobile-nav {
  list-style: none;
  margin: 0;
  padding: 1rem 0;
}

.mobile-nav-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-nav-item:last-child {
  border-bottom: none;
}

.mobile-nav-link {
  display: block;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* === MOBILE DROPDOWN === */
.mobile-dropdown-btn {
  width: 100%;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: white;
  text-align: left;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.mobile-dropdown-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-dropdown-icon {
  transition: transform 0.3s ease;
}

.mobile-dropdown-btn.active .mobile-dropdown-icon {
  transform: rotate(180deg);
}

.mobile-dropdown-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.2);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-dropdown-menu.open {
  max-height: 300px;
}

.mobile-dropdown-link {
  display: block;
  padding: 0.75rem 2rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
}

.mobile-dropdown-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* === RESPONSIVE DESIGN === */
@media (min-width: 768px) {
  .nav-desktop {
    display: block;
  }
  
  .hamburger-btn {
    display: none;
  }
  
  .mobile-menu {
    display: none;
  }
  
  .logo-image {
    height: 70px;
  }
  
  .nav-container {
    padding: 1.5rem 1rem;
  }
}

@media (min-width: 1024px) {
  .nav-menu {
    gap: 2.5rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
  }
  
  .logo-image {
    height: 80px;
  }
}
</style> 