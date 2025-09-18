import { collectionCardData } from "./cms.js";

document.addEventListener('DOMContentLoaded', () => {


    // DOM Manipulation Helpers
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const image1Cloud = $('.image1-cloud');
    const image2Mountains = $('.image2-mountains');
    const image3PersonOnMountain = $('.image3-person-on-mountain');
    const heroSection = $('.hero-section');
    const heroSectionH1 = $('.hero-section h1');
    const heroSectionViewPlaceholder = $('.hero-section-view-placeholder')
    const containerInfoCards = $('.container-info-cards');
    const layerBackgroundColor = $('.layer-background-color');
    const navUserAccountBox = $('.userAccount a');

    function createInfoCard(index, subtitle, title, description, image) {
        const template = $('.info-card-template');
        const clone = template.content.cloneNode(true);

        clone.querySelector('.info-serial-no').innerText = String(index).padStart(2, '0');
        clone.querySelector('.subtitle h3').innerText = subtitle;
        clone.querySelector('.title').innerText = title;
        clone.querySelector('.description').innerText = description;
        clone.querySelector('.info-image').src = image;

        if (index % 2 === 0) {
            clone.querySelector('.info-card').classList.add('info-card-flex-row-reverse');
            clone.querySelector('.info-serial-no').classList.add('info-serial-no-even');
            clone.querySelector('.half-box-text').classList.add('half-box-text-even');
            clone.querySelector('.half-box-image').classList.add('half-box-image-even');
        }

        return clone;
    };

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image;
            img.onload = () => resolve(src);
            img.onerror = reject;
            img.src = src;
        })
    }

    async function createInfoCards() {

        for (let i = 0; i < collectionCardData.length; i++) {
            const data = collectionCardData[i];
            await loadImage(data.image);
            containerInfoCards.appendChild(
                createInfoCard(i + 1, data.subtitle, data.title, data.description, data.image)
            );
        }

        // await collectionCardData.forEach(async (data, index) => {
        //     await containerInfoCards.appendChild(createInfoCard(index + 1, data.subtitle, data.title, data.description, data.image));
        // });

        const mainContainer = $('.main-container');
        // const mainSectionStyles = window.getComputedStyle(mainContainer);
        console.log(mainContainer.offsetHeight)
        layerBackgroundColor.style.height = `${mainContainer.offsetHeight + 200}px`
        // layerBackgroundColor.style.height = String(mainSectionStyles.height).slice(0, -2)+'svh'

        const observerOdd = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                const card = entry.target.closest('.info-card');
                const startDash = card ? card.querySelector('.start-dash') : null;
                const ratio = entry.intersectionRatio;
                const slideAmount = 50 - ratio * 50;
                entry.target.style.transform = `translateX(${slideAmount}px)`;
                entry.target.style.opacity = 0.3 + ratio * 0.7;
                startDash.style.maxWidth = `${72 + (72 * (ratio * 100) / 100)}px`; // 72px
                // Start opacity at 0.3 (not completely invisible, just slightly faded)
                // Multiply ratio (0 → 1) by 0.7 → gives us a range 0 → 0.7
                // Add them together → gives final opacity range 0.3 → 1.0
            })
        }, {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0,0.01,0.02,..., 0.99, 1
        })

        const observerEven = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                const card = entry.target.closest('.info-card');
                const startDash = card ? card.querySelector('.start-dash') : null;
                const ratio = entry.intersectionRatio;
                const slideAmount = 50 - ratio * 50;
                entry.target.style.transform = `translateX(-${slideAmount}px)`;
                entry.target.style.opacity = 0.3 + ratio * 0.7;
                startDash.style.maxWidth = `${72 + (72 * (ratio * 100) / 100)}px`; // 72px
                // Start opacity at 0.3 (not completely invisible, just slightly faded)
                // Multiply ratio (0 → 1) by 0.7 → gives us a range 0 → 0.7
                // Add them together → gives final opacity range 0.3 → 1.0
            })
        }, {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0,0.01,0.02,..., 0.99, 1
        })

        // const observerExpandWidth72px = new IntersectionObserver((entries, observer) => {
        //     entries.forEach((entry) => {
        //         const ratio = entry.intersectionRatio;
        //         console.log(ratio)
        //         const expandAmount = 72 + (72 * (ratio * 100) / 100); //max = 72px
        //         entry.target.style.maxWidth = `${expandAmount}px`;
        //     })
        // }, {
        //     threshold: Array.from({ length: 101 }, (_, i) => i / 100)
        // })

        const observerSlide20pxUp = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                const ratio = entry.intersectionRatio;
                const slideAmount = 20 - (20 * ratio);
                entry.target.style.transform = `translateY(${slideAmount}px)`;
            })
        }, {
            threshold: Array.from({ length: 101 }, (_, i) => i / 100)
        })

        const infoCardImages = $$('.info-image');
        infoCardImages.forEach((img, index) => {
            if ((index + 1) % 2 === 0) {
                observerEven.observe(img);
            } else {
                observerOdd.observe(img);
            }
        })

        const infoCardTitles = $$('.info-card .title')
        infoCardTitles.forEach((title) => {
            observerSlide20pxUp.observe(title);
        })

        const infoCardDescription = $$('.info-card .description')
        infoCardDescription.forEach((des) => {
            observerSlide20pxUp.observe(des);
        })

        const infoCardReadMore = $$('.info-card .read-more')
        infoCardReadMore.forEach((des) => {
            observerSlide20pxUp.observe(des);
        })
    }
    createInfoCards();

    const observerImage1Cloud = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const ratio = entry.intersectionRatio || 0; // 0〜1
            const slide = 200 * (1 - Math.max(0, Math.min(1, ratio))); // 可視率が低いほど数値↑（0→50）
            const slide2 = 50 * (1 - Math.max(0, Math.min(1, ratio)));
            const slide3 = 20 * (1 - Math.max(0, Math.min(1, ratio)));
            entry.target.style.transform = `translateY(-${slide}px)`; // 0→-50px
            image2Mountains.style.transform = `translateY(-${slide2}px)`; // 0→-50px
            image3PersonOnMountain.style.transform = `translateY(${slide3}px)`; // 0→-50px
        })
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    })

    const observerReducerheroSectionOpacity = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;
            heroSection.style.opacity = ratio
        })
    },{
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
    })

    observerImage1Cloud.observe(image1Cloud);
    observerReducerheroSectionOpacity.observe(heroSectionViewPlaceholder);
    // observerImage1Cloud.observe(image2Mountains);
    // observerImage1Cloud.observe(image3PersonOnMountain);

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

    // const observerOptions = {
    //     root: null,
    //     rootMargin: '0px',
    //     threshold: 0.5
    // }

    // const heroObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             heroSection.style.visibility = 'visible';
    //         } else {
    //             heroSection.style.visibility = 'hidden';
    //         }
    //     })
    // }, observerOptions);

    // heroObserver.observer(heroSection); 

})
