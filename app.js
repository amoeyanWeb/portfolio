// ===========================
// HALF-CIRCLE NAV TOGGLE
// ===========================
const halfNav = document.getElementById("halfNav");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  halfNav.classList.toggle("open");

  if (window.innerWidth <= 768) {
    const hero = document.querySelector(".hero-text");
    if (halfNav.classList.contains("open")) {
      // محو شدن
      hero.style.opacity = "0";
      hero.style.transform = "scale(0.95)";
    } else {
      // عوض شدن شعار و ظاهر شدن
      setRandomSlogan();
      setTimeout(() => {
        hero.style.opacity = "1";
        hero.style.transform = "scale(1)";
      }, 100);
    }
  }
});
// ===========================
// SECTION OPEN / CLOSE
// ===========================
let currentSection = null;
const overlay = document.getElementById("modalOverlay");
const circleBg = document.getElementById("modalCircleBg");
function openSection(id) {
  if (currentSection) {
    document.getElementById(currentSection).classList.remove("active");
  }

  overlay.classList.remove("collapsing");
  overlay.classList.add("active", "expanding");
  circleBg.style.width = "0";
  circleBg.style.height = "0";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      circleBg.style.width = "300vmax";
      circleBg.style.height = "300vmax";
    });
  });

  setTimeout(() => {
    const panel = document.getElementById(id);
    if (panel) {
      panel.classList.add("active");
      currentSection = id;
      // ← alert ها حذف شدن
    }
    halfNav.classList.remove("open");
  }, 220);

  if (window.innerWidth <= 768) {
    document.querySelector(".hero-text").style.opacity = "0";
    document.querySelector(".hero-text").style.pointerEvents = "none";
  }
}
function closeSection() {
  if (!currentSection) return;

  // Hide panel immediately
  const panel = document.getElementById(currentSection);
  if (panel) panel.classList.remove("active");
  currentSection = null;

  // Switch to collapsing mode and animate circle back to zero
  overlay.classList.remove("expanding");
  overlay.classList.add("collapsing");
  void circleBg.offsetWidth; // force reflow
  circleBg.style.transition =
    "width 0.42s cubic-bezier(0.4,0,0.2,1), height 0.42s cubic-bezier(0.4,0,0.2,1)";
  circleBg.style.width = "0";
  circleBg.style.height = "0";

  setTimeout(() => {
    overlay.classList.remove("active", "collapsing");
    // hard reset for next open
    circleBg.style.transition = "none";
    circleBg.style.width = "0";
    circleBg.style.height = "0";
  }, 460);
  if (window.innerWidth <= 768) {
    document.querySelector(".hero-text").style.opacity = "1";
    document.querySelector(".hero-text").style.pointerEvents = "none";
  }
}

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSection();
});

// ===========================
// CERTIFICATE UPLOAD
// ===========================
function triggerCertUpload(id) {
  document.getElementById(id).click();
}

function previewCert(input, id) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById(id + "-img");
    const placeholder = document.getElementById(id + "-placeholder");
    img.src = e.target.result;
    img.style.display = "block";
    if (placeholder) placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
}

// ===========================
// ARTS IMAGE UPLOAD
// ===========================
function triggerArtsImg() {
  document.getElementById("artsImgInput").click();
}

function previewArtsImg(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const bgImg = document.querySelector(".arts-bg-img");
    const bgText = document.getElementById("artsBgText");
    bgImg.src = e.target.result;
    bgImg.style.display = "block";
    if (bgText) bgText.style.display = "none";
  };
  reader.readAsDataURL(file);
}

// ===========================
// COURSES SYSTEM
// ===========================

function triggerCourseImg(idx) {
  document.getElementById("courseFile-" + idx).click();
}

function previewCourseImg(input, idx) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    courseImages[idx] = e.target.result;
    const area = document.getElementById("certArea-" + idx);
    area.innerHTML = `<img src="${e.target.result}" alt="مدرک" />`;
  };
  reader.readAsDataURL(file);
}

function updateCourseName(input, idx) {
  courses[idx] = input.value;
}

function deleteCourse(idx) {
  courses.splice(idx, 1);
  delete courseImages[idx];
  // Rebuild image keys
  const newImages = {};
  Object.keys(courseImages).forEach((k) => {
    const ki = parseInt(k);
    if (ki < idx) newImages[ki] = courseImages[ki];
    else if (ki > idx) newImages[ki - 1] = courseImages[ki];
  });
  courseImages = newImages;
  renderCourses();
}

