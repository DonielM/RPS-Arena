/* jshint esversion: 6 */
//DARK / LIGHT MODE
//This file is loaded in the <head> of every page so the saved theme is applied
//before the page is shown, which stops the page flashing the wrong theme

//Get the saved theme, or use dark if nothing has been saved yet
function getSavedTheme() {
  const savedTheme = localStorage.getItem("rps-theme");

  //Use saved theme if available
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  //Default theme
  return "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  //Save theme
  localStorage.setItem("rps-theme", theme);

  updateThemeButton(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  setTheme(newTheme);
}

//UPDATE THEME BUTTON
function updateThemeButton(theme) {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeToggle.querySelector(".toggle-icon").textContent =
    theme === "dark" ? "☀️" : "🌙";
  themeToggle.querySelector(".toggle-text").textContent =
    theme === "dark" ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  themeToggle.setAttribute("title", `Switch to ${nextTheme} mode`);
}

//LOAD SAVED THEME
function loadTheme() {
  const theme = getSavedTheme();

  document.documentElement.setAttribute("data-theme", theme);

  updateThemeButton(theme);
}

//Apply the saved theme straight away, the <html> element already exists at this point
loadTheme();

//Wait for the rest of the page to load, then set up the theme button
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();

  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
});

//Pages reopened with the browser Back or Forward buttons can be restored from memory,
//so check the saved theme again in case it was changed on the other page
window.addEventListener("pageshow", loadTheme);
