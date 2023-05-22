//Main function being called,

function main() {
  setUpModal();
  setRandomImage();
  setupUserSettings();
  getSetTime();
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
  let html_to_insert =
    "<div style='grid-column: span 11;'></div><span class='close'>&times;</span>";

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //Shortcut settings
  html_to_insert +=
    "<button type='button' class='collapsible space12'>Shortcuts</button>\n" +
    "<div class='content container space12'> <div class='wholeline shortcutvaluespacer'></div>\n";
  //Shortcuts
  user_shortcut_map.forEach((value, key) => {
    html_to_insert +=
      "<input value='" +
      key +
      "' class='shortcutkey left-side' title='Shortcut Key'> <input value='" +
      value +
      "' class='shortcutvalue' title='Shortcut Website'> <div class='X-button' onclick='delete_shortcut(this)'>X</div> <div class='wholeline shortcutvaluespacer'></div>";
  });
  //New Shortcut button
  html_to_insert +=
    "<div class='wholeline'></div> " +
    "<button type='button' class='space4 btn mobilefullsize' onclick='newshortcut()' title='Add shortcut button'>Add Shortcut</button> " +
    "<div class='space8'></div> ";

  html_to_insert +=
    "<div class='wholeline'></div> </div>" +
    "<div class='wholeline'></div> <div class='wholeline'></div>";
  /*End of shortcuts*/

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //Clock settings
  html_to_insert +=
    "<button type='button' class='collapsible space12' title='Clock settings'>Clock</button>\n" +
    "<div class='content container space12'>\n";

  html_to_insert +=
    "<div class='wholeline'></div> " +
    "<div class='left-side'>Clock Color: </div>" +
    "<input id='clockcolor' class='right-side' value='" +
    user_settings.clock_color +
    "' data-jscolor='{}' title='Color of the clock'>";

  //Show Clock
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Show Clock: </div> <div class='right-side'>" +
    "<label class='switch'> <input id='clockcheckmark' type='checkbox' > <span class='slider round' title='Show the clock or not'></span> </label></div>";

  //24hr Clock
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>24hr Clock: </div> " +
    "<div class='right-side'><label class='switch'> <input id='24hrcheckmark' type='checkbox'> <span class='slider round' title='24 hour clock'></span> </label></div>";

  html_to_insert += "<div class='wholeline'></div> </div>";
  /*End of clock settings*/

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> ";

  //Greetings settings
  html_to_insert +=
    "<button type='button' class='collapsible space12' title='Greeting settings'>Greeting</button>\n" +
    "<div class='content container space12'>\n";

  //Greetings Color
  html_to_insert +=
    "<div class='wholeline'></div> " +
    "<div class='left-side'>Greeting Color: </div> " +
    "<input id='greetingcolor' class='right-side' value='" +
    user_settings.greeting_color +
    "' data-jscolor='{}' title='Greeting color'> ";

  //Show Greetings
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Show Greeting: </div> <div class='right-side'>" +
    "<label class='switch'> <input id='greetingscheckmark' type='checkbox'> <span class='slider round' title='Show the greeting'></span> </label></div>";

  html_to_insert += "<div class='wholeline'></div> </div>";
  /*End of greeting settings*/

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> ";

  //Background settings
  html_to_insert +=
    "<button type='button' class='collapsible space12' title='Settings related to the background images'>Background</button>\n" +
    "<div class='content container space12'>\n";

  //Scrub Random Images
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Scrub Random Images: </div>" +
    "<div class='right-side'><label class='switch'> <input id='randomimagecheckmark' type='checkbox'> <span class='slider round' title='Images are random when using arrow keys'></span> </label></div>";

  //Auto Change Background
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Auto Change Background: </div> " +
    "<div class='right-side'><label class='switch'> <input id='autochangebackgroundcheckmark' type='checkbox'> <span class='slider round' title='Change the background automatically'></span> </label></div>";

  //Change in minutes
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side' id='autochangeminutesleft'>Change every X mins: </div> " +
    "<div class='right-side' id='autochangeminutesright'><input type='number' id='changeminutesinput' class='numinput' name='quantity' min='.5' max='1440' step='.5' value='1' onfocusout='validateinput(this)' title='The number of minutes before the background changes'></div>";

  //Static startup background
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Start up background: </div> " +
    "<div class='right-side'><label class='switch'> <input id='startupbackgroundcheckmark' type='checkbox'> <span class='slider round' title='Sets the background on startup to the same image every time'></span> </label></div>";

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Start up image: </div> " +
    "<div class='right-side'><input type='number' id='startupimageinput'  class='numinput' name='quantity' min='1' step='1' value='1' onchange='validateinput(this)' title='The image number you want to start on'></div>";

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Current Image Number: </div> " +
    "<div class='right-side'><div id='current_image_number'  title='Current Image Number'> </div></div>";

  html_to_insert += "<div class='wholeline'></div> </div>";
  /*End of Background settings*/

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> ";

  //Filter settings
  html_to_insert +=
    "<button type='button' class='collapsible space12' title='Background Filter settings'>Background Filters</button>\n" +
    "<div class='content container space12'>\n";

  //Filter on or off
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter 1: </div> " +
    "<div class='right-side'><label class='switch'> <input id='filterscheckmark1'  class='filtercheckmark' type='checkbox'> <span class='slider round' title='Turn filters on or off'></span> </label></div>";

  //Filter dropdown
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter 1: </div> " +
    "<div class='right-side'><select name='filterlist' class='filterlist' id='filterlist1' onchange=''>\n" +
    "    <option value='blur'>Blur</option>\n" +
    "    <option value='brightness'>Brightness</option>\n" +
    "    <option value='contrast'>Contrast</option>\n" +
    "    <option value='grayscale'>Grayscale</option>\n" +
    "    <option value='hue-rotate'>Hue Rotate</option>\n" +
    "    <option value='invert'>Invert</option>\n" +
    "    <option value='opacity'>Opacity</option>\n" +
    "    <option value='saturate'>Saturate</option>\n" +
    "    <option value='sepia'>Sepia</option>\n" +
    "  </select></div>";

  //Filter Strength
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter Strength 1: </div> " +
    "<div class='right-side'><input type='number' id='backgroundfilterstrength1' class='filterstrength numinput' class='numinput' name='quantity' min='1' max='100' step='1' value='1' onchange='validateinput(this)' title='Font size of the clock'></div>";

  //Filter on or off
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter 2: </div> " +
    "<div class='right-side'><label class='switch'> <input id='filterscheckmark2' class='filtercheckmark' type='checkbox'> <span class='slider round' title='Turn filters on or off'></span> </label></div>";

  //Filter dropdown
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter 2: </div> " +
    "<div class='right-side'><select name='filterlist'  class='filterlist' id='filterlist2' onchange=''>\n" +
    "    <option value='blur'>Blur</option>\n" +
    "    <option value='brightness'>Brightness</option>\n" +
    "    <option value='contrast'>Contrast</option>\n" +
    "    <option value='grayscale'>Grayscale</option>\n" +
    "    <option value='hue-rotate'>Hue Rotate</option>\n" +
    "    <option value='invert'>Invert</option>\n" +
    "    <option value='opacity'>Opacity</option>\n" +
    "    <option value='saturate'>Saturate</option>\n" +
    "    <option value='sepia'>Sepia</option>\n" +
    "  </select></div>";

  //Filter Strength
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter Strength 2: </div> " +
    "<div class='right-side'><input type='number' id='backgroundfilterstrength2' class='filterstrength numinput' class='numinput' name='quantity' min='1' max='100' step='1' value='1' onchange='validateinput(this)' title='Font size of the clock'></div>";

  //Filter on or off
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter 3: </div> " +
    "<div class='right-side'><label class='switch'> <input id='filterscheckmark3' class='filtercheckmark'  type='checkbox'> <span class='slider round' title='Turn filters on or off'></span> </label></div>";

  //Filter dropdown
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter 3: </div> " +
    "<div class='right-side'><select name='filterlist' class='filterlist' id='filterlist3' onchange=''>\n" +
    "    <option value='blur'>Blur</option>\n" +
    "    <option value='brightness'>Brightness</option>\n" +
    "    <option value='contrast'>Contrast</option>\n" +
    "    <option value='grayscale'>Grayscale</option>\n" +
    "    <option value='hue-rotate'>Hue Rotate</option>\n" +
    "    <option value='invert'>Invert</option>\n" +
    "    <option value='opacity'>Opacity</option>\n" +
    "    <option value='saturate'>Saturate</option>\n" +
    "    <option value='sepia'>Sepia</option>\n" +
    "  </select></div>";

  //Filter Strength
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Background Filter Strength 3: </div> " +
    "<div class='right-side'><input type='number' id='backgroundfilterstrength3' class='filterstrength numinput' class='numinput' name='quantity' min='1' max='100' step='1' value='1' onchange='validateinput(this)' title='Font size of the clock'></div>";

  html_to_insert += "<div class='wholeline'></div> </div>";
  /*End of background filter settings*/

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> ";

  //Accessibility settings
  html_to_insert +=
    "<button type='button' class='collapsible space12' title='Accessibility settings'>Accessibility</button>\n" +
    "<div class='content container space12'>\n";

  //Text shadows
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Text Shadows: </div> " +
    "<div class='right-side'><label class='switch'> <input id='textshadowscheckmark' type='checkbox'> <span class='slider round' title='Turn text shadows on or off'></span> </label></div>";

  //Clock Size
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Clock Size: </div> " +
    "<div class='right-side'><input type='number' id='clockfontsize' class='numinput' name='quantity' min='.5' max='3' step='.1' value='1' onfocusout='validateinput(this)' title='Font size of the clock'></div>";

  //Greeting Size
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Greeting Size: </div> " +
    "<div class='right-side'><input type='number' id='greetingfontsize' class='numinput' name='quantity' min='.5' max='3' step='.1' value='1' onfocusout='validateinput(this)' title='Font size of the greeting'></div>";

  html_to_insert += "<div class='wholeline'></div> </div>";
  /*End of Accessibility settings*/

  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> ";

  //Sharing settings
  html_to_insert +=
    "<button type='button' class='collapsible space12' title='Share your settings with others!'>Sharing</button>\n" +
    "<div class='content container space12'>\n";

  //Bookmark settings
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='left-side'>Share your shortcuts too: </div> " +
    "<div class='right-side'><label class='switch'> <input id='bookmarkscheckmark' type='checkbox'> <span class='slider round' title='Include your shortcuts too'></span> </label></div>";

  //URL settings
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div> " +
    "<div class='wholeline-autoheight'>Your settings URL: <input id='settingsurl' value='' class='full-width' readonly onclick=\"copyURL()\"> </div>" +
    '<span class="copyAlert wholeline-autoheight red-font">Copied to clipboard!</span>';

  html_to_insert += "<div class='wholeline'></div> </div>";
  /*End of Sharing settings*/

  //Save and Reset Settings
  html_to_insert +=
    "<div class='wholeline'></div><div class='wholeline'></div>" +
    "<div class='space2 mobilefullsize'></div> <button type='button' class='space3 btn mobilefullsize' onclick='saveBTN()'>Save</button>" +
    "<div class='space2 mobilefullsize'></div>" +
    "<button type='button' class='space3 btn mobilefullsize' onclick='resetUserSettings(true);closemodel()'>Reset Settings</button>" +
    "<div class='space2 mobilefullsize'></div> " +
    "<div class='wholeline'>";

  //Insert
  document.getElementById("modaltext").innerHTML = html_to_insert;

  //Populate functions, colors, and Collapsible functionality
  jscolor.install();

  span = document.getElementsByClassName("close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = "none";
    modal_active = false;
  };
  updateCollapsible();
  updateSettingsSettings();
}

