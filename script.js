const r= document.querySelector(':root'); //parallax
window.addEventListener("scroll", function(){
    r.style.setProperty('--scroll',window.pageYOffset+'px')
});


gallery={
    'amogi':{pos:0,max:4},
    'pixel':{pos:0,max:2},
    'neon_sector':{pos:0,max:3},
}


function img_btn(x,dir){
    g=gallery[dir]
    g.pos+=x
    if (g.pos<0) g.pos=g.max; else if (g.pos>g.max) g.pos=0;
    
    frontimg=document.getElementById(dir+'0')
    backimg=document.getElementById(dir+'1')
    if(frontimg.style.zIndex==2){
        [backimg,frontimg]=[frontimg,backimg]
    }

    frontimg.style.zIndex=2 //swap positions

    backimg.style.zIndex=1
    backimg.classList.remove("fade");

    //fade old img once new is loaded
    backimg.onload = function () {
        frontimg.classList.add("fade");
    }
    backimg.src=`gallery/${dir}/${g.pos}.jpg`
    
}


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

function thumb(x){
    select=x
    scroll_btn(0)
    console.log(x)
}

function photo_scroll(){
    s=0-document.getElementById("photo-scroll").scrollLeft/5
    r.style.setProperty('--Hscroll',s+'px')
}