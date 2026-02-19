gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector(".bg-video");
let scrollTimer;

// Video load hone par
video.addEventListener('loadedmetadata', () => {
    
    const videoDuration = video.duration;
    console.log("Video duration:", videoDuration);
    
    // Scroll event - play/pause
    window.addEventListener('scroll', () => {
        video.play().catch(() => {});
        clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(() => {
            video.pause();
            console.log("Video paused after 0.5s");
        }, 400);  // 150 se 500 kar diya (0.5 second)
    }, { passive: true });
    
    // GSAP ScrollTrigger
    gsap.to(video, {
        currentTime: videoDuration,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "+=0vh",
            scrub: true,
            markers: true,
            onUpdate: (self) => {
                console.log("Progress:", (self.progress * 100).toFixed(1) + "%");
            }
        }
    });
    
});

// Initial state
video.load();
video.pause();
video.currentTime = 0;



// ===========================================================

gsap.registerPlugin(ScrollTrigger);

const marqueeContents = document.querySelectorAll('.marquee-content');

// GSAP ScrollTrigger for Smooth Movement
ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => {
    // Scroll velocity ke hisaab se animation play hogi
    if (self.getVelocity() !== 0) {
      marqueeContents.forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }
  },
  onToggle: (self) => {
    if (!self.isActive) {
      marqueeContents.forEach(el => el.style.animationPlayState = 'paused');
    }
  }
});

// Smooth Stop Logic
let isScrolling;
window.addEventListener('scroll', () => {
    marqueeContents.forEach(el => el.style.animationPlayState = 'running');
    
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        marqueeContents.forEach(el => el.style.animationPlayState = 'paused');
    }, 300);
}, { passive: true });

