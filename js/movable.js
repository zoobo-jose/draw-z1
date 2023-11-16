/* 
    la class Movable pour deplacer des forme 
*/

class Movable {
    selected=false;
    delta_x=0;
    delta_y=0;
    page_x=0;
    page_y=0;
    offset_x=0;
    x=0;
    y=0;
    max_zIndex=2000;
}

/* for select and move shape */

function on_down_shape(svg,e){
    let movable=get_shape_of_svg(svg);
    movable.selected=true;
    movable.page_x=e.pageX;
    movable.page_y=e.pageY;
    svg.style.zIndex=movable.max_zIndex;
}

function on_move_shape(svg,e){
    let movable=get_shape_of_svg(svg);
    if( movable.selected){
        let d_x=e.pageX-movable.page_x;
        let d_y=e.pageY-movable.page_y;
        movable.page_x=e.pageX;
        movable.page_y=e.pageY;
        movable.x+=d_x;
        movable.y+=d_y;
        svg.style.top=movable.y+"px";
        svg.style.left=movable.x+"px";
        adapt_panel_position_to_current_shape(movable);
    }
    
}

function on_up_shape(svg,e){
    let movable=get_shape_of_svg(svg);
    movable.selected=false;
    svg.style.zIndex=movable.zIndex;
}

/* for scale shape */

function on_down_shape_scale(svg,e){
    let movable=get_shape_of_svg(svg);
    movable.selected=true;
    movable.offset_x=e.offsetX;
    svg.style.zIndex=movable.max_zIndex;
}

function on_move_shape_scale(svg,e){
    let movable=get_shape_of_svg(svg);
    if( movable.selected){
        let k=e.offsetX/movable.offset_x;
        movable.offset_x=e.offsetX;
        movable.scale(k);
    }
}

function on_up_shape_scale(svg,e){
    let movable=get_shape_of_svg(svg);
    movable.selected=false;
    svg.style.zIndex=movable.zIndex;
}