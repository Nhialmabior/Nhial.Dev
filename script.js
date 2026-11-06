/* ---------- Personal settings ----------
   Fill these in when you are ready. Anything left empty is
   hidden (links) or shows a gentle message (form). */
const CONFIG = {
  email: "",         // e.g. "you@example.com" (used for the Email link and as a form fallback)
  linkedin: "",      // e.g. "https://www.linkedin.com/in/your-name"
  cv: "",            // e.g. "assets/cv.pdf"  (put your PDF in the assets folder)
  formEndpoint: ""   // e.g. "https://formspree.io/f/xxxxxxx" (any service that accepts a form POST)
};

document.documentElement.classList.remove("no-js");

/* Mobile navigation */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("open", !open);
  });
}

/* Project filters */
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      const cats = (card.dataset.category || "").split(" ");
      card.hidden = filter !== "all" && !cats.includes(filter);
    });
  });
});

/* Scroll reveal */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

/* LinkedIn + email links (hidden until configured) */
document.querySelectorAll("[data-linkedin]").forEach((el) => {
  if (CONFIG.linkedin) { el.href = CONFIG.linkedin; el.target = "_blank"; el.rel = "noreferrer"; }
  else (el.closest("li") || el).hidden = true;
});
document.querySelectorAll("[data-email]").forEach((el) => {
  if (CONFIG.email) { el.href = "mailto:" + CONFIG.email; }
  else (el.closest("li") || el).hidden = true;
});

/* CV link (hidden until configured) */
document.querySelectorAll("[data-cv]").forEach((el) => {
  if (CONFIG.cv) { el.href = CONFIG.cv; }
  else (el.closest("li") || el).hidden = true;
});

/* Hide screenshot image if the file is missing, revealing the placeholder */
document.querySelectorAll(".slot img").forEach((img) => {
  const hide = () => img.remove();
  img.addEventListener("error", hide);
  if (img.complete && img.naturalWidth === 0) hide();
});

/* Contact form: works with any form service, or falls back to email */
const form = document.querySelector("#contact-form");
if (form) {
  const note = document.querySelector("#form-note");
  const button = form.querySelector("button[type=submit]");
  note.textContent = CONFIG.formEndpoint
    ? "Your message will be sent directly to me."
    : CONFIG.email
      ? "This opens your email app with your message ready to send."
      : "The form isn’t connected yet. Please use the links on this page.";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) { note.textContent = "Please complete all fields."; return; }
    if (form._gotcha && form._gotcha.value) return; // spam trap

    if (CONFIG.formEndpoint) {
      button.disabled = true;
      note.textContent = "Sending…";
      try {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        note.textContent = "Thank you. Your message has been sent.";
      } catch (err) {
        note.textContent = "Sorry, something went wrong. Please try again later.";
      } finally {
        button.disabled = false;
      }
    } else if (CONFIG.email) {
      const subject = encodeURIComponent("Portfolio contact from " + name);
      const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
      window.location.href = "mailto:" + CONFIG.email + "?subject=" + subject + "&body=" + body;
    } else {
      note.textContent = "The form isn’t connected yet. Please use the links on this page.";
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