//Updates the settings for the settings modal
function updateSettingsSettings() {
  //Change settings
  if (!user_settings.hide_greetings) {
    document.getElementById("greetingscheckmark").setAttribute("checked", "");
  }
  if (user_settings.text_shadows) {
    document.getElementById("textshadowscheckmark").setAttribute("checked", "");
  }
  if (user_settings.random_seek) {
    document.getElementById("randomimagecheckmark").setAttribute("checked", "");
  }
  if (!user_settings.hide_clock) {
    document.getElementById("clockcheckmark").setAttribute("checked", "");
  }
  if (user_settings.clock24hr) {
    document.getElementById("24hrcheckmark").setAttribute("checked", "");
  }
  if (user_settings.autochangebackground) {
    document
      .getElementById("autochangebackgroundcheckmark")
      .setAttribute("checked", "");
  }

  //Get all background filter yes or nos
  user_settings.backgroundfilter.forEach((x, i) => {
    if (x) {
      document
        .getElementById("filterscheckmark" + (i + 1))
        .setAttribute("checked", "");
    }
  });

  //Get all background filter options
  user_settings.backgroundfilterpick.forEach((x, i) => {
    document.getElementById("filterlist" + (i + 1)).value = x;
  });

  //Get all background filter strengths
  user_settings.backgroundfilterstrength.forEach((x, i) => {
    document.getElementById("backgroundfilterstrength" + (i + 1)).value = x;
  });

  //Start up image options
  if (user_settings.staticbackground) {
    document
      .getElementById("startupbackgroundcheckmark")
      .setAttribute("checked", "");
  }
  document.getElementById("startupimageinput").value =
    user_settings.staticbackgroundid;
  document.getElementById("current_image_number").innerHTML = img_number;

  document.getElementById("clockfontsize").value =
    user_settings.clock_font_size;
  document.getElementById("changeminutesinput").value =
    user_settings.autobackgroundtime;
  document.getElementById("greetingfontsize").value =
    user_settings.greetingfontsize;

  //Check to see if it is disabled
  if (!document.getElementById("autochangebackgroundcheckmark").checked) {
    document.getElementById("autochangeminutesleft").style.display = "none";
    document.getElementById("autochangeminutesright").style.display = "none";
  }

  //Add event listener to toggle the change every minutes if it is not enabled
  document
    .getElementById("autochangebackgroundcheckmark")
    .addEventListener("change", function () {
      if (document.getElementById("autochangebackgroundcheckmark").checked) {
        document.getElementById("autochangeminutesleft").style.display =
          "block";
        document.getElementById("autochangeminutesright").style.display =
          "block";
      } else {
        document.getElementById("autochangeminutesleft").style.display = "none";
        document.getElementById("autochangeminutesright").style.display =
          "none";
      }
    });
  document
    .getElementById("bookmarkscheckmark")
    .addEventListener("change", function () {
      updateSettingsURLInput();
    });

  updateSettingsURLInput();
}

