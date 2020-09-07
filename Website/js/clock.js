function gettime(div) {
    let time = new Date();
    document.getElementById(div).innerHTML = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
}

