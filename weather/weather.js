const request = require('request');

const getTemperature = (lat, lng, callback) => {
  const weatherApiKey = '985df9f0b6c055af7a814d410c079d0f';
  const weatherApiEndpoint = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}?units=si`;

  request({
    url: weatherApiEndpoint,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports = {
  getTemperature,
};
