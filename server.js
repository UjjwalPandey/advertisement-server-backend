const express = require('express');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Preventing DDOS and Brute-Force attacks
app.enable('trust proxy');

// Setting maximum Limit server entertains in a particular window.
var limiter = new RateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes 
    max: 1000, // limit each IP to 1000 requests per windowMs 
    delayMs: 0 // disable delaying - full speed until the max limit is reached 
});

app.use(limiter);

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Advertisement Server. Check routes.js for APIs." });
});

require('./app/routes/ads.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});