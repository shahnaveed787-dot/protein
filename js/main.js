(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const header = document.querySelector(".site-header");
  const form = document.querySelector(".newsletter-form");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 760px)").matches;

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

  // Avoid forced reflow: toggle a class instead of reading/writing inline styles
  if (header) {
    let ticking = false;
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(syncHeader);
      },
      { passive: true }
    );
    syncHeader();
  }

  // Skip reveal observers on mobile — content is already visible via CSS
  const reveals = document.querySelectorAll(".reveal");
  if (!isMobile && !reduceMotion && "IntersectionObserver" in window) {
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
