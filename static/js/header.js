import {getTimeOfDay} from "./lib/date.js";

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
    const savedBg = localStorage.getItem('customBackground');

    greeting.innerHTML = "AxiomOS";
    greeting.innerHTML += ` - ${timeOfDay}`;

    if(savedBg) {
        background.style.backgroundImage = `url(${savedBg})`;
    }

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                background.style.backgroundImage = `url(${imageData})`;
                localStorage.setItem('customBackground', imageData);
            };
            reader.readAsDataURL(file);
        }
    });

    resetBtn.addEventListener('click', () => {
        background.style.backgroundImage = 'url("/static/assets/default-bg.jpg")';
        localStorage.removeItem('customBackground');
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
