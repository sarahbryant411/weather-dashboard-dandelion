var apiKey = "e38f1f3c83719cf96fbce49bc31a4fdd";
var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather";
var UrlForecast = "https://api.openweathermap.org/data/2.5/forecast";

var searchForm = document.getElementById("search-form");
var cityName = document.getElementsByClassName("city-name");
var temperatureElement = document.getElementsByClassName("temperature");
var windspeedElement = document.getElementsByClassName("wind-speed");
var humidityElement = document.getElementsByClassName("humidity");

var searchHistory = document.querySelectorAll("search-history");
var weather = document.getElementById("current-weather");
var forecast = document.getElementById("forecast");

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
// Function to fetch data based on the latitude and longitude

function getGeoWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?appid=8823600ae11757d74ec67f06b60ca5ef&lat=' + lat + '&lon=' + lon + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            getGeoWeather(data.lat, data.lon);
        });
}
// Function to fetch data based on the city name
function getCityGeoData() {
    fetch('https://apiKey.openweathermap.org/geo/1.0/direct?qappid=8823600ae11757d74ec67f06b60ca5ef&limit=1&q=Atlanta')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            getCityGeoData(data[0].lat, data[0].lon);
        });
}

function getCurrentWeather(cityName, temperature, windspeed, humidity) {
    // fetch code goes here
    fetch(apiUrlCurrent)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            var weatherCard = getCurrentWeather(cityName, temperature, windspeed, humidity);
            weather.appendChild(weatherCard);

            var weatherContainer = document.querySelector(".weather-container");
            weatherContainer.appendChild(weatherCard);
        })
        .catch(function (error) {
            console.error(error);

            function getForecast(cityName, temperature, windspeed, humidity) {
                // fetch code goes here
                fetch(UrlForecast)
                    .then(function (response) {
                        if (!response.ok) {
                            throw response.json();
                        }
                        return response.json();
                    })
                    .then(function (data) {
                        var forecastData = data.list;
                        forecastData.forEach(function (day) {
                            var forecastCard = createForecastCard(cityName, temperature, windspeed, humidity);
                            forecastContainer.appendChild(forecastCard);
                        });
                    })
                    .catch(function (error) {
                        console.error(error);

                        function fetchWeather(city) {
                            var urlCurrent = apiUrlCurrent + "?q=" + city + "&units=imperial&appid=" + apiKey;
                            var urlForecast = UrlForecast + "?q=" + cityName + "&units=imperial&appid=" + apiKey;

                            getCurrentWeather(cityName, temperature, windspeed, humidity);
                            getForecast(cityName, temperature, windspeed, humidity);
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

                            var span = document.createElement("span");
                            span.textContent = city;
                            cityName.appendChild(span);

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

                        function createForecastCard(city, temperature, windspeed, humidity) {
                            var card = document.createElement("div");
                            card.className = "forecast-card";

                            var cityName = document.createElement("h2");
                            cityName.className = "city-name";
                            
                            var span = document.createElement("span");
                            span.textContent = city;
                            cityName.appendChild(span);

                            var date = document.createElement("p");
                            date.className - "forecast-date";
                            card.appendChild(date);

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

                    })
            }
        })}




