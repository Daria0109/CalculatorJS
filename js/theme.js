// Ttheme modes handling
const calcButtons = document.querySelectorAll(".calc__button");
const spanButtons = document.querySelectorAll(".span");
const calcDisplay = document.querySelector(".calc__display");
const modeButton = document.querySelector(".mode");

modeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeButton.classList.toggle("dark");
  calcDisplay.classList.toggle("dark");
  for (let calcBtn of calcButtons) {
    calcBtn.classList.toggle("dark");
  }
  for (let spanBtn of spanButtons) {
    spanBtn.classList.toggle("dark-span");
  }
});
