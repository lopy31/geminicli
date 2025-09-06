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

// ショップリストモーダルの開閉
const shopBtn = document.getElementById("shopBtn");
const shopModal = document.getElementById("shopModal");
const closeShopModalBtn = document.getElementById("closeShopModalBtn");

shopBtn.addEventListener("click", () => {
  shopModal.style.display = "block";
  // hide クラスを付与してフェードアウト開始
  shopModal.classList.remove("hide");
  shopModal.classList.add("show");
});

closeShopModalBtn.addEventListener("click", () => {
  // hide クラスを付与してフェードアウト開始
  shopModal.classList.remove("show");
  shopModal.classList.add("hide");

  // アニメーション終了後に非表示化
  shopModal.addEventListener(
    "animationend",
    () => {
      if (shopModal.classList.contains("hide")) {
        shopModal.style.display = "none";
        shopModal.classList.remove("hide");
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
// let isTouching = false;
// let lastX = 0;
// let velocity = 0;
// let rafId = null;

// function onTouchStart(e) {
//   isTouching = true;
//   velocity = 0;
//   lastX = e.touches ? e.touches[0].clientX : e.clientX;
//   if (rafId) {
//     cancelAnimationFrame(rafId);
//     rafId = null;
//   }
// }

// function onTouchMove(e) {
//   if (!isTouching) return;
//   const currentX = e.touches ? e.touches[0].clientX : e.clientX;
//   velocity = currentX - lastX;
//   window.scrollBy(-velocity, 0);
//   lastX = currentX;
// }

// function onTouchEnd() {
//   isTouching = false;
//   function inertia() {
//     if (Math.abs(velocity) < 0.5) return;
//     window.scrollBy(-velocity, 0);
//     velocity *= 0.95;
//     rafId = requestAnimationFrame(inertia);
//   }
//   inertia();
// }

// window.addEventListener("touchstart", onTouchStart, { passive: false });
// window.addEventListener("touchmove", onTouchMove, { passive: false });
// window.addEventListener("touchend", onTouchEnd);

// window.addEventListener("mousedown", onTouchStart);
// window.addEventListener("mousemove", onTouchMove);
// window.addEventListener("mouseup", onTouchEnd);

// 背景スライドショー
const slides = document.querySelectorAll(".p-mv__slider div");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);

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

// お知らせバッジの表示制御
const STORAGE_KEY = "noticeLastReadId";

// ここを変えると「新しいお知らせが来た」ことになる
const latestNoticeId = "20250906";

const lastReadId = localStorage.getItem(STORAGE_KEY);

if (lastReadId !== latestNoticeId) {
  noticeBtn.classList.add("unread");
}

noticeBtn.addEventListener("click", () => {
  noticeBtn.classList.remove("unread");
  localStorage.setItem(STORAGE_KEY, latestNoticeId);
});

// 撮影地の写真をランダムに20枚表示
const container = document.querySelector(".p-gallery__content");
const totalImages = 86; // フォルダ内 photo-1.jpg ～ photo-50.jpg
const displayCount = 10; // 表示する枚数

const numbers = Array.from({ length: totalImages }, (_, i) => i + 1);
const randomImages = numbers
  .sort(() => Math.random() - 0.5)
  .slice(0, displayCount);

function placeImage(num, aspectRatio, index) {
  const size = Math.floor(Math.random() * 40) + 30; // 30〜70 vw
  const w = size;
  const h = size / aspectRatio;

  // 縦位置を等間隔に配置
  const sectionHeight = 200 / displayCount; // vh単位で区切り
  const baseY = sectionHeight * index;
  const y = baseY + Math.random() * (sectionHeight * 0.5); // ずらし幅あり

  // 横位置はランダム
  const xMin = -10; // 左に最大10vwはみ出し
  const xMax = 100 - w * 0.7; // 右にも30%くらいはみ出し許容
  const x = xMin + Math.random() * (xMax - xMin);

  const div = document.createElement("div");
  div.className = "parallax";
  div.style.width = w + "vw";
  div.style.left = x + "vw";
  div.style.top = y + "vh";
  div.style.setProperty("--rand-rot", Math.random().toFixed(2));
  div.innerHTML = `<img src="/assets/images/photo/photo-${num}.jpg" alt="photo ${num}">`;
  container.appendChild(div);
}

// 縦横比を取得して配置
randomImages.forEach((num, index) => {
  const img = new Image();
  img.src = `/assets/images/photo/photo-${num}.jpg`;
  img.onload = () => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    placeImage(num, aspectRatio, index);
  };
});

// フェードイン
const gallery = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
);

const mo = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    m.addedNodes.forEach((node) => {
      if (node.classList?.contains("parallax")) {
        gallery.observe(node);
      }
    });
  });
});
mo.observe(container, { childList: true });
