const request = require('request');
const config = require('./config');
const argv = require('yargs').argv;

let apiKey = config.apiKey;
let city = argv.c || 'vancouver';
let country_code = 'CA';

// Kelvin as default. Celsius if metric, Fahrenheit if imperial
let unit = 'metric'; 

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&units=${unit}&appid=${apiKey}`;

request(url, function (error, response, body) {
    if (error) {
        console.log('error: ', error);
    } else {
        //console.log('statusCode: ', response && response.statuscode);
        //console.log(body); 
        
        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

        //console.log(weather);
        console.log(message);
    } 
});