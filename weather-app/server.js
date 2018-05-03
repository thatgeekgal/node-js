const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config');
const app = express();

// Express won't allow access to folder by default
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //res.send('Hello World!');
    res.render('index', {weather: null, error: null});
});

app.post('/', function (req, res) {
    let apiKey = config.apiKey;
    let city = req.body.city;
    let country_code = 'CA';

    // Kelvin as default. Celsius if metric, Fahrenheit if imperial
    let unit = 'metric'; 
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&units=${unit}&appid=${apiKey}`;
    
    request(url, function (error, response, body) {
        if (error) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else { 
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            } 
        } 
    }); 
});

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});