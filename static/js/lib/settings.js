function militaryTime() {
    const militaryTime = localStorage.getItem('militaryTime');

    if(militaryTime)
        return militaryTime;
    else
        return false;
}

function setMilitaryTime(value) {
    localStorage.setItem('militaryTime', value);
}

function saveBg() {
    const savedBg = localStorage.getItem('customBackground');
    if(savedBg)
        return savedBg;
    else
        return (
            '/static/assets/default-bg.jpg'
        )
}

function setSaveBg(value) {
    localStorage.setItem('customBackground', value);
}

export {
    militaryTime,
    setMilitaryTime,

    saveBg,
    setSaveBg,
}