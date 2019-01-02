const yargs = require('yargs');

const geocode = require('./geocode/geocode');
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

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    pretty.log({
      results,
    });
  }
});
