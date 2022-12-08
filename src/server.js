require('dotenv').config()

const express = require('express');

const mongoose = require('mongoose');
const mongoString = process.env.DEV_DATABASE_URL;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
})

const v1SportRouter = require('./v1/routes/sportRoutes');
const v1TeamRouter = require('./v1/routes/teamRoutes');
const v1UserRouter = require('./v1/routes/userRoutes');
const v1MatchRouter = require('./v1/routes/matchRoutes');

const app = express();
const PORT = process.env.DEV_PORT || 9000;

app.use(express.json());
app.use('/api/v1/sports',v1SportRouter);
app.use('/api/v1/teams',v1TeamRouter);
app.use('/api/v1/users',v1UserRouter);
app.use('/api/v1/matches',v1MatchRouter);


const server = app.listen(PORT, () => {
    console.log(`!!OK, Server listening on port ${PORT}`);
});

module.exports = server, mongoose;

//Este código inicia un servidor de express y conecta una base de datos mongoose. 
// También se importan dos enrutadores de la carpeta v1 para manejar las rutas de deportes y equipos. 
// El servidor se inicia en el puerto especificado en el archivo .env o en el puerto 9000 por defecto.
//  Una vez que el servidor está escuchando, se exporta junto con la conexión de mongoose.