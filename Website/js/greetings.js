function getgreeting(cur_time) {
    const morning_greetings = [
        'Good Morning',
        'Rise and Shine'
    ];
    const afternoon_greetings = [
        'Good Afternoon',
        'Out to Lunch'
    ];
    const evening_greeting = [
        'Good Evening',
        'Packing up Work'
    ];
    const night_greetings = [
        'Good Night',
        'Time for Bed'
    ];
    let hour = cur_time.getHours();
    let greeting;
    if (hour >= 6 && hour <= 11) {
        const greeting_num = Math.floor(Math.random() * morning_greetings.length);
        greeting = morning_greetings[greeting_num]
    } else if (hour >= 12 && hour <= 16) {
        const greeting_num = Math.floor(Math.random() * afternoon_greetings.length);
        greeting = afternoon_greetings[greeting_num]
    } else if (hour >= 17 && hour <= 22) {
        const greeting_num = Math.floor(Math.random() * evening_greeting.length);
        greeting = evening_greeting[greeting_num]
    } else if (hour >= 23 || hour <= 5) {
        const greeting_num = Math.floor(Math.random() * night_greetings.length);
        greeting = night_greetings[greeting_num]
    }
    document.getElementById("greeting").innerHTML = greeting;
}
