const request = require('request');

const pretty = require('../pretty-output');

const geocodeAddress = (address) => {
  const endpoint = 'http://open.mapquestapi.com/geocoding/v1/address';
  const apiKey = 'kMDHnEFHMxRtjXoEmg2pUj3TcOUt2yGA';
  const location = encodeURIComponent(address);

  request({
    url: `${endpoint}?location=${location}&key=${apiKey}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      console.log('Unable to connect to the Map Quest servers.');
    } else if (body.info.statuscode !== 0) {
      console.log('Unable to find that address.');
    } else if (body.info.statuscode === 0) {
      const providedLocation = body.results[0].providedLocation.location;
      const {
        lat,
      } = body.results[0].locations[0].latLng;
      const {
        lng,
      } = body.results[0].locations[0].latLng;

      pretty.log({
        providedLocation,
        lat,
        lng,
      });
    }
  });
};

module.exports = {
  geocodeAddress,
};
