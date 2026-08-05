(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const header = document.querySelector(".site-header");
  const form = document.querySelector(".newsletter-form");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const open = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow =
      window.scrollY > 8 ? "0 8px 28px rgba(6, 42, 44, 0.08)" : "none";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input || !input.value) return;
      const button = form.querySelector("button");
      const original = button.textContent;
      button.textContent = "Subscribed";
      button.disabled = true;
      input.value = "";
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 2200);
    });
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = contactForm.querySelector("button");
      const original = button.textContent;
      button.textContent = "Message Sent";
      button.disabled = true;
      contactForm.reset();
      setTimeout(() => {
        button.textContent = original;
        button.disabled = false;
      }, 2200);
    });
  }
})();
