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
    ["Kirokaze", "https://www.patreon.com/kirokaze"],
    ["Faxdoc", "https://twitter.com/faxdocc"],
    ["Mark Ferrari", "http://pixfabrik.com/livingworlds/"],
    ["Valenberg", "https://twitter.com/MrValenberg"],
    ["1041uuu", "https://www.patreon.com/1041uuu"],
    ["PixelJeff", "https://www.deviantart.com/pixeljeff"]
]

const images = [
    ['../img/kirokaze/amp_prob.webp', 0],
    ['../img/kirokaze/attack.webp', 0],
    ['../img/kirokaze/bad_landing.webp', 0],
    ['../img/kirokaze/bluebalcony.webp', 0],
    ['../img/kirokaze/cemetry.webp', 0],
    ['../img/kirokaze/citymirror.webp', 0],
    ['../img/kirokaze/coffeeinrain.webp', 0],
    ['../img/kirokaze/dark_pillar.webp', 0],
    ['../img/kirokaze/droidcrime.webp', 0],
    ['../img/kirokaze/elderorc.webp', 0],
    ['../img/kirokaze/factory5.webp', 0],
    ['../img/kirokaze/familydinner.webp', 0],
    ['../img/kirokaze/horse.webp', 0],
    ['../img/kirokaze/iplayoldgames.webp', 0],
    ['../img/kirokaze/last_dance.webp', 0],
    ['../img/kirokaze/metro_final.webp', 0],
    ['../img/kirokaze/nightlytraining.webp', 0],
    ['../img/kirokaze/pilot.webp', 0],
    ['../img/kirokaze/player2.webp', 0],
    ['../img/kirokaze/reddriver.webp', 0],
    ['../img/kirokaze/robot_alley.webp', 0],
    ['../img/kirokaze/sandcastle.webp', 0],
    ['../img/kirokaze/shootingstars.webp', 0],
    ['../img/kirokaze/spacecommander.webp', 0],
    ['../img/kirokaze/spaceport.webp', 0],
    ['../img/kirokaze/thieves.webp', 0],
    ['../img/kirokaze/train.webp', 0],
    ['../img/kirokaze/train_city.webp', 0],
    ['../img/kirokaze/troll_cave.webp', 0],
    ['../img/kirokaze/wild_boy.webp', 0],
    ['../img/kirokaze/windyday.webp', 0],
    ['../img/kirokaze/youngatnight.webp', 0],
    ['../img/kirokaze/zombies.webp', 0],
    ['../img/faxdoc/cacao_and_coffee_shop.webp', 1],
    ['../img/faxdoc/flower_shop.webp', 1],
    ['../img/faxdoc/lullaby.webp', 1],
    ['../img/faxdoc/midnight_melancholy.webp', 1],
    ['../img/faxdoc/mountain_mote.webp', 1],
    ['../img/faxdoc/nero_land.webp', 1],
    ['../img/faxdoc/sideshop.webp', 1],
    ['../img/faxdoc/stacking_houses_on_a_windy_day.webp', 1],
    ['../img/landscapes/bridge.webp', 2],
    ['../img/landscapes/bridge_raining.webp', 2],
    ['../img/landscapes/castle.webp', 2],
    ['../img/landscapes/cave.webp', 2],
    ['../img/landscapes/coast.webp', 2],
    ['../img/landscapes/dawn.webp', 2],
    ['../img/landscapes/falls.webp', 2],
    ['../img/landscapes/fire.webp', 2],
    ['../img/landscapes/forrest.webp', 2],
    ['../img/landscapes/fortress.webp', 2],
    ['../img/landscapes/grandcanyon.webp', 2],
    ['../img/landscapes/lake.webp', 2],
    ['../img/landscapes/mountain.webp', 2],
    ['../img/landscapes/nature.webp', 2],
    ['../img/landscapes/northlights.webp', 2],
    ['../img/landscapes/rain.webp', 2],
    ['../img/landscapes/sea.webp', 2],
    ['../img/landscapes/snow.webp', 2],
    ['../img/landscapes/swamp.webp', 2],
    ['../img/landscapes/swirling.webp', 2],
    ['../img/landscapes/temple.webp', 2],
    ['../img/landscapes/tower.webp', 2],
    ['../img/landscapes/town.webp', 2],
    ['../img/landscapes/underwater.webp', 2],
    ['../img/valenberg/bicycle.webp', 3],
    ['../img/valenberg/blade.webp', 3],
    ['../img/valenberg/controlroom.webp', 3],
    ['../img/valenberg/drift.webp', 3],
    ['../img/valenberg/echoesfromneals.webp', 3],
    ['../img/valenberg/exodus.webp', 3],
    ['../img/valenberg/future.webp', 3],
    ['../img/valenberg/girlinrain.webp', 3],
    ['../img/valenberg/highfloor.webp', 3],
    ['../img/valenberg/highlands.webp', 3],
    ['../img/valenberg/highsoceity.webp', 3],
    ['../img/valenberg/jazznight.webp', 3],
    ['../img/valenberg/lowlands.webp', 3],
    ['../img/valenberg/ride.webp', 3],
    ['../img/valenberg/shop.webp', 3],
    ['../img/valenberg/skate.webp', 3],
    ['../img/valenberg/streets.webp', 3],
    ['../img/valenberg/sushi.webp', 3],
    ['../img/valenberg/tv.webp', 3],
    ['../img/valenberg/virtuaverse.webp', 3],
    ['../img/1041uuu/bridge.webp', 4],
    ['../img/1041uuu/brightgirlcity.webp', 4],
    ['../img/1041uuu/cattrain.webp', 4],
    ['../img/1041uuu/coffeeshop.webp', 4],
    ['../img/1041uuu/dogcatchase.webp', 4],
    ['../img/1041uuu/hackergirl.webp', 4],
    ['../img/1041uuu/japanbridge.webp', 4],
    ['../img/1041uuu/japancars.webp', 4],
    ['../img/1041uuu/japancity.webp', 4],
    ['../img/1041uuu/japancityfall.webp', 4],
    ['../img/1041uuu/japancityriver.webp', 4],
    ['../img/1041uuu/japancityspring.webp', 4],
    ['../img/1041uuu/japancitytall.webp', 4],
    ['../img/1041uuu/japanfall.webp', 4],
    ['../img/1041uuu/japanfishstore.webp', 4],
    ['../img/1041uuu/japanresuturant.webp', 4],
    ['../img/1041uuu/japanriver.webp', 4],
    ['../img/1041uuu/japanrivergirl.webp', 4],
    ['../img/1041uuu/japantrain.webp', 4],
    ['../img/1041uuu/japanwarmbed.webp', 4],
    ['../img/1041uuu/koi.webp', 4],
    ['../img/1041uuu/kois.webp', 4],
    ['../img/1041uuu/milk.webp', 4],
    ['../img/1041uuu/peacefulgarden.webp', 4],
    ['../img/1041uuu/rainbow.webp', 4],
    ['../img/1041uuu/raingyudon.webp', 4],
    ['../img/1041uuu/ramen.webp', 4],
    ['../img/1041uuu/sakura.webp', 4],
    ['../img/1041uuu/schoolgirls.webp', 4],
    ['../img/1041uuu/smallroom.webp', 4],
    ['../img/1041uuu/soda.webp', 4],
    ['../img/1041uuu/sushibar.webp', 4],
    ['../img/1041uuu/techgirl.webp', 4],
    ['../img/1041uuu/train.webp', 4],
    ['../img/1041uuu/wintertrain.webp', 4],
    ['../img/pixeljeff/animalcrossing.webp', 5],
    ['../img/pixeljeff/apartments.webp', 5],
    ['../img/pixeljeff/busstop.webp', 5],
    ['../img/pixeljeff/catstairs.webp', 5],
    ['../img/pixeljeff/chillday.webp', 5],
    ['../img/pixeljeff/chillnap.webp', 5],
    ['../img/pixeljeff/christmas.webp', 5],
    ['../img/pixeljeff/coffeeshop.webp', 5],
    ['../img/pixeljeff/coldlove.webp', 5],
    ['../img/pixeljeff/datenight.webp', 5],
    ['../img/pixeljeff/futurepark.webp', 5],
    ['../img/pixeljeff/girlflood.webp', 5],
    ['../img/pixeljeff/hacker.webp', 5],
    ['../img/pixeljeff/halloween.webp', 5],
    ['../img/pixeljeff/halloweentwo.webp', 5],
    ['../img/pixeljeff/icecream.webp', 5],
    ['../img/pixeljeff/japanroom.webp', 5],
    ['../img/pixeljeff/lunarfestival.webp', 5],
    ['../img/pixeljeff/mariogamer.webp', 5],
    ['../img/pixeljeff/oldguyandtrash.webp', 5],
    ['../img/pixeljeff/rainyday.webp', 5],
    ['../img/pixeljeff/ramenshop.webp', 5],
    ['../img/pixeljeff/roadsidestore.webp', 5],
    ['../img/pixeljeff/rogfuture.webp', 5],
    ['../img/pixeljeff/sexy.webp', 5],
    ['../img/pixeljeff/shrine.webp', 5],
    ['../img/pixeljeff/starwars.webp', 5],
    ['../img/pixeljeff/storesleep.webp', 5],
    ['../img/pixeljeff/streetfood.webp', 5],
    ['../img/pixeljeff/videogame.webp', 5],
    ['../img/pixeljeff/wallcat.webp', 5],
    ['../img/pixeljeff/zombiethriller.webp', 5]
];


