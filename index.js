const express = require('express');
// const v1ScoreRoutes = require('./v1/routes/scoreRoutes');
require('dotenv').config()

const app = express();
const PORT = process.env.DEV_PORT || 9000;

app.use(express.json());
// app.use('/api/v1/scores',v1ScoreRoutes);

app.listen(PORT, () => {
    console.log(`!!OK, Server listening on port ${PORT}`);
});