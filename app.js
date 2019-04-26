const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Sligo", (error, data) => {
    if (error) {
        console.log("Error:", error);
        return;
    }
    console.log(data);
    forecast(data.lat, data.lng, (error, data) => {
        if (error) {
            console.log("Error:", error);
            return;
        }
        console.log(data);
    });
});