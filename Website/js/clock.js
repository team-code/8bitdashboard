//Gets and sets the time
//Sets the time based off of the users preference
function getSetTime() {
  hours24 = user_settings.clock24hr; //gets the user's preference for 24 hour clock
  let time = new Date(); //creates a new Date object
  //sets the time on the webpage based on the user's preference for 12 or 24 hour clock
  document.getElementById("clock").innerHTML = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hourCycle: hours24 ? "h23" : "h12",
  });
  return time; //returns the current time
}
