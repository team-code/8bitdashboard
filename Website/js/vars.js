//Settings and vars
var time;
var image;
var img_number;
var modal_active = false;
var user_settings = null;
var first_run = true;
const local_storage_supported = typeof Storage !== "undefined";
const default_clock_font_size = 4;
const default_greeting_font_size = 2;
const app_save_version = 1.2;
const app_version_num = 1.5;
var auto_change_background_active = false;
var auto_change_background_time = 0;
const debug = true;
const prod_url = "https://8bitdashboard.com/";
const local_url = "http://127.0.0.1/8bitdashboard/Website/html/";
var initial_save_version = 0;

var user_settings_obj = class {
  constructor(
    users_shortcuts,
    save_version = app_save_version,
    random_seek = false,
    clock_font_size = 1,
    greeting_font_size = 1,
    clock_color = "#FFFFFFFF",
    greeting_color = "#FFFFFFFF",
    hide_greetings = false,
    hide_clock = false,
    text_shadows = true,
    clock24hr = false,
    autochangebackground = false,
    autochangebackgroundtime = 1,
    backgroundfilter = [false, false, false],
    backgroundfilterpick = ["blur", "blur", "blur"],
    backgroundfilterstrength = [1, 1, 1],
    staticbackground = false,
    staticbackgroundid = 1
  ) {
    this.version = save_version;
    this.random_seek = random_seek;
    this.clock_font_size = clock_font_size;
    this.greetingfontsize = greeting_font_size;
    this.clock_color = clock_color;
    this.greeting_color = greeting_color;
    this.hide_greetings = hide_greetings;
    this.hide_clock = hide_clock;
    this.text_shadows = text_shadows;
    this.users_shortcuts = users_shortcuts;
    this.clock24hr = clock24hr;
    this.autobackgroundtime = autochangebackgroundtime;
    this.autochangebackground = autochangebackground;
    this.backgroundfilter = backgroundfilter;
    this.backgroundfilterpick = backgroundfilterpick;
    this.backgroundfilterstrength = backgroundfilterstrength;
    this.staticbackground = staticbackground;
    this.staticbackgroundid = staticbackgroundid;
  }
};

const default_shortcut_map = new Map([
  ["g", "https://www.github.com"],
  ["r", "https://www.reddit.com"],
  ["f", "https://www.facebook.com"],
  ["y", "https://www.youtube.com"],
  ["m", "https://maps.google.com"],
  ["k", "https://www.tiktok.com/"],
  ["w", "https://www.wikipedia.com"],
  ["d", "https://djanes.xyz/"],
  ["t", "https://www.twitter.com"],
  ["b", "https://www.twitch.tv/"],
  ["e", "https://www.ebay.com"],
  ["a", "https://www.amazon.com"],
  ["o", "https://www.google.com"],
  ["p", "https://www.plex.tv/web"],
  ["8", "https://8bitdashboard.com/"],
  ["c", "https://craigslist.org/"],
]);
var background_auto_change_interval = null;
var user_shortcut_map = default_shortcut_map;

const artists = [
  ["Kirokaze", "https://www.patreon.com/kirokaze"],
  ["Faxdoc", "https://twitter.com/faxdocc"],
  ["Mark Ferrari", "http://pixfabrik.com/livingworlds/"],
  ["Valenberg", "https://twitter.com/MrValenberg"],
  ["1041uuu", "https://www.patreon.com/1041uuu"],
  ["PixelJeff", "https://www.deviantart.com/pixeljeff"],
  ["Minimoss", "https://twitter.com/minimossart"],
  ["Into The Rift", "http://www.starsoft.com/IntoTheRift/"],
  ["Waku Waku 7", "https://snk.fandom.com/wiki/Waku_Waku_7"],
];

