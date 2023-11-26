
var apiKey = 'e38f1f3c83719cf96fbce49bc31a4fdd'
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
var searchForm = document.getElementById('search-form');
var cityName = document.getElementById('city-name');
var temperatureElement = document.getElementById('temperature');
var windspeedElement = document.getElementById('wind-speed');
var humidityElement = document.getElementById('humidity');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = event.target[0].value;
    console.log(city);
    fetchWeather(city);
});

function fetchWeather(city) {
    var url = apiUrl + '?q=' + city + '&units=imperial&appid=' + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log("data.main.temp = ", data.main.temp)
            cityName.textContent = data.name;
            temperatureElement.textContent = data.main.temp;
            conditionsElement.textContent = data.weather[0].description;
        });
        error => console.log(error);
}

var cityButtons = document.querySelectorAll('.search-history button');
cityButtons.forEach(button => {
    button.addEventListener('click', () => {
        var city = button.textContent;
        fetchWeather(city);
    });
});

function createWeatherCard(city, temperature, windspeed, humidity){
    var card =document.createElement('div');
    card.className = 'weather-card';

    var cityName = document.createElement('h2');
    cityName.className = 'city-name';
    cityName.textContent = city;
    card.appendChild(cityName);

    var temp = document.createElement('p');
    temp.className = 'temperature';
    temp.textContent = temperature;
    card.appendChild(temp);

    var wind = document.createElement('p');
    wind.className = 'windspeed';
    wind.textContent = windspeed;
    card.appendChild(wind);

    var humidityElement = document.createElement('p');
    humidityElement.className = 'humidity';
    humidityElement.textContent = humidity;
    card.appendChild(humidityElement);

    return card;
}

var weatherContainer = document.getElementById('weather-container');
var weatherCard = createWeatherCard('Atlanta', 25, 5, 60);
weatherContainer.appendChild(weatherCard);

function createForecastCard(city, temperature, windspeed, humidity){
    var card =document.createElement('div');
    card.className = 'forecast-card';

    var cityName = document.createElement('h2');
    cityName.className = 'city-name';
    cityName.textContent = city;
    card.appendChild(cityName);

    var temp = document.createElement('p');
    temp.className = 'temperature';
    temp.textContent = temperature;
    card.appendChild(temp);

    var wind = document.createElement('p');
    wind.className = 'windspeed';
    wind.textContent = windspeed;
    card.appendChild(wind);

    var humidityElement = document.createElement('p');
    humidityElement.className = 'humidity';
    humidityElement.textContent = humidity;
    card.appendChild(humidityElement);

    return card;
}

var forecastContainer = document.getElementById('forecast-container');
var forecastCard = createForecastCard('Atlanta', 25, 5, 60);
forecastContainer.appendChild(forecastCard);

