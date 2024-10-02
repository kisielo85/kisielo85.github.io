const r = document.querySelector(':root');

// parralax
function scrolled() {
    r.style.setProperty('--scroll', window.scrollY + 'px')
    set_auto_view()
}
scrolled()
window.addEventListener("scroll", scrolled);


// making the bottom texture in the "about me" section snap to pixels in the background
var pixel_css = 0
const pixel_size = parseInt(getComputedStyle(r).getPropertyValue('--pixel_size').slice(0, -2)) / 150

function pixel_snap() {
    let h = document.getElementById("about").clientHeight - pixel_css
    pixel_css = (Math.floor(h / pixel_size) * pixel_size) - h + pixel_size
    while (pixel_css < 0) { pixel_css += pixel_size }
    r.style.setProperty('--pixel_fix', `${pixel_css}px`);
}
pixel_snap()
window.addEventListener('resize', pixel_snap)


// age variable for the "about me" section
const birthday = new Date("2003-11-09")
const now = new Date()
var age = now.getFullYear() - birthday.getFullYear()
if (now.getMonth() * 100 + now.getDate() < birthday.getMonth() * 100 + birthday.getDate()) age -= 1

document.getElementById("age").innerHTML = age