const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {firebaseClient} = require('./firebaseClient');
const authRouter = require('./routers/authRouter');
const passwordRouter = require('./routers/passwordRouter');
require('dotenv').config();
var server_port = process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
// const PORT = appConfig.port;
firebaseClient.initDB();
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({result:'express server running'});
});

app.use('/auth', authRouter);
app.use('/info', passwordRouter);

process
.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

app.listen(server_port, ()=>{
    console.log(`listening to ${server_host}:${server_port}`);
});