//Will update the URL input box with the url with their settings
function updateSettingsURLInput() {
  let save_user_settings =
    document.getElementById("bookmarkscheckmark").checked;
  document.getElementById("settingsurl").value =
    "https://8bitdashboard.com/?s=" + encodeUserSettings(save_user_settings);
}

function copyURL() {
  let input_element = document.getElementById("settingsurl");
  navigator.clipboard.writeText(input_element.value);

  const copyDiv = document.querySelector(".copyAlert:not(.animate)");
  if (copyDiv) {
    copyDiv.classList.add("animate");
    copyDiv.addEventListener("animationend", () =>
      copyDiv.classList.remove("animate")
    );
  }

  //Weird hack where we need to deselect then reselect
  window.getSelection().removeAllRanges();
  input_element.focus();
  input_element.select();
}

//Inserts the info to the help model
function helpModelContent() {
  document.getElementById("modaltext").innerHTML =
    "<p class='space12'> By <a href='https://github.com/arces' target='_blank'>Dan Janes</a>  ( with some help from <a href='https://github.com/taeganwarren' target='_blank'> Taegan Warren</a> )</p>" +
    "<br class='wholeline'><p class='space12'>Inspired by 8bitdash.com When the site stopped working a year or so back, we decided to make our own. After a long break we are back and active.</p>" +
    "<br class='wholeline'><p class='space12'>No Ads!  No Tracking!  Just 8 bit backgrounds!     (Unlike 8bitdash.com ;P Sorry not sorry)</p>" +
    "<br class='wholeline'><p class='space12'>App Version: " +
    app_version_num +
    "</p>" +
    "<br class='wholeline'><p class='space12'>Save Version: " +
    app_save_version +
    "</p>" +
    "<br class='wholeline'><br class='wholeline'> <p class='space12'>Want to get in contact? <a href='mailto:contact@8bitdashboard.com'>Have a new feature suggestion or want your art on here?</a> </p>";
}

