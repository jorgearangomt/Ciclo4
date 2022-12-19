require('dotenv').config()

const express = require('express');
const cors = require('cors');

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
const v1AuthRouter = require('./v1/routes/authRoutes');

const verifyToken = require('./middlewares/verificationJWT');

const app = express();
const PORT = process.env.DEV_PORT || 9000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use('/api/v1/sports',v1SportRouter);
app.use('/api/v1/teams',v1TeamRouter);
app.use('/api/v1/users',verifyToken,v1UserRouter);
app.use('/api/v1/matches',v1MatchRouter);
app.use('/api/v1/',v1AuthRouter);


const server = app.listen(PORT, () => {
    console.log(`!!OK, Server listening on port ${PORT}`);
});

module.exports = server, mongoose;

//Este código inicia un servidor de express y conecta una base de datos mongoose. 
// También se importan dos enrutadores de la carpeta v1 para manejar las rutas de deportes y equipos. 
// El servidor se inicia en el puerto especificado en el archivo .env o en el puerto 9000 por defecto.