function addCourse() {
  courses.push("نام دوره جدید");
  renderCourses();
  // Scroll to bottom of courses grid
  setTimeout(() => {
    const grid = document.getElementById("coursesGrid");
    grid.lastChild?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

// ===========================
// INIT
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  // renderCourses();

  // Animate sidebar profile info items
  document.querySelectorAll(".profile-info li").forEach((li, i) => {
    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";
    li.style.transition = `opacity 0.5s ${0.8 + i * 0.1}s, transform 0.5s ${0.8 + i * 0.1}s`;
    requestAnimationFrame(() => {
      li.style.opacity = "1";
      li.style.transform = "translateX(0)";
    });
  });
});

//----------------------------------------
//  برای بزرگ شدن تصویر با کلیک کردن روی عکس
//----------------------------------------

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

// عکسهای فعالیت های هنری
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("zoomable")) {
    lightboxImg.src = e.target.src;
    lightbox.classList.add("show");
  }
});

function closeLightbox() {
  lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
//////////////////////////////////////////////////////////////////// کاروسل
// ---- گالری هنری ----
let artsIndex = 0;
let artsLock = false;

function initGallery() {
  artsLock = false;
  artsIndex = 0;
  const interests = document.querySelectorAll(".interests-slide");
  const intdots = document.querySelectorAll(".interests-dots .dot");
  const slides = document.querySelectorAll(".arts-slide");
  const dots = document.querySelectorAll(".arts-dots .dot");

  slides.forEach((s) => {
    s.classList.remove("active");
    s.style.opacity = "0";
  });
  interests.forEach((s) => {
    s.classList.remove("active");
    s.style.opacity = "0";
  });
  intdots.forEach((d) => d.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
}

function artsGoto(n) {
  if (artsLock) return;
  const slides = document.querySelectorAll(".arts-slide");
  const dots = document.querySelectorAll(".arts-dots .dot");
  if (!slides.length) return;
  slides[artsIndex].classList.remove("active");
  slides[artsIndex].style.opacity = "0";
  dots[artsIndex]?.classList.remove("active");
  artsIndex = ((n % slides.length) + slides.length) % slides.length;
  slides[artsIndex].classList.add("active");
  slides[artsIndex].style.opacity = "1";
  dots[artsIndex]?.classList.add("active");
  artsLock = true;
  setTimeout(() => {
    artsLock = false;
  }, 500);
}

function galleryNext() {
  artsGoto(artsIndex + 1);
}
function galleryPrev() {
  artsGoto(artsIndex - 1);
}

// ---- گالری علائق ----
let interestsIndex = 0;
let interestsLock = false;

function initInterests() {
  interestsLock = false;
  interestsIndex = 0;
  const interests = document.querySelectorAll(".interests-slide");
  const intdots = document.querySelectorAll(".interests-dots .dot");
  const slides = document.querySelectorAll(".arts-slide");
  const dots = document.querySelectorAll(".arts-dots .dot");

  slides.forEach((s) => {
    s.classList.remove("active");
    s.style.opacity = "0";
  });
  interests.forEach((s) => {
    s.classList.remove("active");
    s.style.opacity = "0";
  });
  intdots.forEach((d) => d.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
}
function interestsGoto(n) {
  if (interestsLock) return;
  const slides = document.querySelectorAll(".interests-slide");
  const dots = document.querySelectorAll(".interests-dots .dot");
  if (!slides.length) return;
  slides[interestsIndex].classList.remove("active");
  slides[interestsIndex].style.opacity = "0";
  dots[interestsIndex]?.classList.remove("active");
  interestsIndex = ((n % slides.length) + slides.length) % slides.length;
  slides[interestsIndex].classList.add("active");
  slides[interestsIndex].style.opacity = "1";
  dots[interestsIndex]?.classList.add("active");
  interestsLock = true;
  setTimeout(() => {
    interestsLock = false;
  }, 500);
}

function interestsNext() {
  interestsGoto(interestsIndex + 1);
}
function interestsPrev() {
  interestsGoto(interestsIndex - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  initGallery();
  initInterests();
});

// ===========================
// شعارهای تصادفی
// ===========================
let slogans = [];
function setRandomSlogan() {
  let _lan = getCurrentLangIndex();

  switch (_lan) {
    case 0:
      slogans = [
        "مسائل دشوار، راه‌حل‌های هوشمند",
        "هر ایده‌ای مسیری به دنیای واقعی دارد",
        "هرکجا موسیقی و الکترونیک رودررو قرار گیرند، حتماً المان سوم من خواهم بود",
      ];
      break;
    case 1:
      slogans = [
        "Difficult problems, smart solutions",
        "Every idea has a way into the real world",
        "Wherever music and electronics meet face-to-face, I will surely be the third element",
      ];
      break;
    case 2:
      slogans = [
        "Zor problemler, akıllı çözümler",
        "Her fikrin gerçek dünyaya çıkan bir yolu vardır",
        "Müzik ve elektroniğin karşı karşıya geldiği her yerde, üçüncü element kesinlikle ben olacağım",
      ];
  }

  const el = document.querySelector(".hero-title");
  if (!el) return;
  const random = slogans[Math.floor(Math.random() * slogans.length)];
  el.textContent = random;
}

setRandomSlogan();

overlay.addEventListener("click", (e) => {
  if (e.target === overlay || e.target === circleBg) {
    closeSection();
  }
});
