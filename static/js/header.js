import {getTimeOfDay} from "./lib/date.js";
import * as settings from "./lib/settings.js";

document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.getElementById("greeting");
    const settingsBtn = document.getElementById("settingsBtn");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettings = document.getElementById("closeSettings");
    const background = document.querySelector('.background');
    const uploadBtn = document.getElementById('uploadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const fileInput = document.getElementById('bgUpload');
    const timeOfDay = getTimeOfDay();
    const savedBg = settings.saveBg();

    setup(greeting, timeOfDay, savedBg, background);

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = event.target.result;
                background.style.backgroundImage = `url(${imageData})`;
                settings.setSaveBg(imageData);
            };
            reader.readAsDataURL(file);
        }
    });

    resetBtn.addEventListener('click', () => {
        background.style.backgroundImage = 'url("/static/assets/default-bg.jpg")';
        settings.setSaveBg('/static/assets/default-bg.jpg');
    });

    settingsBtn.addEventListener('click', () => {
        settingsModal.showModal();
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.close();
    });

    settingsModal.addEventListener('click', (event) => {
        const dialogDimensions = settingsModal.getBoundingClientRect();
        if(
            event.clientX < dialogDimensions.left ||
            event.clientX > dialogDimensions.right ||
            event.clientY < dialogDimensions.top ||
            event.clientY > dialogDimensions.bottom
        ) {
            settingsModal.close();
        }
    });
});


function setup(greeting, timeOfDay, savedBg, background) {
    renderGreeting(greeting, timeOfDay);
    setInterval(() => renderGreeting(greeting, timeOfDay), 10000);
    if(savedBg) background.style.backgroundImage = `url(${savedBg})`;
}

function renderGreeting(greeting, timeOfDay) {
    greeting.innerHTML = "AxiomOS";
    greeting.innerHTML += ` - ${timeOfDay}`;

}