//Saves the users settings and applies them
function saveBTN() {
  //Loop for shortcuts
  user_settings.hide_greetings =
    !document.getElementById("greetingscheckmark").checked;
  user_settings.hide_clock = !document.getElementById("clockcheckmark").checked;
  user_settings.text_shadows = document.getElementById(
    "textshadowscheckmark"
  ).checked;
  user_settings.random_seek = document.getElementById(
    "randomimagecheckmark"
  ).checked;
  user_settings.clock_color = document.getElementById("clockcolor").value;
  user_settings.greeting_color = document.getElementById("greetingcolor").value;
  user_settings.clock24hr = document.getElementById("24hrcheckmark").checked;
  user_settings.autochangebackground = document.getElementById(
    "autochangebackgroundcheckmark"
  ).checked;
  validateinput(document.getElementById("changeminutesinput"));
  user_settings.autobackgroundtime =
    document.getElementById("changeminutesinput").value;
  validateinput(document.getElementById("clockfontsize"));
  user_settings.clock_font_size =
    document.getElementById("clockfontsize").value;
  validateinput(document.getElementById("greetingfontsize"));
  user_settings.greetingfontsize =
    document.getElementById("greetingfontsize").value;
  user_settings.backgroundfilter = [
    document.getElementById("filterscheckmark1").checked,
    document.getElementById("filterscheckmark2").checked,
    document.getElementById("filterscheckmark3").checked,
  ];
  user_settings.backgroundfilterpick = [
    document.getElementById("filterlist1").value,
    document.getElementById("filterlist2").value,
    document.getElementById("filterlist3").value,
  ];
  user_settings.backgroundfilterstrength = [
    document.getElementById("backgroundfilterstrength1").value,
    document.getElementById("backgroundfilterstrength2").value,
    document.getElementById("backgroundfilterstrength3").value,
  ];
  user_settings.staticbackground = document.getElementById(
    "startupbackgroundcheckmark"
  ).checked;
  user_settings.staticbackgroundid =
    document.getElementById("startupimageinput").value;

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
      document.getElementById("clock").style.textShadow =
        "2px 2px 1px #000000" + user_settings.clock_color[-2];
      document.getElementById("clock").style.textShadow = "block";
    } else {
      document.getElementById("clock").style.textShadow = "none";
    }
  }
  //Clock Font Size
  let tmp_font_size = user_settings.clock_font_size * default_clock_font_size;
  document.getElementById("clock").style.fontSize = tmp_font_size + "em";

  //Greetings
  if (user_settings.hide_greetings) {
    document.getElementById("greeting").style.display = "none";
  } else {
    document.getElementById("greeting").style.display = "block";
    document.getElementById("greeting").style.color =
      user_settings.greeting_color;
    if (user_settings.text_shadows) {
      document.getElementById("greeting").style.textShadow =
        "2px 2px 1px #000000" + user_settings.greeting_color[-2];
      document.getElementById("greeting").style.textShadow = "block";
    } else {
      document.getElementById("greeting").style.textShadow = "none";
    }
  }
  //Greetings Font Size
  tmp_font_size = user_settings.greetingfontsize * default_greeting_font_size;
  document.getElementById("greeting").style.fontSize = tmp_font_size + "em";

  //Check if first run
  if (first_run) {
    //Set Saved background
    if (user_settings.staticbackground) {
      setImageNum(parseInt(user_settings.staticbackgroundid));
    }
    first_run = false;
  }

  //Background auto changer
  autoChangeBackground();

  backgroundfilters(true);

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

