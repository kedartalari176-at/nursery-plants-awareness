/**
 * ===================================================================
 * GROW GREEN, LIVE GREEN - OFFICIAL PROJECT JAVASCRIPT
 * College Environmental Awareness Project
 * Author: College Project Presentation
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initStickyNavbar();
  initMobileMenu();
  initStatCounters();
  initPlantFilters();
  initPlantModal();
  initEcoCalculator();
  initPlantQuiz();
  initGreenPledge();
  initFaqAccordion();
  initContactForm();
  initBackToTop();
  initScrollSpy();
});

/* ===================================================================
   1. STICKY NAVBAR & SCROLL SHADOW
   =================================================================== */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ===================================================================
   2. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ===================================================================
   3. ANIMATED STATISTICS COUNTER
   =================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '+';
          const duration = 2000; // 2 seconds
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const stepIncrement = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += stepIncrement;
            if (current >= target) {
              counter.textContent = `${target}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${Math.floor(current)}${suffix}`;
            }
          }, stepTime);
        });
        obs.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ===================================================================
   4. PLANT CATEGORIES FILTER TABS
   =================================================================== */
function initPlantFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const plantCards = document.querySelectorAll('.plant-card');

  if (!filterBtns.length || !plantCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      plantCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ===================================================================
   5. PLANT QUICK-VIEW MODAL
   =================================================================== */
// Plant detailed data dictionary
const plantDatabase = {
  'snake-plant': {
    title: 'Snake Plant (Sansevieria)',
    botanical: 'Dracaena trifasciata',
    category: 'Indoor / Air-Purifying',
    img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned as one of the most indestructible indoor plants, the Snake Plant releases oxygen at night and efficiently filters household airborne toxins such as formaldehyde and benzene.',
    watering: 'Every 2-3 weeks (allow soil to completely dry out).',
    light: 'Tolerates low light up to bright indirect sunlight.',
    soil: 'Well-draining cactus or succulent potting mix.',
    benefits: 'Converts CO2 to oxygen overnight, perfect for bedrooms.',
    careTip: 'Overwatering is its only enemy; when in doubt, do not water!'
  },
  'monstera': {
    title: 'Monstera Deliciosa (Swiss Cheese)',
    botanical: 'Monstera deliciosa',
    category: 'Indoor / Ornamental',
    img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    description: 'An iconic tropical houseplant with dramatic perforated leaves. It transforms any living room into an indoor jungle while purifying indoor air and maintaining humidity.',
    watering: 'Once a week; water when the top 2 inches of soil feel dry.',
    light: 'Bright, indirect sunlight. Avoid direct scorching sun.',
    soil: 'Peat-based potting mix with perlite and orchid bark.',
    benefits: 'High transpiration rate, adds natural humidity to rooms.',
    careTip: 'Gently wipe the large glossy leaves with a damp cloth to remove dust.'
  },
  'bougainvillea': {
    title: 'Bougainvillea',
    botanical: 'Bougainvillea spectabilis',
    category: 'Outdoor / Flowering',
    img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    description: 'A vigorous outdoor flowering climber known for breathtaking magenta, pink, or orange bracts. Exceptionally drought-tolerant once established and thrives in intense heat.',
    watering: 'Deeply once every 5-7 days; withstands dry spells with ease.',
    light: 'Full direct sunlight (at least 6 hours daily).',
    soil: 'Well-draining loamy soil with neutral to slightly acidic pH.',
    benefits: 'Attracts butterflies and bees, creates stunning living privacy fences.',
    careTip: 'Prune after each blooming cycle to stimulate denser branching and flower blooms.'
  },
  'rose': {
    title: 'Flowering Rose Plant',
    botanical: 'Rosa rubiginosa',
    category: 'Flowering / Ornamental',
    img: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    description: 'The queen of flowering plants, cherished for its heavenly fragrance and vibrant hues. Cultivated in nurseries with sturdy rootstocks to ensure prolonged flowering in home gardens.',
    watering: 'Water early in the morning, soaking root base without wetting foliage.',
    light: 'Direct sunlight for 5-6 hours daily.',
    soil: 'Rich loamy soil enriched with organic vermicompost.',
    benefits: 'Enhances pollinator biodiversity and uplifts mood with aromatherapy.',
    careTip: 'Deadhead spent flowers regularly to encourage vigorous continuous blooming.'
  },
  'tulsi': {
    title: 'Holy Basil (Tulsi)',
    botanical: 'Ocimum sanctum',
    category: 'Medicinal / Outdoor',
    img: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
    description: 'A revered medicinal plant packed with eugenol and antioxidants. Famous for boosting human immunity, calming respiratory issues, and releasing ozone and oxygen over long periods.',
    watering: 'Daily in moderate amounts; maintain slightly moist but not soggy soil.',
    light: 'Bright direct morning sun (4-5 hours).',
    soil: 'Sandy loam rich in organic compost with excellent drainage.',
    benefits: 'Antibacterial, antiviral herbal remedy; wards off mosquitoes naturally.',
    careTip: 'Pinch off the top flower spikes (manjari) to keep the plant bushy and healthy.'
  },
  'lemon': {
    title: 'Citrus Lemon Plant',
    botanical: 'Citrus limon',
    category: 'Fruit / Outdoor',
    img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
    description: 'A prolific fruit-bearing shrub perfectly suited for terrace containers and sunny backyards. Produces delightfully fragrant white blossoms followed by vitamin C-rich juicy lemons.',
    watering: 'Deep watering twice a week; reduce slightly in rainy season.',
    light: '6 to 8 hours of unfiltered bright sunlight.',
    soil: 'Well-draining, slightly acidic soil mixed with cow dung compost.',
    benefits: 'Supplies fresh organic vitamin C and refreshes garden air with citrus oils.',
    careTip: 'Feed with micronutrient and potassium-rich fertilizer twice a year.'
  },
  'tomato': {
    title: 'Cherry Tomato Plant',
    botanical: 'Solanum lycopersicum',
    category: 'Vegetable / Food',
    img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2252a?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate beginner vegetable for urban kitchen gardens. High-yielding nursery seedlings fruit within 60 to 75 days, yielding clusters of sweet, antioxidant-packed red fruit.',
    watering: 'Consistent moderate watering; keep moisture even to avoid fruit splitting.',
    light: 'Full sunlight (6-8 hours).',
    soil: 'Rich fertile compost mix with calcium to prevent blossom end rot.',
    benefits: 'Produces farm-fresh organic food right on your sunny balcony or terrace.',
    careTip: 'Stake or cage the growing stems to support the weight of heavy fruit clusters.'
  },
  'peace-lily': {
    title: 'Peace Lily (Spathiphyllum)',
    botanical: 'Spathiphyllum wallisii',
    category: 'Air-Purifying / Indoor',
    img: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    description: 'A celebrated NASA top-rated air-purifier known for graceful white spathes and deep green foliage. It visibly droops when thirsty, making it virtually impossible to ignore.',
    watering: 'Water when topsoil dries or leaves begin to slightly sag.',
    light: 'Low to medium indirect light; burns under harsh direct sun.',
    soil: 'Rich, moist potting mix with coco peat and perlite.',
    benefits: 'Neutralizes carbon monoxide, benzene, and airborne mold spores.',
    careTip: 'Keep away from drafty air conditioners and direct midday heat rays.'
  }
};

function initPlantModal() {
  const modalOverlay = document.getElementById('plantModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const viewBtns = document.querySelectorAll('.view-plant-btn');

  if (!modalOverlay || !closeBtn) return;

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalBotanical = document.getElementById('modalBotanical');
  const modalDesc = document.getElementById('modalDesc');
  const modalWater = document.getElementById('modalWater');
  const modalLight = document.getElementById('modalLight');
  const modalSoil = document.getElementById('modalSoil');
  const modalBenefits = document.getElementById('modalBenefits');
  const modalTip = document.getElementById('modalTip');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plantKey = btn.getAttribute('data-plant');
      const plant = plantDatabase[plantKey];

      if (plant) {
        modalImg.src = plant.img;
        modalImg.alt = plant.title;
        modalTitle.textContent = plant.title;
        modalBotanical.textContent = plant.botanical;
        modalDesc.textContent = plant.description;
        modalWater.textContent = plant.watering;
        modalLight.textContent = plant.light;
        modalSoil.textContent = plant.soil;
        modalBenefits.textContent = plant.benefits;
        modalTip.textContent = plant.careTip;

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ===================================================================
   6. INTERACTIVE ECO-IMPACT CALCULATOR
   =================================================================== */
function initEcoCalculator() {
  const plantSlider = document.getElementById('plantCountSlider');
  const countDisplay = document.getElementById('plantCountDisplay');
  const o2Metric = document.getElementById('o2Metric');
  const co2Metric = document.getElementById('co2Metric');
  const airMetric = document.getElementById('airMetric');

  if (!plantSlider || !countDisplay) return;

  const updateCalculations = () => {
    const count = parseInt(plantSlider.value, 10);
    countDisplay.textContent = count;

    // Environmental calculation estimates:
    // ~120 Liters of Oxygen per mature plant foliage/year
    // ~21.8 kg of CO2 absorbed per plant per year
    // ~180 clean air hours generated
    const o2Val = Math.round(count * 120);
    const co2Val = Math.round(count * 21.8);
    const airVal = Math.round(count * 180);

    o2Metric.textContent = `${o2Val.toLocaleString()} L`;
    co2Metric.textContent = `${co2Val.toLocaleString()} kg`;
    airMetric.textContent = `${airVal.toLocaleString()} hrs`;
  };

  plantSlider.addEventListener('input', updateCalculations);
  updateCalculations(); // Run initial calculation on load
}

/* ===================================================================
   7. INTERACTIVE PLANT MATCHER QUIZ
   =================================================================== */
function initPlantQuiz() {
  const quizBtn = document.getElementById('findPlantBtn');
  const resultArea = document.getElementById('quizResultArea');
  const quizSpace = document.getElementById('quizSpace');
  const quizSun = document.getElementById('quizSun');
  const quizTime = document.getElementById('quizTime');

  if (!quizBtn || !resultArea) return;

  const quizRecommendations = [
    {
      condition: (space, sun, time) => space === 'indoor' && sun === 'low',
      name: 'Snake Plant (Dracaena trifasciata)',
      tag: 'Best for Low-Light Indoors',
      desc: 'Remarkably hardy, thrives with minimal care, and releases oxygen throughout the night.',
      img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80'
    },
    {
      condition: (space, sun, time) => space === 'indoor' && sun !== 'low',
      name: 'Monstera Deliciosa',
      tag: 'Best for Bright Living Rooms',
      desc: 'Dramatic tropical foliage that brings vibrant energy and natural humidity indoors.',
      img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=500&q=80'
    },
    {
      condition: (space, sun, time) => space === 'balcony' && sun === 'high',
      name: 'Bougainvillea & Lemon Tree',
      tag: 'Best for Sunny Balconies',
      desc: 'Loves direct sun, flowers profusely or bears fresh citrus, and handles heat gracefully.',
      img: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=500&q=80'
    },
    {
      condition: (space, sun, time) => space === 'balcony' && sun !== 'high',
      name: 'Peace Lily & Spider Plant',
      tag: 'Best for Shaded Balconies',
      desc: 'Lush greenery, clean air purification, and stunning peaceful blossoms.',
      img: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=500&q=80'
    },
    {
      condition: (space, sun, time) => space === 'garden',
      name: 'Holy Basil (Tulsi) & Cherry Tomatoes',
      tag: 'Best for Backyard & Terrace Gardens',
      desc: 'Abundant herbal healing, high nutritional value, and great pollinator attraction.',
      img: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=500&q=80'
    }
  ];

  quizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const space = quizSpace.value;
    const sun = quizSun.value;
    const time = quizTime.value;

    let match = quizRecommendations.find(item => item.condition(space, sun, time));
    if (!match) {
      match = quizRecommendations[0];
    }

    resultArea.innerHTML = `
      <img src="${match.img}" alt="${match.name}" class="quiz-result-img">
      <div class="quiz-result-info">
        <span class="quiz-result-tag">${match.tag}</span>
        <h4>${match.name}</h4>
        <p>${match.desc}</p>
        <a href="#plants" class="btn btn-primary btn-sm">Explore In Plants Section <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    `;

    resultArea.classList.add('active');
  });
}

/* ===================================================================
   8. COMMUNITY GREEN PLEDGE COUNTER
   =================================================================== */
function initGreenPledge() {
  const pledgeBtn = document.getElementById('takePledgeBtn');
  const pledgeCountEl = document.getElementById('pledgeCount');

  if (!pledgeCountEl) return;

  // Retrieve existing count or set default
  let currentPledges = parseInt(localStorage.getItem('growgreen_pledges') || '1428', 10);
  let hasPledged = localStorage.getItem('growgreen_user_pledged') === 'true';

  pledgeCountEl.textContent = currentPledges.toLocaleString();

  if (pledgeBtn) {
    if (hasPledged) {
      pledgeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> You Took the Green Pledge!';
      pledgeBtn.classList.add('btn-outline');
    }

    pledgeBtn.addEventListener('click', () => {
      if (!hasPledged) {
        currentPledges += 1;
        localStorage.setItem('growgreen_pledges', currentPledges);
        localStorage.setItem('growgreen_user_pledged', 'true');
        pledgeCountEl.textContent = currentPledges.toLocaleString();
        hasPledged = true;

        pledgeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> You Took the Green Pledge!';
        showToast('🌱 Awesome! Thank you for pledging to protect nature and grow green!');
      } else {
        showToast('💚 You have already pledged! Share the initiative with your classmates & friends.');
      }
    });
  }
}

/* ===================================================================
   9. FAQ ACCORDION
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   10. CONTACT & NEWSLETTER FORMS
   =================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();

      if (!name || !email) {
        showToast('⚠️ Please enter your name and email address.');
        return;
      }

      showToast(`🌿 Thank you, ${name}! Your green gardening query has been received.`);
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]')?.value.trim();
      if (!email) {
        showToast('⚠️ Please enter a valid email address.');
        return;
      }

      showToast('💌 Subscribed! You will receive eco-awareness and seasonal plant care tips.');
      newsletterForm.reset();
    });
  }
}

/* ===================================================================
   11. BACK TO TOP BUTTON
   =================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTopBtn');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   12. ACTIVE SCROLLSPY
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   13. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-leaf"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
