var shortcutmap = new Map([
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
const artists = [
    ["kirokaze","https://www.patreon.com/kirokaze"],
    ["faxdoc", "https://twitter.com/faxdocc"],
    ["Mark Ferrari", "http://pixfabrik.com/livingworlds/"],
    ["Valenberg", "https://twitter.com/MrValenberg"]
]

const images = [
    ['../img/kirokaze/amp_prob.gif',0],
    ['../img/kirokaze/attack.gif',0],
    ['../img/kirokaze/bad_landing.gif',0],
    ['../img/kirokaze/bluebalcony.gif',0],
    ['../img/kirokaze/cemetry.gif',0],
    ['../img/kirokaze/citymirror.gif',0],
    ['../img/kirokaze/coffeeinrain.gif',0],
    ['../img/kirokaze/dark_pillar.gif',0],
    ['../img/kirokaze/droidcrime.gif',0],
    ['../img/kirokaze/elderorc.gif',0],
    ['../img/kirokaze/factory5.gif',0],
    ['../img/kirokaze/familydinner.gif',0],
    ['../img/kirokaze/horse.gif',0],
    ['../img/kirokaze/iplayoldgames.gif',0],
    ['../img/kirokaze/last_dance.gif',0],
    ['../img/kirokaze/metro_final.gif',0],
    ['../img/kirokaze/nightlytraining.gif',0],
    ['../img/kirokaze/pilot.gif',0],
    ['../img/kirokaze/player2.gif',0],
    ['../img/kirokaze/reddriver.gif',0],
    ['../img/kirokaze/robot_alley.gif',0],
    ['../img/kirokaze/sandcastle.gif',0],
    ['../img/kirokaze/shootingstars.gif',0],
    ['../img/kirokaze/spacecommander.gif',0],
    ['../img/kirokaze/spaceport.gif',0],
    ['../img/kirokaze/thieves.gif',0],
    ['../img/kirokaze/train.gif',0],
    ['../img/kirokaze/train_city.gif',0],
    ['../img/kirokaze/troll_cave.gif',0],
    ['../img/kirokaze/wild_boy.gif',0],
    ['../img/kirokaze/windyday.gif',0],
    ['../img/kirokaze/youngatnight.gif',0],
    ['../img/kirokaze/zombies.gif',0],
    ['../img/faxdoc/cacao_and_coffee_shop.gif',1],
    ['../img/faxdoc/youngatnight.gif',1],
    ['../img/faxdoc/flower_shop.gif',1],
    ['../img/faxdoc/lullaby.gif',1],
    ['../img/faxdoc/midnight_melancholy.gif',1],
    ['../img/faxdoc/mountain_mote.gif',1],
    ['../img/faxdoc/nero_land.gif',1],
    ['../img/faxdoc/sideshop.gif',1],
    ['../img/faxdoc/stacking_houses_on_a_windy_day.gif',1],
    ['../img/landscapes/bridge.gif',2],
    ['../img/landscapes/bridge_raining.gif',2],
    ['../img/landscapes/castle.gif',2],
    ['../img/landscapes/cave.gif',2],
    ['../img/landscapes/coast.gif',2],
    ['../img/landscapes/dawn.gif',2],
    ['../img/landscapes/falls.gif',2],
    ['../img/landscapes/fire.gif',2],
    ['../img/landscapes/forrest.gif',2],
    ['../img/landscapes/fortress.gif',2],
    ['../img/landscapes/grandcanyon.gif',2],
    ['../img/landscapes/lake.gif',2],
    ['../img/landscapes/mountain.gif',2],
    ['../img/landscapes/nature.gif',2],
    ['../img/landscapes/northlights.gif',2],
    ['../img/landscapes/rain.gif',2],
    ['../img/landscapes/sea.gif',2],
    ['../img/landscapes/snow.gif',2],
    ['../img/landscapes/swamp.gif',2],
    ['../img/landscapes/swirling.gif',2],
    ['../img/landscapes/temple.gif',2],
    ['../img/landscapes/tower.gif',2],
    ['../img/landscapes/town.gif',2],
    ['../img/landscapes/underwater.gif',2],
    ['../img/valenberg/bicycle.gif',3],
    ['../img/valenberg/blade.gif',3],
    ['../img/valenberg/controlroom.gif',3],
    ['../img/valenberg/daftpunk.gif',3],
    ['../img/valenberg/drift.gif',3],
    ['../img/valenberg/echoesfromneals.gif',3],
    ['../img/valenberg/exodus.gif',3],
    ['../img/valenberg/future.gif',3],
    ['../img/valenberg/girlinrain.gif',3],
    ['../img/valenberg/highfloor.gif',3],
    ['../img/valenberg/highlands.gif',3],
    ['../img/valenberg/highsoceity.gif',3],
    ['../img/valenberg/jazznight.gif',3],
    ['../img/valenberg/lowlands.gif',3],
    ['../img/valenberg/moon.png',3],
    ['../img/valenberg/motorcycle.gif',3],
    ['../img/valenberg/nighttrain.gif',3],
    ['../img/valenberg/redbicycle.gif',3],
    ['../img/valenberg/ride.gif',3],
    ['../img/valenberg/shop.gif',3],
    ['../img/valenberg/skate.gif',3],
    ['../img/valenberg/streets.gif',3],
    ['../img/valenberg/sushi.gif',3],
    ['../img/valenberg/tv.gif',3],
    ['../img/valenberg/virtuaverse.gif',3]
];


function main() {
    setUpModal();
    setRandomImage();
    let cur_time = gettime();
    getgreeting(cur_time);
    time = setInterval(gettime, 5000);
    shortcuts();
}

function getRandomImage() {
    imgnumber = Math.floor(Math.random() * images.length);
    return images[imgnumber];
}

function setRandomImage() {
    image = getRandomImage();
    document.getElementById("showcase").style.backgroundImage = "url('" + image[0] + "')";
    updateArtistAttr(image);
}

function setImageNum(Num) {
    if (Num < numberofimgs && Num > 0) {
        document.getElementById("showcase").style.backgroundImage = "url('" + images[Num][0] + "')";
        updateArtistAttr(images[Num]);
    }
}

function updateArtistAttr(imageObj){
    artists_id = imageObj[1]
    document.getElementById("author").innerHTML = artists[artists_id][0];
    document.getElementById("author").href = artists[artists_id][1];
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
    if(!modalactive){
        window.open(link, tab);
    }

}

function add_shortcut(key,site){
    shortcutmap.set(key, site);
}

function settingsModelContent(){

    let html_to_insert = ""


    shortcutmap.forEach((value, key) => { html_to_insert += "<input value='"+key+"' class='shortcutkey'> <input value='"+value+"' class='shortcutvalue'>" } )
    document.getElementById("modaltext").innerHTML = html_to_insert;

}

function helpModelContent(){
    document.getElementById("modaltext").innerText = "Help";
}


function setUpModal() {


// Get the modal
    modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
    document.getElementById("settings").onclick = function () {
        modal.style.display = "block";
        settingsModelContent();
        modalactive = true;
    }

    document.getElementById("help").onclick = () => {
        modal.style.display = "block";
        helpModelContent();
        modalactive = true;
    }


// When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
        modalactive = false;
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalactive = false;
        }
    }
}



var time;
var image;
var imgnumber;
var numberofimgs = images.length;
var modalactive = false;
