import {militaryTime} from '../lib/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('timeWidget');

    renderTime(widget);
    setTimeout(() => renderTime(widget), 1000)
})

function renderTime(widget) {
    const date = new Date();

    widget.innerHTML = militaryTime() ?
        `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`: date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
        });
}
