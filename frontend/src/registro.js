import axios from 'axios'; //Axios es la librería que me permite comunicarme con el backend
import { notifyError, notifyOk } from './util.js';

window.addMovie = function () { //Programo lo que va a suceder cuando se clica en el botón del formulario para hacer un nuevo registro
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const year = document.getElementById('year').value;


    //TO DO Validación de los datos que introduce el usuario
    if (title === '') {
        notifyError('El título es un campo obligatorio');
        return; // Detenemos la ejecución si el título está vacío
    }


    axios.post('http://localhost:8081/movies', {
        title: title,
        description: description,
        year: year
    });

    //Decir al usuario si la entrada ha tenido lugar
   notifyOk('Película registrada');

    //Limpiar el formulario después de registrar nueva entrada:
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('year').value = '';

};
