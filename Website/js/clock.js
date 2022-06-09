//Gets and sets the time
//Sets the time based off of the users preference
function getSetTime() {
    hours24 = user_settings.clock24hr
    let time = new Date();
    document.getElementById("clock").innerHTML = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: hours24 ? 'h23' : 'h12'
    });
    return time;
}
