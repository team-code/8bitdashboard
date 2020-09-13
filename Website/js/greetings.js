function getgreeting() {
    const greetings = [
        'Good Morning',
        'Good Afternoon',
        'Good Evening'
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    document.getElementById("greeting").innerHTML = greeting;
}