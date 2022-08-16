
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , (req , res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req,res) => {

    const place = req.body.cityName;;
    const appKey = "4e1e4326a35e614470121ae5fc5a97d2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+ unit +"&appid="+ appKey +"&q="+ place;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data" , (data) => {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const description = weather.weather[0].description;
            const city = weather.name;
            const icon = weather.weather[0].icon;
            const imgeURL = "http://openweathermap.org/img/wn/"+icon +"@2x.png";
            console.log(temp);
            console.log(description);

            res.write(`<h1>The Temprature in ${city} is ${temp} celcius</h1>`);
            res.write(`<p>The weather is currently ${description}</p>`);
            res.write(`<img src="${imgeURL}" alt="weather Icons">`)
            res.send();
        })
    })
})

app.listen(port,() => {
    console.log(`Server is running at port ${port}`);
})