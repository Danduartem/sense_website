# Asset Bundle & Accessibility Guidelines v1.0 — Mentoria Seja Livre

**Client:** Mentoria Seja Livre  
**Date:** 2025-08-20  
**Version:** v1.0  
**Prepared by:** Execute Phase Design Program Lead (DPL)  
**Primary Avatar:** Amanda - The Exhausted Achiever

---

## Asset Bundle Overview

This document provides comprehensive guidelines for preparing, optimizing, and implementing all visual and media assets for the Mentoria Seja Livre landing page, ensuring optimal performance, accessibility, and brand consistency across all devices and platforms.

**Asset Categories:**
- Typography assets (web fonts)
- Brand imagery and photography
- Icons and illustrations  
- UI components and graphics
- Performance optimization specifications
- Accessibility compliance requirements

---

## Typography Asset Bundle

### Web Font Implementation

**Primary Font: Lora (Serif)**
```css
/* Lora Font Family - Download from Google Fonts */
@font-face {
  font-family: 'Lora';
  src: url('/assets/fonts/lora-v20-latin-regular.woff2') format('woff2'),
       url('/assets/fonts/lora-v20-latin-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Lora';
  src: url('/assets/fonts/lora-v20-latin-600.woff2') format('woff2'),
       url('/assets/fonts/lora-v20-latin-600.woff') format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Lora';
  src: url('/assets/fonts/lora-v20-latin-700.woff2') format('woff2'),
       url('/assets/fonts/lora-v20-latin-700.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Lora';
  src: url('/assets/fonts/lora-v20-latin-italic.woff2') format('woff2'),
       url('/assets/fonts/lora-v20-latin-italic.woff') format('woff');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

**Secondary Font: Century Gothic (Sans-serif)**
```css
/* Century Gothic Font Family - Commercial License Required */
@font-face {
  font-family: 'Century';
  src: url('/assets/fonts/century-gothic-regular.woff2') format('woff2'),
       url('/assets/fonts/century-gothic-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Century';
  src: url('/assets/fonts/century-gothic-bold.woff2') format('woff2'),
       url('/assets/fonts/century-gothic-bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Fallback System Fonts */
.font-primary {
  font-family: 'Lora', 'Georgia', 'Times New Roman', serif;
}

.font-secondary {
  font-family: 'Century', 'Arial', 'Helvetica', sans-serif;
}
```

**Font Loading Strategy:**
```html
<!-- Preload critical fonts in HTML head -->
<link rel="preload" href="/assets/fonts/lora-v20-latin-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/century-gothic-regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display optimization -->
<style>
  /* Ensure text remains visible during font swap */
  .font-primary,
  .font-secondary {
    font-display: swap;
  }
</style>
```

### Typography File Specifications

**Required Font Files:**
```
/assets/fonts/
├── lora-v20-latin-regular.woff2 (Primary: body text)
├── lora-v20-latin-600.woff2 (Primary: headings)
├── lora-v20-latin-700.woff2 (Primary: emphasis)
├── lora-v20-latin-italic.woff2 (Primary: quotes)
├── century-gothic-regular.woff2 (Secondary: body text)
├── century-gothic-bold.woff2 (Secondary: labels)
└── font-fallbacks.css (System font fallbacks)
```

**File Size Targets:**
- WOFF2 format preferred (30-50% smaller than WOFF)
- Maximum 50KB per font file
- Subset to Latin characters only (excludes unused glyphs)
- Total font bundle target: <200KB

---

## Brand Imagery Asset Bundle

### Trust Strip Photography

**Client Photo Collection Requirements:**

**Photo Specifications:**
- **Format:** WebP (primary), JPEG (fallback)
- **Dimensions:** 400×400px (1:1 aspect ratio)
- **Quality:** 85% WebP, 90% JPEG
- **File Size Target:** <50KB per image
- **Alt Text Required:** Descriptive, business-focused

**Trust Photo Template:**
```html
<picture class="trust-photo">
  <source srcset="/assets/images/trust-clinica.webp" type="image/webp">
  <img 
    src="/assets/images/trust-clinica.jpg" 
    alt="Empreendedora proprietária de clínica médica em São Paulo"
    width="400" 
    height="400"
    loading="lazy"
    class="w-16 h-16 rounded-full object-cover"
  >
</picture>
```

**Required Trust Photos (Minimum 5):**
1. **Clínica/Consultório:** Professional medical/health environment
2. **Loja de Roupas:** Retail/fashion business owner
3. **Maquiadora/Estética:** Beauty services professional
4. **Arquiteta:** Architecture/design professional
5. **Advogada:** Legal services professional

**Photo Quality Guidelines:**
- Professional lighting and composition
- Subject making eye contact with camera
- Confident, approachable expression
- Business environment visible in background
- No stock photo appearance
- Model releases obtained for all subjects

### Testimonial Photography

**Extended Testimonial Photos:**
```
/assets/images/testimonials/
├── marina-clinica-sao-paulo.webp (Case study 1)
├── carla-loja-rio-janeiro.webp (Case study 2)
├── ana-arquiteta-belo-horizonte.webp (Case study 3)
└── placeholder-testimonial.webp (Temporary placeholder)
```

**Testimonial Photo Specifications:**
- **Format:** WebP (primary), JPEG (fallback)
- **Dimensions:** 600×600px for detailed view, 150×150px thumbnail
- **Quality:** 90% WebP for detailed, 85% for thumbnail
- **Responsive Images:** Multiple sizes for different breakpoints

**Responsive Image Implementation:**
```html
<picture class="testimonial-photo">
  <source 
    media="(min-width: 1280px)"
    srcset="/assets/images/testimonials/marina-clinica-lg.webp"
    type="image/webp"
  >
  <source 
    media="(min-width: 744px)"
    srcset="/assets/images/testimonials/marina-clinica-md.webp"
    type="image/webp"
  >
  <source 
    srcset="/assets/images/testimonials/marina-clinica-sm.webp"
    type="image/webp"
  >
  <img 
    src="/assets/images/testimonials/marina-clinica-md.jpg"
    alt="Marina, proprietária de clínica em São Paulo"
    width="300"
    height="300"
    loading="lazy"
    class="testimonial-image"
  >
</picture>
```

### Hero Section Media

**Hero Image/Video Options:**

**Option 1: Static Hero Image**
```
/assets/images/hero/
├── hero-amanda-desktop.webp (1920×1080px)
├── hero-amanda-tablet.webp (1024×768px)
├── hero-amanda-mobile.webp (768×1024px)
└── hero-amanda-fallback.jpg (Universal fallback)
```

**Option 2: Hero Video**
```
/assets/videos/hero/
├── hero-entrepreneur-story.mp4 (H.264, 1920×1080, <2MB)
├── hero-entrepreneur-story.webm (VP9, 1920×1080, <1.5MB)
└── hero-poster.webp (Video poster image)
```

**Hero Media Implementation:**
```html
<!-- Responsive Hero Image -->
<picture class="hero-media">
  <source 
    media="(min-width: 1280px)"
    srcset="/assets/images/hero/hero-amanda-desktop.webp"
    type="image/webp"
  >
  <source 
    media="(min-width: 744px)"
    srcset="/assets/images/hero/hero-amanda-tablet.webp"
    type="image/webp"
  >
  <source 
    srcset="/assets/images/hero/hero-amanda-mobile.webp"
    type="image/webp"
  >
  <img 
    src="/assets/images/hero/hero-amanda-fallback.jpg"
    alt="Mulher empreendedora trabalhando exaustivamente até tarde da noite"
    width="1920"
    height="1080"
    loading="eager"
    class="hero-background"
  >
</picture>

<!-- Hero Video Alternative -->
<video 
  class="hero-video"
  poster="/assets/videos/hero/hero-poster.webp"
  autoplay 
  muted 
  loop
  playsinline
  aria-label="Vídeo mostrando a jornada de uma empreendedora"
>
  <source src="/assets/videos/hero/hero-entrepreneur-story.webm" type="video/webm">
  <source src="/assets/videos/hero/hero-entrepreneur-story.mp4" type="video/mp4">
  <img src="/assets/videos/hero/hero-poster.webp" alt="Poster do vídeo de introdução">
</video>
```

### Icon Library

**Custom Icon Set:**
```
/assets/icons/
├── checkmark.svg (Pain point list, form validation)
├── arrow-right.svg (CTA buttons, navigation)
├── close.svg (Modal close button)
├── phone.svg (WhatsApp contact)
├── email.svg (Email contact)
├── clock.svg (Time-related content)
├── star.svg (Ratings, testimonials)
├── play.svg (Video play button)
├── menu.svg (Mobile navigation)
└── spinner.svg (Loading states)
```

**SVG Icon Specifications:**
- **Format:** Optimized SVG (SVGO processed)
- **Dimensions:** 24×24px default, scalable vector
- **Colors:** Single color, CSS customizable
- **Accessibility:** Proper titles and descriptions included

**Icon Implementation:**
```html
<!-- Inline SVG for customization -->
<svg class="icon icon-checkmark text-burgundy" width="20" height="20" aria-hidden="true">
  <use href="/assets/icons/sprite.svg#checkmark"></use>
</svg>

<!-- Screen reader friendly icon -->
<svg class="icon icon-phone" width="16" height="16" role="img" aria-labelledby="phone-icon-title">
  <title id="phone-icon-title">Telefone para contato</title>
  <use href="/assets/icons/sprite.svg#phone"></use>
</svg>
```

---

## Image Optimization Guidelines

### Performance Optimization

**Image Format Strategy:**
1. **WebP (Primary):** 25-35% smaller than JPEG, excellent quality
2. **AVIF (Progressive):** 50% smaller than JPEG, emerging support
3. **JPEG (Fallback):** Universal compatibility
4. **SVG (Icons/Graphics):** Vector graphics, infinitely scalable

**Responsive Images Configuration:**
```html
<!-- Art Direction Example -->
<picture>
  <!-- Desktop: Landscape orientation -->
  <source 
    media="(min-width: 1280px)"
    srcset="/assets/images/testimonial-desktop-1x.webp 1x, 
            /assets/images/testimonial-desktop-2x.webp 2x"
    type="image/webp"
  >
  
  <!-- Mobile: Portrait orientation -->
  <source 
    media="(max-width: 743px)"
    srcset="/assets/images/testimonial-mobile-1x.webp 1x,
            /assets/images/testimonial-mobile-2x.webp 2x"
    type="image/webp"
  >
  
  <!-- Fallback -->
  <img 
    src="/assets/images/testimonial-fallback.jpg"
    alt="Detailed description for accessibility"
    width="400"
    height="300"
    loading="lazy"
  >
</picture>
```

### Image Compression Targets

**Quality Standards:**
- **Hero Images:** 90% quality (high visual impact)
- **Testimonial Photos:** 85% quality (important for trust)
- **Trust Strip Photos:** 80% quality (smaller display size)
- **Background Images:** 75% quality (decorative elements)
- **Icons/Graphics:** Lossless (SVG preferred)

**File Size Targets:**
- **Hero Image:** <200KB (WebP), <300KB (JPEG)
- **Testimonial Photos:** <75KB (WebP), <100KB (JPEG)
- **Trust Photos:** <50KB (WebP), <70KB (JPEG)
- **Icons:** <5KB (SVG optimized)
- **Total Image Bundle:** <2MB for initial page load

### Lazy Loading Implementation

**Loading Strategy:**
```html
<!-- Above-fold: Eager loading -->
<img 
  src="/assets/images/hero-amanda.webp"
  alt="Hero description"
  loading="eager"
  fetchpriority="high"
>

<!-- Below-fold: Lazy loading -->
<img 
  src="/assets/images/testimonial-marina.webp"
  alt="Testimonial description"
  loading="lazy"
  decoding="async"
>

<!-- Background images: CSS lazy loading -->
<div class="bg-image" data-bg="/assets/images/section-bg.webp"></div>
```

**JavaScript Lazy Loading:**
```javascript
// Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.dataset.src;
      
      if (src) {
        img.src = src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    }
  });
});

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

