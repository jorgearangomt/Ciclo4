const express = require('express');
const v1SportRouter = require('./v1/routes/sportRoutes');
require('dotenv').config()

const app = express();
const PORT = process.env.DEV_PORT || 9000;

app.use(express.json());
app.use('/api/v1/sports',v1SportRouter);

app.listen(PORT, () => {
    console.log(`!!OK, Server listening on port ${PORT}`);
});