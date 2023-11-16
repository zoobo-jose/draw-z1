/* engage une procedure pour supprimer un projet*/
function want_delete_projet(id_projet) {
    current_projet = id_projet;
    let projet = get_current_projet();
    let span = document.getElementById('delete_projet_p');
    if (span) {
        span.innerText = projet.name;
    }
    open_popup("delete_projet");
}

/* engage une procedure pour supprimer un projet*/
function want_create_projet() {
    open_popup('new_projet');
}

/* engage une procedure pour dupliquer un projet*/
function want_duplicate_projet(id_projet) {
    current_projet = id_projet;
    open_popup('duplicate_projet');
}

/* afficher un projet pour le modifier */
function display_projet(id_projet) {
    current_projet = id_projet;
    let projet = get_current_projet();
    clean_paper();
    projet.draw();
    let item = document.getElementById("projet_name");
    if (item) {
        item.innerText = projet.name;
    }
    save_data_on_local_storage('display projet');
    go_to_page('dessin');
}

/*
    Affiche les projets sur la page
*/
function display_projets() {
    let item = document.getElementById('projets');
    if (item) {
        item.innerHTML = "";
        for (let i = 0; i < Projets.length; i++) {
            let projet = Projets[i];
            let content = ' <div class="projet">\
        <span class="span"  onclick="display_projet('+ projet.id + ')">\
            '+ projet.name + '\
            <i class="bi bi-palette"></i>\
        </span>\
        <div class="options">\
            <span class="h">\
                <i class="bi bi-three-dots"></i>\
            </span>\
        </div>\
        <div class="content">\
            <span class="option" onclick="want_delete_projet('+ projet.id + ')">\
                sup<i class="bi bi-trash"></i>\
            </span>\
            <span class="option" onclick="want_duplicate_projet('+ projet.id + ')">\
             dup  <i class="bi bi-copy"></i>\
            </span>\
        </div>\
    </div>'
            item.innerHTML += content;
        }
    }
}

function change_display_mode() {
    let item = document.getElementById('projets');
    if (item) {
        item.classList.toggle('design2')
    }
}

function create_projet() {
    let input = document.getElementById('create_projet_i');
    create_new_projet(input.value);
    input.value = "";
    display_projets();
    save_data_on_local_storage()
}
/*
    dupliquer le projet courant
*/
function duplicate_projet() {
    let input = document.getElementById('duplicate_projet_i');
    let projet = get_current_projet();
    let json = projet.get_json();
    json = JSON.parse(JSON.stringify(json));
    current_projet = index_projet;
    json.id = index_projet;
    json.name = input.value;
    let new_projet = new Projet(json.id, json.name, [])
    new_projet.load_json(json);
    index_projet++;
    input.value = "";
    _API.create_project(new_projet);
    display_projets();
    save_data_on_local_storage();
}
/*
    creer un nouveau projet
*/
function create_new_projet(name) {
    current_projet = index_projet;
    index_projet++;
    let projet = new Projet(current_projet, name, []);
    _API.create_project(projet);
    console.log(projet);
}

/*
    mettre a jour le projet courant
*/
function update_current_data(){
    let projet = get_current_projet();
    _API.update_project(projet);
}
/*
    supprimer un projet
*/
function delete_current_projet() {
    let projets = [];
    let projet_deleted=get_current_projet();
    for (let i = 0; i < Projets.length; i++) {
        let projet = Projets[i];
        if (projet.id != current_projet) {
            projets.push(projet)
        }
    }
    Projets = projets;
    _API.delete_project(projet_deleted);
    display_projets();
    save_data_on_local_storage()
}
display_projets()