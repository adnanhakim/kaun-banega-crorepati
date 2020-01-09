const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const questionRoute = require('./routes/questions');

// Routes Middlewares
app.use('/api', questionRoute);

// Routes
app.get('/', (req, res) => {
    res.render('index');
    //res.sendFile(__dirname + '/templates/index.html');
});

app.get('/play', (req, res) => {
    res.sendFile(__dirname + '/views/play.html');
});

app.get('/api/question', (req, res) => {
    res.sendFile(__dirname + '/views/addquestion.html');
});

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
    console.log('Connected to DB')
);

// Listen to server
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
