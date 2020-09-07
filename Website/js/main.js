function getRandomImage() {
    const images = [
        '../img/kirokaze/amp_prob.gif',
        '../img/kirokaze/attack.gif',
        '../img/kirokaze/bad_landing.gif',
        '../img/kirokaze/bluebalcony.gif',
        '../img/kirokaze/cemetry.gif',
        '../img/kirokaze/citymirror.gif',
        '../img/kirokaze/coffeeinrain.gif',
        '../img/kirokaze/dark_pillar.gif',
        '../img/kirokaze/droidcrime.gif',
        '../img/kirokaze/elderorc.gif',
        '../img/kirokaze/factory5.gif',
        '../img/kirokaze/familydinner.gif',
        '../img/kirokaze/horse.gif',
        '../img/kirokaze/iplayoldgames.gif',
        '../img/kirokaze/last_dance.gif',
        '../img/kirokaze/metro_final.gif',
        '../img/kirokaze/nightlytraining.gif',
        '../img/kirokaze/pilot.gif',
        '../img/kirokaze/player2.gif',
        '../img/kirokaze/reddriver.gif',
        '../img/kirokaze/robot_alley.gif',
        '../img/kirokaze/sandcastle.gif',
        '../img/kirokaze/shootingstars.gif',
        '../img/kirokaze/spacecommander.gif',
        '../img/kirokaze/spaceport.gif',
        '../img/kirokaze/thieves.gif',
        '../img/kirokaze/train.gif',
        '../img/kirokaze/train_city.gif',
        '../img/kirokaze/troll_cave.gif',
        '../img/kirokaze/wild_boy.gif',
        '../img/kirokaze/windyday.gif',
        '../img/kirokaze/youngatnight.gif',
        '../img/kirokaze/zombies.gif'
    ];
    return images[Math.floor(Math.random()*images.length)];
}

function main(){
    const img_url = getRandomImage();
    document.getElementById("background").style.backgroundImage = "url("+img_url+")";
    gettime("clock");
    setInterval(gettime("clock"), 5000);
}