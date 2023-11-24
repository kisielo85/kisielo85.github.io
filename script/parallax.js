const r = document.querySelector(':root'); //parallax
window.addEventListener("scroll", function(){
    r.style.setProperty('--scroll',window.pageYOffset+'px')
});
