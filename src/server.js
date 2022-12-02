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

const app = express();
const PORT = process.env.DEV_PORT || 9000;

app.use(express.json());
app.use('/api/v1/sports',v1SportRouter);

const server = app.listen(PORT, () => {
    console.log(`!!OK, Server listening on port ${PORT}`);
});

module.exports = server, mongoose;