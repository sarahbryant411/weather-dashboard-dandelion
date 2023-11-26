
var apiKey = 'e38f1f3c83719cf96fbce49bc31a4fdd'
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
var searchForm = document.getElementById('search-form');
var locationElement = document.getElementById('location');
var temperatureElement = document.getElementById('temperature');
var conditionsElement = document.getElementById('condition');

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
            locationElement.textContent = data.name;
            temperatureElement.textContent = data.main.temp;
            conditionsElement.textContent = data.weather[0].description;
        });
        error => console.log(error);
}