function backgroundfilters(useUserSavedSettings = false) {
  let bgfilterOn, bgPick, bgStrength;
  if (useUserSavedSettings) {
    bgfilterOn = user_settings.backgroundfilter;
    bgPick = user_settings.backgroundfilterpick;
    bgStrength = user_settings.backgroundfilterstrength;
  } else {
    bgfilterOn = Array.from(
      document.getElementsByClassName("filtercheckmark")
    ).map((i) => i.checked);
    bgPick = Array.from(document.getElementsByClassName("filterlist")).map(
      (i) => i.value
    );
    bgStrength = Array.from(
      document.getElementsByClassName("filterstrength")
    ).map((i) => i.value);
  }
  //Backgound filter
  let runningFilter = "";
  let background = document.getElementById("background");
  let anyBackgroundsOn = false;

  //Loop through the background picks
  for (let i = 0; i < bgfilterOn.length; i++) {
    if (bgfilterOn[i]) {
      anyBackgroundsOn = true;
      if (bgPick[i] === "blur") {
        runningFilter += "blur(" + bgStrength[i] + "px)";
      } else if (bgPick[i] === "brightness") {
        runningFilter += "brightness(" + bgStrength[i] + "%)";
      } else if (bgPick[i] === "contrast") {
        runningFilter += "contrast(" + bgStrength[i] + "0%)";
      } else if (bgPick[i] === "grayscale") {
        runningFilter += "grayscale(" + bgStrength[i] + "%)";
      } else if (bgPick[i] === "hue-rotate") {
        runningFilter += "hue-rotate(" + bgStrength[i] * 3.6 + "deg)";
      } else if (bgPick[i] === "invert") {
        runningFilter += "invert(" + bgStrength[i] + "%)";
      } else if (bgPick[i] === "opacity") {
        runningFilter += "opacity(" + bgStrength[i] + "%)";
      } else if (bgPick[i] === "saturate") {
        runningFilter += "saturate(" + bgStrength[i] * 5 + "%)";
      } else if (bgPick[i] === "sepia") {
        runningFilter += "sepia(" + bgStrength[i] + "%)";
      }
    }
  } //End of background picks loop

  if (anyBackgroundsOn) {
    background.style.filter = runningFilter;
  } else {
    background.style.filter = "";
  }
}

