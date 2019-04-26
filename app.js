const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];

geocode(location, (error, data) => {
    if (error) {
        console.log("Error:", error);
        return;
    }
    console.log(data);
    const {lat, lng} = data;
    forecast(lat, lng, (error, data) => {
        if (error) {
            console.log("Error:", error);
            return;
        }
        console.log(data);
    });
});