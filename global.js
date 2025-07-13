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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".qa-item").forEach(function (item) {
    const answer = item.querySelector(".qa-answer");
    if (!answer) return;

    // 初期状態をリセット
    answer.style.maxHeight = item.open ? answer.scrollHeight + "px" : "0";

    item.addEventListener("toggle", function () {
      if (item.open) {
        // 一度maxHeightを0にしてからscrollHeightを取得
        answer.style.transition = "none";
        answer.style.maxHeight = "0";
        // 強制再描画
        void answer.offsetWidth;
        answer.style.transition = "";
        const scrollHeight = answer.scrollHeight;
        answer.style.maxHeight = scrollHeight + "px";
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        // 強制再描画
        void answer.offsetWidth;
        answer.style.maxHeight = "0";
      }
    });
  });
});
