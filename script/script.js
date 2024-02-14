
var language = (window.navigator.userLanguage || window.navigator.language).split('-')[0];
console.log('lang:',language)

const viewer={
    desc: document.getElementById('viewer_desc'),
    title: document.getElementById('viewer_title'),
    img1: document.getElementById('viewer_0'),
    img2: document.getElementById('viewer_1'),
}

// buttons for gallery viewing
function img_btn(x,id){
    g=gallery[id]

    g.pos+=x
    if (g.pos<0) g.pos=g.max; else if (g.pos>g.max) g.pos=0;
    
    // get front and back images
    front_img=document.getElementById(id+'_0')
    back_img=document.getElementById(id+'_1')
    if(front_img.style.zIndex==2){[back_img,front_img]=[front_img,back_img]}

    // swap positions
    front_img.style.zIndex=2
    back_img.style.zIndex=1

    // fade old img (front) once the new one is loaded
    back_img.classList.remove("fade");
    back_img.onload = function () {
        front_img.classList.add("fade");
    }
    back_img.src=`gallery/${g.path}/${g.pos}.jpg`
}


// --- project viewer ---
const block_container=document.getElementById('block_container')
function place_blocks(){
    id=0
    block_container.innerHTML=''
    projects.forEach(p=>{
        console.log(p)
        block_container.innerHTML+=`<div class="block" id='th${id}' onclick='thumb(${id})'><img src="gallery/${p.path}/thumbnail.jpg"><p>${p.name}<p></div>`
        id++;
    })
}
place_blocks()

// scroling to the first element
const scroll_div=document.getElementById('scroll_div')
var blocks = document.querySelectorAll('div.block');
scroll_div.scroll(blocks[2].offsetLeft
    -scroll_div.offsetWidth/2
    +blocks[2].offsetWidth/2 ,0)


// clicking a thumbnail
function thumb(id){
    select=id
    list_move(0)
}


var select=0;

const max_select=projects.length
function list_move(x){
    select+=x
    if (select<0) select=0; else if (select>max_select) select = max_select;
    t=document.getElementById("th"+select)
        t.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
    
    const p=projects[select]
    viewer.desc.innerHTML=p.desc_en
    viewer.title.innerHTML=p.name
    viewer.img1.src= viewer.img2.src = `gallery/${p.path}/0.jpg`
    gallery.viewer.path=p.path
    gallery.viewer.max=p.max_img
    gallery.viewer.pos=0
    
}

// age variable for the "about me" section
const birthday = new Date("2003-11-09")
const now = new Date()
var age=now.getFullYear()-birthday.getFullYear()
if (now.getMonth()*100+now.getDate() < birthday.getMonth()*100+birthday.getDate()) age-=1

document.getElementById("age").innerHTML=age