---

## Accessibility Asset Requirements

### Alt Text Guidelines

**Alt Text Quality Standards:**

**Descriptive Alt Text Examples:**
```html
<!-- Good: Specific and contextual -->
<img 
  src="marina-clinica.webp" 
  alt="Marina, proprietária de clínica médica, sorrindo em seu consultório em São Paulo"
>

<!-- Bad: Too generic -->
<img 
  src="marina-clinica.webp" 
  alt="woman"
>

<!-- Good: Business context -->
<img 
  src="trust-loja.webp" 
  alt="Empreendedora organizando produtos em sua loja de roupas"
>

<!-- Good: Decorative image -->
<img 
  src="background-pattern.webp" 
  alt=""
  role="presentation"
>
```

**Alt Text Formula:**
1. **Who:** Person's role/profession
2. **What:** What they're doing/expression
3. **Where:** Business environment context
4. **Why:** Relevance to Amanda's journey

**Character Limits:**
- **Optimal:** 80-125 characters
- **Maximum:** 250 characters
- **Screen Reader Friendly:** Avoid "image of" or "picture of"

### High Contrast Support

**Color Contrast Requirements:**
- **AA Standard:** Minimum 4.5:1 contrast ratio
- **AAA Standard:** Minimum 7:1 contrast ratio (preferred)
- **Large Text:** Minimum 3:1 contrast ratio (18pt+)

