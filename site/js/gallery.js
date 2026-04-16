/* AURUM NATURA - Gallery System */

class Gallery {
  constructor(options = {}) {
    this.container = options.container;
    this.type = options.type || 'product';
    this.images = options.images || [];
    this.currentImageIndex = 0;
    this.init();
  }

  init() {
    this.createLightbox();
    this.bindEvents();
    this.initAnimations();

    if (this.type === 'farm') {
      this.initFilters();
      this.initParallax();
    }

    if (this.type === 'testimonials') {
      this.initScrollAnimation();
    }
  }

  createLightbox() {
    const lightboxHTML = `
      <div class="lightbox" id="gallery-lightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" onclick="gallery.closeLightbox()">✕</button>
          <button class="lightbox-nav prev" onclick="gallery.prevImage()">‹</button>
          <button class="lightbox-nav next" onclick="gallery.nextImage()">›</button>
          <img id="lightbox-image" src="" alt="">
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  bindEvents() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'Escape':
          this.closeLightbox();
          break;
      }
    });

    if (this.container) {
      this.container.querySelectorAll('img').forEach((img, index) => {
        img.addEventListener('click', () => {
          this.currentImageIndex = index;
          this.openLightbox(img.src);
        });
      });
    }
  }

  openLightbox(src) {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  nextImage() {
    if (!this.container) return;

    const images = this.container.querySelectorAll('img');
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    this.updateLightboxImage(images[this.currentImageIndex].src);
  }

  prevImage() {
    if (!this.container) return;

    const images = this.container.querySelectorAll('img');
    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
    this.updateLightboxImage(images[this.currentImageIndex].src);
  }

  updateLightboxImage(src) {
    const lightboxImage = document.getElementById('lightbox-image');
    if (!lightboxImage) return;

    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      lightboxImage.src = src;
      lightboxImage.style.opacity = '1';
    }, 200);
  }

  initFilters() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = document.querySelectorAll('.gallery-farm-item');

    if (filters.length === 0 || items.length === 0) return;

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const category = filter.dataset.category;

        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease-out';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  initParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const items = document.querySelectorAll('.gallery-farm-item img');

      items.forEach((img, index) => {
        const speed = 0.1 + (index * 0.02);
        img.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });
  }

  initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    const images = this.container?.querySelectorAll('img') || [];
    images.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.1}s`;
      observer.observe(img);
    });
  }
}

// Helper function to initialize galleries
function initGallery(type, containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (container) {
    new Gallery({
      type,
      container,
      ...options
    });
  }
}
