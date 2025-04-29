// ========= GLOBAL VARIABLES =========
// Toy Images Array for Random Image Feature
const toyImages = [
    'https://plus.unsplash.com/premium_photo-1722100465381-a6b9ad3cb996?q=80&w=1470',
    'https://images.unsplash.com/photo-1589821359444-669ad97fe847?q=80&w=1470',
    'https://images.unsplash.com/photo-1608756077928-b998d9375d73?q=80&w=1287',
    'https://images.unsplash.com/photo-1632506823413-200b3d091e90?q=80&w=1300',
    'https://images.unsplash.com/photo-1660292785457-ef25cffef35c?q=80&w=1287',
    'https://images.unsplash.com/photo-1689715623973-26d572eee22c?q=80&w=1335',
    'https://images.unsplash.com/photo-1497040059851-bd928f851c43?q=80&w=1287',
    'https://images.unsplash.com/photo-1655087751252-8d29e1bb6b32?q=80&w=1471',
    'https://images.unsplash.com/photo-1605428565807-109dc825ad4c?q=80&w=1470',
    'https://images.unsplash.com/photo-1562608148-be4509d24658?q=80&w=1469',
    'https://plus.unsplash.com/premium_photo-1736873368992-3200f18ed8e1?q=80&w=1374',
    'https://images.unsplash.com/photo-1592082906158-ea8a8c0f3e27?q=80&w=1507'
  ];
  
  // Load cart from localStorage or start empty
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // ========= UTILITY FUNCTIONS =========
  
  // Re‐render the cart contents, plus summary
  function updateCartDisplay() {
    const cartDiv = document.getElementById("cart");
    if (!cartDiv) return;
    cartDiv.innerHTML = ""; // clear
  
    if (cart.length === 0) {
      cartDiv.innerHTML = "<p>No items in cart.</p>";
      return;
    }
  
    // List each item
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        ${item.name} — ₹${item.price}
        <button class="remove-btn">Remove</button>
      `;
      // hook remove
      itemDiv.querySelector(".remove-btn")
             .addEventListener("click", () => removeFromCart(item.name));
      cartDiv.appendChild(itemDiv);
    });
  
    // Summary
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const summary = document.createElement("div");
    summary.className = "cart-summary";
    summary.innerHTML = `
      <hr>
      <p><strong>Items:</strong> ${cart.length}</p>
      <p><strong>Total:</strong> ₹${total}</p>
    `;
    cartDiv.appendChild(summary);
  }
  
  // Save to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // ========= CART ACTIONS =========
  
  function addToCart(name, price) {
    // duplicate check
    if (cart.some(i => i.name === name)) {
      alert(`"${name}" is already in your cart.`);
      return;
    }
    cart.push({ name, price });
    saveCart();
    updateCartDisplay();
    alert(`✔️ "${name}" added at ₹${price}`);
  }
  
  function removeFromCart(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    updateCartDisplay();
  }
  
  // ========= MAIN SETUP =========
  
  document.addEventListener("DOMContentLoaded", () => {
    // — Loader —
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.classList.add("hide");
      setTimeout(() => loader.style.display = "none", 400);
    }
  
    // — Random Hero Image —
    const heroImg = document.getElementById("randomToyImage");
    if (heroImg) {
      const idx = Math.floor(Math.random() * toyImages.length);
      heroImg.src = toyImages[idx];
    }
  
    // — Navbar Highlight —
    document.querySelectorAll("nav a").forEach(a => {
      a.addEventListener("click", () => {
        document.querySelectorAll("nav a").forEach(x => x.classList.remove("active"));
        a.classList.add("active");
      });
    });
  
    // — Theme Toggle —
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        themeBtn.textContent = document.body.classList.contains("dark-theme")
                                  ? "🌙 Dark" 
                                  : "☀️ Light";
      });
    }
  
    // — Scroll‑to‑Top Button —
    const scrollBtn = document.createElement("button");
    scrollBtn.textContent = "⬆️";
    scrollBtn.className = "scrollTopBtn";
    document.body.appendChild(scrollBtn);
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // — Product Filter —
    const filter = document.getElementById("productFilter");
    if (filter) {
      filter.addEventListener("input", () => {
        const q = filter.value.toLowerCase();
        document.querySelectorAll(".product").forEach(card => {
          const name = card.querySelector("h3").textContent.toLowerCase();
          card.style.display = name.includes(q) ? "" : "none";
        });
      });
    }
  
    // — Add‑to‑Cart Buttons —
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        // get name
        const name = btn.getAttribute("data-name");
        // parse actual price from the sibling <p class="price">
        const priceText = btn.closest(".product").querySelector(".price").textContent;
        const priceNum  = parseInt(priceText.replace(/[^\d]/g, ""), 10);
        addToCart(name, priceNum);
      });
    });
  
    // — On Load: render existing cart —
    updateCartDisplay();
  
    // — Contact Form Validation —
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const n = form.name.value.trim(),
              em = form.email.value.trim(),
              msg = form.message.value.trim();
        if (!n || !em || !msg) {
          return alert("Please fill in all fields.");
        }
        if (!/^\S+@\S+\.\S+$/.test(em)) {
          return alert("Please enter a valid email.");
        }
        alert("Thank you! We'll be in touch shortly 😊");
        form.reset();
      });
    }
  });
  
  // reset scroll on reload
  window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
  