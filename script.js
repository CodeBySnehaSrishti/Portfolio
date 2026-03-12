
// arrow scroll to info-section
// =============================================
document.querySelector('.arrow-indicator').addEventListener('click', () => {
    document.querySelector('.info-section').scrollIntoView({ behavior: 'smooth' });
});

// =============================================
// circular text
// =============================================
const text = document.querySelector('.text p');
text.innerHTML = text.innerText.split('').map(
    (char, i) => `<span style="transform:rotate(${i * 8.3}deg)">${char}</span>`
).join('');


// =============================================
// marquee banner
// =============================================
const marqueeContents = document.querySelectorAll('.marquee-content');
let marqueeTimer;

marqueeContents.forEach(el => {
    el.innerHTML = el.innerHTML + el.innerHTML;
    el.style.animationDuration = '15s';
    el.style.animationPlayState = 'paused';
});

window.addEventListener('scroll', () => {
    marqueeContents.forEach(el => el.style.animationPlayState = 'running');
    clearTimeout(marqueeTimer);
    marqueeTimer = setTimeout(() => {
        marqueeContents.forEach(el => el.style.animationPlayState = 'paused');
    }, 400);
}, { passive: true });


// =============================================
// card slider
// =============================================
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
    let index = visibleCards;

    function getCardWidth() {
        const card = allCards[0];
        const style = window.getComputedStyle(card);
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        return card.offsetWidth + margin;
    }

    function updateSlider(animate = true) {
        slider.style.transition = animate ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none";
        slider.style.transform = `translateX(-${index * getCardWidth()}px)`;
    }

    function resetToValid() {
        const total = allCards.length;
        if (index >= total - visibleCards) index = visibleCards;
        if (index < visibleCards) index = total - visibleCards * 2;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${index * getCardWidth()}px)`;
        slider.offsetHeight; // force reflow
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => { index++; updateSlider(); }, 3000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // initSlider ke BAHAR rakhna chahiye
    window.addEventListener('load', () => document.querySelectorAll(".slider-wrapper").forEach(initSlider));
    slider.addEventListener('transitionend', resetToValid);
    nextBtn.addEventListener('click', () => { index++; updateSlider(); resetAutoSlide(); });
    prevBtn.addEventListener('click', () => { index--; updateSlider(); resetAutoSlide(); });

    startAutoSlide();
}

document.querySelectorAll(".slider-wrapper").forEach(initSlider);


// =============================================
// modal
// =============================================
const moreBtn = document.getElementById('moreBtn');
const moreModal = document.getElementById('moreModal');

function openModal() { moreModal.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal() { moreModal.classList.remove('active'); document.body.style.overflow = ''; }

moreBtn.addEventListener('click', openModal);
document.getElementById('closeMoreModal').addEventListener('click', closeModal);
moreModal.addEventListener('click', e => { if (e.target === moreModal) closeModal(); });


// =============================================
// fullscreen nav
// =============================================
const fullscreenNav = document.getElementById('fullscreenNav');

const heroEyeOpen = document.querySelector('.hero-nav .eye-wrapper .eye:not(.hide)');
const heroEyeClose = document.querySelector('.hero-nav .eye-wrapper .eye.hide');
const modalEyeOpen = document.querySelector('.modal-eye-wrapper .eye:not(.hide)');
const modalEyeClose = document.querySelector('.modal-eye-wrapper .eye.hide');

function openNav() {
    fullscreenNav.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    fullscreenNav.classList.remove('active');
    heroEyeClose.style.display  = 'none';
    heroEyeOpen.style.display   = 'flex';
    modalEyeClose.style.display = 'none'; 
    modalEyeOpen.style.display  = 'flex';  
    document.body.style.overflow = '';
}
// hero eye btn
heroEyeOpen.addEventListener('click', () => {
    openNav();
    heroEyeOpen.style.display = 'none';
    heroEyeClose.style.display = 'flex';
});
heroEyeClose.addEventListener('click', closeNav);

// modal eye btn
modalEyeOpen.addEventListener('click', () => {
    closeModal();
    openNav();
    modalEyeOpen.style.display = 'none';
    modalEyeClose.style.display = 'flex';
});
modalEyeClose.addEventListener('click', () => {
    closeNav();
    modalEyeClose.style.display = 'none';
    modalEyeOpen.style.display = 'flex';
});

// nav hide btn (top right)
document.getElementById('navHideBtn').addEventListener('click', closeNav);

// escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeNav(); }
});

// =============================================
// chatbot — ai-bot trigger
// =============================================
// =============================================
// chatbot — open / close only
// =============================================
const chatOverlay = document.getElementById('chatOverlay');
const chatClose   = document.getElementById('chatClose');

document.querySelector('.ai-bot').addEventListener('click', () => {
    chatOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

chatClose.addEventListener('click', closeChatbot);
chatOverlay.addEventListener('click', e => {
    if (e.target === chatOverlay) closeChatbot();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeChatbot();
});

function closeChatbot() {
    chatOverlay.classList.remove('active');
    document.body.style.overflow = '';
}


