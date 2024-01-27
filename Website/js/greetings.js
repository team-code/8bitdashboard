const morning_greetings = [
  "Good Morning",
  "Rise and Shine",
  "Today is your day!",
  "Now with 100% more bits",
  "(っ◕‿◕)っ",
  "Morning Mode: Activated",
  "Press Start for Sunshine!",
  "New Day, New High Score!",
  "Hello World, Good Morning!",
  "Pixel-Perfect Morning!",
  "Daylight Loading... Complete!",
  "New Day Patch Applied!",
  "Catch the Morning Pixels!",
  "Achievement Unlocked: Awake!",
  "Daytime, in Technicolor!",
  "Daylight DLC Loaded!",
  "Rise for the High Score!",
  "New Day, New Pixels!",
  "Morning: Rendered in 8-Bit!",
];
const afternoon_greetings = [
  "Good Afternoon",
  "Out to Lunch",
  "Keep going",
  "~Halfway done",
  "ʕ·͡ᴥ·ʔ",
  "Afternoon Power-Up!",
  "Lunch Level Completed!",
  "Halfway to Night Mode!",
  "High Noon in Pixel Town!",
  "Pixel Break, Well Earned!",
  "8-Bit Break Time!",
  "Ready Player Afternoon!",
  "Afternoon: Keep Leveling!",
  "Bit by Bit, Day’s Passing!",
  "Afternoon Achievement: Active!",
  "Gameplay in the Sun!",
  "Byte-Size Break!",
];
const evening_greeting = [
  "Good Evening",
  "Packing up Work",
  "Howdy",
  "How is it going",
  "ᕙ(⇀‸↼‶)ᕗ",
  "Evening Power Down! (ᕙ(⇀‸↼‶)ᕗ)",
  "Logging Off Work Mode!",
  "Sunset Achieved!",
  "Good Evening, Gamer!",
  "Night Mode Activated!",
  "Evening: Unwind Level!",
  "Evening: Low Battery Mode!",
  "Twilight: Level Down!",
  "Moonlit Pixels, Hello!",
  "PM Controller in Hand!"
];
const night_greetings = [
  "Good Night",
  "Time for Bed",
  "The cake is a lie",
  "Is it early or late?",
  "［(－_－)］zzz",
  "Pixelated Dreams Ahead!",
  "Moon’s Up, Time to Chill!",
  "Soothing Pixels of Night!",
  "Starry, Pixel Night!",
  "Night Level: Expert",
  "Dream Mode: Activated",
  "Dreams Loading... Please Wait",
  "Moon's Up, Screens Down",
  "Sleeping Level: Pro",
  "Dreams in 8-Bit",
  "Powering Down... Zzz",
  "Good Night, Digital World",
  "Sleep: Press ESC to Continue",
  "Pixel Sheep Counting",
  "Shutting Down... Goodnight",
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
    greeting = morning_greetings[generateNum(morning_greetings.length)];
  } else if (hour >= 12 && hour <= 16) {
    greeting = afternoon_greetings[generateNum(afternoon_greetings.length)];
  } else if (hour >= 17 && hour <= 22) {
    greeting = evening_greeting[generateNum(evening_greeting.length)];
  } else if (hour >= 23 || hour <= 5) {
    greeting = night_greetings[generateNum(night_greetings.length)];
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