const images = [
  ["../img/kirokaze/amp_prob.webp", 0],
  ["../img/kirokaze/attack.webp", 0],
  ["../img/kirokaze/bad_landing.webp", 0],
  ["../img/kirokaze/bluebalcony.webp", 0],
  ["../img/kirokaze/cemetry.webp", 0],
  ["../img/kirokaze/citymirror.webp", 0],
  ["../img/kirokaze/coffeeinrain.webp", 0],
  ["../img/kirokaze/dark_pillar.webp", 0],
  ["../img/kirokaze/droidcrime.webp", 0],
  ["../img/kirokaze/elderorc.webp", 0],
  ["../img/kirokaze/factory5.webp", 0],
  ["../img/kirokaze/familydinner.webp", 0],
  ["../img/kirokaze/horse.webp", 0],
  ["../img/kirokaze/iplayoldgames.webp", 0],
  ["../img/kirokaze/last_dance.webp", 0],
  ["../img/kirokaze/metro_final.webp", 0],
  ["../img/kirokaze/nightlytraining.webp", 0],
  ["../img/kirokaze/pilot.webp", 0],
  ["../img/kirokaze/player2.webp", 0],
  ["../img/kirokaze/reddriver.webp", 0],
  ["../img/kirokaze/robot_alley.webp", 0],
  ["../img/kirokaze/sandcastle.webp", 0],
  ["../img/kirokaze/shootingstars.webp", 0],
  ["../img/kirokaze/spacecommander.webp", 0],
  ["../img/kirokaze/spaceport.webp", 0],
  ["../img/kirokaze/thieves.webp", 0],
  ["../img/kirokaze/train.webp", 0],
  ["../img/kirokaze/train_city.webp", 0],
  ["../img/kirokaze/troll_cave.webp", 0],
  ["../img/kirokaze/wild_boy.webp", 0],
  ["../img/kirokaze/windyday.webp", 0],
  ["../img/kirokaze/youngatnight.webp", 0],
  ["../img/kirokaze/zombies.webp", 0],
  ["../img/faxdoc/cacao_and_coffee_shop.webp", 1],
  ["../img/faxdoc/flower_shop.webp", 1],
  ["../img/faxdoc/lullaby.webp", 1],
  ["../img/faxdoc/midnight_melancholy.webp", 1],
  ["../img/faxdoc/mountain_mote.webp", 1],
  ["../img/faxdoc/nero_land.webp", 1],
  ["../img/faxdoc/sideshop.webp", 1],
  ["../img/faxdoc/stacking_houses_on_a_windy_day.webp", 1],
  ["../img/landscapes/bridge.webp", 2],
  ["../img/landscapes/bridge_raining.webp", 2],
  ["../img/landscapes/castle.webp", 2],
  ["../img/landscapes/cave.webp", 2],
  ["../img/landscapes/coast.webp", 2],
  ["../img/landscapes/dawn.webp", 2],
  ["../img/landscapes/falls.webp", 2],
  ["../img/landscapes/fire.webp", 2],
  ["../img/landscapes/forrest.webp", 2],
  ["../img/landscapes/fortress.webp", 2],
  ["../img/landscapes/grandcanyon.webp", 2],
  ["../img/landscapes/lake.webp", 2],
  ["../img/landscapes/mountain.webp", 2],
  ["../img/landscapes/nature.webp", 2],
  ["../img/landscapes/northlights.webp", 2],
  ["../img/landscapes/rain.webp", 2],
  ["../img/landscapes/sea.webp", 2],
  ["../img/landscapes/snow.webp", 2],
  ["../img/landscapes/swamp.webp", 2],
  ["../img/landscapes/swirling.webp", 2],
  ["../img/landscapes/temple.webp", 2],
  ["../img/landscapes/tower.webp", 2],
  ["../img/landscapes/town.webp", 2],
  ["../img/landscapes/underwater.webp", 2],
  ["../img/valenberg/bicycle.webp", 3],
  ["../img/valenberg/blade.webp", 3],
  ["../img/valenberg/controlroom.webp", 3],
  ["../img/valenberg/drift.webp", 3],
  ["../img/valenberg/echoesfromneals.webp", 3],
  ["../img/valenberg/exodus.webp", 3],
  ["../img/valenberg/future.webp", 3],
  ["../img/valenberg/girlinrain.webp", 3],
  ["../img/valenberg/highfloor.webp", 3],
  ["../img/valenberg/highlands.webp", 3],
  ["../img/valenberg/highsoceity.webp", 3],
  ["../img/valenberg/jazznight.webp", 3],
  ["../img/valenberg/lowlands.webp", 3],
  ["../img/valenberg/ride.webp", 3],
  ["../img/valenberg/shop.webp", 3],
  ["../img/valenberg/skate.webp", 3],
  ["../img/valenberg/streets.webp", 3],
  ["../img/valenberg/sushi.webp", 3],
  ["../img/valenberg/tv.webp", 3],
  ["../img/valenberg/virtuaverse.webp", 3],
  ["../img/1041uuu/bridge.webp", 4],
  ["../img/1041uuu/brightgirlcity.webp", 4],
  ["../img/1041uuu/cattrain.webp", 4],
  ["../img/1041uuu/coffeeshop.webp", 4],
  ["../img/1041uuu/dogcatchase.webp", 4],
  ["../img/1041uuu/hackergirl.webp", 4],
  ["../img/1041uuu/japanbridge.webp", 4],
  ["../img/1041uuu/japancars.webp", 4],
  ["../img/1041uuu/japancity.webp", 4],
  ["../img/1041uuu/japancityfall.webp", 4],
  ["../img/1041uuu/japancityriver.webp", 4],
  ["../img/1041uuu/japancityspring.webp", 4],
  ["../img/1041uuu/japancitytall.webp", 4],
  ["../img/1041uuu/japanfall.webp", 4],
  ["../img/1041uuu/japanfishstore.webp", 4],
  ["../img/1041uuu/japanresuturant.webp", 4],
  ["../img/1041uuu/japanriver.webp", 4],
  ["../img/1041uuu/japanrivergirl.webp", 4],
  ["../img/1041uuu/japantrain.webp", 4],
  ["../img/1041uuu/japanwarmbed.webp", 4],
  ["../img/1041uuu/koi.webp", 4],
  ["../img/1041uuu/kois.webp", 4],
  ["../img/1041uuu/milk.webp", 4],
  ["../img/1041uuu/peacefulgarden.webp", 4],
  ["../img/1041uuu/rainbow.webp", 4],
  ["../img/1041uuu/raingyudon.webp", 4],
  ["../img/1041uuu/ramen.webp", 4],
  ["../img/1041uuu/sakura.webp", 4],
  ["../img/1041uuu/schoolgirls.webp", 4],
  ["../img/1041uuu/smallroom.webp", 4],
  ["../img/1041uuu/soda.webp", 4],
  ["../img/1041uuu/sushibar.webp", 4],
  ["../img/1041uuu/techgirl.webp", 4],
  ["../img/1041uuu/train.webp", 4],
  ["../img/1041uuu/wintertrain.webp", 4],
  ["../img/pixeljeff/animalcrossing.webp", 5],
  ["../img/pixeljeff/apartments.webp", 5],
  ["../img/pixeljeff/busstop.webp", 5],
  ["../img/pixeljeff/catstairs.webp", 5],
  ["../img/pixeljeff/chillday.webp", 5],
  ["../img/pixeljeff/chillnap.webp", 5],
  ["../img/pixeljeff/christmas.webp", 5],
  ["../img/pixeljeff/coffeeshop.webp", 5],
  ["../img/pixeljeff/coldlove.webp", 5],
  ["../img/pixeljeff/datenight.webp", 5],
  ["../img/pixeljeff/futurepark.webp", 5],
  ["../img/pixeljeff/girlflood.webp", 5],
  ["../img/pixeljeff/hacker.webp", 5],
  ["../img/pixeljeff/halloween.webp", 5],
  ["../img/pixeljeff/halloweentwo.webp", 5],
  ["../img/pixeljeff/icecream.webp", 5],
  ["../img/pixeljeff/japanroom.webp", 5],
  ["../img/pixeljeff/lunarfestival.webp", 5],
  ["../img/pixeljeff/mariogamer.webp", 5],
  ["../img/pixeljeff/oldguyandtrash.webp", 5],
  ["../img/pixeljeff/rainyday.webp", 5],
  ["../img/pixeljeff/ramenshop.webp", 5],
  ["../img/pixeljeff/roadsidestore.webp", 5],
  ["../img/pixeljeff/rogfuture.webp", 5],
  ["../img/pixeljeff/sexy.webp", 5],
  ["../img/pixeljeff/shrine.webp", 5],
  ["../img/pixeljeff/starwars.webp", 5],
  ["../img/pixeljeff/storesleep.webp", 5],
  ["../img/pixeljeff/streetfood.webp", 5],
  ["../img/pixeljeff/videogame.webp", 5],
  ["../img/pixeljeff/wallcat.webp", 5],
  ["../img/pixeljeff/zombiethriller.webp", 5],
  ["../img/minimoss/city.webp", 6],
  ["../img/minimoss/moonthief.webp", 6],
  ["../img/minimoss/ramen.webp", 6],
  ["../img/minimoss/sanctuary.webp", 6],
  ["../img/minimoss/shootingstars.webp", 6],
  ["../img/minimoss/slime.webp", 6],
  ["../img/minimoss/storm.webp", 6],
  ["../img/minimoss/zengarden.webp", 6],
  ["../img/minimoss/zengarden2.webp", 6],
  ["../img/minimoss/window.webp", 6],
  ["../img/intotherift/intotherift.webp", 7],
  ["../img/wakuwaku/japanmorning.webp", 8],
  ["../img/wakuwaku/japanafternoon.webp", 8],
  ["../img/wakuwaku/japannight.webp", 8],
];

var number_of_imgs = images.length;
