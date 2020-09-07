function getRandomImage() {
    const images = [
        '../img/kirokaze/amp_prob.gif',
        '../img/kirokaze/attack.gif',
        '../img/kirokaze/bad_landing.gif',
        '../img/kirokaze/bluebalcony.gif'
    ];
    return images[Math.floor(Math.random()*images.length)];
}


function main(){
    var img_url = getRandomImage();
    document.getElementById("background").style.backgroundImage = "url('"+img_url+"')";
    gettime("clock");
}