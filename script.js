// script.js — typewriter effect + active tab highlighting

const roles = ["Frontend Developer", "React Learner", "UI Builder"];
const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedEl) return;

  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 90);
}

if (typedEl) {
  if (reduceMotion) {
    typedEl.textContent = roles[0];
  } else {
    typeLoop();
  }
}

// ---- scroll-spy for the tab nav ----
const sections = document.querySelectorAll("section[id]");
const tabs = document.querySelectorAll(".tab");

function setActiveTab() {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", setActiveTab, { passive: true });
setActiveTab();
