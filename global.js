document.addEventListener("DOMContentLoaded", function () {
  // ハンバーガーメニュー
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

  // Cookieバナーの表示制御
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieBtn = document.getElementById("cookieBtn");
  const cookieKey = "cookieAccepted";
  if (cookieBanner && cookieBtn) {
    // 既に同意済みなら非表示
    if (localStorage.getItem(cookieKey) === "1") {
      cookieBanner.style.display = "none";
    }
    cookieBtn.addEventListener("click", function (e) {
      e.preventDefault();
      cookieBanner.style.transition = "opacity 0.5s";
      cookieBanner.style.opacity = "0";
      localStorage.setItem(cookieKey, "1");
      setTimeout(function () {
        cookieBanner.style.display = "none";
      }, 500);
    });
  }

  // Q&Aアコーディオン
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

  // アンカーリンクのスムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = anchor.getAttribute("href");
      if (
        href &&
        href.startsWith("#") &&
        href.length > 1 &&
        document.querySelector(href)
      ) {
        e.preventDefault();
        const target = document.querySelector(href);
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = target.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset + rect.top - headerHeight - 8; // 余白8px

        window.scrollTo({
          top: scrollTop,
          behavior: "smooth",
        });
      }
    });
  });
});
