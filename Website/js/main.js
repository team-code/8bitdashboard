//Main function being called
function main() {
    setUpModal();
    setupUserSettings();
    applyUserSettings();
    setRandomImage();
    let cur_time = getSetTime();
    setGreeting();
    time = setInterval(getSetTime, 5000);
    setInterval(timeToChangeGreeting, 5000, true);
    shortcuts();
}

//Returns a random Image url
function getRandomImage() {
    img_number = Math.floor(Math.random() * images.length);
    return images[img_number];
}

//Sets a random Image url
function setRandomImage() {
    image = getRandomImage();
    document.getElementById("showcase").style.backgroundImage = "url('" + image[0] + "')";
    updateArtistAttr(image);
}

//Sets Image based off a given number
function setImageNum(Num) {
    if (Num < number_of_imgs && Num > 0) {
        img_number = Num;
        document.getElementById("showcase").style.backgroundImage = "url('" + images[Num][0] + "')";
        updateArtistAttr(images[Num]);
    }
}

//Updates the artists attribution
function updateArtistAttr(imageObj) {
    artists_id = imageObj[1]
    document.getElementById("author").innerHTML = artists[artists_id][0];
    document.getElementById("author").href = artists[artists_id][1];
}

//Goes to the next image in the arr
function nextImage() {
    img_number++;
    if (img_number >= images.length) {
        img_number = 0;
    }
    setImageNum(img_number);
}

//Goes
function previousImage() {
    img_number--;
    if (img_number < 0) {
        img_number = number_of_imgs - 1;
    }
    setImageNum(img_number);
}

