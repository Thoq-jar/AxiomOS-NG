function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    switch(true) {
        case (hours < 12):
            timeOfDay = "Good Morning";
            break;
        case (hours < 18):
            timeOfDay = "Good Afternoon";
            break;
        case (hours < 21):
            timeOfDay = "Good Evening";
            break;
        default:
            timeOfDay = "Good Night";
            break;
    }

    return timeOfDay;
}

export {
    getTimeOfDay,
}
