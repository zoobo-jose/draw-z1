
/* 
    fichier js pour la page de dessin
*/

var PageDessin={
    mode:{
        SELECT:"select",
        CREATE_SHAPE:"create-shape",
        SET_COLOR:"set-color",
        FILL_COLOR:"fill-color",
        SCALE:"scale",
    },
    current_mode:"select",
    set_mode(mode){
        PageDessin.current_mode=mode;
    }
}


/* permet de selectionner un shape a partir d'un svg */
function select_current_shape(svg) {
    let projet = get_current_projet();
    let shape_id = parseInt(svg.getAttribute("data-shape"));
    projet.set_current_shape(shape_id);
    for (let i = 0; i < projet.shapes.length; i++) {
        let _svg = projet.shapes[i].get_svg();
        _svg.classList.remove('select')
    }
    svg.classList.add('select');
    adapt_panel_to_current_shape();
}

/* ajouter un nouveau shape */
async function add_new_shape(type){
    let projet = get_current_projet();
    await projet.add_new_shape(type);
}

/* duplique le shape courant */
async function duplicate_current_shape() {
    let projet = get_current_projet();
    await projet.duplicate_current_shape();
}

/* supprimer le shape courant */
function delete_current_shape() {
    let projet = get_current_projet();
    projet.delete_current_shape();
    clean_paper();
    projet.draw();

}

/* met a jour l'attribut d'un shape */
function set_attr_of_current_shape(key, value) {
    let shape = get_current_shape();
    if (shape) {
        shape[key] = value;
        shape.draw();
    }
}

/* met a jour un element de la propriete properties du shape courant shape */
function set_property_of_current_shape(key, value) {
    let shape = get_current_shape();
    if (shape) {
        shape.properties[key] = value;
        adapt_panel_calcul(shape)
        shape.draw();
    }
}

/* met a jour le x et y du panel par rapport au shape */
function adapt_panel_position_to_current_shape(shape) {
    let inputX = document.getElementById('prop_x');
    let inputY = document.getElementById('prop_y');
    inputX.value = shape.x;
    inputY.value = shape.y;
}

/* adapt les proprites du panel par rapport au shape courant  */
function adapt_panel_to_current_shape() {
    let shape = get_current_shape();
    let tab = Object.entries(shape);
    for (let i = 0; i < tab.length; i++) {
        let key = tab[i][0];
        let val = tab[i][1];
        let input = document.getElementById('prop_' + key);
        // console.log(input)
        if (input) {
            input.value = val;
            input.checked = val;
        }
    }

    adapt_panel_calcul(shape);

    let side = document.getElementById('custom_side');
    if (side) {
        side.innerHTML = "";
        let props_name = shape.get_properties_name();
        let props = shape.properties;
        for (let i = 0; i < props.length; i++) {
            let index = i + 0;
            let div = document.createElement('div');
            div.classList.add("prop");
            let span = document.createElement('span');
            span.innerText = props_name[i] + " :";
            div.append(span);
            let input = document.createElement('input');
            input.value = props[i];
            if (["width", "rayon", "height", "k", "rx", "ry","r","angle","cote"].includes(props_name[i])) {
                input.setAttribute("type", "number")
                input.oninput = function (e) {
                    set_property_of_current_shape(index, parseInt(this.value))
                }
            } else {
                input.oninput = function (e) {
                    set_property_of_current_shape(index, this.value)
                }
            }

            div.append(input);
            side.append(div);
        }
        // divers calcule
        let calculs= shape.getCustomCalcul();
        for (let i = 0; i < calculs.length; i++) {
            let calcul=calculs[i];
            let index = i + 0;
            let div = document.createElement('div');
            div.classList.add("prop");
            let span = document.createElement('span');
            span.innerText = calcul[0] + " :";
            div.append(span);
            let input = document.createElement('span');
            input.id="_custom_calcule_"+index;
            input.innerText = calcul[1];
            div.append(input);
            side.append(div);
        }
    }

}
/* affiche les calcule lier au shape*/
function adapt_panel_calcul(shape){
    if(shape){
        shape = get_current_shape();
    }
   /*aire*/
   let input = document.getElementById('prop_area_');
   if(input){
       input.innerText=shape.getArea();
   }
   /*perimetre*/
    input = document.getElementById('prop_perimeter_');
   if(input){
       input.innerText=shape.getPerimeter();
   }
   // divers calcule
   let calculs= shape.getCustomCalcul();
   for (let i = 0; i < calculs.length; i++) {
        let  text = document.getElementById("_custom_calcule_"+i);
       if(text){
        text.innerText=calculs[i][1];
       }
   }
}
/* renvoie l'element HTML sur lequel on dessine */
function get_paper() {
    let id_paper = "_paper";
    return document.getElementById(id_paper);
}

/* netoie l'element HTML sur lequel on dessine */
function clean_paper() {
    let paper = get_paper();
    paper.innerHTML = "";
}

function set_mode_dessin(mode){
    let buttons=document.getElementsByClassName("setter-mode");
    PageDessin.set_mode(mode);
    for(let i=0;i<buttons.length;i++){
        let button=buttons[i];
        let mode_=button.getAttribute("data-mode");
        if(mode_==mode){
            button.classList.add("select")
        }else{
            button.classList.remove("select")
        }
    }
    set_panel(mode);
}

/* fonction qui affiche le bon panel*/
function set_panel(mode){
    let panels= document.getElementsByClassName('panel');
    for(let i=0;i<panels.length;i++){
        let panel=panels[i];
        if(mode==panel.getAttribute('data-mode')){
            panel.classList.add('open')
        }else{
            panel.classList.remove('open')
        }
    }
}
