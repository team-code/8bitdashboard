const morning_greetings = [
    'Good Morning',
    'Rise and Shine',
    'Today is your day!',
    'Now with 100% more bits',
    '(っ◕‿◕)っ'
];
const afternoon_greetings = [
    'Good Afternoon',
    'Out to Lunch',
    'Keep going',
    '~Halfway done',
    'ʕ·͡ᴥ·ʔ'
];
const evening_greeting = [
    'Good Evening',
    'Packing up Work',
    'Howdy',
    'How is it going',
    'ᕙ(⇀‸↼‶)ᕗ'
];
const night_greetings = [
    'Good Night',
    'Time for Bed',
    'The cake is a lie',
    'Is it early or late?',
    '［(－_－)］zzz'
];

//Generate a random number
function generateNum(max, min = 0) {
    return Math.floor(Math.random() * max) + min;

}

//Sets greeting to something from the above greetings
function setGreeting() {
    let time = new Date();
    let hour = time.getHours();
    let greeting;
    if (hour >= 6 && hour <= 11) {
        greeting = morning_greetings[generateNum(morning_greetings.length)]
    } else if (hour >= 12 && hour <= 16) {
        greeting = afternoon_greetings[generateNum(afternoon_greetings.length)]
    } else if (hour >= 17 && hour <= 22) {
        greeting = evening_greeting[generateNum(evening_greeting.length)]
    } else if (hour >= 23 || hour <= 5) {
        greeting = night_greetings[generateNum(night_greetings.length)]
    }
    document.getElementById("greeting").innerHTML = greeting;
}


//Returns if its time to change the greeting, also can call set greeting by inself if passed a true
function timeToChangeGreeting(setGreetingvar = false) {
    let greeting = document.getElementById("greeting").innerText;
    let result = false;
    let time = new Date();
    let hour = time.getHours();

    if (hour >= 6 && hour <= 11) {
        result = !morning_greetings.includes(greeting);
    } else if (hour >= 12 && hour <= 16) {
        result = !afternoon_greetings.includes(greeting);
    } else if (hour >= 17 && hour <= 22) {
        result = !evening_greeting.includes(greeting);
    } else if (hour >= 23 || hour <= 5) {
        result = !night_greetings.includes(greeting);
    }

    if (setGreetingvar && result) {
        setGreeting();
    }
    return result;
}
