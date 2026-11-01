// 1. Theme toggle (remembers the visitor's choice)
const root = document.documentElement;
const themeBtn = document.getElementById("theme");
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const start = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

function applyTheme(mode) {
  root.setAttribute("data-theme", mode);
  themeBtn.textContent = mode === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", mode); } catch (e) {}
}
applyTheme(start);
themeBtn.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// 2. Project filter
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll("#project-grid .card");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    const f = chip.dataset.filter;
    cards.forEach(card => card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f));
  });
});