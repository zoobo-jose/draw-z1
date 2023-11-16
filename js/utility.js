const SERVER_URL="http://localhost:3000";

function open_popup(id_popup){
    let item= document.getElementById(id_popup)
    if(item){
        item.classList.add('open');
    }
}

function close_popup(id_popup){
    let item= document.getElementById(id_popup)
    if(item){
        item.classList.remove('open');
    }
}

function load_page(url){
    window.location.href =url;
}

function go_to_page(page_name){
    let pages = document.getElementsByClassName('page_');
    for(let i=0;i<pages.length;i++){
        let page=pages[i];
        if(page_name==page.getAttribute('data-page')){
            page.classList.add('open');
        }else{
            page.classList.remove('open');
        }
    }
}
function round(x,n){
    let k= Math.pow(10,n);
    return Math.round(k*x)/k;
}
function hexagone_coord(r){
    let pas= Math.PI/3;
    let coord=[];
    for(let i=0;i<6;i++){
        angle=pas*i;
        coord[i]={
            x:r*(1-Math.cos(angle)),
            y:r*(1-Math.sin(angle)),
        }
    }
    return coord;
}
function losange_coord(r,angle_){
    // covertir en radians
    let angle= (angle_/2)*Math.PI/180;
    let dx=r*Math.cos(angle);
    let dy=r*Math.sin(angle);
    let coord=[
        {x:dx,y:0},
        {x:2*dx,y:dy},
        {x:dx,y:2*dy},
        {x:0,y:dy},
    ]
    return coord;
}
function get_points_svg(coords){
    let points="";
    for(let i=0;i<coords.length;i++){
        let coord=coords[i];
        points+=coord.x+","
        points+=coord.y+" "
    }
    return points;
}

