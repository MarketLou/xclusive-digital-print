<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section logo-section">
        <img src="/images/Xclusive-Logo-White.webp" alt="Xclusive Auto Detailing Logo" class="footer-logo">
      </div>
      
      <div class="contact-and-hours">
        <div class="footer-section contact-info-section">
          <h3>Contact</h3>
          <p>
            <a href="tel:5026321758" class="contact-link">(502) 632-1758</a>
          </p>
          <p>
            <a href="https://www.google.com/maps/place/Xclusive+Auto+Detailing+%26+Window+Tinting/@38.2587259,-85.7185366,17z" 
               target="_blank" 
               rel="noopener noreferrer"
               class="contact-link">
              1733 Mellwood Ave,<br>
              Louisville, KY 40206
            </a>
          </p>
        </div>

        <div class="footer-section hours-section">
          <h3>Hours</h3>
          <div class="hours-list">
            <div class="hours-item"><span class="day">Monday:</span> <span class="time">9AM-7PM</span></div>
            <div class="hours-item"><span class="day">Tuesday:</span> <span class="time">9AM-7PM</span></div>
            <div class="hours-item"><span class="day">Wednesday:</span> <span class="time">9AM-7PM</span></div>
            <div class="hours-item"><span class="day">Thursday:</span> <span class="time">9AM-7PM</span></div>
            <div class="hours-item"><span class="day">Friday:</span> <span class="time">9AM-7PM</span></div>
            <div class="hours-item"><span class="day">Saturday-Sunday:</span> <span class="time">Closed</span></div>
          </div>
        </div>

        <div class="footer-section socials-section">
          <h3>Socials</h3>
          <div class="social-icons">
            <a href="https://www.yelp.com/biz/xclusive-auto-detailing-and-window-tinting-louisville" target="_blank" rel="noopener noreferrer" class="social-link">
              <img src="/images/Webp-images-converted/yelp-icon.webp" alt="Yelp" class="social-icon">
            </a>
            <a href="https://www.facebook.com/xclusivedetailandwindowtint/" target="_blank" rel="noopener noreferrer" class="social-link">
              <img src="/images/Webp-images-converted/fb-icon.webp" alt="Facebook" class="social-icon">
            </a>
            <a href="https://www.instagram.com/xclusiveautodetail/" target="_blank" rel="noopener noreferrer" class="social-link">
              <img src="/images/Webp-images-converted/ig-icon.webp" alt="Instagram" class="social-icon">
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-section map-section">
        <div class="map-container">
          <!-- PHASE 1: Static image replaces 203 KiB Google Maps iframe -->
          <div v-if="!mapLoaded" class="static-map-wrapper">
            <img 
              src="/images/static-map-xclusive.webp"
              alt="Xclusive Auto Detailing Location - 1733 Mellwood Ave, Louisville, KY"
              class="static-map"
              @click="loadInteractiveMap"
              loading="lazy"
            >
            <div class="map-overlay" @click="loadInteractiveMap">
              <div class="play-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span class="map-label">Click to view interactive map</span>
            </div>
          </div>
          
          <!-- Interactive Google Maps - loaded on demand -->
          <iframe 
            v-if="mapLoaded"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.4776069746897!2d-85.72112682357897!3d38.25872587725433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8869a049d2610511%3A0x982d80b4a39f2e44!2sXclusive%20Auto%20Detailing%20%26%20Window%20Tinting!5e0!3m2!1sen!2sus!4v1710390000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>Copyright ©2025 Market Lou, LLC. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// PHASE 1: Lazy loading for Google Maps - saves 203 KiB initial load
const mapLoaded = ref(false)

const loadInteractiveMap = () => {
  mapLoaded.value = true
}
</script>

<style scoped>
.footer {
  background-color: #161D2D;
  color: white;
  padding: 2rem 2rem 1rem;
  width: 100%;
  position: relative;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo-section {
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
}

.contact-and-hours {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.contact-info-section {
  flex: 0 1 auto;
}

.hours-section {
  flex: 0 1 auto;
}

.map-section {
  grid-column: 2;
  grid-row: 1 / span 2;
  width: 507px;
  height: 315px;
  margin: 0.5rem;
  align-self: end;
  justify-self: end;
}

.footer-logo {
  max-width: 250px;
  height: auto;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.contact-link {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: white;
}

.hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0;
  margin: 0;
  text-align: left;
}

.hours-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;
}

.hours-item .day {
  min-width: 100px;
  color: white;
  font-weight: 600;
}

.hours-item .time {
  color: white;
}

.social-icons {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.social-icon {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.static-map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.static-map {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.static-map-wrapper:hover .map-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.play-button {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
}

.static-map-wrapper:hover .play-button {
  transform: scale(1.1);
}

.map-label {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  
  .logo-section {
    grid-row: 1;
    grid-column: 1 / -1;
    justify-self: center;
  }
  
  .contact-and-hours {
    grid-row: 2;
    grid-column: 1;
  }
  
  .map-section {
    grid-row: 3;
    grid-column: 1;
    width: 100%;
    max-width: 507px;
    justify-self: center;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1rem 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-and-hours {
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    text-align: center;
  }

  .logo-section {
    justify-content: center;
  }

  .footer-logo {
    max-width: 200px;
  }

  .contact-info-section,
  .hours-section {
    width: 100%;
  }

  .hours-list {
    align-items: center;
  }

  .hours-item {
    width: 100%;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hours-item:last-child {
    border-bottom: none;
  }

  .hours-item .day {
    min-width: unset;
    flex: 1;
    text-align: left;
  }

  .hours-item .time {
    flex: 1;
    text-align: right;
  }

  .map-section {
    height: 250px;
    margin: 0;
    width: 100%;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .contact-link {
    font-size: 1.1rem;
    padding: 0.5rem 0;
    display: inline-block;
  }
}

/* Additional small screen optimizations */
@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 1rem 1rem;
  }

  .footer-content {
    gap: 1.5rem;
  }

  .hours-item {
    font-size: 0.95rem;
  }

  .map-section {
    height: 200px;
  }

  .footer-bottom p {
    font-size: 0.75rem;
  }
}
</style> 