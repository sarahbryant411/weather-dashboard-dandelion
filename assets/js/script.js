var apiKey = "e38f1f3c83719cf96fbce49bc31a4fdd";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
var searchForm = document.getElementById("search-form");
var cityName = document.getElementsByClassName("city-name");
var temperatureElement = document.getElementsByClassName("temperature");
var windspeedElement = document.getElementsByClassName("wind-speed");
var humidityElement = document.getElementsByClassName("humidity");

document.querySelector(".city-name").textContent = "City Name";
document.querySelector(".temperature").textContent = "Temperature";
document.querySelector(".wind-speed").textContent = "Wind Speed";
document.querySelector(".humidity").textContent = "Humidity";


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var city = event.target[0].value;
    console.log(city);
    fetchWeather(city);
});

function fetchWeather(city) {
    var url = apiUrl + "?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            console.log("data.main.temp = ", data.main.temp);
            console.log(data.name);


            cityName.textContent = data.name;
            temperatureElement.textContent = data.main.temp;
            windspeedElement.textContent = data.weather[0].description;
            humidityElement.textContent = data.main.humidity;


            var weatherCard = createWeatherCard(
                data.name,
                data.main.temp,
                data.weather[0].description,
                data.main.humidity
            );

            weather.appendChild(weatherCard);
            var forecastCard = createForecastCard(
                data.name,
                data.main.temp,
                data.weather[0].description,
                data.main.humidity
            );

            forecast.appendChild(forecastCard);
        })

        .catch(function (error) {
            console.error(error);
        });
}

var cityButtons = document.querySelectorAll(".search-history button");
cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
        var city = button.textContent;
        fetchWeather(city);
    });
});

function createWeatherCard(city, temperature, windspeed, humidity) {
    var card = document.createElement("div");
    card.className = "weather-card";

    var cityName = document.createElement("h2");
    cityName.className = "city-name";
    cityName.textContent = city;
    card.appendChild(cityName);

    var temp = document.createElement("p");
    temp.className = "temperature";
    temp.textContent = temperature;
    card.appendChild(temp);

    var wind = document.createElement("p");
    wind.className = "windspeed";
    wind.textContent = windspeed;
    card.appendChild(wind);

    var humidityElement = document.createElement("p");
    humidityElement.className = "humidity";
    humidityElement.textContent = humidity;
    card.appendChild(humidityElement);

    return card;
}

var weather = document.getElementById("current-weather");
function createForecastCard(city, temperature, windspeed, humidity) {
    var card = document.createElement("div");
    card.className = "forecast-card";

    var cityName = document.createElement("h2");
    cityName.className = "city-name";
    cityName.textContent = city;
    card.appendChild(cityName);

    var temp = document.createElement("p");
    temp.className = "temperature";
    temp.textContent = temperature;
    card.appendChild(temp);

    var wind = document.createElement("p");
    wind.className = "windspeed";
    wind.textContent = windspeed;
    card.appendChild(wind);

    var humidityElement = document.createElement("p");
    humidityElement.className = "humidity";
    humidityElement.textContent = humidity;
    card.appendChild(humidityElement);

    return card;
}

var forecast = document.getElementById("forecast");
// var forecastCard = createForecastCard(city, temperature, windspeed, humidity);
// forecast.appendChild(forecastCard);