const request = require('postman-request');

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1hbnByZWV0MzIxIiwiYSI6ImNrY3U5d3lkNzAyZmkzMG82NG5yYjYxeDcifQ.YI4Nnk8ikMMK-1O2VFtCSw';

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to Geo Coding service!", undefined)
        }
        else if(body.features.length === 0){
            callback("Unable to find location", undefined)
        }
        else{
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        });
        }
    })
}

module.exports = geoCode;