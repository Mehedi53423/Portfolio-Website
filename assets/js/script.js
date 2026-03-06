/* ===================================================
   মো. মেহেদী হাসান — পোর্টফোলিও স্ক্রিপ্ট
   =================================================== */

// ── Footer: current year ──────────────────────────────
document.getElementById("currentYear").textContent = new Date().getFullYear();

// ── Mobile nav toggle ─────────────────────────────────
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("open");
});

document.querySelectorAll(".nav-link, .nav-cta").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

// ── Navbar: scrolled class + active link ─────────────
const navbar   = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  updateActiveNavLink();
}, { passive: true });

function updateActiveNavLink() {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// ── Smooth scroll (fallback for older browsers) ───────
function smoothScroll(targetId) {
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── 3D Card Tilt (mouse-follow perspective) ───────────
const tiltCards = document.querySelectorAll("[data-tilt]");
const TILT_MAX  = 10; // degrees

tiltCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotX    = ((y - centerY) / centerY) * -TILT_MAX;
    const rotY    = ((x - centerX) / centerX) *  TILT_MAX;

    card.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
    // Smooth return via transition override
    card.style.transition = "transform 0.45s ease, border-color 0.3s, box-shadow 0.3s";
    setTimeout(() => {
      card.style.transition = "";
    }, 450);
  });

  card.addEventListener("mouseenter", () => {
    card.style.transition = "transform 0.08s ease, border-color 0.3s, box-shadow 0.3s";
  });
});

// ── Scroll reveal animation (3D entrance) ────────────
const revealEls = document.querySelectorAll(
  ".about-grid, .skills-side, .project-card, .contact-info, .contact-form"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  if (el.classList.contains("project-card")) {
    el.style.transitionDelay = `${i * 0.07}s`;
  }
  revealObserver.observe(el);
});

// ── Contact form handler ──────────────────────────────
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn      = contactForm.querySelector("button[type='submit']");
  const original = btn.innerHTML;

  btn.disabled  = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';

  // Replace setTimeout with real backend/Formspree when ready
  setTimeout(() => {
    btn.disabled  = false;
    btn.innerHTML = original;
    formSuccess.classList.add("show");
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove("show"), 4500);
  }, 1200);
});

// ── Parallax orbs on mouse move ───────────────────────
const orb1 = document.querySelector(".orb-1");
const orb2 = document.querySelector(".orb-2");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  if (orb1) orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
}, { passive: true });
