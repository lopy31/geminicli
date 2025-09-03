const hamburgerBtn = document.getElementById("hamburgerBtn");
const navModal = document.getElementById("navModal");
const closeModalBtn = document.getElementById("closeModalBtn");

hamburgerBtn.addEventListener("click", () => {
  navModal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  navModal.style.display = "none";
});

navModal.addEventListener("click", (e) => {
  if (e.target === navModal) {
    navModal.style.display = "none";
  }
});
