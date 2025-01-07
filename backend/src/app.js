//Cargar librerías
const express = require('express'); //Framework web para Node.js que te permite crear servidores de manera rápida
const cors = require('cors'); //Controla políticas de acceso de tu servidor, en este caso Express
const knex = require('knex'); //Librería de JavaScript para Node.js que sirve como un constructor de consultas SQL

//Lanzar las aplicaciones de las liberías
const app = express();
app.use(cors());
app.use(express.json());

//Lanzar BBDD (DB Browser for SQLite)
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'movies.db'
    },
    useNullAsDefault: true //Devuelve valor nulo para aquello que no tenga datos
});


/*  ESTO YA NO LO USAMOS PORQUE VAMOS A PASAR LOS DATOS DE LAS PELÍCULAS A LA BBDD
const movies = [ //Si se añade una base de datos estos datos ya no estarían aquí 
    {
        'title': 'Batman',
        'description': 'Batman description',
        'year': 2003
    },
    {
        'title': 'Spiderman',
        'description': 'Spiderman description',
        'year': 1998
    },
    {
        'title': "Superman",
        'description': "Superman description",
        'year': 1980
    }
    
];
*/

//CRUD (4 OPERACIONES BÁSICAS: registrar, visualizar, editar y eliminar)

app.get('/movies', async (req, res) => {  //Operación para ver todas las películas que hay en la BBDD
    const movies = await db('movies').select('*'); //Le pides todos los campos de la BBDD
    res.json(movies);
});

app.get('/movies/:title', async (req, res) =>{ //Operación para ver info de una pelicula concreta dado un título
    const movie = await db('movies').select('*').where({ title: req.params.title }).first();
    res.json(movie); //Devuelve la infromación de la película cuyo título se ha proporcionado en formato json
});

app.post('/movies', async (req, res) =>{ //Operación para dar de alta películas en la BBDD
    await db('movies').insert({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year
    });
    res.status(201).json({}); //200 es un ok a la operación, y 201 es un ok a la operación de registro
});

app.put('/movies/:title', async (req, res) => { //Dado un título concreto, modificamos los datos de la película con la que se corresponde
    await db ('movies').update({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year
    }).where({title: req.params.title});
    res.status(200).json({});
});

app.delete('/movies/:title', async (req, res) =>{ //Borrar películas
    await db('movies').del().where({ title: req.params.title });

    res.status(204).json({});
});

//app.patch('/movies/:title', async (req, res) => { Esta operación se hace para cambiar un campo específico, al contrario que el put que nos permite modificar todo.
    
//});                                               Al final esto no lo hacemos porque es demasiado rebuscado teniendo el put.


app.listen(8080, () => { 
    console.log("El backend ha iniciado en el puerto 8080");
})

