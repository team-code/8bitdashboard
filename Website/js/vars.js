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
const app_version_num = 1.7;
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

/*
0 = Kirokaze
1 = Faxdoc
2 = Mark Ferrari
3 = Valenberg
4 = 1041uuu
5 = PixelJeff
6 = Minimoss
7 = Into The Rift
8 = Waku Waku 7
9 = Haopanyo
10 = itzah
11 = 点々(TENTEN)
12 = Valve
13 = yaleiSyu
14 = waneella
15 = muscat_dot
16 = KillerRabbitMedia
*/
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
  ["Haopanyo", "https://twitter.com/haopanyo"],
  ["itzah", "https://ko-fi.com/itzah"],
  ["点々(TENTEN)", "https://pixelarttenten.tumblr.com/"],
  ["Valve", "https://store.steampowered.com/"],
  ["yaleiSyu", "https://www.deviantart.com/yaleisyu"],
  ["waneella", "https://www.patreon.com/waneella"],
  ["muscat_dot", "https://twitter.com/muscat_dot"],
  [
    "KillerRabbitMedia",
    "https://www.reddit.com/user/KillerRabbitMedia/submitted/",
  ],
];

//[Img Url, Artist Index, 0 = WEBP/GIF 1 = MP4]
const images = [
  ["../img/kirokaze/amp_prob.webp", 0, 0],
  ["../img/kirokaze/attack.webp", 0, 0],
  ["../img/kirokaze/bad_landing.webp", 0, 0],
  ["../img/kirokaze/bluebalcony.webp", 0, 0],
  ["../img/kirokaze/cemetry.webp", 0, 0],
  ["../img/kirokaze/citymirror.webp", 0, 0],
  ["../img/kirokaze/coffeeinrain.webp", 0, 0],
  ["../img/kirokaze/dark_pillar.webp", 0, 0],
  ["../img/kirokaze/droidcrime.webp", 0, 0],
  ["../img/kirokaze/elderorc.webp", 0, 0],
  ["../img/kirokaze/factory5.webp", 0, 0],
  ["../img/kirokaze/familydinner.webp", 0, 0],
  ["../img/kirokaze/horse.webp", 0, 0],
  ["../img/kirokaze/iplayoldgames.webp", 0, 0],
  ["../img/kirokaze/last_dance.webp", 0, 0],
  ["../img/kirokaze/metro_final.webp", 0, 0],
  ["../img/kirokaze/nightlytraining.webp", 0, 0],
  ["../img/kirokaze/pilot.webp", 0, 0],
  ["../img/kirokaze/player2.webp", 0, 0],
  ["../img/kirokaze/reddriver.webp", 0, 0],
  ["../img/kirokaze/robot_alley.webp", 0, 0],
  ["../img/kirokaze/sandcastle.webp", 0, 0],
  ["../img/kirokaze/shootingstars.webp", 0, 0],
  ["../img/kirokaze/spacecommander.webp", 0, 0],
  ["../img/kirokaze/spaceport.webp", 0, 0],
  ["../img/kirokaze/thieves.webp", 0, 0],
  ["../img/kirokaze/train.webp", 0, 0],
  ["../img/kirokaze/train_city.webp", 0, 0],
  ["../img/kirokaze/troll_cave.webp", 0, 0],
  ["../img/kirokaze/wild_boy.webp", 0, 0],
  ["../img/kirokaze/windyday.webp", 0, 0],
  ["../img/kirokaze/youngatnight.webp", 0, 0],
  ["../img/kirokaze/zombies.webp", 0, 0],
  ["../img/faxdoc/cacao_and_coffee_shop.webp", 1, 0],
  ["../img/faxdoc/flower_shop.webp", 1, 0],
  ["../img/faxdoc/lullaby.webp", 1, 0],
  ["../img/faxdoc/midnight_melancholy.webp", 1, 0],
  ["../img/faxdoc/mountain_mote.webp", 1, 0],
  ["../img/faxdoc/nero_land.webp", 1, 0],
  ["../img/faxdoc/sideshop.webp", 1, 0],
  ["../img/faxdoc/stacking_houses_on_a_windy_day.webp", 1, 0],
  ["../img/landscapes/bridge.webp", 2, 0],
  ["../img/landscapes/bridge_raining.webp", 2, 0],
  ["../img/landscapes/castle.webp", 2, 0],
  ["../img/landscapes/cave.webp", 2, 0],
  ["../img/landscapes/coast.webp", 2, 0],
  ["../img/landscapes/dawn.webp", 2, 0],
  ["../img/landscapes/falls.webp", 2, 0],
  ["../img/landscapes/fire.webp", 2, 0],
  ["../img/landscapes/forrest.webp", 2, 0],
  ["../img/landscapes/fortress.webp", 2, 0],
  ["../img/landscapes/grandcanyon.webp", 2, 0],
  ["../img/landscapes/lake.webp", 2, 0],
  ["../img/landscapes/mountain.webp", 2, 0],
  ["../img/landscapes/nature.webp", 2, 0],
  ["../img/landscapes/northlights.webp", 2, 0],
  ["../img/landscapes/rain.webp", 2, 0],
  ["../img/landscapes/sea.webp", 2, 0],
  ["../img/landscapes/snow.webp", 2, 0],
  ["../img/landscapes/swamp.webp", 2, 0],
  ["../img/landscapes/swirling.webp", 2, 0],
  ["../img/landscapes/temple.webp", 2, 0],
  ["../img/landscapes/tower.webp", 2, 0],
  ["../img/landscapes/town.webp", 2, 0],
  ["../img/landscapes/underwater.webp", 2, 0],
  ["../img/valenberg/bicycle.webp", 3, 0],
  ["../img/valenberg/blade.webp", 3, 0],
  ["../img/valenberg/controlroom.webp", 3, 0],
  ["../img/valenberg/drift.webp", 3, 0],
  ["../img/valenberg/echoesfromneals.webp", 3, 0],
  ["../img/valenberg/exodus.webp", 3, 0],
  ["../img/valenberg/future.webp", 3, 0],
  ["../img/valenberg/girlinrain.webp", 3, 0],
  ["../img/valenberg/highfloor.webp", 3, 0],
  ["../img/valenberg/highlands.webp", 3, 0],
  ["../img/valenberg/highsoceity.webp", 3, 0],
  ["../img/valenberg/jazznight.webp", 3, 0],
  ["../img/valenberg/lowlands.webp", 3, 0],
  ["../img/valenberg/ride.webp", 3, 0],
  ["../img/valenberg/shop.webp", 3, 0],
  ["../img/valenberg/skate.webp", 3, 0],
  ["../img/valenberg/streets.webp", 3, 0],
  ["../img/valenberg/sushi.webp", 3, 0],
  ["../img/valenberg/tv.webp", 3, 0],
  ["../img/valenberg/virtuaverse.webp", 3, 0],
  ["../img/1041uuu/bridge.webp", 4, 0],
  ["../img/1041uuu/brightgirlcity.webp", 4, 0],
  ["../img/1041uuu/cattrain.webp", 4, 0],
  ["../img/1041uuu/coffeeshop.webp", 4, 0],
  ["../img/1041uuu/dogcatchase.webp", 4, 0],
  ["../img/1041uuu/hackergirl.webp", 4, 0],
  ["../img/1041uuu/japanbridge.webp", 4, 0],
  ["../img/1041uuu/japancars.webp", 4, 0],
  ["../img/1041uuu/japancity.webp", 4, 0],
  ["../img/1041uuu/japancityfall.webp", 4, 0],
  ["../img/1041uuu/japancityriver.webp", 4, 0],
  ["../img/1041uuu/japancityspring.webp", 4, 0],
  ["../img/1041uuu/japancitytall.webp", 4, 0],
  ["../img/1041uuu/japanfall.webp", 4, 0],
  ["../img/1041uuu/japanfishstore.webp", 4, 0],
  ["../img/1041uuu/japanresuturant.webp", 4, 0],
  ["../img/1041uuu/japanriver.webp", 4, 0],
  ["../img/1041uuu/japanrivergirl.webp", 4, 0],
  ["../img/1041uuu/japantrain.webp", 4, 0],
  ["../img/1041uuu/japanwarmbed.webp", 4, 0],
  ["../img/1041uuu/koi.webp", 4, 0],
  ["../img/1041uuu/kois.webp", 4, 0],
  ["../img/1041uuu/milk.webp", 4, 0],
  ["../img/1041uuu/peacefulgarden.webp", 4, 0],
  ["../img/1041uuu/rainbow.webp", 4, 0],
  ["../img/1041uuu/raingyudon.webp", 4, 0],
  ["../img/1041uuu/ramen.webp", 4, 0],
  ["../img/1041uuu/sakura.webp", 4, 0],
  ["../img/1041uuu/schoolgirls.webp", 4, 0],
  ["../img/1041uuu/smallroom.webp", 4, 0],
  ["../img/1041uuu/soda.webp", 4, 0],
  ["../img/1041uuu/sushibar.webp", 4, 0],
  ["../img/1041uuu/techgirl.webp", 4, 0],
  ["../img/1041uuu/train.webp", 4, 0],
  ["../img/1041uuu/wintertrain.webp", 4, 0],
  ["../img/pixeljeff/animalcrossing.webp", 5, 0],
  ["../img/pixeljeff/apartments.webp", 5, 0],
  ["../img/pixeljeff/busstop.webp", 5, 0],
  ["../img/pixeljeff/catstairs.webp", 5, 0],
  ["../img/pixeljeff/chillday.webp", 5, 0],
  ["../img/pixeljeff/chillnap.webp", 5, 0],
  ["../img/pixeljeff/christmas.webp", 5, 0],
  ["../img/pixeljeff/coffeeshop.webp", 5, 0],
  ["../img/pixeljeff/coldlove.webp", 5, 0],
  ["../img/pixeljeff/datenight.webp", 5, 0],
  ["../img/pixeljeff/futurepark.webp", 5, 0],
  ["../img/pixeljeff/girlflood.webp", 5, 0],
  ["../img/pixeljeff/hacker.webp", 5, 0],
  ["../img/pixeljeff/halloween.webp", 5, 0],
  ["../img/pixeljeff/halloweentwo.webp", 5, 0],
  ["../img/pixeljeff/icecream.webp", 5, 0],
  ["../img/pixeljeff/japanroom.webp", 5, 0],
  ["../img/pixeljeff/lunarfestival.webp", 5, 0],
  ["../img/pixeljeff/mariogamer.webp", 5, 0],
  ["../img/pixeljeff/oldguyandtrash.webp", 5, 0],
  ["../img/pixeljeff/rainyday.webp", 5, 0],
  ["../img/pixeljeff/ramenshop.webp", 5, 0],
  ["../img/pixeljeff/roadsidestore.webp", 5, 0],
  ["../img/pixeljeff/rogfuture.webp", 5, 0],
  ["../img/pixeljeff/sexy.webp", 5, 0],
  ["../img/pixeljeff/shrine.webp", 5, 0],
  ["../img/pixeljeff/starwars.webp", 5, 0],
  ["../img/pixeljeff/storesleep.webp", 5, 0],
  ["../img/pixeljeff/streetfood.webp", 5, 0],
  ["../img/pixeljeff/videogame.webp", 5, 0],
  ["../img/pixeljeff/wallcat.webp", 5, 0],
  ["../img/pixeljeff/zombiethriller.webp", 5, 0],
  ["../img/minimoss/city.webp", 6, 0],
  ["../img/minimoss/moonthief.webp", 6, 0],
  ["../img/minimoss/ramen.webp", 6, 0],
  ["../img/minimoss/sanctuary.webp", 6, 0],
  ["../img/minimoss/shootingstars.webp", 6, 0],
  ["../img/minimoss/slime.webp", 6, 0],
  ["../img/minimoss/storm.webp", 6, 0],
  ["../img/minimoss/zengarden.webp", 6, 0],
  ["../img/minimoss/zengarden2.webp", 6, 0],
  ["../img/minimoss/window.webp", 6, 0],
  ["../img/intotherift/intotherift.webp", 7, 0],
  ["../img/wakuwaku/japanmorning.webp", 8, 0],
  ["../img/wakuwaku/japanafternoon.webp", 8, 0],
  ["../img/wakuwaku/japannight.webp", 8, 0],
  ["../img/Haopanyo/15years.mp4", 9, 1],
  ["../img/Haopanyo/90sarcade.mp4", 9, 1],
  ["../img/Haopanyo/arcade1.mp4", 9, 1],
  ["../img/Haopanyo/Attack-on-Titan.mp4", 9, 1],
  ["../img/Haopanyo/Ben10.mp4", 9, 1],
  ["../img/Haopanyo/catrobofighter1.mp4", 9, 1],
  ["../img/Haopanyo/catrobofighter2.mp4", 9, 1],
  ["../img/Haopanyo/Cyberpunk.mp4", 9, 1],
  ["../img/Haopanyo/demon.mp4", 9, 1],
  ["../img/Haopanyo/famicom.mp4", 9, 1],
  ["../img/Haopanyo/fishing.mp4", 9, 1],
  ["../img/Haopanyo/Game-boy.mp4", 9, 1],
  ["../img/Haopanyo/gamer.mp4", 9, 1],
  ["../img/Haopanyo/godbox.mp4", 9, 1],
  ["../img/Haopanyo/Halloween.mp4", 9, 1],
  ["../img/Haopanyo/japanesearcade.mp4", 9, 1],
  ["../img/Haopanyo/lazy-switch.mp4", 9, 1],
  ["../img/Haopanyo/metroid.mp4", 9, 1],
  ["../img/Haopanyo/naruto.mp4", 9, 1],
  ["../img/Haopanyo/pokemon-running.mp4", 9, 1],
  ["../img/Haopanyo/roboGod.mp4", 9, 1],
  ["../img/Haopanyo/slimecity.mp4", 9, 1],
  ["../img/Haopanyo/Splatoon3.mp4", 9, 1],
  ["../img/Haopanyo/Sushiii.mp4", 9, 1],
  ["../img/Haopanyo/Teen-titans-TeenTitans.mp4", 9, 1],
  ["../img/Haopanyo/TekkenBloodline.mp4", 9, 1],
  ["../img/Haopanyo/VR-Arcade.mp4", 9, 1],
  ["../img/Haopanyo/Xenoblade-3.mp4", 9, 1],
  ["../img/Haopanyo/ZeldaTearsoftheKingdom.mp4", 9, 1],
  ["../img/Haopanyo/mob-roasting.mp4", 9, 1],
  ["../img/Haopanyo/pokemon-fight.mp4", 9, 1],
  ["../img/Haopanyo/persona3.mp4", 9, 1],
  ["../img/Haopanyo/streetfighter.mp4", 9, 1],
  ["../img/Haopanyo/cooking.mp4", 9, 1],
  ["../img/Haopanyo/dragon.mp4", 9, 1],
  ["../img/Haopanyo/rabbit.mp4", 9, 1],
  ["../img/Haopanyo/rubysaphire.mp4", 9, 1],
  ["../img/Haopanyo/beach.mp4", 9, 1],
  ["../img/itzah/BotW.mp4", 10, 1],
  ["../img/itzah/CasteliaCity.mp4", 10, 1],
  ["../img/itzah/earthbound.mp4", 10, 1],
  ["../img/itzah/emerald.mp4", 10, 1],
  ["../img/itzah/emeraldbike.mp4", 10, 1],
  ["../img/itzah/hollowknight.mp4", 10, 1],
  ["../img/itzah/lapras.mp4", 10, 1],
  ["../img/itzah/Majoras.mp4", 10, 1],
  ["../img/itzah/MasterSword.mp4", 10, 1],
  ["../img/itzah/maywaterfall.mp4", 10, 1],
  ["../img/itzah/OcarinanoUI.mp4", 10, 1],
  ["../img/itzah/OcarinawithUI.mp4", 10, 1],
  ["../img/itzah/peachsunshineHDUI.mp4", 10, 1],
  ["../img/itzah/PinwheelForest.mp4", 10, 1],
  ["../img/itzah/resident1.mp4", 10, 1],
  ["../img/itzah/Skyward.mp4", 10, 1],
  ["../img/itzah/Tearsofkingdom.mp4", 10, 1],
  ["../img/itzah/Twilightprincess.mp4", 10, 1],
  ["../img/itzah/UndellaTown.mp4", 10, 1],
  ["../img/itzah/windwaker.mp4", 10, 1],
  ["../img/itzah/ZeldaMasterSword.mp4", 10, 1],
  ["../img/itzah/zeldasunset.mp4", 10, 1],
  ["../img/kirokaze/After-school.gif", 0, 0],
  ["../img/kirokaze/Afterwork.gif", 0, 0],
  ["../img/kirokaze/Ashes.gif", 0, 0],
  ["../img/kirokaze/Backup-Memory.gif", 0, 0],
  ["../img/kirokaze/Broken-Lands.gif", 0, 0],
  ["../img/kirokaze/Burning-eye.gif", 0, 0],
  ["../img/kirokaze/Busy-City.gif", 0, 0],
  ["../img/kirokaze/Butterflies.gif", 0, 0],
  ["../img/kirokaze/changing-channels.gif", 0, 0],
  ["../img/kirokaze/Chill-Breeze.gif", 0, 0],
  ["../img/kirokaze/Choose-Pilot.gif", 0, 0],
  ["../img/kirokaze/City-Reflection.gif", 0, 0],
  ["../img/kirokaze/Cold-Day.gif", 0, 0],
  ["../img/kirokaze/Derrick-piece.gif", 0, 0],
  ["../img/kirokaze/Desert-Stage.gif", 0, 0],
  ["../img/kirokaze/Eraser.gif", 0, 0],
  ["../img/kirokaze/Escapism.gif", 0, 0],
  ["../img/kirokaze/Fishing-Spot.gif", 0, 0],
  ["../img/kirokaze/Flower-Market.gif", 0, 0],
  ["../img/kirokaze/Gift-Exchange.gif", 0, 0],
  ["../img/kirokaze/GM-Squad.gif", 0, 0],
  ["../img/kirokaze/Gundam.gif", 0, 0],
  ["../img/kirokaze/gundam-base.gif", 0, 0],
  ["../img/kirokaze/Hangar.gif", 0, 0],
  ["../img/kirokaze/Holograms.gif", 0, 0],
  ["../img/kirokaze/Inprnt-shop.gif", 0, 0],
  ["../img/kirokaze/Isolated-Incident.gif", 0, 0],
  ["../img/kirokaze/Jamming.gif", 0, 0],
  ["../img/kirokaze/Journey.gif", 0, 0],
  ["../img/kirokaze/Lakeside.gif", 0, 0],
  ["../img/kirokaze/Loading.gif", 0, 0],
  ["../img/kirokaze/Lonely-Lights.gif", 0, 0],
  ["../img/kirokaze/Lonely-Rain.gif", 0, 0],
  ["../img/kirokaze/Lost-Friend.gif", 0, 0],
  ["../img/kirokaze/Lost-Papers.gif", 0, 0],
  ["../img/kirokaze/Maintenance.gif", 0, 0],
  ["../img/kirokaze/Massive-Galaxy.gif", 0, 0],
  ["../img/kirokaze/Mechanic.gif", 0, 0],
  ["../img/kirokaze/Midnight-Lights.gif", 0, 0],
  ["../img/kirokaze/Midnight-Meal.gif", 0, 0],
  ["../img/kirokaze/Midnight-Thoughts.gif", 0, 0],
  ["../img/kirokaze/Morning-Fuel.gif", 0, 0],
  ["../img/kirokaze/Morning-Rain.gif", 0, 0],
  ["../img/kirokaze/Morning-Training.gif", 0, 0],
  ["../img/kirokaze/Mountain-Guards.gif", 0, 0],
  ["../img/kirokaze/night-drift.gif", 0, 0],
  ["../img/kirokaze/Night-Session.gif", 0, 0],
  ["../img/kirokaze/Office-Day.gif", 0, 0],
  ["../img/kirokaze/Outer-Chill.gif", 0, 0],
  ["../img/kirokaze/Park.gif", 0, 0],
  ["../img/kirokaze/Pastime.gif", 0, 0],
  ["../img/kirokaze/Photo-group.gif", 0, 0],
  ["../img/kirokaze/Photo-Taken.gif", 0, 0],
  ["../img/kirokaze/Pilot-Link.gif", 0, 0],
  ["../img/kirokaze/Prison-Stage.gif", 0, 0],
  ["../img/kirokaze/Rain-and-Metal.gif", 0, 0],
  ["../img/kirokaze/Resting-Place.gif", 0, 0],
  ["../img/kirokaze/Robo-Trip.gif", 0, 0],
  ["../img/kirokaze/Ronin.gif", 0, 0],
  ["../img/kirokaze/Rose-Knight.gif", 0, 0],
  ["../img/kirokaze/SD-Gundam.gif", 0, 0],
  ["../img/kirokaze/Seashore.gif", 0, 0],
  ["../img/kirokaze/Signs.gif", 0, 0],
  ["../img/kirokaze/Space-Town.gif", 0, 0],
  ["../img/kirokaze/Standpoint.gif", 0, 0],
  ["../img/kirokaze/Still-On.gif", 0, 0],
  ["../img/kirokaze/Sunset-Drive.gif", 0, 0],
  ["../img/kirokaze/Sunset-Wind.gif", 0, 0],
  ["../img/kirokaze/Terraform.gif", 0, 0],
  ["../img/kirokaze/Tranquil-Day.gif", 0, 0],
  ["../img/kirokaze/Used-ones.gif", 0, 0],
  ["../img/kirokaze/Vendor.gif", 0, 0],
  ["../img/kirokaze/Vortex.gif", 0, 0],
  ["../img/kirokaze/Waiting-Call-Johnny-Rehab-Imaginary-Love.gif", 0, 0],
  ["../img/kirokaze/Wallpaper-Engine.gif", 0, 0],
  ["../img/kirokaze/Wanderers.gif", 0, 0],
  ["../img/kirokaze/Way-Home.gif", 0, 0],
  ["../img/kirokaze/Windy-night.gif", 0, 0],
  ["../img/kirokaze/Wing-Gundam-Zero.gif", 0, 0],
  ["../img/kirokaze/Work-Mode.gif", 0, 0],
  ["../img/kirokaze/Youtube-piece.gif", 0, 0],
  ["../img/kirokaze/Zaku-II-Kai.gif", 0, 0],
  ["../img/kirokaze/Z-gok.gif", 0, 0],
  ["../img/tenten/blueflowers.webp", 11, 0],
  ["../img/tenten/cat.webp", 11, 0],
  ["../img/tenten/catWalking.webp", 11, 0],
  ["../img/tenten/forest.webp", 11, 0],
  ["../img/tenten/gameboy.webp", 11, 0],
  ["../img/tenten/napPark.webp", 11, 0],
  ["../img/tenten/schoolkids.webp", 11, 0],
  ["../img/tenten/slowTrain.webp", 11, 0],
  ["../img/tenten/summerHangers.webp", 11, 0],
  ["../img/tenten/summerpark.webp", 11, 0],
  ["../img/tenten/trainNight.webp", 11, 0],
  ["../img/tenten/washingdishes.webp", 11, 0],
  ["../img/valve/day_english.gif", 12, 0],
  ["../img/valve/day_japanese.gif", 12, 0],
  ["../img/valve/night_japanese.gif", 12, 0],
  ["../img/valve/winter2023_day_japanese.gif", 12, 0],
  ["../img/yaleiSyu/adventure_fireplace.gif", 13, 0],
  ["../img/yaleiSyu/beach_chillin.gif", 13, 0],
  ["../img/yaleiSyu/butterfly_garden.gif", 13, 0],
  ["../img/yaleiSyu/cafe_girl.gif", 13, 0],
  ["../img/yaleiSyu/animegirl_fight.gif", 13, 0],
  ["../img/yaleiSyu/cat_desk.gif", 13, 0],
  ["../img/yaleiSyu/cat_guitar.gif", 13, 0],
  ["../img/yaleiSyu/cat_stand.gif", 13, 0],
  ["../img/yaleiSyu/christmas_couple_fireplace.gif", 13, 0],
  ["../img/yaleiSyu/christmas_couple1.gif", 13, 0],
  ["../img/yaleiSyu/christmas_couple2.gif", 13, 0],
  ["../img/yaleiSyu/christmas_couple3.gif", 13, 0],
  ["../img/yaleiSyu/city_overlook.gif", 13, 0],
  ["../img/yaleiSyu/cooking_show.gif", 13, 0],
  ["../img/yaleiSyu/cute_cafe.gif", 13, 0],
  ["../img/yaleiSyu/demon_alter.gif", 13, 0],
  ["../img/yaleiSyu/dragon_friends.gif", 13, 0],
  ["../img/yaleiSyu/easter_couple.gif", 13, 0],
  ["../img/yaleiSyu/eve_fireplace.gif", 13, 0],
  ["../img/yaleiSyu/fireworks_couple.gif", 13, 0],
  ["../img/yaleiSyu/flower_girl.gif", 13, 0],
  ["../img/yaleiSyu/frieren1.gif", 13, 0],
  ["../img/yaleiSyu/frieren2.gif", 13, 0],
  ["../img/yaleiSyu/girl_bar.gif", 13, 0],
  ["../img/yaleiSyu/girl_bus.gif", 13, 0],
  ["../img/yaleiSyu/girl_cafe.gif", 13, 0],
  ["../img/yaleiSyu/girl_computer.gif", 13, 0],
  ["../img/yaleiSyu/girl_computer2.gif", 13, 0],
  ["../img/yaleiSyu/girl_forest.gif", 13, 0],
  ["../img/yaleiSyu/girl_melonsoda.gif", 13, 0],
  ["../img/yaleiSyu/girl_room.gif", 13, 0],
  ["../img/yaleiSyu/Girl_sleeping.gif", 13, 0],
  ["../img/yaleiSyu/girl_walking.webp", 13, 0],
  ["../img/yaleiSyu/girl_workshop.gif", 13, 0],
  ["../img/yaleiSyu/halloween_couple.gif", 13, 0],
  ["../img/yaleiSyu/hotgirl_garden.gif", 13, 0],
  ["../img/yaleiSyu/ipad_girl.gif", 13, 0],
  ["../img/yaleiSyu/man_fox.gif", 13, 0],
  ["../img/yaleiSyu/night_walk.gif", 13, 0],
  ["../img/yaleiSyu/paint_couple.gif", 13, 0],
  ["../img/yaleiSyu/pirates.gif", 13, 0],
  ["../img/yaleiSyu/rain_girl.gif", 13, 0],
  ["../img/yaleiSyu/red_car.gif", 13, 0],
  ["../img/yaleiSyu/taiwan_conbini.gif", 13, 0],
  ["../img/kirokaze/Tokyo-Nights.gif", 0, 0],
  ["../img/kirokaze/Late-sleep.gif", 0, 0],
  ["../img/kirokaze/Static.gif", 0, 0],
  ["../img/kirokaze/Arcade-Date.gif", 0, 0],
  ["../img/kirokaze/Rally-Start.gif", 0, 0],
  ["../img/kirokaze/Top-gear.gif", 0, 0],
  ["../img/kirokaze/Gunpoint.gif", 0, 0],
  ["../img/kirokaze/Mech-Crawler.gif", 0, 0],
  ["../img/kirokaze/Dungeon-crawler-quest.gif", 0, 0],
  ["../img/valenberg/Day4.gif", 3, 0],
  ["../img/valenberg/Amplitude-Problem-Tire-Shine.gif", 3, 0],
  ["../img/valenberg/Amplitude-Problem-Wet-Pavement-Blues.gif", 3, 0],
  ["../img/valenberg/Dead-end.gif", 3, 0],
  ["../img/valenberg/Overload.gif", 3, 0],
  ["../img/valenberg/Hunger.gif", 3, 0],
  ["../img/valenberg/Kitsune.gif", 3, 0],
  ["../img/valenberg/VirtuaVerse-now-on-Discord.gif", 3, 0],
  ["../img/valenberg/Wasteland-VirtuaVerse.gif", 3, 0],
  ["../img/pixeljeff/Good-Nap.gif", 5, 0],
  ["../img/pixeljeff/New-Dawn.gif", 5, 0],
  ["../img/pixeljeff/Playground.gif", 5, 0],
  ["../img/pixeljeff/After-Rain.gif", 5, 0],
  ["../img/pixeljeff/Extraordinary-Attorney-Woo.gif", 5, 0],
  ["../img/pixeljeff/First-Love.gif", 5, 0],
  ["../img/pixeljeff/Prettiest-To-Me.gif", 5, 0],
  ["../img/pixeljeff/Ditoo-Pro.gif", 5, 0],
  ["../img/pixeljeff/Chill-Mando.gif", 5, 0],
  ["../img/pixeljeff/Chill-of-the-Wild.gif", 5, 0],
  ["../img/pixeljeff/Little-Pal.gif", 5, 0],
  ["../img/pixeljeff/It-s-OK-to-be-Sad.gif", 5, 0],
  ["../img/pixeljeff/Kirby-s-Chill-Land.gif", 5, 0],
  ["../img/pixeljeff/Alley-of-Wicked.gif", 5, 0],
  ["../img/pixeljeff/Coding.gif", 5, 0],
  ["../img/pixeljeff/Pixel-Jeff-X-Divoom.gif", 5, 0],
  ["../img/pixeljeff/Hungry-Bug.gif", 5, 0],
  ["../img/minimoss/sword-broken.webp", 6, 0],
  ["../img/minimoss/sword-forest.webp", 6, 0],
  ["../img/minimoss/sword-fall.webp", 6, 0],
  ["../img/minimoss/sword-grass.webp", 6, 0],
  ["../img/minimoss/deer.webp", 6, 0],
  ["../img/minimoss/jumping-cat.webp", 6, 0],
  ["../img/itzah/HD Desk Floaroma Town.mp4", 10, 1],
  ["../img/itzah/HD Desk 2b.mp4", 10, 1],
  ["../img/itzah/HD Desk Peach sky (1).mp4", 10, 1],
  ["../img/itzah/HD Desk Mythra.mp4", 10, 1],
  ["../img/itzah/HD Desk Pyra.mp4", 10, 1],
  ["../img/itzah/Hd Desk Nessa pool.mp4", 10, 1],
  ["../img/waneella/01_mar_29.gif", 14, 0],
  ["../img/waneella/01-26.gif", 14, 0],
  ["../img/waneella/1.gif", 14, 0],
  ["../img/waneella/02_25.gif", 14, 0],
  ["../img/waneella/03-17.gif", 14, 0],
  ["../img/waneella/3qnupLBQym.gif", 14, 0],
  ["../img/waneella/04_mar_04neud_24.gif", 14, 0],
  ["../img/waneella/6USUVRm56F.gif", 14, 0],
  ["../img/waneella/18-35.gif", 14, 0],
  ["../img/waneella/19-23_smooth.gif", 14, 0],
  ["../img/waneella/20-48.gif", 14, 0],
  ["../img/waneella/23-37.gif", 14, 0],
  ["../img/waneella/35.6541693_139.7022296.gif", 14, 0],
  ["../img/waneella/35.6835709139.7030749.gif", 14, 0],
  ["../img/waneella/35.6913217139.7672178.gif", 14, 0],
  ["../img/waneella/35-6586935_139-6985097_waneella.gif", 14, 0],
  ["../img/waneella/Abyss_waneella.gif", 14, 0],
  ["../img/waneella/Afterglow_waneella.gif", 14, 0],
  ["../img/waneella/Air_waneella.gif", 14, 0],
  ["../img/waneella/Amber_waneella.gif", 14, 0],
  ["../img/waneella/Apr_01-17.gif", 14, 0],
  ["../img/waneella/Apr_04-24_clouds_13.gif", 14, 0],
  ["../img/waneella/Apr_05-21.gif", 14, 0],
  ["../img/waneella/Aug-04-35.gif", 14, 0],
  ["../img/waneella/August-01-17.gif", 14, 0],
  ["../img/waneella/Block_R-38_waneella.gif", 14, 0],
  ["../img/waneella/Bloom_waneella.gif", 14, 0],
  ["../img/waneella/blue_waneella_03.gif", 14, 0],
  ["../img/waneella/Circles_waneella.gif", 14, 0],
  ["../img/waneella/Dark_Corners_waneella.gif", 14, 0],
  ["../img/waneella/Dawn_waneella.gif", 14, 0],
  ["../img/waneella/Destination_waneella.gif", 14, 0],
  ["../img/waneella/Dim_waneella.gif", 14, 0],
  ["../img/waneella/Distance_waneella.gif", 14, 0],
  ["../img/waneella/Distorted_waneella.gif", 14, 0],
  ["../img/waneella/Edge_waneella.gif", 14, 0],
  ["../img/waneella/Empty_Spaces_waneella.gif", 14, 0],
  ["../img/waneella/Evening_forecast_waneella.gif", 14, 0],
  ["../img/waneella/Feb_03_29.gif", 14, 0],
  ["../img/waneella/Fragments_waneella.gif", 14, 0],
  ["../img/waneella/Full_of_Hopes_waneella.gif", 14, 0],
  ["../img/waneella/gif_10.gif", 14, 0],
  ["../img/waneella/GUNSHIP.gif", 14, 0],
  ["../img/waneella/Harbour_waneella.gif", 14, 0],
  ["../img/waneella/Haze_waneella.gif", 14, 0],
  ["../img/waneella/Heat_waneella.gif", 14, 0],
  ["../img/waneella/Horizon_Pt-1_waneella.gif", 14, 0],
  ["../img/waneella/Horizon_Pt-2_waneella.gif", 14, 0],
  ["../img/waneella/j0P563I4ZE.gif", 14, 0],
  ["../img/waneella/June_01_full_1600_05.gif", 14, 0],
  ["../img/waneella/June-03-31.gif", 14, 0],
  ["../img/waneella/Lights_waneella.gif", 14, 0],
  ["../img/waneella/Looks_Like_A_Nice_Place_Pt-1_waneella.gif", 14, 0],
  ["../img/waneella/Looks_Like_A_Nice_Place_Pt-2_waneella.gif", 14, 0],
  ["../img/waneella/Lull_waneella.gif", 14, 0],
  ["../img/waneella/May_01-16.gif", 14, 0],
  ["../img/waneella/May_02-31_FIN.gif", 14, 0],
  ["../img/waneella/Maybe_We_Should_Stay_Here-waneella.gif", 14, 0],
  ["../img/waneella/mbRtfWLicq.gif", 14, 0],
  ["../img/waneella/Multiverse_waneella.gif", 14, 0],
  ["../img/waneella/N-19_waneella.gif", 14, 0],
  ["../img/waneella/Nice_View_waneella.gif", 14, 0],
  ["../img/waneella/Night_waneella.gif", 14, 0],
  ["../img/waneella/No-Sleep-Again_waneella.gif", 14, 0],
  ["../img/waneella/Old-Town_waneella.gif", 14, 0],
  ["../img/waneella/On-The-Hill_waneella.gif", 14, 0],
  ["../img/waneella/Pearls_waneella.gif", 14, 0],
  ["../img/waneella/Pieces_waneella.gif", 14, 0],
  ["../img/waneella/rARIVxe6GC.gif", 14, 0],
  ["../img/waneella/Return_waneella.gif", 14, 0],
  ["../img/waneella/Rose_Waves_waneella.gif", 14, 0],
  ["../img/waneella/Same_Way_waneella.gif", 14, 0],
  ["../img/waneella/Sep-05-26-06.gif", 14, 0],
  ["../img/waneella/Sep-06-22.gif", 14, 0],
  ["../img/waneella/Shadow_waneella.gif", 14, 0],
  ["../img/waneella/Sketch_3_color-22.gif", 14, 0],
  ["../img/waneella/solar_wind_waneella.gif", 14, 0],
  ["../img/waneella/Solstice_waneella.gif", 14, 0],
  ["../img/waneella/Stardust_waneella.gif", 14, 0],
  ["../img/waneella/Summer_thoughts_waneella.gif", 14, 0],
  ["../img/waneella/Sunshine_waneella.gif", 14, 0],
  ["../img/waneella/The-Last-Hour_04.gif", 14, 0],
  ["../img/waneella/This_One_Still_Works_waneella.gif", 14, 0],
  ["../img/waneella/Undertone_waneella.gif", 14, 0],
  ["../img/waneella/waneella_198X_no_text_1440x1620_twitter.gif", 14, 0],
  ["../img/waneella/waneella_dusk.gif", 14, 0],
  ["../img/waneella/Warm_Days_Pt-1_waneella.gif", 14, 0],
  ["../img/waneella/Warm_Days_Pt-2_waneella.gif", 14, 0],
  ["../img/waneella/XP-pen-review-artwork-waneella.gif", 14, 0],
  ["../img/waneella/Zephyr_waneella.gif", 14, 0],
  [
    "../img/muscat_dot/tumblr_d9be6dd5ced68b8bf2182a5176ec4a30_48c7ac56_500.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_efa37d990fa1b49d85ee405ac9befa2b_ccf23e9c_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_f374a8929ad38927ed982c55cb668864_33fbef5c_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_fae1d84082a4b430cd1a005f191a9177_c540959f_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_2e5480562e8e9b7b2333286ae6c8ddf9_db78cc80_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_4b2f2166057e939eb03e6c70895d117c_fab86841_640.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_4cbb6fe7dde13f9db0f0d7800d12aa50_4059d25c_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_8a13f594591d9b8f8953727c723453ec_86d9364c_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_42b58326fe6e6596885d6702f93aa343_63402ea9_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_72bc37a6dd2eea5d41da39f405b9b214_46ea4cd7_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_91c55ca328bcbaaef3a49f43e81f9899_e810cc62_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_694cf25c17ff50c33f9e348d2822af97_aad42bec_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_4498c740f0a0afe2cd6bc732adf234e7_e071cf7c_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_bbde3d65e90f7e6923fcc06d29bd3f60_c4052dac_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_bd162c1e69424fcdba20e69f651ee396_0162cc9d_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_c4aa05c9b587fbd0f627861751e79bb7_35512d59_1280.webp",
    15,
    0,
  ],
  [
    "../img/muscat_dot/tumblr_cf808051868b0b9d4761bf0ce0dad551_64fe004d_1280.webp",
    15,
    0,
  ],
  ["../img/kirokaze/fighter.gif", 0, 0],
  ["../img/kirokaze/masterboot.gif", 0, 0],
  ["../img/kirokaze/noanswer.gif", 0, 0],
  ["../img/kirokaze/passinglights.gif", 0, 0],
  ["../img/kirokaze/quitebalcony.gif", 0, 0],
  ["../img/kirokaze/taxi.gif", 0, 0],
  ["../img/kirokaze/undersea.gif", 0, 0],
  ["../img/kirokaze/valleypeaks.gif", 0, 0],
  ["../img/1041uuu/plants.mp4", 4, 1],
  ["../img/1041uuu/plants2.mp4", 4, 1],
  ["../img/pixeljeff/chillboy.gif", 5, 0],
  ["../img/pixeljeff/dk.gif", 5, 0],
  ["../img/pixeljeff/metroid.gif", 5, 0],
  ["../img/pixeljeff/spacegirl.gif", 5, 0],
  ["../img/pixeljeff/flower.gif", 5, 0],
  ["../img/pixeljeff/yoda.gif", 5, 0],
  ["../img/valve/pixelatedadventures.mp4", 12, 1],
  ["../img/valve/summer2024sale.mp4", 12, 1],
  ["../img/waneella/city4.gif", 14, 0],
  ["../img/waneella/glasscube.gif", 14, 0],
  ["../img/waneella/heartbeat.gif", 14, 0],
  ["../img/waneella/radient.gif", 14, 0],
  ["../img/muscat_dot/drivingcity.mp4", 15, 1],
  ["../img/muscat_dot/floatingcity.mp4", 15, 1],
  ["../img/muscat_dot/gloatingerror.mp4", 15, 1],
  ["../img/muscat_dot/girlonbed.mp4", 15, 1],
  ["../img/muscat_dot/highschoollove.mp4", 15, 1],
  ["../img/muscat_dot/schoollove.mp4", 15, 1],
  ["../img/minimoss/jar.webp", 6, 0],
  ["../img/minimoss/lovers.webp", 6, 0],
  ["../img/yaleiSyu/aquarium.gif", 13, 0],
  ["../img/yaleiSyu/chillroom.gif", 13, 0],
  ["../img/yaleiSyu/dogs.gif", 13, 0],
  ["../img/yaleiSyu/halloweengirl.gif", 13, 0],
  ["../img/yaleiSyu/japanesestore.gif", 13, 0],
  ["../img/yaleiSyu/loading.gif", 13, 0],
  ["../img/yaleiSyu/magicbook.gif", 13, 0],
  ["../img/yaleiSyu/mermaid.gif", 13, 0],
  ["../img/yaleiSyu/mushrooms.gif", 13, 0],
  ["../img/yaleiSyu/sleepingforest.gif", 13, 0],
  ["../img/yaleiSyu/vampgirls.gif", 13, 0],
  ["../img/Haopanyo/badowls.mp4", 9, 1],
  ["../img/Haopanyo/bossbattle.mp4", 9, 1],
  ["../img/Haopanyo/chillinbirds.mp4", 9, 1],
  ["../img/Haopanyo/cutecollector.mp4", 9, 1],
  ["../img/Haopanyo/cuteslimes.mp4", 9, 1],
  ["../img/Haopanyo/dragonquest.mp4", 9, 1],
  ["../img/Haopanyo/goodbad.mp4", 9, 1],
  ["../img/Haopanyo/grimreaper.mp4", 9, 1],
  ["../img/Haopanyo/halloweengirl.mp4", 9, 1],
  ["../img/Haopanyo/icecream.mp4", 9, 1],
  ["../img/Haopanyo/metroid1.mp4", 9, 1],
  ["../img/Haopanyo/mousegirl.mp4", 9, 1],
  ["../img/Haopanyo/onagirigirl.mp4", 9, 1],
  ["../img/Haopanyo/owlgirl.mp4", 9, 1],
  ["../img/Haopanyo/peng.mp4", 9, 1],
  ["../img/Haopanyo/peng2.mp4", 9, 1],
  ["../img/Haopanyo/persona3reloaded.mp4", 9, 1],
  ["../img/Haopanyo/pinkgirl.mp4", 9, 1],
  ["../img/Haopanyo/pinkgirltree.mp4", 9, 1],
  ["../img/Haopanyo/pokemon1.mp4", 9, 1],
  ["../img/Haopanyo/pokemon2.mp4", 9, 1],
  ["../img/Haopanyo/pirategirl.mp4", 9, 1],
  ["../img/Haopanyo/rayq.mp4", 9, 1],
  ["../img/Haopanyo/ruincitygirl.mp4", 9, 1],
  ["../img/Haopanyo/sharkgirl.mp4", 9, 1],
  ["../img/Haopanyo/sheildgirl.mp4", 9, 1],
  ["../img/Haopanyo/slimegirl2.mp4", 9, 1],
  ["../img/Haopanyo/slimegirl3.mp4", 9, 1],
  ["../img/Haopanyo/slimes.mp4", 9, 1],
  ["../img/Haopanyo/snipergirl.mp4", 9, 1],
  ["../img/krm/anniversary.mp4", 16, 1],
  ["../img/krm/boatmobile.mp4", 16, 1],
  ["../img/krm/campfire.mp4", 16, 1],
  ["../img/krm/canIhazmemes.mp4", 16, 1],
  ["../img/krm/city.mp4", 16, 1],
  ["../img/krm/driving.mp4", 16, 1],
  ["../img/krm/fallout.mp4", 16, 1],
  ["../img/krm/japan.mp4", 16, 1],
  ["../img/krm/journey.mp4", 16, 1],
  ["../img/krm/lastofus.mp4", 16, 1],
  ["../img/krm/makingourownway.mp4", 16, 1],
  ["../img/krm/mnt.mp4", 16, 1],
  ["../img/krm/nothing.mp4", 16, 1],
  ["../img/krm/ramen.mp4", 16, 1],
  ["../img/krm/reddead.mp4", 16, 1],
  ["../img/krm/resting.mp4", 16, 1],
  ["../img/krm/safeinside.mp4", 16, 1],
  ["../img/krm/smokebreak.mp4", 16, 1],
  ["../img/krm/snow.mp4", 16, 1],
  ["../img/krm/thegameisrigged.mp4", 16, 1],
  ["../img/krm/tracks.mp4", 16, 1],
  ["../img/krm/tranquility.mp4", 16, 1],
  ["../img/krm/troublesleeping.mp4", 16, 1],
  ["../img/krm/waitingforsomeone.mp4", 16, 1],
  ["../img/krm/wfh.mp4", 16, 1],
  ["../img/krm/yesterday.mp4", 16, 1],
  ["../img/krm/dust9.gif", 16, 0],



];

var number_of_imgs = images.length;
