//Not used

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

//Decodes the base 2048 string that is given to it, returns a default profile if there is an error
function decodeUserSettings2048(encodedSettings, urlDecodeNeeded = false) {
    try {
        let string = '';
        if (urlDecodeNeeded) {
            string = new TextDecoder().decode(decode(decodeURIComponent(encodedSettings)));
        } else {
            string = new TextDecoder().decode(decode(encodedSettings));
        }
        return JSON.parse(string);
    } catch (e) {
        console.log(e);
        return newUserSettings();
    }
}

//Applies a user_settings object. Intended to be used with the output of the DecodeUserSettings2048 function
function applyDecodedUserSettings(encodedJSON, autoSaveSettings = true) {
    if (encodedJSON.users_shortcuts == null) {
        user_shortcut_map = default_shortcut_map

    } else {
        //If they include the shortcuts then load them in
        user_shortcut_map = new Map();
        encodedJSON.users_shortcuts.map((x) => {
            user_shortcut_map.set(x.name, x.value)
        });
    }
    user_settings = encodedJSON;

    if (autoSaveSettings) {
        saveUserSettings();
    }

    applyUserSettings();
}