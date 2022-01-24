const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")

});
app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "da672566c59bc3e0bc2120ae80c59517";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(temp + description);
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1> The temperture in " + query + " is " + temp + "</h1>")
            res.write(" <h3> The weather is currently " + description + "</h3>");
            res.write("<img src=" + imageUrl + ">")
            res.send();

        })
    })
})




app.listen(3000, function() {
    console.log("port is 3000");
})