const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(`Address: ${results.address}`);
    weather.getTemperature(results.latitude, results.longitude,
      (weatherErrorMessage, weatherResults) => {
        if (weatherErrorMessage) {
          console.log(weatherErrorMessage);
        } else {
          console.log(`It's currently ${weatherResults.temperature} degrees. It feels like ${weatherResults.apparentTemperature} degrees.`);
        }
      });
  }
});
