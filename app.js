const request = require("request");

const lat = 45;
const lng = 69;
const weatherApiKey = '985df9f0b6c055af7a814d410c079d0f';
const weatherApiEndpoint = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}?units=si`;

request({ url: weatherApiEndpoint, json: true }, (error, response) => {
    if (error) {
        console.log(error);
    }
    const { body } = response;
    console.log(weatherApiEndpoint);
    console.log(`It is currently ${body.currently.temperature} degress out with a ${body.currently.precipProbability * 100}% chance of rain.`);
});