**Contrast Validation:**
```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  .cta-button-primary {
    background: #000000;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
  }
  
  .text-navy {
    color: #000000;
  }
  
  .text-burgundy {
    color: #8B0000; /* Darker burgundy for better contrast */
  }
}

/* Color scheme preferences */
@media (prefers-color-scheme: dark) {
  :root {
    --color-navy: #E6E8F0; /* Light text on dark */
    --color-background: #191F3A; /* Dark background */
  }
}
```

### Screen Reader Assets

**Screen Reader Only Content:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**Audio Descriptions (Future Enhancement):**
```html
<!-- Video with audio description track -->
<video controls>
  <source src="hero-video.mp4" type="video/mp4">
  <track 
    kind="descriptions" 
    src="hero-video-descriptions-pt.vtt" 
    srclang="pt" 
    label="Descrição em Português"
  >
  <track 
    kind="captions" 
    src="hero-video-captions-pt.vtt" 
    srclang="pt" 
    label="Legendas em Português"
  >
</video>
```

### Motion and Animation Guidelines

**Reduced Motion Support:**
```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Disable parallax and transform animations */
  .parallax,
  .transform-animation {
    transform: none !important;
  }
}

/* Safe animations that respect motion preferences */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
    opacity: 1;
  }
}
```

**Animation Guidelines:**
- **Duration:** Maximum 0.5 seconds for UI animations
- **Easing:** Prefer ease-in-out for natural feel
- **Trigger:** User-initiated animations only (no auto-play)
- **Alternative:** Provide static states for reduced motion users

