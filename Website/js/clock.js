//Gets and sets the time
//Sets the time based off of the users preference
function getSetTime() {
    hours24 = user_settings.clock24hr
    let time = new Date();
    document.getElementById("clock").innerHTML = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: !hours24
    });
    return time;
}
