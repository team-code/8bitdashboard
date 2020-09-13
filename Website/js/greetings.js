function getgreeting(cur_time) {
    const greetings = [
        'Good Morning',
        'Good Afternoon',
        'Good Evening',
        'Good Night'
    ];
    let hour = cur_time.getHours();
    let greeting;
    if (hour >= 6 && hour <= 11) {
        greeting = greetings[0]
    } else if (hour >= 12 && hour <= 16) {
        greeting = greetings[1];
    } else if (hour >= 17 && hour <= 22) {
        greeting = greetings[2];
    } else if (hour >= 23 && hour <= 5) {
        greeting = greetings[3];
    }
    document.getElementById("greeting").innerHTML = greeting;
}