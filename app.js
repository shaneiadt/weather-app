const request = require("request");

const lat = 45;
const lng = 69;
const weatherApiKey = '985df9f0b6c055af7a814d410c079d0f';
const weatherApiEndpoint = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}?units=si`;

const mapboxLocation = "Sligo";
const mapboxEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(mapboxLocation)}.json?access_token=pk.eyJ1Ijoic2hhbmVpYWR0IiwiYSI6ImNqdXF0empsejA1M3k0NG42bXQ1NDhsZ28ifQ.Crv-9yuroFCTP_M6d6Wilg`

request({ url: weatherApiEndpoint, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to DarkSky.');
        return;
    }else if (response.body.error){
        console.log('Unable to find location.');
        return;
    }
    const { body } = response;
    console.log(weatherApiEndpoint);
    console.log(`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out with a ${body.currently.precipProbability * 100}% chance of rain.`);
});

request({ url: mapboxEndpoint, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to Mapbox.');
        return;
    } else if(response.body.features.length === 0){
        console.log('No location found.');
        return;
    }
    const [lng, lat] = response.body.features[0].center;
    console.log(mapboxEndpoint);
    console.log(`The lng is ${lng} & lat is ${lat}`);
});