function main() {
    setUpModal();
    setupUserSettings();
    setRandomImage();
    let cur_time = gettime();
    getgreeting(cur_time);
    time = setInterval(gettime, 5000);
    shortcuts();
}

function getRandomImage() {
    img_number = Math.floor(Math.random() * images.length);
    return images[img_number];
}

function setRandomImage() {
    image = getRandomImage();
    document.getElementById("showcase").style.backgroundImage = "url('" + image[0] + "')";
    updateArtistAttr(image);
}

function setImageNum(Num) {
    if (Num < number_of_imgs && Num > 0) {
        document.getElementById("showcase").style.backgroundImage = "url('" + images[Num][0] + "')";
        updateArtistAttr(images[Num]);
    }
}

function updateArtistAttr(imageObj) {
    artists_id = imageObj[1]
    document.getElementById("author").innerHTML = artists[artists_id][0];
    document.getElementById("author").href = artists[artists_id][1];
}

function nextImage() {
    img_number++;
    if (img_number >= images.length) {
        img_number = 0;
    }
    setImageNum(img_number);
}

function previousImage() {
    img_number--;
    if (img_number < 0) {
        img_number = number_of_imgs - 1;
    }
    setImageNum(img_number);
}

function shortcuts() {
    document.addEventListener('keydown', function (event) {
        console.log(event.key);
        if (event.key === '`') {
            setRandomImage();
        } else if (event.key == 'ArrowRight') {
            if (user_settings.random_seek) {
                setRandomImage();
            } else {
                nextImage();
            }
        } else if (event.key == 'ArrowLeft') {
            if (user_settings.random_seek) {
                setRandomImage();
            } else {
                previousImage();
            }
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
    if (!modal_active) {
        window.open(link, tab);
    }

}

function add_shortcut(key, site) {
    shortcutmap.set(key, site);
}

function settingsModelContent() {

    let html_to_insert = ""


    shortcutmap.forEach((value, key) => {
        html_to_insert += "<input value='" + key + "' class='shortcutkey'> <input value='" + value + "' class='shortcutvalue'>"
    })
    document.getElementById("modaltext").innerHTML = html_to_insert;

}

function helpModelContent() {
    document.getElementById("modaltext").innerHTML = "<p> By <a href='https://github.com/arces' target='_blank'>Dan Janes</a> and <a href='https://github.com/taeganwarren' target='_blank'> Taegan Warren</a></p>" +
        "<br><p>Inspired by 8bitdash.com When the site stopped working a year or so back, we decided to make our own. After a long break we are back and active.</p>" +
        "<br><p><div id='versionnumber'>Version 1.0</div></p>" +
        "<br><br>Want to get in contact? <a href='mailto:contact@8bitdashboard.com'>Have a new feature suggestion or want your art on here?</a>";
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
        modal_active = true;
    }

    document.getElementById("help").onclick = () => {
        modal.style.display = "block";
        helpModelContent();
        modal_active = true;
    }


// When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
        modal_active = false;
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modal_active = false;
        }
    }
}

