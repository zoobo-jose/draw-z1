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
function hexagone_coord(r,border){
    let pas= Math.PI/3;
    let coord=[];
    for(let i=0;i<6;i++){
        angle=pas*i;
        coord[i]={
            x:border+r*(1-Math.cos(angle)),
            y:border+r*(1-Math.sin(angle)),
        }
    }
    return coord;
}
function triangle_isocele_coord(cote,border){
    let pas= 2*Math.PI/3;
    let coord=[];
    let r= cote/Math.tan(Math.PI/3);
    let r2=cote/2;
    for(let i=0;i<3;i++){
        angle=pas*i + Math.PI/2;
        coord[i]={
            x:r2-r*Math.cos(angle)+border,
            y:r*(1-Math.sin(angle))+border,
        }
    }
    return coord;
}
function losange_coord(r,angle_,border){
    // covertir en radians
    let angle= (angle_/2)*Math.PI/180;
    let dx=r*Math.cos(angle)+border;
    let dy=r*Math.sin(angle)+border;
    let coord=[
        {x:dx,y:border},
        {x:2*dx-border,y:dy},
        {x:dx,y:2*dy-border},
        {x:border,y:dy},
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

