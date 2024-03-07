const r = document.querySelector(':root'); //parallax


function parralax(){
    r.style.setProperty('--scroll',window.scrollY+'px')
}
parralax()
window.addEventListener("scroll", parralax);


// making the bottom fade texture in the "about me" section
// snap to pixels in the background
var pixel_css=0
const pixel_size=parseInt(getComputedStyle(r).getPropertyValue('--pixel_size').slice(0,-2))/150

function pixel_snap(){
    let h = document.getElementById("about").clientHeight - pixel_css
    pixel_css = ( Math.floor(h / pixel_size ) * pixel_size ) - h + pixel_size
    while(pixel_css<0){ pixel_css += pixel_size }
    r.style.setProperty('--pixel_fix', `${pixel_css}px`);
}
pixel_snap()
window.addEventListener('resize',pixel_snap)