function validateinput(inputid) {
  let idname = inputid.id;
  if (idname === "changeminutesinput") {
    let tmpelement = document.getElementById("changeminutesinput");
    let tmpvalue = tmpelement.value;
    if (tmpvalue > 1440) {
      tmpelement.value = 1440;
    } else if (tmpvalue < 0.5) {
      tmpelement.value = 0.5;
    }
  } else if (idname === "greetingfontsize") {
    let tmpelement = document.getElementById("greetingfontsize");
    let tmpvalue = tmpelement.value;
    if (tmpvalue > 3) {
      tmpelement.value = 3;
    } else if (tmpvalue < 0.5) {
      tmpelement.value = 0.5;
    }
  } else if (idname === "clockfontsize") {
    let tmpelement = document.getElementById("clockfontsize");
    let tmpvalue = tmpelement.value;
    if (tmpvalue > 3) {
      tmpelement.value = 3;
    } else if (tmpvalue < 0.5) {
      tmpelement.value = 0.5;
    }
  } else if (idname.includes("backgroundfilterstrength")) {
    let tmpelement = document.getElementById(idname);
    let tmpvalue = tmpelement.value;
    if (tmpvalue > 100) {
      tmpelement.value = 100;
    } else if (tmpvalue < 1) {
      tmpelement.value = 1;
    }
  } else if (idname === "startupimageinput") {
    let tmpelement = document.getElementById("startupimageinput");
    let tmpvalue = tmpelement.value;
    if (tmpvalue > images.length) {
      tmpelement.value = images.length - 1;
    } else if (tmpvalue < 1) {
      tmpelement.value = 1;
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
  };

  document.getElementById("help").onclick = () => {
    modal.style.display = "block";
    helpModelContent();
    modal_active = true;
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    closemodel();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modal_active = false;
    }
  };
}

//Returns a random Image url
function getRandomImage() {
  img_number = Math.floor(Math.random() * images.length);
  return images[img_number];
}

//Sets a random Image url
function setRandomImage() {
  image = getRandomImage();
  document.getElementById("background").style.backgroundImage =
    "url('" + image[0] + "')";
  updateArtistAttr(image);

  //The element may be null because it is not inserted into the dom till later
  let tmp = document.getElementById("current_image_number");
  if (tmp) {
    tmp.innerText = img_number;
  }
}

//Sets Image based off a given number
function setImageNum(Num) {
  if (Num < number_of_imgs && Num > 0) {
    img_number = Num;
    document.getElementById("background").style.backgroundImage =
      "url('" + images[Num][0] + "')";
    updateArtistAttr(images[Num]);

    //The element may be null because it is not inserted into the dom till lat
    let tmp = document.getElementById("current_image_number");
    if (tmp) {
      tmp.innerText = img_number;
    }
  }
}