---

## Asset Delivery Strategy

### Content Delivery Network (CDN)

**Netlify CDN Configuration:**
```toml
# netlify.toml
[[headers]]
  for = "/assets/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Vary = "Accept"

[[headers]]
  for = "/assets/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    Access-Control-Allow-Origin = "*"

# Image format negotiation
[[redirects]]
  from = "/assets/images/*.jpg"
  to = "/assets/images/:splat.webp"
  status = 200
  conditions = {Accept = "image/webp"}
```

### Progressive Enhancement

**Loading Strategy:**
1. **Critical:** Hero image, above-fold content
2. **Important:** Trust photos, primary CTA graphics
3. **Secondary:** Testimonial photos, decorative elements
4. **Deferred:** Off-screen content, non-essential graphics

**Progressive JPEG Implementation:**
```html
<!-- Progressive loading for large images -->
<img 
  src="/assets/images/hero-amanda-progressive.jpg"
  alt="Hero image description"
  class="progressive-image"
  loading="eager"
>

<style>
.progressive-image {
  background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
              linear-gradient(-45deg, #f0f0f0 25%, transparent 25%);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.progressive-image.loaded {
  background: none;
}
</style>
```

---

## Asset Generation Tools

### Automated Optimization Pipeline

**Build Process Integration:**
```json
{
  "scripts": {
    "optimize:images": "imagemin src/assets/images/**/* --out-dir=dist/assets/images --plugin=imagemin-webp --plugin=imagemin-mozjpeg",
    "optimize:fonts": "subfont src/*.html --output dist --inline-css",
    "generate:icons": "svg-sprite-generate --src src/assets/icons --dest dist/assets/icons/sprite.svg",
    "build:assets": "npm run optimize:images && npm run optimize:fonts && npm run generate:icons"
  },
  "devDependencies": {
    "imagemin": "^8.0.1",
    "imagemin-webp": "^7.0.0", 
    "imagemin-mozjpeg": "^10.0.0",
    "subfont": "^6.0.0",
    "svg-sprite-generator": "^0.0.7"
  }
}
```

