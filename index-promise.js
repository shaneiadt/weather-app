const yargs = require('yargs');
const axios = require('axios');

const pretty = require('./pretty-output');

const {
  argv,
} = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h');

const endpoint = 'http://open.mapquestapi.com/geocoding/v1/address';
const apiKey = 'kMDHnEFHMxRtjXoEmg2pUj3TcOUt2yGA';
const location = encodeURIComponent(argv.address);
const geocodeUrl = `${endpoint}?location=${location}&key=${apiKey}`;

axios.get(geocodeUrl)
  .then(response => {
    if (response.data.info.statuscode === 0) {
      const result = {
        address: response.data.results[0].providedLocation.location,
        latitude: response.data.results[0].locations[0].latLng.lat,
        longitude: response.data.results[0].locations[0].latLng.lng,
      };

      const weatherApiKey = '985df9f0b6c055af7a814d410c079d0f';
      const weatherApiEndpoint = `https://api.darksky.net/forecast/${weatherApiKey}/${result.latitude},${result.longitude}?units=si`;

      pretty.log(result);

      return axios.get(weatherApiEndpoint);
    }

    throw new Error('Unable to connect to the Map Quest servers.');
  })
  .then(response => {
    if (response.data.statusCode === 200) {
      const result = {
        temperature: response.data.currently.temperature,
        apparentTemperature: response.data.currently.apparentTemperature,
      };
      pretty.log(result);
    }
    throw new Error('Unable to connect to the Dark Sky servers for weather response.');
  })
  .catch(error => {
    console.log(error.message);
  });
