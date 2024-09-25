const viewer={
    desc: document.getElementById('viewer_desc'),
    title: document.getElementById('viewer_title'),
}

// image loading progress logic
var cache={}
var changing={}
var auto_view=false
Image.prototype.load = function(url,id,is_auto=false){
    let fade=document.getElementById(id+'_fade')
    let img_scroll_t=scrollTimeout
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

        if (is_auto){
            auto_view_tick(img_scroll_t)
        }
    }

    // cached img
    if (cache[url]){
        this.src = window.URL.createObjectURL(cache[url]);
        this.hidden=false
        return
    }

    let time_left=-1
    let bar_showed=false
    
    function show_loading(){
        bar_showed=true
        fade.classList.remove('fade')
        fade.classList.add('fade-in')
        fade.style.opacity=1
    }

    // loading not started within 300ms : show progress bar
    setTimeout(() => {
        if (time_left == -1){show_loading()}
    }, "300");

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

    let load_timer=[]
    xmlHTTP.onprogress = function(e) {
        let progress = parseInt((e.loaded / e.total) * 100);
        progress_div.style.width=progress+'%'

        if (bar_showed){ return }

        if (time_left==-1){
            time_left=1
            load_timer=[progress,Date.now()]
        }
        else{
            let pr1 = (Date.now()-load_timer[1])/(progress-load_timer[0])
            time_left=(100-progress)*pr1/1000
            // more than a second left - show progress bar
            if (!bar_showed && time_left>1){show_loading()}
        }

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
function set_img(img,id,is_auto=false){
    old_img=document.getElementById(id+'_new')
    old_img.style.zIndex=2

    el = document.getElementById(id+'_old')
    if (el) el.remove()

    new_img=new Image();
    new_img.hidden=true
    new_img.style.zIndex=1
    new_img.load(img,id,is_auto)
    old_img.parentElement.appendChild(new_img)
}

// initial gallery loading
for (g in gallery){
    set_img(`gallery/${gallery[g].path}/0.jpg`,g)
}

// buttons for gallery viewing
function img_btn(x,id,is_auto=false){
    // if pressed by user, refresh timer
    if(!is_auto){set_auto_view()}
    g=gallery[id]

    g.pos+=x
    if (g.pos<0) g.pos=g.max; else if (g.pos>g.max) g.pos=0;
    set_img(`gallery/${g.path}/${g.pos}.jpg`, id,is_auto)
}


// --- project viewer ---
const block_container=document.getElementById('block_container')
function place_blocks(){
    
    block_container.innerHTML=''
    for (let i=-1; i<2; i++){
        id=0
        // thumbs with id -1 and 1 redirect to id 0
        projects.forEach(p=>{
            block_container.innerHTML+=`<div class="block" id='th_${i}_${id}' onclick='thumb(${id},${i})'><img src="gallery/${p.path}/thumbnail.jpg"><p>${p.name}<p></div>`
            id++;
        })
    }
}
place_blocks()

// scroling to the first element
const scroll_div=document.getElementById('scroll_div')
var blocks = document.querySelectorAll('div.block');
scroll_div.scroll(blocks[11].offsetLeft
    -scroll_div.offsetWidth/2
    +blocks[11].offsetWidth/2 ,0)


// clicking a thumbnail
function thumb(id,version){
    set_auto_view()
    select=id

    // versions -1 and 1 are "dummy thumbnails", they redirect to the correct one
    if (version !=0){
        const th_width=document.getElementById("th_0_0").offsetWidth
        document.getElementById("scroll_div").scrollLeft-=version*th_width*projects.length
    }
    list_move(0)
}


var select=2;

const max_select=projects.length
function list_move(x){
    select+=x
    if (select<0) select=0; else if (select>max_select) select = max_select;
    t=document.getElementById("th_0_"+select)
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


// check if scrollTimeout should run
var scrollTimeout
function set_auto_view(){
    const viewer=document.getElementById('viewer_new')
    const H_viewer=viewer.getBoundingClientRect().top+viewer.offsetHeight/2
    
    //if at least half of the image is on screen
    if (auto_view == (H_viewer>0&&H_viewer<window.innerHeight)){
        // refresh timer
        if (auto_view){
            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(auto_view_tick,15000)
        }
        return
    }
    auto_view = !auto_view

    if (auto_view){ // start timer
        scrollTimeout = setTimeout(auto_view_tick,15000)
    }else{ // stop timer
        clearTimeout(scrollTimeout)
    }
}


function auto_view_tick(img_t=0){
    // 0 - done waiting, time for new image
    if (img_t==0){
        const g=gallery['viewer']
        if (g.pos<g.max){img_btn(1,'viewer',true)}
        else {list_move(1)}
    }
    // timeout id is old, or disabled
    else if (img_t != scrollTimeout || !auto_view){
        return;
    }

    scrollTimeout = setTimeout(auto_view_tick,6000)
}