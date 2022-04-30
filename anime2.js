const base_url = "https://api.jikan.moe/v3";

function onJson1(json) {
    console.log('JSON ricevuto');
    const ani_folder = document.querySelector('#anime-view');
    ani_folder.innerHTML = '';


    for(let i=0; i<10; i++){

        const doc=json.results[i];
        const url=doc.image_url;
        const title=doc.title;
        const descrizione=doc.synopsis;
        console.log(title);

        const anime= document.createElement('div');
        anime.classList.add('anime')

        const img= document.createElement('img');
        img.src= url;

        const didascalia = document.createElement('span');
        didascalia.textContent = title;

        const description= document.createElement('p');
        description.textContent= descrizione;

        anime.appendChild(img);
        anime.appendChild(didascalia);
        anime.appendChild(description);

        ani_folder.appendChild(anime);

    }
  
}



function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}



function searchAnime(event){

event.preventDefault();
const anime_input=document.querySelector("#anime");
const anime_value= encodeURIComponent(anime_input.value);



rest_url= base_url + "/search/anime?q=" + anime_value + "&page=1";
console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse).then(onJson1);
}


const form = document.querySelector('#ani');
form.addEventListener('submit', searchAnime)