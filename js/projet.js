/* liste de tous les projets*/
var Projets = [];
/* tableau pour l'acces rapide au projets*/
var quick_access_projets = [];
/* index du projet courant : projet.id*/
var current_projet = 0;
/* index du prochain nouveau projet*/
var index_projet = 0;

/* class projet */
class Projet {

    id = 0;// identifiant pour l'affichage frontend
    _id = "";// identifiant pour la base de donnees
    name = "";
    shapes = [];// tableau de forme
    quick_access_shape = [];// tableau pour l'acces rapide au formes
    current_shape = 0;// id du shape courant
    index_shape = 0;// index a donner a une nouvelle forme

    constructor(id, name, shapes) {
        this.id = id;
        this.name = name;
        this.shapes = shapes;
        Projets.push(this);
    }

    load_json(_json) {
        this.id = _json.id;
        this._id = _json._id;
        this.name = _json.name;
        this.shapes = [];
        for (let i = 0; i < _json.shapes.length; i++) {
            let _shape = _json.shapes[i];
            let _class = SHAPES[_shape.type];
            if (_class) {
                let shape = new _class();
                shape.load_json(_shape);
                shape.id = this.index_shape;
                this.index_shape++;
                this.shapes.push(shape);
                this.quick_access_shape[shape.id] = shape;
            }
        };
    }

    get_json() {
        let shapes = [];
        for (let i = 0; i < this.shapes.length; i++) {
            shapes.push(this.shapes[i].get_json())
        }
        return {
            id: this.id,
            _id: this._id,
            name: this.name,
            shapes: shapes
        }
    }

    get_shape(id) {
        return this.quick_access_shape[id];
    }

    set_current_shape(id) {
        this.current_shape = id;
    }

    get_current_shape() {
        return this.quick_access_shape[this.current_shape];
    }

    async delete_current_shape() {
        let shapes = [];
        for (let i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i].id != this.current_shape) {
                shapes.push(this.shapes[i])
            }
        }
        this.shapes = shapes;
        this.quick_access_shape[this.current_shape] = null;
    }

    async duplicate_current_shape() {
        let json = this.get_current_shape().get_json();
        json = JSON.parse(JSON.stringify(json))
        let _class = SHAPES[json.type];
        if (_class) {
            let shape = new _class();
            json = {
                ...json,
                id: this.index_shape,
            }
            console.log("json", json)
            shape.load_json(json);
            console.log("shape", shape);
            this.index_shape++;
            await this.add_shape(shape);
        }

    }
    async add_shape(shape) {
        if (this.shapes == null) {
            this.shapes = [];
        }
        this.shapes.push(shape);
        this.quick_access_shape[shape.id] = shape;
        shape.draw();
    }
    async add_new_shape(type) {
        let _class = SHAPES[type];
        if (_class) {
            let shape = new _class();
            shape.id = this.index_shape;
            this.index_shape++;
            await this.add_shape(shape);
        }
    }
    async delete() {
        let projets = [];
        for (let i = 0; i < Projets.length; i++) {
            let projet = Projets[i];
            if (projet.id != this.id) {
                projets.push(projet)
            }
        }
        Projets = projets;
    }
    async draw() {
        for (let i = 0; i < this.shapes.length; i++) {
            await this.shapes[i].draw();
        }
    }
}
/* renvoie le projet courant */
function get_current_projet() {
    for (let i = 0; i < Projets.length; i++) {
        let projet = Projets[i];
        if (projet.id == current_projet) {
            return projet;
        }
    }
    return null;
}
/* renvoie le shape d'un svg */
function get_shape_of_svg(svg) {
    let projet = get_current_projet();
    let shape_id = parseInt(svg.getAttribute("data-shape"));
    let shape = projet.get_shape(shape_id);
    return shape
}
/* renvoie le shape courant*/
function get_current_shape() {
    let projet = get_current_projet();
    return projet.get_current_shape();
}

/* renvoie les donnees de Projets sous forme json*/
function get_json_of_projets() {
    let tab = [];
    for (let i = 0; i < Projets.length; i++) {
        tab.push(Projets[i].get_json());
    }
    return tab;
}
/* rempli Projets a partir d'un tableau json*/
function set_projets_from_json(json) {
    for (let i = 0; i < json.length; i++) {
        let projet = new Projet(0, "", []);
        projet.load_json(json[i]);
    }
    display_projets();
}
/* enregistre les data dans local storage*/
async function save_data_on_local_storage(pos) {
    let json = get_json_of_projets();
    console.log('---- ==== -----', pos, json)
    localStorage.setItem("projets", JSON.stringify(json))
    localStorage.setItem("current_projet", current_projet)
    localStorage.setItem("index_projet", index_projet)
}
/* charge les donnees depuis le local storage*/
function load_data_from_local_storage() {
    let json = localStorage.getItem("projets");
    let data = JSON.parse(json);
    set_projets_from_json(data)
    current_projet = parseInt(localStorage.getItem("current_projet"))
    index_projet = parseInt(localStorage.getItem("index_projet"))
    console.log('---- #### -----', Projets)
    console.group(current_projet, index_projet)
}
/* sauvegader le projet avant de quitter la page de dessin*/
function save_before_leave() {
    let projet= get_current_projet();
    _API.update_project(projet);
    save_data_on_local_storage('save before');
    go_to_page('projet');

}

function load_data_from_server() {
    open_popup("waiter");
    Projets=[];
    fetch(SERVER_URL + "/projets", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    }).then(response => response.json())
        .then((projets) => {
            for (let i = 0; i < projets.length; i++) {
                if (projets[i].shapes) {
                    projets[i].id = i;
                    projets[i].shapes = JSON.parse(projets[i].shapes)
                }
            }
            close_popup("waiter");
            set_projets_from_json(projets)
        }).catch((error)=>{
            close_popup("waiter");
            open_popup("error-server");
            load_data_from_local_storage()
        })
}

// load_data_from_local_storage()
load_data_from_server();
// console.log(p.shapes);

