gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector(".bg-video");
let scrollTimer;

video.addEventListener('loadedmetadata', () => {
    const videoDuration = video.duration;

    window.addEventListener('scroll', () => {
        video.play().catch(() => {});
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            video.pause();
        }, 400);
    }, { passive: true });

    gsap.to(video, {
        currentTime: videoDuration,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "+=0vh",
            scrub: true,
        }
    });
});

video.load();
video.pause();
video.currentTime = 0;

// ===========================================================

const marqueeContents = document.querySelectorAll('.marquee-content');

ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
        if (self.getVelocity() !== 0) {
            marqueeContents.forEach(el => el.style.animationPlayState = 'running');
        }
    }
});

let isScrolling;
window.addEventListener('scroll', () => {
    marqueeContents.forEach(el => el.style.animationPlayState = 'running');
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        marqueeContents.forEach(el => el.style.animationPlayState = 'paused');
    }, 300);
}, { passive: true });

// ===========================================================
// SLIDER - dono sliders ke liye alag alag kaam karega

function initSlider(sliderContainer) {
    const slider = sliderContainer.querySelector(".slider");
    const cards = Array.from(sliderContainer.querySelectorAll(".card"));
    const nextBtn = sliderContainer.querySelector(".next");
    const prevBtn = sliderContainer.querySelector(".prev");

    const visibleCards = 3;
    let autoSlide;

    const firstClones = cards.slice(0, visibleCards).map(c => c.cloneNode(true));
    const lastClones = cards.slice(-visibleCards).map(c => c.cloneNode(true));

    firstClones.forEach(clone => slider.appendChild(clone));
    lastClones.reverse().forEach(clone => slider.prepend(clone));

    const allCards = slider.querySelectorAll(".card");
    const cardWidth = allCards[0].offsetWidth + 20;
    let index = visibleCards;

    slider.style.transition = "none";
    slider.style.transform = `translate3d(-${index * cardWidth}px, 0, 0)`;

    function slide() {
        slider.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";
        slider.style.transform = `translate3d(-${index * cardWidth}px, 0, 0)`;
    }

    slider.addEventListener("transitionend", () => {
        if (index >= allCards.length - visibleCards) {
            slider.style.transition = "none";
            index = visibleCards;
            slider.style.transform = `translate3d(-${index * cardWidth}px, 0, 0)`;
        }
        if (index < visibleCards) {
            slider.style.transition = "none";
            index = allCards.length - visibleCards * 2;
            slider.style.transform = `translate3d(-${index * cardWidth}px, 0, 0)`;
        }
    });

    nextBtn.addEventListener("click", () => { index++; slide(); resetAutoSlide(); });
    prevBtn.addEventListener("click", () => { index--; slide(); resetAutoSlide(); });

    function startAutoSlide() {
        autoSlide = setInterval(() => { index++; slide(); }, 3000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    startAutoSlide();
    slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
    slider.addEventListener("mouseleave", startAutoSlide);
}

document.querySelectorAll(".slider-wrapper").forEach(initSlider);