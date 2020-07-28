const request = require('postman-request');

const forecast = ( latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ed59fda49a5b71bdae2bdaa91e2cbb4a&query='+longitude+','+latitude+'';

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to weather service!", undefined)
        }
        else if(body.error){
            callback("Unable to find the location!", undefined)
        }
        else{
        const currentTemp = body.current.temperature;
        const feelslike = body.current.feelslike;
        const weatherDesc = body.current.weather_descriptions[0];
        callback(undefined, weatherDesc+". It is currently "+currentTemp+" degrees out. It feels like "+feelslike+ " degrees out.")
        }
    })

}

module.exports = forecast;