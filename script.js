const r= document.querySelector(':root');
window.addEventListener("scroll", function(){
    r.style.setProperty('--scroll',window.pageYOffset+'px')
});


var select=0;
const max_select=2;
function scroll_btn(x){
    select+=x
    if (select<0) select=0; else if (select>max_select) select= max_select;
    console.log(select)

    t=document.getElementById("th"+select)
    t.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
});
}
scroll_btn(0)

function thumb(x){
    select=x
    scroll_btn(0)
    console.log(x)
}

function photo_scroll(){
    s=0-document.getElementById("photo-scroll").scrollLeft/5
    r.style.setProperty('--Hscroll',s+'px')
}