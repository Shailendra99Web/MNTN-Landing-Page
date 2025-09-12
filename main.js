import { collectionCardData } from "./cms.js";

// DOM Manipulation Helpers
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function createInfoCard(index, subtitle, title, description, image) {
    const template = $('.info-card-template');
    const clone = template.content.cloneNode(true);

    clone.querySelector('.info-serial-no').innerText = String(index).padStart(2, '0');
    clone.querySelector('.subtitle h3').innerText = subtitle;
    clone.querySelector('.title').innerText = title;
    clone.querySelector('.description').innerText = description;
    clone.querySelector('.info-image').src = image;

    if(index%2 === 0){
        clone.querySelector('.info-card').classList.add('flex-row-reverse');
        clone.querySelector('.info-serial-no').classList.add("right-507px", "left-auto");
    }

    return clone;
};

const containerInfoCards = $('.container-info-cards');

collectionCardData.forEach((data, index) => {
    containerInfoCards.appendChild(createInfoCard(index+1, data.subtitle, data.title, data.description, data.image));

})