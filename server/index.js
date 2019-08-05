const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require('./middlewares/core');
const devicesRouter = require('./routes/devices');
const groupsRouter = require('./routes/groups');

mongoose.connect('mongodb://localhost:27017/node-jsmp', {useNewUrlParser: true});


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(corsMiddleware);
app.use('/devices', devicesRouter);
app.use('/groups', groupsRouter);

app.get('/', (req, res) => {
    res.json({result: 'ok 1'});
});

app.listen(PORT, () => {
    console.log(`server is listening port on http://localhost:${PORT}`);
});