//Applys the shortcuts
function shortcuts() {
    document.addEventListener('keydown', function (event) {
        //console.log(event.key); //Debug
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
            for (let key of user_shortcut_map) {
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
    user_shortcut_map.set(key, site);
}

function newshortcut() {
    let shortcutvalues = document.getElementsByClassName("shortcutvaluespacer");
    shortcutvalues[shortcutvalues.length - 1].insertAdjacentHTML('afterend', "<input value='' class='shortcutkey left-side'> <input value='' class='shortcutvalue right-side'> <div class='wholeline'></div>");


}

function settingsModelContent() {

    //X mark
    let html_to_insert = "<div style='grid-column: span 11;'></div><span class=\"close\">&times;</span>"

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    //Shortcut settings
    html_to_insert += "<button type=\"button\" class=\"collapsible space12\">Shortcuts</button>\n" +
        "<div class=\"content container space12\"> <div class='wholeline'></div>\n"
    //Shortcuts
    user_shortcut_map.forEach((value, key) => {
        html_to_insert += "<input value='" + key + "' class='shortcutkey left-side'> <input value='" + value + "' class='shortcutvalue right-side'> <div class='wholeline shortcutvaluespacer'></div>"
    })
    //New Shortcut button
    html_to_insert += "<div class='wholeline'></div> " +
        "<button type=\"button\" class='space4 btn mobilefullsize' onclick='newshortcut()'>Add Shortcut</button> " +
        "<div class='space8'></div> "

    html_to_insert += "<div class='wholeline'></div> </div>" +
        "<div class='wholeline'></div> <div class='wholeline'></div>"
    /*End of shortcuts*/

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //Clock settings
    html_to_insert += "<button type=\"button\" class=\"collapsible space12\">Clock Settings</button>\n" +
        "<div class=\"content container space12\">\n"

    html_to_insert += "<div class='wholeline'></div> " +
        "<div class='left-side'>Clock Color: </div>" +
        "<input id='clockcolor' class='right-side' value=\"" + user_settings.clock_color + "\" data-jscolor=\"{}\">"

    //Show Clock
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Show Clock: </div> <div class='right-side'>" +
        "<label class=\"switch\">\ <input id='clockcheckmark' type=\"checkbox\">\ <span class=\"slider round\"></span>\ </label></div>"

    //24hr Clock
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>24hr Clock: </div> " +
        "<div class='right-side'><label class=\"switch\">\ <input id='24hrcheckmark' type=\"checkbox\">\ <span class=\"slider round\"></span>\ </label></div>"


    html_to_insert += "<div class='wholeline'></div> </div>"
    /*End of clock settings*/

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> "

    //Greetings settings
    html_to_insert += "<button type=\"button\" class=\"collapsible space12\">Greeting Settings</button>\n" +
        "<div class=\"content container space12\">\n"

    html_to_insert += "<div class='wholeline'></div> " +
        "<div class='left-side'>Greeting Color: </div> " +
        "<input id='greetingcolor' class='right-side' value=\"" + user_settings.greeting_color + "\" data-jscolor=\"{}\"> "

    //Show Greetings
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Show Greeting: </div> <div class='right-side'>" +
        "<label class=\"switch\">\ <input id='greetingscheckmark' type=\"checkbox\">\ <span class=\"slider round\"></span>\ </label></div>"

    html_to_insert += "<div class='wholeline'></div> </div>"
    /*End of greeting settings*/

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    //Text shadows
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Text Shadows: </div> " +
        "<div class='right-side'><label class=\"switch\">\ <input id='textshadowscheckmark' type=\"checkbox\">\ <span class=\"slider round\"></span>\ </label></div>"

    //Scrub Random Images
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Scrub Random Images: </div>" +
        "<div class='right-side'><label class=\"switch\">\ <input id='randomimagecheckmark' type=\"checkbox\">\ <span class=\"slider round\"></span>\ </label></div>"

    //Save and Reset Settings
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div>" +
        "<div class='space2 mobilefullsize'></div> <button type=\"button\" class='space3 btn mobilefullsize' onclick='saveBTN()'>Save</button>" +
        "<div class='space2 mobilefullsize'></div>" +
        "<button type=\"button\" class='space3 btn mobilefullsize' onclick='resetUserSettings(true);closemodel()'>Reset Settings</button>" +
        "<div class='space2 mobilefullsize'></div> " +
        "<div class='wholeline'>"


    //Insert
    document.getElementById("modaltext").innerHTML = html_to_insert;

    //Change settings
    if (!user_settings.hide_greetings) {
        document.getElementById("greetingscheckmark").setAttribute("checked", '')
    }
    if (user_settings.text_shadows) {
        document.getElementById("textshadowscheckmark").setAttribute("checked", '')
    }
    if (user_settings.random_seek) {
        document.getElementById("randomimagecheckmark").setAttribute("checked", '')
    }
    if (!user_settings.hide_clock) {
        document.getElementById("clockcheckmark").setAttribute("checked", '')
    }
    if (user_settings.clock24hr) {
        document.getElementById("24hrcheckmark").setAttribute("checked", '')
    }

    //Populate functions, colors, and Collapsible functionality
    jscolor.install();

    span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
        modal_active = false;
    }
    updateCollapsible();
}

//Inserts the info to the help model
function helpModelContent() {
    document.getElementById("modaltext").innerHTML = "<p class='space12'> By <a href='https://github.com/arces' target='_blank'>Dan Janes</a>  ( with some help from <a href='https://github.com/taeganwarren' target='_blank'> Taegan Warren</a> )</p>" +
        "<br class='wholeline'><p class='space12'>Inspired by 8bitdash.com When the site stopped working a year or so back, we decided to make our own. After a long break we are back and active.</p>" +
        "<br class='wholeline'><p class='space12'>App Version: " + app_version_num + "</p>" +
        "<br class='wholeline'><p class='space12'>Save Version: " + app_save_version + "</p>" +
        "<br class='wholeline'><br class='wholeline'> <p class='space12'>Want to get in contact? <a href='mailto:contact@8bitdashboard.com'>Have a new feature suggestion or want your art on here?</a> </p>";
}

//Saves the users settings and applies them
function saveBTN() {
    //Loop for shortcuts
    user_settings.hide_greetings = !(document.getElementById("greetingscheckmark").checked);
    user_settings.hide_clock = !(document.getElementById("clockcheckmark").checked);
    user_settings.text_shadows = document.getElementById("textshadowscheckmark").checked;
    user_settings.random_seek = document.getElementById("randomimagecheckmark").checked;
    user_settings.clock_color = document.getElementById("clockcolor").value;
    user_settings.greeting_color = document.getElementById("greetingcolor").value;
    user_settings.clock24hr = document.getElementById("24hrcheckmark").checked;

    let shortcut_urls = document.getElementsByClassName("shortcutvalue");
    let shortcut_keys = document.getElementsByClassName("shortcutkey");
    user_shortcut_map = new Map();
    for (let i = 0; i < shortcut_keys.length; i++) {
        let key = shortcut_keys[i];
        let url = shortcut_urls[i];

        if (key.value.length === 1) {
            user_shortcut_map.set(key.value, url.value);
        }
    }

    saveUserSettings();
    applyUserSettings();
    closemodel();
}


//Sets up the modal functionality
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
        closemodel();
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modal_active = false;
        }
    }
}


//Updates the collapsibles with their click functionality
function updateCollapsible() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "grid") {
                content.style.display = "none";
            } else {
                content.style.display = "grid";
            }
        });
    }
}

//Closes the model
function closemodel() {
    modal.style.display = "none";
    modal_active = false;
}

