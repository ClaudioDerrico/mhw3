const base_url_gen = "https://kitsu.io/api/edge";

function onJson(json) {
    console.log('JSON ricevuto');
    const gen_folder = document.querySelector('#genere-view');
    gen_folder.innerHTML = '';


    for(let i=0; i<10; i++){

        

        const doc=json.data[i];
        
        const immagine=doc.attributes.posterImage.medium;
        console.log(immagine);
        const id=doc.id;
        
        const title=doc.attributes.canonicalTitle;
        console.log(title);
        const descrizione=doc.attributes.description;
        



        const genere= document.createElement('div');
        

        const img= document.createElement('img');
        img.src= immagine;

        const didascalia = document.createElement('span');
        didascalia.textContent = title;

        const description= document.createElement('p');
        description.textContent= descrizione;

        genere.appendChild(img);
        genere.appendChild(didascalia);
        genere.appendChild(description);

        gen_folder.appendChild(genere);

    }
  
}



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}



function searchAnimeByGenre(event){

event.preventDefault();
const genere_input=document.querySelector("#genere");
const genere_value= encodeURIComponent(genere_input.value);



rest_url= base_url_gen + "/anime?filter[categories]=" + genere_value ;
console.log('URL: ' + rest_url);
    fetch(rest_url, {
        headers:
        {
            'Authorization': 'Bearer ' + token
        }
    }
    ).then(onResponse).then(onJson);
}


function onTokenJson(json)
{
  console.log(json)
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}



// OAuth credentials --- NON SICURO!
const client_id = "zeldatauro1@gmail.com";
const client_secret = encodeURIComponent("unict123catania");
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://kitsu.io/api/oauth/token",{
    method: "post",
    body: 'grant_type=password&username=' + client_id +'&password=' + client_secret,
    headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
        
    }
}
).then(onTokenResponse).then(onTokenJson);




const form2 = document.querySelector('#gen');
form2.addEventListener('submit', searchAnimeByGenre);




