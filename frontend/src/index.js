import axios from 'axios';
import { el, icon } from './documentUtil';
import  { notifyOk } from './documentUtil';

window.readMovies = function () {
    axios.get('http://localhost:8080/movies')
        .then((response) => {
            const movieList = response.data;
            //const movieUl = el('movies'); Así era cuando lo teníamos en forma de lista en index.html
            const movieTable = el('tableBody');
            movieList.forEach(movie => {
                //const listItem = document.createElement('li');  Pasa lo mismo que con lo de arriba, esto era para cuando teníamos la lista
                //listItem.className = 'list-group-item';
                //listItem.appendChild(document.createTextNode(movie.title + ' (' + movie.year + ') ' + movie.description));
                //movieUl.appendChild(listItem);

                const row = document.createElement('tr');
                row.id = 'movie-' + movie.id;
                row.innerHTML = '<td>' + movie.title + '</td>' + //Webinar 4, en minuto 52 se lleva los td también en una función de documentUtil.js
                                '<td>' + movie.description + '</td>' +
                                '<td>' + movie.year + '</td>' +
                                '<a class="btn btn-warning" href="#">' + 
                                icon('edit') //Antes estaba aquí el código svg pero nos lo hemos llevado a documentUtil.js
                               + '</a>' +
                                '<a class="btn btn-danger" href="javascript:removeMovie(' + movie.id + ');">' + 
                                icon('delete') //Antes estaba aquí código svg, ahora en documentUtil.js
                               + '</a>';
                
                movieTable.appendChild(row);
            })

        });
};

window.removeMovie = function(id) {
    if(confirm('¿Está seguro de que desea eliminar esta película?')) {
    axios.delete('http://localhost:8080/movies/' + id)
        .then((response) => {
            if (response.status == 204){
                notifyOk('Película eliminada correctamente');
                el('movie-' + id).remove();
            }
            else {
                notifyOk('Nada');
            }
        }).catch(error => {
            console.error(error);
          });
    }
};