const request = require('request');

const pretty = require('./pretty-output');

const endpoint = 'http://open.mapquestapi.com/geocoding/v1/address';
const apiKey = 'kMDHnEFHMxRtjXoEmg2pUj3TcOUt2yGA';
const location = `1201%20lombard%20street%20philadelphia`;

request({
  url: `${endpoint}?location=${location}&key=${apiKey}`,
  json: true
}, (error, response, body) => {
  const lat = body.results[0].locations[0].latLng.lat;
  const long = body.results[0].locations[0].latLng.lng;
  pretty.log({lat,long});
});