//Create/load user settings
function setupUserSettings() {
    if (local_storage_supported) {
        //If no saved settings then create new ones
        if (localStorage.user_settings == null) {
            user_settings = newUserSettings(false);
            localStorage.setItem("user_settings", JSON.stringify(user_settings));

        } else {
            //Load the users settings and shortcuts if they have it
            user_shortcut_map = new Map();
            let tmp_settings = JSON.parse(localStorage.getItem("user_settings"))
            if (tmp_settings.version >= app_save_version) {
                user_settings = tmp_settings;

                tmp_settings.users_shortcuts.map((x) => {
                    user_shortcut_map.set(x.name, x.value)
                })
            } else {
                let tmp_version = tmp_settings.version;
                while (tmp_version < app_save_version) {
                    tmp_settings = upgradeUserSettings(tmp_version);
                    tmp_version = tmp_settings.version;
                }
                user_settings = tmp_settings;
                tmp_settings.users_shortcuts.map((x) => {
                    user_shortcut_map.set(x.name, x.value)
                })
            }

        }
    } else {
        //Do something in the future?
        newUserSettings(false);
        console.log("Local Storage support: " + local_storage_supported);
    }
}

//Saves the users settings
function saveUserSettings() {
    if (local_storage_supported) {
        user_settings.users_shortcuts = Array.from(user_shortcut_map, ([name, value]) => ({name, value}));
        try {
            localStorage.setItem("user_settings", JSON.stringify(user_settings))
        } catch (e) {
            console.log(e);
            //Shit something went wrong, is it null?
        }
    }
}

//Resets a users settings
function resetUserSettings(prompt = false) {
    if (local_storage_supported) {
        if (prompt) {
            let response = confirm("Are you sure you want to reset all settings?")
            if (!response) {
                return;
            }
        }
        user_settings = newUserSettings(false);
        user_shortcut_map = default_shortcut_map
        saveUserSettings();
        applyUserSettings();
    }

}

//Upgrades the user settings to a new version
function upgradeUserSettings(version) {
    if (version == 1) {
        //Do something in the future
    }
}

//Applies the users settings
function applyUserSettings() {
    //Font color
    if (user_settings.hide_clock) {
        document.getElementById("clock").style.display = "none";
    } else {
        document.getElementById("clock").style.display = "block";
        document.getElementById("clock").style.color = user_settings.clock_color;
        if (user_settings.text_shadows) {
            document.getElementById("clock").style.textShadow = "2px 2px 1px #000000" + user_settings.clock_color[-2];
            document.getElementById("clock").style.textShadow = "block"
        } else {
            document.getElementById("clock").style.textShadow = "none"
        }
    }

    if (user_settings.hide_greetings) {
        document.getElementById("greeting").style.display = "none";
    } else {
        document.getElementById("greeting").style.display = "block";
        document.getElementById("greeting").style.color = user_settings.greeting_color;
        if (user_settings.text_shadows) {
            document.getElementById("greeting").style.textShadow = "2px 2px 1px #000000" + user_settings.greeting_color[-2];
            document.getElementById("greeting").style.textShadow = "block"
        } else {
            document.getElementById("greeting").style.textShadow = "none"
        }
    }

    getSetTime();
}

//Creates a new user with default settings, can return a string version of it if passed true
function newUserSettings(returnstring = false) {
    let shortcut_arr = Array.from(user_shortcut_map, ([name, value]) => ({name, value}));
    let tmp_user_settings = new user_settings_obj(shortcut_arr)

    if (returnstring) {
        return JSON.stringify(tmp_user_settings);
    } else {
        return tmp_user_settings;
    }
}

//Settings and vars
var time;
var image;
var img_number;
var number_of_imgs = images.length;
var modal_active = false;
var user_settings = null;
const local_storage_supported = typeof (Storage) !== "undefined";
const app_save_version = 1
const app_version_num = 1

var user_settings_obj = class {
    constructor(users_shortcuts, save_version = app_save_version, random_seek = false, clock_font_size = 5, greeting_font_size = 2, clock_color = "#FFFFFFFF", greeting_color = "#FFFFFFFF", hide_greetings = false, hide_clock = false, text_shadows = true, clock24hr = false) {
        this.version = save_version;
        this.random_seek = random_seek;
        this.clock_font_size = clock_font_size;
        this.greetingfontsize = greeting_font_size;
        this.clock_color = clock_color;
        this.greeting_color = greeting_color;
        this.hide_greetings = hide_greetings;
        this.hide_clock = hide_clock;
        this.text_shadows = text_shadows;
        this.users_shortcuts = users_shortcuts
        this.clock24hr = clock24hr
    }
};