**Image Optimization Configuration:**
```javascript
// imagemin.config.js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');

const optimizeImages = async () => {
  // WebP conversion
  await imagemin(['src/assets/images/*.{jpg,png}'], {
    destination: 'dist/assets/images',
    plugins: [
      imageminWebp({
        quality: 85,
        method: 6, // Maximum compression
        autoFilter: true
      })
    ]
  });
  
  // JPEG optimization
  await imagemin(['src/assets/images/*.jpg'], {
    destination: 'dist/assets/images',
    plugins: [
      imageminMozjpeg({
        quality: 90,
        progressive: true
      })
    ]
  });
};
```

### Asset Validation Tools

**Quality Assurance Scripts:**
```javascript
// validate-assets.js
const fs = require('fs');
const path = require('path');

class AssetValidator {
  validateImages() {
    const imageDir = 'dist/assets/images';
    const images = fs.readdirSync(imageDir);
    
    images.forEach(filename => {
      const filepath = path.join(imageDir, filename);
      const stats = fs.statSync(filepath);
      
      // Check file size limits
      if (filename.includes('hero') && stats.size > 200000) {
        console.warn(`Hero image ${filename} exceeds 200KB: ${stats.size} bytes`);
      }
      
      if (filename.includes('trust') && stats.size > 50000) {
        console.warn(`Trust photo ${filename} exceeds 50KB: ${stats.size} bytes`);
      }
      
      // Check format preferences
      if (path.extname(filename) === '.jpg' && !fs.existsSync(filepath.replace('.jpg', '.webp'))) {
        console.warn(`Missing WebP version for ${filename}`);
      }
    });
  }
  
  validateAltText() {
    const htmlFiles = ['dist/index.html', 'dist/obrigada/index.html'];
    
    htmlFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const imgTags = content.match(/<img[^>]*>/g) || [];
        
        imgTags.forEach(tag => {
          if (!tag.includes('alt=')) {
            console.error(`Missing alt attribute: ${tag}`);
          } else {
            const altMatch = tag.match(/alt="([^"]*)"/);
            if (altMatch && altMatch[1].length < 5) {
              console.warn(`Alt text too short: ${altMatch[1]}`);
            }
          }
        });
      }
    });
  }
  
  validateAccessibility() {
    // Contrast ratio validation
    const cssFile = 'dist/assets/css/main.css';
    if (fs.existsSync(cssFile)) {
      const css = fs.readFileSync(cssFile, 'utf8');
      
      // Check for hard-coded colors that might fail contrast
      const colorMatches = css.match(/color:\s*#[0-9a-fA-F]{6}/g) || [];
      colorMatches.forEach(color => {
        console.log(`Review contrast ratio for: ${color}`);
      });
    }
  }
}

const validator = new AssetValidator();
validator.validateImages();
validator.validateAltText();
validator.validateAccessibility();
```

