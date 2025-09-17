import { collectionCardData } from "./cms.js";

document.addEventListener('DOMContentLoaded', () => {


    // DOM Manipulation Helpers
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const containerInfoCards = $('.container-info-cards');
    const layerBackgroundColor = $('.layer-background-color')
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
        const mainSectionStyles = window.getComputedStyle(mainContainer);
        console.log(mainSectionStyles.height);
        layerBackgroundColor.style.height = mainSectionStyles.height
        // layerBackgroundColor.style.height = String(mainSectionStyles.height).slice(0, -2)+'svh'
    }

    createInfoCards();

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
