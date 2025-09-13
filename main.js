import { collectionCardData } from "./cms.js";

document.addEventListener('DOMContentLoaded', () => {
    // DOM Manipulation Helpers
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const containerInfoCards = $('.container-info-cards');
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
            clone.querySelector('.info-card').classList.add('flex-row-reverse');
            clone.querySelector('.info-serial-no').classList.add("right-507px", "left-auto");
        };

        return clone;
    };


    collectionCardData.forEach((data, index) => {
        containerInfoCards.appendChild(createInfoCard(index + 1, data.subtitle, data.title, data.description, data.image));

    })

    navUserAccountBox.addEventListener('mouseenter', ()=>{
        // ホバー時の処理
        navUserAccountBox.querySelector('img').src = './assets/icons/profile-icon-yellow.svg';
    });

    navUserAccountBox.addEventListener('mouseleave', ()=>{
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
