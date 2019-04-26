const request = require("request");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

geocode("Sligo", (error, data) => {
    if (error) {
        console.log("Error:", error);
        return;
    }
    console.log(data);
    weather(data.lat, data.lng, (error, data) => {
        if (error) {
            console.log("Error:", error);
            return;
        }
        console.log(data);
    });
});