const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const postRoute = require('./routes/posts');
const questionRoute = require('./routes/questions');
const authRoute = require('./routes/auth');

// Routes Middlewares
app.use('/posts', postRoute);
app.use('/auth', authRoute);
app.use('/api', questionRoute);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html');
});

app.get('/play', (req, res) => {
    res.sendFile(__dirname + '/templates/play.html');
});

app.get('/api/question', (req, res) => {
    res.sendFile(__dirname + '/templates/addquestion.html');
});

app.get('/chart', (req, res) => {
    res.sendFile(__dirname + '/templates/temp.html');
});

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
    console.log('Connected to DB')
);

// Listen to server
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
