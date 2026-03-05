const text = document.querySelector('.text p');
text.innerHTML = text.innerText.split('').map(
    (char, i) =>
        `<span style="transform:rotate(${i * 8.3}deg)">${char}</span>`
).join('');


// ===========================================================
// marque banner

const marqueeContents = document.querySelectorAll('.marquee-content');

marqueeContents.forEach(el => {
    el.innerHTML = el.innerHTML + el.innerHTML;
    el.style.animationDuration = '15s';
    el.style.animationPlayState = 'paused'; // load pe band
});

let marqueeTimer;

window.addEventListener('scroll', () => {
    // scroll hote hi chalu
    marqueeContents.forEach(el => el.style.animationPlayState = 'running');

    clearTimeout(marqueeTimer);

    // scroll rukne k 400ms baad band — video jaisa
    marqueeTimer = setTimeout(() => {
        marqueeContents.forEach(el => el.style.animationPlayState = 'paused');
    }, 400);

}, { passive: true });



// ===========================================================
// card-slider

function initSlider(sliderContainer) {
    const slider = sliderContainer.querySelector(".slider");
    const cards = Array.from(sliderContainer.querySelectorAll(".card"));
    const nextBtn = sliderContainer.querySelector(".next");
    const prevBtn = sliderContainer.querySelector(".prev");

    const visibleCards = 3; // Desktop view ke hisaab se
    let autoSlide;

    // 1. Clones create karein
    const firstClones = cards.slice(0, visibleCards).map(c => c.cloneNode(true));
    const lastClones = cards.slice(-visibleCards).map(c => c.cloneNode(true));

    // 2. DOM mein add karein
    firstClones.forEach(clone => slider.appendChild(clone));
    lastClones.reverse().forEach(clone => slider.prepend(clone));

    // 3. Update width calculation
    const allCards = slider.querySelectorAll(".card");
    let index = visibleCards;

    function getCardWidth() {
        const card = allCards[0];
        const style = window.getComputedStyle(card);
        const margin =
            parseFloat(style.marginLeft) + parseFloat(style.marginRight);

        return card.offsetWidth + margin;
    }

    function updateSlider(animate = true) {
        const cardWidth = getCardWidth();
        slider.style.transition = animate ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none";
        slider.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    // Initial position bina animation ke
    window.addEventListener('load', () => updateSlider(false));

    // 4. Infinite Loop Logic
    slider.addEventListener("transitionend", () => {
        if (index >= allCards.length - visibleCards) {
            slider.style.transition = "none";
            index = visibleCards;
            slider.style.transform = `translateX(-${index * getCardWidth()}px)`;
            slider.offsetHeight; // force reflow
            slider.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";
        }

        if (index < visibleCards) {
            slider.style.transition = "none";
            index = allCards.length - visibleCards * 2;
            slider.style.transform = `translateX(-${index * getCardWidth()}px)`;
            slider.offsetHeight;
            slider.style.transition = "transform 0.6s cubic-bezier(0.4,0,0.2,1)";
        }
    });

    nextBtn.addEventListener("click", () => { index++; updateSlider(); resetAutoSlide(); });
    prevBtn.addEventListener("click", () => { index--; updateSlider(); resetAutoSlide(); });

    // Window resize par layout sahi rakhne ke liye
    window.addEventListener('resize', () => updateSlider(false));

    function startAutoSlide() {
        autoSlide = setInterval(() => { index++; updateSlider(); }, 3000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    startAutoSlide();


}
document.querySelectorAll(".slider-wrapper").forEach(wrapper => {
    initSlider(wrapper);
})


// ==============================================================
// modal logic
//   =============================================================
const moreBtn = document.getElementById('moreBtn');
const moreModal = document.getElementById('moreModal');


moreBtn.addEventListener('click', () => {
    moreModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});



document.getElementById('closeMoreModal').addEventListener('click', () => {
    moreModal.classList.remove('active');
    document.body.style.overflow = '';
});



moreModal.addEventListener('click', (e) => {
    if (e.target === moreModal) { moreModal.classList.remove('active'); document.body.style.overflow = ''; }
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        moreModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});