const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-current-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});
