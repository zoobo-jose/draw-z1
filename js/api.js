/* api pour la communication avec le server */

const _API={
    /* creer un projet*/
    create_project(projet){
        let json=projet.get_json();
        fetch(SERVER_URL + "/projet/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
            .then((response) => {
                console.log(response)
            }).catch((error) => {
    
            })
    },
     /* supprimer un projet*/
     delete_project(projet){
        let json=projet.get_json();
        console.log(json)
        fetch(SERVER_URL + "/projet/delete", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
            .then((response) => {
                console.log(response)
            }).catch((error) => {
    
            })
    },
     /* supprimer un projet*/
     update_project(projet){
        let json=projet.get_json();
        console.log(json)
        fetch(SERVER_URL + "/projet/update", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        }).then(response => response.json())
            .then((response) => {
                console.log(response)
            }).catch((error) => {
    
            })
    }
}