---

## Asset Checklist & Quality Gates

### Pre-Launch Asset Validation

**Image Assets Checklist:**
- [ ] Hero image optimized and responsive (WebP + JPEG fallback)
- [ ] Trust strip photos collected and optimized (minimum 5)
- [ ] Testimonial photos available or placeholder implemented
- [ ] All images have descriptive alt text (80-125 characters)
- [ ] Image file sizes meet targets (<200KB hero, <50KB trust photos)
- [ ] Responsive image sources configured for all breakpoints
- [ ] Lazy loading implemented for below-fold images
- [ ] WebP format available with JPEG fallbacks

**Typography Assets Checklist:**
- [ ] Lora font files (regular, semibold, bold, italic) subset and optimized
- [ ] Century Gothic font files licensed and optimized
- [ ] Font preloading configured for critical fonts
- [ ] Fallback fonts specified for all font families
- [ ] font-display: swap implemented for better loading experience
- [ ] Total font bundle under 200KB
- [ ] WOFF2 format prioritized over WOFF

**Icon Assets Checklist:**
- [ ] SVG icon sprite generated and optimized
- [ ] All icons have proper titles and descriptions
- [ ] Icon colors customizable via CSS
- [ ] Icons scale properly at different sizes
- [ ] Loading and interactive state icons included
- [ ] Fallback text provided for critical icons

**Accessibility Assets Checklist:**
- [ ] All interactive elements have proper focus indicators
- [ ] Color contrast ratios verified (minimum 4.5:1)
- [ ] High contrast mode styles implemented
- [ ] Reduced motion preferences respected
- [ ] Screen reader only content properly hidden/revealed
- [ ] Alternative formats available for multimedia content

### Performance Validation

**Core Web Vitals Targets:**
- **Largest Contentful Paint (LCP):** <2.5 seconds
- **First Input Delay (FID):** <100 milliseconds  
- **Cumulative Layout Shift (CLS):** <0.1
- **First Contentful Paint (FCP):** <1.8 seconds

**Asset Performance Targets:**
- **Total page weight:** <3MB initial load
- **Image weight:** <2MB total
- **Font weight:** <200KB total
- **Critical CSS:** <14KB (inlined)
- **Time to Interactive (TTI):** <3.5 seconds on 3G

**Performance Testing Tools:**
```bash
# Lighthouse CI validation
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# WebPageTest automation
curl -X POST "https://www.webpagetest.org/runtest.php" \
  -d "url=https://mentoriasejalivre.com.br" \
  -d "runs=3" \
  -d "location=Brazil:Chrome" \
  -d "fvonly=1"

# Image optimization validation
npm run validate:images
```

### Asset Maintenance Guidelines

**Regular Maintenance Tasks:**
1. **Monthly:** Review image file sizes and optimization opportunities
2. **Quarterly:** Update font subsets based on content changes
3. **Bi-annually:** Audit alt text quality and accessibility compliance
4. **Annually:** Review CDN performance and consider new image formats

**Version Control for Assets:**
```
/assets/
├── images/
│   ├── v1.0/ (Launch version)
│   ├── v1.1/ (Updated testimonials)
│   └── current/ (Symlink to latest)
├── fonts/
│   ├── original/ (Full font files)
│   └── optimized/ (Subset versions)
└── icons/
    ├── source/ (Original SVG files)
    └── sprite/ (Generated sprite sheets)
```

**Asset Update Process:**
1. **Backup:** Create backup of current assets
2. **Optimize:** Process new assets through optimization pipeline
3. **Validate:** Run quality assurance scripts
4. **Test:** Verify in staging environment
5. **Deploy:** Update production assets with cache busting
6. **Monitor:** Check performance impact post-deployment

This comprehensive asset bundle and accessibility guide ensures that all visual and media elements of the Mentoria Seja Livre landing page meet performance, accessibility, and quality standards while maintaining brand consistency and optimal user experience across all devices and platforms.

---

*Prepared by Execute Phase Design Program Lead (DPL) - Final asset optimization and accessibility coordination*