const request = require('request');

const geocodeAddress = (address, callback) => {
  const endpoint = 'http://open.mapquestapi.com/geocoding/v1/address';
  const apiKey = 'kMDHnEFHMxRtjXoEmg2pUj3TcOUt2yGA';
  const location = encodeURIComponent(address);

  request({
    url: `${endpoint}?location=${location}&key=${apiKey}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the Map Quest servers.');
    } else if (body.info.statuscode !== 0) {
      callback('Unable to find that address.');
    } else if (body.info.statuscode === 0) {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng,
      });
    }
  });
};

module.exports = {
  geocodeAddress,
};
