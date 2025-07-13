document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuList = document.querySelector(".menu-list");
  if (menuToggle && menuList) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      menuList.classList.toggle("open");
      menuToggle.setAttribute(
        "aria-expanded",
        menuToggle.classList.contains("active")
      );
    });
    // メニュークリックで自動で閉じる（モバイルのみ）
    menuList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          menuToggle.classList.remove("active");
          menuList.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});
