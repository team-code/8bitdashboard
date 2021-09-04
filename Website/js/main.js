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

/*
*********************************************************************************
*
*
* High Traffic/Important/Most used functions
*
*
*********************************************************************************
 */

function settingsModelContent() {

    //X mark
    let html_to_insert = "<div style='grid-column: span 11;'></div><span class='close'>&times;</span>"

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    //Shortcut settings
    html_to_insert += "<button type='button' class='collapsible space12'>Shortcuts</button>\n" +
        "<div class='content container space12'> <div class='wholeline'></div>\n"
    //Shortcuts
    user_shortcut_map.forEach((value, key) => {
        html_to_insert += "<input value='" + key + "' class='shortcutkey left-side'> <input value='" + value + "' class='shortcutvalue right-side'> <div class='wholeline shortcutvaluespacer'></div>"
    })
    //New Shortcut button
    html_to_insert += "<div class='wholeline'></div> " +
        "<button type='button' class='space4 btn mobilefullsize' onclick='newshortcut()'>Add Shortcut</button> " +
        "<div class='space8'></div> "

    html_to_insert += "<div class='wholeline'></div> </div>" +
        "<div class='wholeline'></div> <div class='wholeline'></div>"
    /*End of shortcuts*/

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //Clock settings
    html_to_insert += "<button type='button' class='collapsible space12'>Clock</button>\n" +
        "<div class='content container space12'>\n"

    html_to_insert += "<div class='wholeline'></div> " +
        "<div class='left-side'>Clock Color: </div>" +
        "<input id='clockcolor' class='right-side' value='" + user_settings.clock_color + "' data-jscolor='{}'>"

    //Show Clock
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Show Clock: </div> <div class='right-side'>" +
        "<label class='switch'>\ <input id='clockcheckmark' type='checkbox'>\ <span class='slider round'></span>\ </label></div>"

    //24hr Clock
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>24hr Clock: </div> " +
        "<div class='right-side'><label class='switch'>\ <input id='24hrcheckmark' type='checkbox'>\ <span class='slider round'></span>\ </label></div>"


    html_to_insert += "<div class='wholeline'></div> </div>"
    /*End of clock settings*/

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> "

    //Greetings settings
    html_to_insert += "<button type='button' class='collapsible space12'>Greeting</button>\n" +
        "<div class='content container space12'>\n"

    //Greetings Color
    html_to_insert += "<div class='wholeline'></div> " +
        "<div class='left-side'>Greeting Color: </div> " +
        "<input id='greetingcolor' class='right-side' value='" + user_settings.greeting_color + "' data-jscolor='{}'> "

    //Show Greetings
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Show Greeting: </div> <div class='right-side'>" +
        "<label class='switch'>\ <input id='greetingscheckmark' type='checkbox'>\ <span class='slider round'></span>\ </label></div>"

    html_to_insert += "<div class='wholeline'></div> </div>"
    /*End of greeting settings*/

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> "

    //Background settings
    html_to_insert += "<button type='button' class='collapsible space12'>Background</button>\n" +
        "<div class='content container space12'>\n"

    //Scrub Random Images
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Scrub Random Images: </div>" +
        "<div class='right-side'><label class='switch'>\ <input id='randomimagecheckmark' type='checkbox'>\ <span class='slider round'></span>\ </label></div>"

    //Auto Change Background
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Auto Change Background: </div> " +
        "<div class='right-side'><label class='switch'>\ <input id='autochangebackgroundcheckmark' type='checkbox'>\ <span class='slider round'></span>\ </label></div>"

    //Change in minutes
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side' id='autochangeminutesleft'>Change every X mins: </div> " +
        "<div class='right-side' id='autochangeminutesright'><input type='number' id='changeminutesinput' class='numinput' name='quantity' min='.5' max='1440' step='.5' value='1' onfocusout='validateinput(changeminutesinput)'></div>"

    html_to_insert += "<div class='wholeline'></div> </div>"
    /*End of Background settings*/


    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> "

    //Accessibility settings
    html_to_insert += "<button type='button' class='collapsible space12'>Accessibility</button>\n" +
        "<div class='content container space12'>\n"

    //Text shadows
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Text Shadows: </div> " +
        "<div class='right-side'><label class='switch'>\ <input id='textshadowscheckmark' type='checkbox'>\ <span class='slider round'></span>\ </label></div>"

    //Clock Size
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Clock Size: </div> " +
        "<div class='right-side'><input type='number' id='clockfontsize' class='numinput' name='quantity' min='.5' max='3' step='.1' value='1' onfocusout='validateinput(clockfontsize)'></div>"

    //Greeting Size
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div> " +
        "<div class='left-side'>Greeting Size: </div> " +
        "<div class='right-side'><input type='number' id='greetingfontsize' class='numinput' name='quantity' min='.5' max='3' step='.1' value='1' onfocusout='validateinput(greetingfontsize)'></div>"


    html_to_insert += "<div class='wholeline'></div> </div>"
    /*End of Accessibility settings*/


    //Save and Reset Settings
    html_to_insert += "<div class='wholeline'></div><div class='wholeline'></div>" +
        "<div class='space2 mobilefullsize'></div> <button type='button' class='space3 btn mobilefullsize' onclick='saveBTN()'>Save</button>" +
        "<div class='space2 mobilefullsize'></div>" +
        "<button type='button' class='space3 btn mobilefullsize' onclick='resetUserSettings(true);closemodel()'>Reset Settings</button>" +
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
    if (user_settings.autochangebackground) {
        document.getElementById("autochangebackgroundcheckmark").setAttribute("checked", '')
    }

    document.getElementById("clockfontsize").value = user_settings.clock_font_size;
    document.getElementById("changeminutesinput").value = user_settings.autobackgroundtime;
    document.getElementById("greetingfontsize").value = user_settings.greetingfontsize;
    //Populate functions, colors, and Collapsible functionality
    jscolor.install();

    //Check to see if it is disabled
    if(!document.getElementById("autochangebackgroundcheckmark").checked){
        document.getElementById("autochangeminutesleft").style.display = "none";
        document.getElementById("autochangeminutesright").style.display = "none";
    }

    //Add event listener to toggle the change every minutes if it is not enabled
    document.getElementById("autochangebackgroundcheckmark").addEventListener('change', function() {
        if(document.getElementById("autochangebackgroundcheckmark").checked){
            document.getElementById("autochangeminutesleft").style.display = "block";
            document.getElementById("autochangeminutesright").style.display = "block";
        }else{
            document.getElementById("autochangeminutesleft").style.display = "none";
            document.getElementById("autochangeminutesright").style.display = "none";
        }
    });


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
    user_settings.autochangebackground = document.getElementById("autochangebackgroundcheckmark").checked;
    validateinput(document.getElementById("changeminutesinput"));
    user_settings.autobackgroundtime = document.getElementById("changeminutesinput").value;
    validateinput(document.getElementById("clockfontsize"));
    user_settings.clock_font_size = document.getElementById("clockfontsize").value;
    validateinput(document.getElementById("greetingfontsize"));
    user_settings.greetingfontsize = document.getElementById("greetingfontsize").value;

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

//Applies the users settings
function applyUserSettings() {
    //Clock
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
    //Clock Font Size
    let tmp_font_size = user_settings.clock_font_size * default_clock_font_size
    document.getElementById("clock").style.fontSize = tmp_font_size + "em";


    //Greetings
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
    //Greetings Font Size
    tmp_font_size = user_settings.greetingfontsize * default_greeting_font_size;
    document.getElementById("greeting").style.fontSize = tmp_font_size + "em";


    //Background auto changer
    autoChangeBackground();

    if (true) {

    }

    getSetTime();
}


/*
*********************************************************************************
*
*
* Helper functions
*
*
*********************************************************************************
 */

function validateinput(inputid) {
    let idname = inputid.id;
    if (idname == "changeminutesinput") {
        let tmpelement = document.getElementById("changeminutesinput");
        let tmpvalue = tmpelement.value;
        if (tmpvalue > 1440) {
            tmpelement.value = 1440;
        } else if (tmpvalue < .5) {
            tmpelement.value = .5;
        }
    } else if (idname == "greetingfontsize") {
        let tmpelement = document.getElementById("greetingfontsize");
        let tmpvalue = tmpelement.value;
        if (tmpvalue > 3) {
            tmpelement.value = 3;
        } else if (tmpvalue < .5) {
            tmpelement.value = .5;
        }
    } else if (idname == "clockfontsize") {
        let tmpelement = document.getElementById("clockfontsize");
        let tmpvalue = tmpelement.value;
        if (tmpvalue > 3) {
            tmpelement.value = 3;
        } else if (tmpvalue < .5) {
            tmpelement.value = .5;
        }
    }
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

function openlink(link, tab) {
    if (!modal_active) {
        window.open(link, tab);
    }
}

function newshortcut() {
    let shortcutvalues = document.getElementsByClassName("shortcutvaluespacer");
    shortcutvalues[shortcutvalues.length - 1].insertAdjacentHTML('afterend', "<input value='' class='shortcutkey left-side'> <input value='' class='shortcutvalue right-side'> <div class='wholeline'></div>");
}


//Applys the shortcuts
function shortcuts() {
    //Mobile/touch targets
    document.getElementById("right_touch_target").addEventListener('touchstart', function (event) {
        if (user_settings.random_seek) {
            setRandomImage();
        } else {
            nextImage();
        }
    })
    document.getElementById("left_touch_target").addEventListener('touchstart', function (event) {
        if (user_settings.random_seek) {
            setRandomImage();
        } else {
            previousImage();
        }
    })

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


//Call it any time you want to check to see if you should set the Background auto changer
function autoChangeBackground(override = false, minutes = 1) {

    //Manual Turn on
    if (override == true) {
        let interval_time = minutes * 1000 * 60;
        clearInterval(background_auto_change_interval);
        setInterval(autoChangeBackgroundWorker, interval_time);
    } else {
        //To Turn on
        if ((user_settings.autobackgroundtime != auto_change_background_time || user_settings.autochangebackground != auto_change_background_active) && user_settings.autochangebackground == true) {
            auto_change_background_active = user_settings.autochangebackground;
            auto_change_background_time = user_settings.autobackgroundtime;
            let interval_time = auto_change_background_time * 1000 * 60;
            clearInterval(background_auto_change_interval);
            setInterval(autoChangeBackgroundWorker, interval_time);
            //To Turn off
        }else if(user_settings.autochangebackground == false){
            clearInterval(background_auto_change_interval);
        }
    }
}

//A function that will change the background until it is stopped. Lives in the Var background_auto_change_interval
function autoChangeBackgroundWorker() {
    if (user_settings.random_seek) {
        setRandomImage();
    } else {
        nextImage();
    }
}

function add_shortcut(key, site) {
    user_shortcut_map.set(key, site);
}


/*
*********************************************************************************
*
*
* User data related functions
*
*
*********************************************************************************
 */


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

function resetVarsToDefault() {
    auto_change_background_active = false;
    auto_change_background_time = 0;
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
                    tmp_settings = upgradeUserSettings(tmp_version,tmp_settings);
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
        resetVarsToDefault();
        saveUserSettings();
        applyUserSettings();
    }

}

//Upgrades the user settings to a new version
function upgradeUserSettings(version, user_settings) {
    if (version == 1) {
        //Do something in the future
        user_settings.clock_font_size = 1;
        user_settings.greetingfontsize = 1;
        user_settings.autochangebackgroundtime = 1;
        user_settings.autochangebackground = false;
        user_settings.version = 1.1;
        return user_settings;
    }
}

function encodeUserSettings2048(saveshortcuts = false) {
    var enc = new TextEncoder();
    let encoded = null;
    if (saveshortcuts) {
        user_settings.users_shortcuts = Array.from(user_shortcut_map, ([name, value]) => ({name, value}));
        encoded = encode(enc.encode(JSON.stringify(user_settings)));
    } else {
        let tmp = user_settings;
        tmp.users_shortcuts = null;
        encoded = encode(enc.encode(JSON.stringify(tmp)));
    }

    return encoded;
}

function decodeUserSettings2048(encodedSettings){

    let string = new TextDecoder().decode(decode(encodedSettings));
    let tmp_settings = JSON.parse(string);

}


