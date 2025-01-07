import axios from 'axios'; //Axios es la librería que me permite comunicarme con el backend

window.addMovie = function() { //Programo lo que va a suceder cuando se clica en el botón del formulario para hacer un nuevo registro
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const year = document.getElementById('year').value;
              

    //TO DO Validación de los datos que introduce el usuario
    if (title === ''){
        alert('El título es un campo obligatorio');
        return;
    }

    axios.post('http://localhost:8080/movies', {
        title: title,
        description: description,
        year: year
    });
    console.log("Patatas");
};