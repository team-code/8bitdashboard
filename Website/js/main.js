function main() {
    setRandomImage();
    let cur_time = gettime("clock");
    getgreeting(cur_time);
    time = setInterval(gettime, 5000);
    shortcuts();
}

function getRandomImage() {
    imgnumber = Math.floor(Math.random() * images.length);
    return images[imgnumber];
}

function setRandomImage() {
    document.getElementById("background").style.backgroundImage = "url('" + getRandomImage() + "')";
}

function setImageNum(Num) {
    if (Num < numberofimgs && Num > 0) {
        document.getElementById("background").style.backgroundImage = "url('" + images[Num] + "')";
    }
}

function nextImage() {
    imgnumber++;
    if (imgnumber >= images.length) {
        imgnumber = 0;
    }
    setImageNum(imgnumber);
}

function previousImage() {
    imgnumber--;
    if (imgnumber < 0) {
        imgnumber = numberofimgs - 1;
    }
    setImageNum(imgnumber);
}

function shortcuts() {
    document.addEventListener('keydown', function (event) {
        console.log(event.key);
        if (event.key === '`') {
            setRandomImage();
        } else if (event.key == 'ArrowRight') {
            nextImage();
        } else if (event.key == 'ArrowLeft') {
            previousImage();
        } else {
            for (let key of shortcutmap) {
                if (event.key === key[0]) {
                    openlink(key[1], "_self");
                }
            }
        }
    });
}

function openlink(link, tab) {
    window.open(link, tab);
}

const shortcutmap = new Map([
    ['g', "https://www.github.com"],
    ['r', "https://www.reddit.com"],
    ['f', "https://www.facebook.com"],
    ['y', "https://www.youtube.com"],
    ['m', "https://maps.google.com"],
    ['s', "https://www.openstreetmap.org/"],
    ['w', "https://www.wikipedia.com"],
    ['b', "https://www.bing.com"],
    ['t', "https://www.twitter.com"],
    ['d', "https://www.twitch.tv/"],
    ['e', "https://www.ebay.com"],
    ['a', "https://www.amazon.com"],
    ['o', "https://www.google.com"],
    ['p', "https://www.plex.tv/web"]
])

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
    '../img/kirokaze/zombies.gif',
    '../img/faxdoc/cacao_and_coffee_shop.gif',
    '../img/faxdoc/youngatnight.gif',
    '../img/faxdoc/flower_shop.gif',
    '../img/faxdoc/lullaby.gif',
    '../img/faxdoc/midnight_melancholy.gif',
    '../img/faxdoc/mountain_mote.gif',
    '../img/faxdoc/nero_land.gif',
    '../img/faxdoc/sideshop.gif',
    '../img/faxdoc/stacking_houses_on_a_windy_day.gif',
    '../img/landscapes/bridge.gif',
    '../img/landscapes/bridge_raining.gif',
    '../img/landscapes/castle.gif',
    '../img/landscapes/cave.gif',
    '../img/landscapes/coast.gif',
    '../img/landscapes/dawn.gif',
    '../img/landscapes/falls.gif',
    '../img/landscapes/fire.gif',
    '../img/landscapes/forrest.gif',
    '../img/landscapes/fortress.gif',
    '../img/landscapes/grandcanyon.gif',
    '../img/landscapes/lake.gif',
    '../img/landscapes/mountain.gif',
    '../img/landscapes/nature.gif',
    '../img/landscapes/northlights.gif',
    '../img/landscapes/rain.gif',
    '../img/landscapes/sea.gif',
    '../img/landscapes/snow.gif',
    '../img/landscapes/swamp.gif',
    '../img/landscapes/swirling.gif',
    '../img/landscapes/temple.gif',
    '../img/landscapes/tower.gif',
    '../img/landscapes/town.gif',
    '../img/landscapes/underwater.gif',
    '../img/valenberg/bicycle.gif',
    '../img/valenberg/blade.gif',
    '../img/valenberg/controlroom.gif',
    '../img/valenberg/daftpunk.gif',
    '../img/valenberg/drift.gif',
    '../img/valenberg/echoesfromneals.gif',
    '../img/valenberg/exodus.gif',
    '../img/valenberg/future.gif',
    '../img/valenberg/girlinrain.gif',
    '../img/valenberg/highfloor.gif',
    '../img/valenberg/highlands.gif',
    '../img/valenberg/highsoceity.gif',
    '../img/valenberg/jazznight.gif',
    '../img/valenberg/lowlands.gif',
    '../img/valenberg/moon.png',
    '../img/valenberg/motorcycle.gif',
    '../img/valenberg/nighttrain.gif',
    '../img/valenberg/redbicycle.gif',
    '../img/valenberg/ride.gif',
    '../img/valenberg/shop.gif',
    '../img/valenberg/skate.gif',
    '../img/valenberg/streets.gif',
    '../img/valenberg/sushi.gif',
    '../img/valenberg/tv.gif',
    '../img/valenberg/virtuaverse.gif'
];

var time;
var imgnumber;
var numberofimgs = images.length;
