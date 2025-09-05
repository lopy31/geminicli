// ハンバーガーメニューの開閉
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navModal = document.getElementById("navModal");
const closeModalBtn = document.getElementById("closeModalBtn");

hamburgerBtn.addEventListener("click", () => {
  navModal.style.display = "block";
  // hide クラスを付与してフェードアウト開始
  navModal.classList.remove("hide");
  navModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  // hide クラスを付与してフェードアウト開始
  navModal.classList.remove("show");
  navModal.classList.add("hide");

  // アニメーション終了後に非表示化
  navModal.addEventListener(
    "animationend",
    () => {
      if (navModal.classList.contains("hide")) {
        navModal.style.display = "none";
        navModal.classList.remove("hide");
      }
    },
    { once: true }
  );
});

// お知らせモーダルの開閉
const noticeBtn = document.getElementById("noticeBtn");
const noticeModal = document.getElementById("noticeModal");
const closeNoticeModalBtn = document.getElementById("closeNoticeModalBtn");

noticeBtn.addEventListener("click", () => {
  noticeModal.style.display = "block";
  // hide クラスを付与してフェードアウト開始
  noticeModal.classList.remove("hide");
  noticeModal.classList.add("show");
});

closeNoticeModalBtn.addEventListener("click", () => {
  // hide クラスを付与してフェードアウト開始
  noticeModal.classList.remove("show");
  noticeModal.classList.add("hide");

  // アニメーション終了後に非表示化
  noticeModal.addEventListener(
    "animationend",
    () => {
      if (noticeModal.classList.contains("hide")) {
        noticeModal.style.display = "none";
        noticeModal.classList.remove("hide");
      }
    },
    { once: true }
  );
});

// お知らせスライダーの初期化
const slider = document.getElementById("noticeSlider");
const prevBtn = document.getElementById("noticePrevBtn");
const nextBtn = document.getElementById("noticeNextBtn");
const content = slider.querySelector(".p-notice-slider__content");
const items = Array.from(content.querySelectorAll(".p-notice-slider__item"));
let currentIndex = 0;

function updateSlider() {
  items.forEach((item, idx) => {
    item.style.display = idx === currentIndex ? "block" : "none";
  });
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === items.length - 1;
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < items.length - 1) {
    currentIndex++;
    updateSlider();
  }
});

updateSlider();

// ページャーの生成と表示
const pager = document.createElement("div");
pager.className = "p-notice-slider__pager";
items.forEach((_, idx) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = "p-notice-slider__pager-dot";
  dot.setAttribute("aria-label", `ページ ${idx + 1}`);
  dot.addEventListener("click", () => {
    currentIndex = idx;
    updateSlider();
    updatePager();
  });
  pager.appendChild(dot);
});
slider.appendChild(pager);

function updatePager() {
  const dots = pager.querySelectorAll(".p-notice-slider__pager-dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("is-active", idx === currentIndex);
  });
}
const originalUpdateSlider = updateSlider;
updateSlider = function () {
  originalUpdateSlider();
  updatePager();
};
updatePager();

// コメントモーダルの開閉
const commentBtn = document.getElementById("commentBtn");
const commentModal = document.getElementById("commentModal");
const closeCommentModalBtn = document.getElementById("closeCommentModalBtn");

commentBtn.addEventListener("click", () => {
  commentModal.style.display = "block";
  // hide クラスを付与してフェードアウト開始
  commentModal.classList.remove("hide");
  commentModal.classList.add("show");
});

closeCommentModalBtn.addEventListener("click", () => {
  // hide クラスを付与してフェードアウト開始
  commentModal.classList.remove("show");
  commentModal.classList.add("hide");

  // アニメーション終了後に非表示化
  commentModal.addEventListener(
    "animationend",
    () => {
      if (commentModal.classList.contains("hide")) {
        commentModal.style.display = "none";
        commentModal.classList.remove("hide");
      }
    },
    { once: true }
  );
});

// スクロールアニメーションの表示制御
const scrollEl = document.querySelector(".c-scroll");

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    scrollEl.classList.remove("is-hidden"); // 表示
  } else {
    scrollEl.classList.add("is-hidden"); // フェードアウト
  }
});

// 画面の向きとサイズに応じた横スクロールの有効化・無効化
function enableHorizontalScroll() {
  document.body.style.overflowX = "auto";
  document.body.style.overflowY = "hidden";
  document.documentElement.style.overflowX = "auto";
  document.documentElement.style.overflowY = "hidden";
}

function disableHorizontalScroll() {
  document.body.style.overflowX = "";
  document.body.style.overflowY = "";
  document.documentElement.style.overflowX = "";
  document.documentElement.style.overflowY = "";
}

function handleOrientationOrResize() {
  const isLandscape =
    window.matchMedia("(orientation: landscape)").matches ||
    window.innerWidth > 768;
  if (isLandscape) {
    enableHorizontalScroll();
  } else {
    disableHorizontalScroll();
  }
}

window.addEventListener("resize", handleOrientationOrResize);
window.addEventListener("orientationchange", handleOrientationOrResize);

handleOrientationOrResize();

// 慣性スクロール（Inertia Scroll）を有効にする
let isTouching = false;
let lastX = 0;
let velocity = 0;
let rafId = null;

function onTouchStart(e) {
  isTouching = true;
  velocity = 0;
  lastX = e.touches ? e.touches[0].clientX : e.clientX;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function onTouchMove(e) {
  if (!isTouching) return;
  const currentX = e.touches ? e.touches[0].clientX : e.clientX;
  velocity = currentX - lastX;
  window.scrollBy(-velocity, 0);
  lastX = currentX;
}

function onTouchEnd() {
  isTouching = false;
  function inertia() {
    if (Math.abs(velocity) < 0.5) return;
    window.scrollBy(-velocity, 0);
    velocity *= 0.95;
    rafId = requestAnimationFrame(inertia);
  }
  inertia();
}

window.addEventListener("touchstart", onTouchStart, { passive: false });
window.addEventListener("touchmove", onTouchMove, { passive: false });
window.addEventListener("touchend", onTouchEnd);

window.addEventListener("mousedown", onTouchStart);
window.addEventListener("mousemove", onTouchMove);
window.addEventListener("mouseup", onTouchEnd);

// 背景スライドショー
const images = [
  "mv_bg.jpg",
  "mv_bg_02.jpg",
  "mv_bg_03.jpg",
  "mv_bg_04.jpg",
  "mv_bg_05.jpg",
  "mv_bg_06.jpg",
  "mv_bg_07.jpg",
];

const position = ["75%", "40%", "75%", "75%", "50%", "50%", "25%"];

let current = 0;
const el = document.querySelector(".p-mv");

// 初期背景
el.style.backgroundImage = `url(/assets/images/${images[current]})`;
el.style.backgroundPosition = position[current];

setInterval(() => {
  current = (current + 1) % images.length;
  el.style.backgroundImage = `url(/assets/images/${images[current]})`;
  el.style.backgroundPosition = position[current];
}, 4000); // 4秒ごとに切り替え

// フェードインアニメーション
const targets = document.querySelectorAll(".fadein");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
); // 10%見えたら発火

targets.forEach((target) => observer.observe(target));
