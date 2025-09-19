import { collectionCardData } from "./cms.js";
// DOM Manipulation Helpers
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

document.addEventListener('DOMContentLoaded', () => {

    // a要素（href="#image1-cloud"）を取得するには、以下のように記述します。
    const allIndicators = $$('.right-side-nav ul a');
    const sectionIndicator = $('.section-indicator');

    // Background images
    const image1Cloud = $('.image1-cloud');
    const image2Mountains = $('.image2-mountains');
    const image3PersonOnMountain = $('.image3-person-on-mountain');

    const bgLayer3BlackWhite = $('.bg-layer3-black-white');

    const heroSectionViewPlaceholder = $('.hero-section-view-placeholder');
    const heroSection = $('.hero-section');
    const layerBackgroundColor = $('.layer-background-color');
    const containerInfoCards = $('.container-info-cards');
    const navUserAccountBox = $('.userAccount a');

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100); // 0,0.01,0.02,..., 0.99, 1 // For observers.

    // To create info card using template element.
    function createInfoCard(index, subtitle, title, description, image) {
        const template = $('.info-card-template');
        const clone = template.content.cloneNode(true);

        clone.querySelector('.info-serial-no').innerText = String(index).padStart(2, '0');
        clone.querySelector('.subtitle h3').innerText = subtitle;
        clone.querySelector('.title').innerText = title;
        clone.querySelector('.description').innerText = description;
        clone.querySelector('.info-image').src = image;
        clone.querySelector('.info-card').id = `info-card-${index}`;

        if (index % 2 === 0) {
            clone.querySelector('.info-card').classList.add('info-card-flex-row-reverse');
            clone.querySelector('.info-serial-no').classList.add('info-serial-no-even');
            clone.querySelector('.half-box-text').classList.add('half-box-text-even');
            clone.querySelector('.half-box-image').classList.add('half-box-image-even');
        }

        return clone;
    };

    // For image loading.
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image;
            img.onload = () => resolve(src);
            img.onerror = reject;
            img.src = src;
        })
    };

    // To start creating info cards one by one.
    async function createInfoCards() {
        // loop through all card data
        for (let i = 0; i < collectionCardData.length; i++) {
            const data = collectionCardData[i];
            await loadImage(data.image); // for synchronous exection
            containerInfoCards.appendChild(
                createInfoCard(i + 1, data.subtitle, data.title, data.description, data.image)
            );
        };
        // -------------------------
        const mainContainer = $('.main-container'); // Main Section.
        layerBackgroundColor.style.height = `${mainContainer.offsetHeight + 200}px` // To set equal height of background color layer to main section height contains after appending all cards.
        // -------------------------
        // To observer odd card's image and add left-to-right slide-in transition.
        const observerReducerOddCardImage = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                const card = entry.target.closest('.info-card');
                const startDash = card ? card.querySelector('.start-dash') : null;

                const ratio = entry.intersectionRatio;
                const vh = window.innerHeight;
                const top = entry.boundingClientRect.top;

                if (ratio > 0.6) {
                    const retriveIndex = card.querySelector(`.info-serial-no`).innerText;
                    sectionIndicator.style.transform = `translateY(${retriveIndex}00%)`;
                }

                if (top < 0) {
                    return;
                }

                // if (locked != true) {
                const slideAmount = 50 - ratio * 50;
                entry.target.style.transform = `translateX(${slideAmount}px)`;
                entry.target.style.opacity = 0.3 + ratio * 0.7;
                startDash.style.maxWidth = `${72 * (ratio * 100) / 100}px`// 72px
                // }

                // Start opacity at 0.3 (not completely invisible, just slightly faded)
                // Multiply ratio (0 → 1) by 0.7 → gives us a range 0 → 0.7
                // Add them together → gives final opacity range 0.3 → 1.0

                // if (ratio > 0.7) {
                //     observer.unobserve(entry.target)
                //     observer.unobserve(startDash)
                //     entry.target.style.transform = `translateX(0px)`;
                //     entry.target.style.opacity = 1;
                //     startDash.style.maxWidth = `72px`;
                // }
            })
        }, {
            threshold: thresholds // 0,0.01,0.02,..., 0.99, 1
        });

        // To observer even card's image and add right-to-left slide-in transition.
        const observerReducerEvenCardImage = new IntersectionObserver((entries, observer) => {
            // let locked = false;

            entries.forEach((entry) => {
                const card = entry.target.closest('.info-card');
                const startDash = card ? card.querySelector('.start-dash') : null;

                const ratio = entry.intersectionRatio;
                const top = entry.boundingClientRect.top;

                if (ratio > 0.6) {
                    const retriveIndex = card.querySelector(`.info-serial-no`).innerText;
                    sectionIndicator.style.transform = `translateY(${retriveIndex}00%)`;
                }

                if (top < 0) {
                    // observer.unobserve(entry.target);
                    // locked = true;
                    return;
                }

                // if (locked != true) {
                const slideAmount = 50 - ratio * 50;
                entry.target.style.transform = `translateX(-${slideAmount}px)`;
                entry.target.style.opacity = 0.3 + ratio * 0.7;
                // startDash.style.maxWidth = `${Math.min(72, 72 * ratio)}px`
                startDash.style.maxWidth = `${Math.min((72 * ((ratio * 100) + 30) / 100), 72)}px`
                // startDash.style.maxWidth = `${72 + (72 * (ratio * 100) / 100)}px`; // 72px
                // }

                // Start opacity at 0.3 (not completely invisible, just slightly faded)
                // Multiply ratio (0 → 1) by 0.7 → gives us a range 0 → 0.7
                // Add them together → gives final opacity range 0.3 → 1.0
            })
        }, {
            threshold: thresholds
        });

        // To observer card's title, description, read-more button and add bottom-to-up slide-up transition.
        const observerReducerSlide20pxUp = new IntersectionObserver((entries, observer) => {
            // let locked = false;
            entries.forEach((entry) => {
                const ratio = entry.intersectionRatio;
                const top = entry.boundingClientRect.top;

                if (top < 0) {
                    return;
                    // observer.unobserve(entry.target);
                    // locked = true;
                }

                // if (locked != true) {
                const slideAmount = 20 - (20 * ratio);
                entry.target.style.transform = `translateY(${slideAmount}px)`;
                // }

            })
        }, {
            threshold: thresholds
        });

        // After cards appended in the DOM.
        const infoCardImages = $$('.info-image'); // Accessing all card images
        const infoCardTitles = $$('.info-card .title'); // Accessing card's title.
        const infoCardDescription = $$('.info-card .description'); // Accessing card's description.
        const infoCardReadMore = $$('.info-card .read-more'); // Accessing card's read-more button.

        // Adding observers for smooth animations (After appending all info card)
        infoCardImages.forEach((img, index) => {
            if ((index + 1) % 2 === 0) {
                observerReducerEvenCardImage.observe(img);
            } else {
                observerReducerOddCardImage.observe(img);
            }
        });
        infoCardTitles.forEach((title) => {
            observerReducerSlide20pxUp.observe(title);
        });
        infoCardDescription.forEach((description) => {
            observerReducerSlide20pxUp.observe(description);
        });
        infoCardReadMore.forEach((readmore) => {
            observerReducerSlide20pxUp.observe(readmore);
        });
    }

    createInfoCards(); // Start appending all cards one-by-one and, will also add observers.

    // Observer for all background images animation - slight position changing while scrolling.
    const observerReducerAllBackgroundImages = new IntersectionObserver((entries, observer) => {
        // const locked = false;
        entries.forEach((entry) => {
            const ratio = entry.intersectionRatio || 0; // 0〜1
            const top = entry.boundingClientRect.top;

            if (ratio > 0.6) {
                sectionIndicator.style.transform = `translateY(${0}00%)`;
            }

            if (top < 0) {
                // observer.unobserve(entry.target);
                // locked = true;
                return;
            }

            // if (locked != true) {
            const slide = 200 * (1 - Math.max(0, Math.min(1, ratio))); // 可視率が低いほど数値↑（0→50）
            const slide2 = 50 * (1 - Math.max(0, Math.min(1, ratio)));
            const slide3 = 20 * (1 - Math.max(0, Math.min(1, ratio)));
            entry.target.style.transform = `translateY(-${slide}px)`; // 0→-50px
            image2Mountains.style.transform = `translateY(-${slide2}px)`; // 0→-50px
            bgLayer3BlackWhite.style.transform = `translateY(-${slide2}px)`; // 0→-50px
            image3PersonOnMountain.style.transform = `translateY(${slide3}px)`; // 0→-50px
            // }

        })
    }, {
        threshold: thresholds
    });

    // Observer for hero section opacity animation.
    const observerReducerheroSectionOpacity = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;
            heroSection.style.opacity = ratio;
        })
    }, {
        threshold: thresholds
    });

    // Adding observers on background images, hero section for animation / transition.
    observerReducerAllBackgroundImages.observe(image1Cloud);
    observerReducerheroSectionOpacity.observe(heroSectionViewPlaceholder);

    // Account button - onhover / ontouch icon change (white -> yellow) 
    navUserAccountBox.addEventListener('mouseenter', () => {
        // ホバー時の処理
        navUserAccountBox.querySelector('img').src = './assets/icons/profile-icon-yellow.svg';
    });
    navUserAccountBox.addEventListener('mouseleave', () => {
        // ホバー時の処理
        navUserAccountBox.querySelector('img').src = './assets/icons/profile-icon.svg';
    });
    navUserAccountBox.addEventListener('touchstart', (e) => {
        e.preventDefault();
        navUserAccountBox.querySelector('img').src = './assets/icons/profile-icon-yellow.svg';
    });
    navUserAccountBox.addEventListener('touchend', (e) => {
        e.preventDefault();
        navUserAccountBox.querySelector('img').src = './assets/icons/profile-icon.svg';
    });
});
