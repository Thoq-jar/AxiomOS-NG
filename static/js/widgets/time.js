import {militaryTime} from '../lib/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    const widget = document.getElementById('timeWidget');

    renderTime(widget, date);
    setTimeout(() => renderTime(widget, date), 1000)
})

function renderTime(widget, date) {
    widget.innerHTML = militaryTime() ?
        `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`: date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
        });
}