function setupUserSettings() {
    if (local_storage_supported) {
        if (localStorage.user_settings == null) {
            user_settings = newUserSettings(false);
            localStorage.setItem("user_settings", JSON.stringify(user_settings));

        } else {
            let tmp_settings = JSON.parse(localStorage.getItem("user_settings"))
            if (tmp_settings.version >= save_version) {
                user_settings = tmp_settings;
            } else {
                let tmp_version = tmp_settings.version;
                while (tmp_version < save_version) {
                    tmp_settings = upgradeUserSettings(tmp_version);
                    tmp_version = tmp_settings.version;
                }
                user_settings = tmp_settings;
            }
        }
    } else {
        //Do something in the future?
        newUserSettings(false);
        console.log("Local Storage support: " + local_storage_supported);
    }
}

function saveUserSettings() {
    if (local_storage_supported) {
        try {
            localStorage.setItem("user_settings", JSON.stringify(user_settings))
        } catch (e) {
            console.log(e);
            //Shit something went wrong, is it null?
        }
    }
}

function upgradeUserSettings(version) {
    if (version == 1) {
        //Do something in the future
    }
}

function applyUserSettings() {
    //Font color
    if(user_settings.hide_clock){
        document.getElementById("clock").style.display = "none";
    }else{
        document.getElementById("clock").style.color = user_settings.clock_color;
        if(user_settings.text_shadows){
            document.getElementById("clock").style.textShadow = "2px 2px 1px #000000" + user_settings.clock_color[-2];
        }
    }

    if(user_settings.hide_greetings){
        document.getElementById("greeting").style.display = "none";
    }else{
        document.getElementById("greeting").style.color = user_settings.greeting_color;
        if(user_settings.text_shadows){
            document.getElementById("greeting").style.textShadow = "2px 2px 1px #000000" + user_settings.greeting_color[-2];
        }
    }

    if(!user_settings.text_shadows){
        document.getElementById("clock").style.textShadow = "none"
        document.getElementById("greeting").style.textShadow = "none"
    }
    


}

function newUserSettings(returnstring) {
    let tmp_user_settings = new user_settings_obj(save_version, false, 5, 2, "#FFFFFFFF", "#FFFFFFFF", false, false, true)

    if (returnstring) {
        return JSON.stringify(tmp_user_settings);
    } else {
        return tmp_user_settings;
    }
}

var time;
var image;
var img_number;
var number_of_imgs = images.length;
var modal_active = false;
var user_settings = null;
const local_storage_supported = typeof (Storage) !== "undefined";
const save_version = 1

var user_settings_obj = class {
    constructor(save_version, random_seek, clock_font_size, greeting_font_size, clock_color, greeting_color, hide_greetings, hide_clock, text_shadows) {
        this.version = save_version;
        this.random_seek = random_seek;
        this.clock_font_size = clock_font_size;
        this.greetingfontsize = greeting_font_size;
        this.clock_color = clock_color;
        this.greeting_color = greeting_color;
        this.hide_greetings = hide_greetings;
        this.hide_clock = hide_clock;
        this.text_shadows = text_shadows;
    }
}
