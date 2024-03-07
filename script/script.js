const viewer={
    desc: document.getElementById('viewer_desc'),
    title: document.getElementById('viewer_title'),
}

// image loading progress logic
var cache={}
var changing={}
Image.prototype.load = function(url,id){
    let fade=document.getElementById(id+'_fade')
    let fast_load=true
    //canceling unfinished loading
    if (changing[id]){
        changing[id][0].remove()
        changing[id][1].abort()
    }

    // once new image is loaded
    this.onload = function(){
        changing[id]=false
        // fade the previous img
        el = document.getElementById(id+'_new')
        el.classList.add("fade");
        // swap places
        this.id=id+'_new'
        el.id=id+'_old'
        // hide the progress bar
        fade.classList.remove('fade-in')
        fade.classList.add('fade')
    }

    // cached img
    if (cache[url]){
        this.src = window.URL.createObjectURL(cache[url]);
        this.hidden=false
        return
    }

    document.getElementById(id+'_txt').innerHTML=url.slice(8)
    let progress_div=document.getElementById(id+'_progress')
    
    let thisImg = this;
    let xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';

    xmlHTTP.onloadstart = function() {
        changing[id]=[thisImg,this]
        progress_div.style.width='0%'
    };

    xmlHTTP.onprogress = function(e) {
        let progress = parseInt((e.loaded / e.total) * 100);
        
        // showing the progress bar only if loading is slow
        if (fast_load){
            if (progress<20){
                fast_load=false
                fade.classList.remove('fade')
                fade.classList.add('fade-in')
                fade.style.opacity=1
            }
        }
        else{ progress_div.style.width=progress+'%' }
    };

    xmlHTTP.onload = function() {
        let blob = new Blob([this.response]);
        cache[url]=blob
        thisImg.src = window.URL.createObjectURL(blob);
        thisImg.hidden=false
    };
    xmlHTTP.send();
};

//changing images
function set_img(img,id){
    old_img=document.getElementById(id+'_new')
    old_img.style.zIndex=2

    el = document.getElementById(id+'_old')
    if (el) el.remove()

    new_img=new Image();
    new_img.hidden=true
    new_img.style.zIndex=1
    new_img.load(img,id)
    old_img.parentElement.appendChild(new_img)
}

// initial gallery loading
for (g in gallery){
    set_img(`gallery/${gallery[g].path}/0.jpg`,g)
}

// buttons for gallery viewing
function img_btn(x,id){
    g=gallery[id]

    g.pos+=x
    if (g.pos<0) g.pos=g.max; else if (g.pos>g.max) g.pos=0;
    set_img(`gallery/${g.path}/${g.pos}.jpg`, id)
}


// --- project viewer ---
const block_container=document.getElementById('block_container')
function place_blocks(){
    id=0
    block_container.innerHTML=''
    projects.forEach(p=>{
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
    set_img(`gallery/${p.path}/0.jpg`,'viewer')
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