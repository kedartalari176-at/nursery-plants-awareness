# 🌿 Grow Green, Live Green - College Project Presentation

> **"Discover plants, learn how to care for them, and make our environment greener."**

A complete, modern, responsive environmental awareness and plant nursery website built using **HTML5, CSS3, and JavaScript**.

---

## 📖 Project Overview

**“Grow Green, Live Green”** is an eco-awareness initiative designed for college project presentations. Its primary mission is to educate students, homeowners, and urban communities about:
1. **Plant nurseries** and their vital role in cultivating healthy seedlings with high survival rates.
2. **Why plants matter** for planetary respiration, biodiversity, and human health.
3. **Plant care mastery** (watering, sunlight, soil, fertilizers, pruning, container selection, and pest defense).
4. **Environmental benefits** (carbon sequestration, heat mitigation, clean air, and water conservation).
5. **Community action** by encouraging everyone to pledge and grow plants in balconies, backyards, terraces, or gardens.

---

## 🌟 Key Sections & Features

### 1. Homepage & Hero Banner
- High-quality, lush green plant nursery background image with ambient overlay.
- Displaying **“Grow Green, Live Green”** and the core slogan: *“Discover plants, learn how to care for them, and make our environment greener.”*
- Action buttons:
  - **Explore Plants** (smooth scrolls to categorized nursery species).
  - **Learn Plant Care** (smooth scrolls to plant care guide).

### 2. Animated Statistics Cards
Four eye-catching statistic counters that dynamically count up when scrolled into view:
- **100+ Plant Varieties**
- **50+ Plant Care Tips**
- **1000+ Plants Grown**
- **500+ Happy Gardeners**

### 3. About Nursery Plants
- **What is a Plant Nursery?** Detailed explanation of nurseries as controlled cradles for young flora.
- **Why Nurseries are Important:** Genetic preservation, disease-free stock, and reforestation support.
- **How Nursery Plants Help People Start Gardening:** Low barrier to entry, established root systems, and 90%+ survival rate compared to raw seeds.

### 4. Why Plants Matter
Engaging cards highlighting the fundamental roles of plants:
- 🫁 **Producing Oxygen** (vital for all respiration)
- 🍃 **Reducing Air Pollution** (trapping PM2.5 and gaseous emissions)
- 🌡️ **Reducing Global Warming** (critical carbon sequestration)
- ⛰️ **Preventing Soil Erosion** (root systems anchoring topsoil)
- 🐝 **Supporting Biodiversity** (nourishing bees, birds, and pollinators)
- 🧠 **Improving Mental Well-being** (lowering stress hormones and enhancing focus)

### 5. Categorized Plant Varieties
Eight dedicated plant category cards with instant filter buttons:
1. **Indoor Plants** (Snake Plant / Sansevieria)
2. **Outdoor Plants** (Bougainvillea)
3. **Flowering Plants** (Garden Rose)
4. **Medicinal Plants** (Holy Basil / Tulsi)
5. **Fruit Plants** (Citrus Lemon)
6. **Vegetable Plants** (Cherry Tomato)
7. **Ornamental Plants** (Monstera Deliciosa)
8. **Air-Purifying Plants** (Peace Lily)

*Each card features a **"View Care Details"** modal providing botanical names, watering schedules, lighting requirements, recommended soil mixes, and expert care advice.*

### 6. Interactive Plant Matcher Tool
- A 3-question selector (Available Space, Sunlight, Care Commitment) that dynamically matches users with their ideal starter plant.

### 7. Comprehensive Plant Care Guide
Step-by-step guidance covering all 7 essential care practices:
1. **Watering** (Deep watering vs overwatering, 2-inch soil test)
2. **Sunlight** (Direct, indirect, and low-light positioning)
3. **Soil & Aeration** (Porous mixes of loam, compost, and perlite)
4. **Fertilizers** (Balanced organic feeding schedules)
5. **Pruning** (Trimming spent growth and deadheading)
6. **Pots & Containers** (Terracotta vs plastic, drainage holes, repotting intervals)
7. **Pest Protection & Natural Defenses** (Organic neem oil spray and pest inspection)
- Includes a structured **Daily, Weekly, Monthly Gardening Routine** banner.

### 8. Environmental Benefits & Interactive Eco-Calculator
Detailed breakdown of planetary benefits:
- Air quality improvement
- Carbon dioxide absorption
- Urban heat reduction (cooling temperatures by 2°C to 8°C)
- Wildlife and pollinator shelter
- Soil and water conservation
- Greener community development
- **Interactive Eco-Impact Calculator**: Drag the slider to see how many liters of oxygen and kilograms of CO2 are absorbed per year based on the number of plants grown!

### 9. Awareness Section
- Bold statement: **“Every plant you grow is a step toward a healthier planet.”**
- **Start Growing Today** button connected to an interactive **Community Green Pledge Counter** stored in `localStorage`.

### 10. Call to Action (CTA)
- Heading: **“Plant Today, Protect Tomorrow”**
- Text: *“Whether you have a balcony, backyard, terrace, or community garden, every space can become greener.”*
- Buttons: **Choose a Plant** & **Start Gardening**

### 11. FAQ Accordion & Contact Form
- Interactive FAQ answering common nursery questions.
- Contact form with instant client-side validation and toast notifications.
- Academic presentation notes and campus nursery visiting hours.

### 12. Modern Navigation & Footer
- Sticky navigation bar with backdrop blur, active section highlighting, and mobile hamburger drawer.
- Comprehensive footer with social media icons, slogan *“Grow plants. Protect nature. Build a greener future.”*, and student credit.
- Floating **Back to Top** button.

---

## 📁 Project Structure

```
csp1/
├── index.html          # Semantic HTML5 single-page application
├── css/
│   └── style.css       # Clean, modern CSS3 with responsive media queries
├── js/
│   └── main.js         # Vanilla JavaScript (counters, filters, quiz, modal, pledge)
└── README.md           # Project documentation and presentation guide
```

---

## 🚀 How to Run the Project

No build tools, npm packages, or external web servers are required!

1. **Option 1 (Direct Open):**
   - Navigate to the folder: `c:\Users\Kedhareshwar T\OneDrive\Desktop\csp1`
   - Double-click `index.html` to open it in Chrome, Edge, Firefox, or any modern web browser.

2. **Option 2 (Local Server via Python or Node):**
   ```bash
   # Using Python
   python -m http.server 8000
   # Then visit: http://localhost:8000 in your browser
   ```

---

## 🎓 College Presentation Highlights

When demonstrating this project to professors and evaluators, highlight the following:
- **Real-World Relevance:** Directly links to UN Sustainable Development Goals (SDG 13 - Climate Action & SDG 15 - Life on Land).
- **Interactive Elements:**
  1. Animated number counters that trigger when scrolled into view.
  2. Live category filtering without page reloads.
  3. Interactive "Plant Matcher Quiz" recommending plants based on user constraints.
  4. Real-time Eco-Impact Slider calculating oxygen production and carbon absorption.
  5. Green Pledge button with persistent counter using browser `localStorage`.
  6. Modal window displaying detailed botanical facts.
- **Responsive Architecture:** Fully mobile-friendly layout with fluid typography and CSS Grid/Flexbox.
- **Clean Code Standard:** Organized, well-commented HTML, CSS, and JS adhering to industry standards.
