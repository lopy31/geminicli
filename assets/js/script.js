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

const noticeBtn = document.getElementById("noticeBtn");
const noticeModal = document.getElementById("noticeModal");
const closeNoticeModalBtn = document.getElementById("closeNoticeModalBtn");

noticeBtn.addEventListener("click", () => {
  noticeModal.style.display = "block";
});

closeNoticeModalBtn.addEventListener("click", () => {
  noticeModal.style.display = "none";
});

noticeModal.addEventListener("click", (e) => {
  if (e.target === noticeModal) {
    noticeModal.style.display = "none";
  }
});

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