//Updates the artists attribution
function updateArtistAttr(imageObj) {
  artists_id = imageObj[1];
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

//Opens a link!
function openlink(link, tab) {
  if (!modal_active) {
    window.open(link, tab);
  }
}

//Function that adds a new line to the user shortcuts in the model
function newshortcut() {
  let shortcutvalues = document.getElementsByClassName("shortcutvaluespacer");
  shortcutvalues[shortcutvalues.length - 1].insertAdjacentHTML(
    "afterend",
    "<input value='' class='shortcutkey left-side'> <input value='' class='shortcutvalue' title='Shortcut Website'> <div class='X-button' onclick='delete_shortcut(this)'>X</div> <div class='wholeline shortcutvaluespacer'></div>"
  );
}

//Deletes a shortcut from the page
function delete_shortcut(element) {
  element.previousElementSibling.previousElementSibling.previousElementSibling.remove();
  element.previousElementSibling.previousElementSibling.remove();
  element.previousElementSibling.remove();
  element.remove();
}

//Applys the shortcuts
function shortcuts() {
  //Mobile/touch targets
  document
    .getElementById("right_touch_target")
    .addEventListener("touchstart", function (event) {
      if (user_settings.random_seek) {
        setRandomImage();
      } else {
        nextImage();
      }
    });
  document
    .getElementById("left_touch_target")
    .addEventListener("touchstart", function (event) {
      if (user_settings.random_seek) {
        setRandomImage();
      } else {
        previousImage();
      }
    });

  document.addEventListener("keydown", function (event) {
    //console.log(event.key); //Debug
    if (event.key === "`") {
      setRandomImage();
    } else if (event.key == "ArrowRight") {
      if (user_settings.random_seek) {
        setRandomImage();
      } else {
        nextImage();
      }
    } else if (event.key == "ArrowLeft") {
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
    if (
      (user_settings.autobackgroundtime != auto_change_background_time ||
        user_settings.autochangebackground != auto_change_background_active) &&
      user_settings.autochangebackground == true
    ) {
      auto_change_background_active = user_settings.autochangebackground;
      auto_change_background_time = user_settings.autobackgroundtime;
      let interval_time = auto_change_background_time * 1000 * 60;
      clearInterval(background_auto_change_interval);
      setInterval(autoChangeBackgroundWorker, interval_time);
      //To Turn off
    } else if (user_settings.autochangebackground == false) {
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
  let shortcut_arr = Array.from(user_shortcut_map, ([name, value]) => ({
    name,
    value,
  }));
  let tmp_user_settings = new user_settings_obj(shortcut_arr);

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
    let tmp_settings = null;
    let url_settings_failed = false;

    //Checks the URL first
    let url = window.location.href;
    let settings_look_for_string = "?s=";
    let url_index = window.location.href.indexOf(settings_look_for_string);

    //If there is a settings in the url then go ahead and decode and apply the settings
    if (url_index > 0) {
      //
      let tmp_settings_url_string = url.slice(
        url_index + settings_look_for_string.length
      );
      try {
        tmp_settings = decodeUserSettings(tmp_settings_url_string, true);
      } catch (e) {
        console.log(e);
        url_settings_failed = true;
      }
    } else {
      url_settings_failed = true;
    }

    //Only execute if there are no url settings
    if (url_settings_failed) {
      //If no saved settings then create new ones
      if (localStorage.user_settings == null) {
        user_settings = newUserSettings(false);
        localStorage.setItem("user_settings", JSON.stringify(user_settings));
        initial_save_version = app_save_version;

        //No need to go any further. New settings are created and you are done
        return;
      } else {
        //Load the users settings and shortcuts if they have it
        user_shortcut_map = new Map();
        tmp_settings = JSON.parse(localStorage.getItem("user_settings"));
      }
    }

    try {
      initial_save_version = tmp_settings.version;
    } catch (e) {
      //Might be null
      initial_save_version = app_save_version;
    }

    //Settings are up to date! You good :D
    if (tmp_settings.version >= app_save_version) {
      //If we are not using the url settings
      if (url_settings_failed) {
        user_settings = tmp_settings;

        tmp_settings.users_shortcuts.map((x) => {
          user_shortcut_map.set(x.name, x.value);
        });
      } else {
        //If we are using the settings, call this function
        //This function will remap the user_shortcuts for us! User shortcuts could be null so don't assume
        applyDecodedUserSettings(tmp_settings);
      }
    }
    //Settings are not up to date, update needed
    else {
      let tmp_version = tmp_settings.version;

      //Keep migrating while its not the most up to date save version
      while (tmp_version < app_save_version) {
        tmp_settings = upgradeUserSettings(tmp_version, tmp_settings);
        tmp_version = tmp_settings.version;
      }

      if (url_settings_failed) {
        tmp_settings.users_shortcuts.map((x) => {
          user_shortcut_map.set(x.name, x.value);
          user_settings = tmp_settings;
        });
      } else {
        //If we are using the settings, call this function
        //This function will remap the user_shortcuts for us! User shortcuts could be null so don't assume
        applyDecodedUserSettings(tmp_settings);
      }

      //We need to save the user settings so they don't have to change things in the menu. Makes it nicer and cleaner
      saveUserSettings();
    }

    //Last thing to do, apply the settings
    applyUserSettings();
  }
  //Local Storage is not supported
  else {
    //Do something in the future?
    newUserSettings(false);
    console.log("Local Storage support: " + local_storage_supported);
  }
}

//Saves the users settings
function saveUserSettings() {
  if (local_storage_supported) {
    user_settings.users_shortcuts = Array.from(
      user_shortcut_map,
      ([name, value]) => ({ name, value })
    );
    try {
      localStorage.setItem("user_settings", JSON.stringify(user_settings));
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
      let response = confirm("Are you sure you want to reset all settings?");
      if (!response) {
        return;
      }
    }
    user_settings = newUserSettings(false);
    user_shortcut_map = default_shortcut_map;
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
  } else if (version == 1.1) {
    user_settings.backgroundfilter = [false, false, false];
    user_settings.backgroundfilterpick = ["blur", "blur", "blur"];
    user_settings.backgroundfilterstrength = [1, 1, 1];
    user_settings.staticbackground = false;
    user_settings.staticbackgroundid = 1;
    user_settings.version = 1.2;
  }
  return user_settings;
}

//Encodes the user settings in base64, but only the actual settings, not their key:value pairs. Saves a shit ton of space!
//Can pass in a object manually to encode that instead
function encodeUserSettings(saveshortcuts = false, manualObj = {}) {
  let settings_arr = [];
  //If there is no manual Object that is given by the user
  if (Object.keys(manualObj).length === 0) {
    settings_arr = [
      Array.from(user_shortcut_map, ([name, value]) => ({
        name,
        value,
      })),
      user_settings.version,
      user_settings.random_seek,
      user_settings.clock_font_size,
      user_settings.greetingfontsize,
      user_settings.clock_color,
      user_settings.greeting_color,
      user_settings.hide_greetings,
      user_settings.hide_clock,
      user_settings.text_shadows,
      user_settings.clock24hr,
      user_settings.autochangebackground,
      user_settings.autobackgroundtime,
      user_settings.backgroundfilter,
      user_settings.backgroundfilterpick,
      user_settings.backgroundfilterstrength,
      user_settings.staticbackground,
      user_settings.staticbackgroundid,
    ];
  } else {
    settings_arr = [
      Array.from(user_shortcut_map, ([name, value]) => ({
        name,
        value,
      })),
      manualObj.version,
      manualObj.random_seek,
      manualObj.clock_font_size,
      manualObj.greetingfontsize,
      manualObj.clock_color,
      manualObj.greeting_color,
      manualObj.hide_greetings,
      manualObj.hide_clock,
      manualObj.text_shadows,
      manualObj.clock24hr,
      manualObj.autochangebackground,
      manualObj.autobackgroundtime,
      manualObj.backgroundfilter,
      manualObj.backgroundfilterpick,
      manualObj.backgroundfilterstrength,
      manualObj.staticbackground,
      manualObj.staticbackgroundid,
    ];
  }
  if (!saveshortcuts) {
    settings_arr[0] = null;
  }
  //Base64 encoding of the settings
  return btoa(JSON.stringify(settings_arr));
}

//Decodes the base 64 string that is given to it, returns a default profile if there is an error
function decodeUserSettings(encodedSettings, returnObj = true) {
  //Will return the array of the settings and no obj
  if (returnObj == false) {
    try {
      let arr = JSON.parse(atob(encodedSettings));
      return arr;
    } catch (e) {
      console.log(e);
      //If it fails, make a new basic user object, encode it, then decode it and return that. Shouldn't fail :o
      return decodeUserSettings(encodeUserSettings(newUserSettings()), false);
    }
    //Will return an object of the user_settings based on the input
  } else {
    try {
      //Decode and throw into a tmp obj
      let tmp_user_settings = JSON.parse(atob(encodedSettings));

      //If no shortcuts then put the default ones in there
      if (tmp_user_settings.users_shortcuts == null) {
        tmp_user_settings.users_shortcuts = Array.from(
          default_shortcut_map,
          ([name, value]) => ({
            name,
            value,
          })
        );
      }
      //If the link is the old 1.1 save version
      if (tmp_user_settings[1] == 1.1) {
        //Create a new object and return it
        return new user_settings_obj(
          tmp_user_settings[0],
          tmp_user_settings[1],
          tmp_user_settings[2],
          tmp_user_settings[3],
          tmp_user_settings[4],
          tmp_user_settings[5],
          tmp_user_settings[6],
          tmp_user_settings[7],
          tmp_user_settings[8],
          tmp_user_settings[9],
          tmp_user_settings[10],
          tmp_user_settings[11],
          tmp_user_settings[12]
        );
      } else {
        //More up to date 1.2 save version

        //Create a new object and return it
        return new user_settings_obj(
          tmp_user_settings[0],
          tmp_user_settings[1],
          tmp_user_settings[2],
          tmp_user_settings[3],
          tmp_user_settings[4],
          tmp_user_settings[5],
          tmp_user_settings[6],
          tmp_user_settings[7],
          tmp_user_settings[8],
          tmp_user_settings[9],
          tmp_user_settings[10],
          tmp_user_settings[11],
          tmp_user_settings[12],
          tmp_user_settings[13],
          tmp_user_settings[14],
          tmp_user_settings[15],
          tmp_user_settings[16],
          tmp_user_settings[17]
        );
      }
    } catch (e) {
      console.log(e);
      alert("URL Settings are not correct, using default settings");
      //If it fails, make a new basic user object, encode it, then decode it and return that. Shouldn't fail :o
      return newUserSettings();
    }
  }
}

//Applies a user_settings object. Intended to be used with the output of the DecodeUserSettings2048 function
function applyDecodedUserSettings(encodedJSON, autoSaveSettings = true) {
  if (encodedJSON.users_shortcuts == null) {
    user_shortcut_map = default_shortcut_map;
  } else {
    //If they include the shortcuts then load them in
    user_shortcut_map = new Map();
    encodedJSON.users_shortcuts.map((x) => {
      user_shortcut_map.set(x.name, x.value);
    });
  }
  user_settings = encodedJSON;

  if (autoSaveSettings) {
    saveUserSettings();
  }

  applyUserSettings();
}
