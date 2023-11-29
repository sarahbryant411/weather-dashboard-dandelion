const apiKey = "e38f1f3c83719cf96fbce49bc31a4fdd";
console.log('API Key:', apiKey);

function constructForecastUrl(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}
function getWeatherData(city) {
    // Define the URL
   var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Current Weather Data:", data);
        handleWeatherData(data);
        fetchForecastData(data.coord.lat, data.coord.lon);
    })
    .catch(error  => {
        console.error('Error:', error);
        alert('Failed to get weather data. Please try again.');
    });
}
function fetchForecastData(lat, lon) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    // Use the variable in a function
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        console.log("Forecast Data:", data);
        handleForecastData(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to get forecast data. Please try again.');
    });
}
    
function handleWeatherData(data) {
    console.log('Handling weather data:', data);
    // Get the elements where you want to display the data
    var temperatureEl = document.querySelector('#temperature');
    var conditionEl = document.querySelector('#condition-icon');
    var locationEl = document.querySelector('#location');
    var humidityEl = document.querySelector('#humidity');
    var windSpeedEl = document.querySelector('#wind-speed');

    // Update the text content of the elements with data from the API
    temperatureEl.textContent = `${data.main.temp}°F`;
    conditionEl.textContent = data.weather[0].description;
    locationEl.textContent = data.name;
    humidityEl.textContent = `${data.main.humidity}%`;
    windSpeedEl.textContent = `${data.wind.speed} MPH`;
}

function handleForecastData(data) {
    console.log('Handling forecast data:', data);
    // Get the element where you want to display the data
    var forecastContainerEl = document.getElementById('forecast-container');
    forecastContainerEl.innerHTML = '';

    data.list.forEach(item => {
        var forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        forecastCard.innerHTML = `
              <h3>${new Date(item.dt_txt).toLocaleDateString()}</h3>
                <p>Temperature: ${item.main.temp}°F</p>
                <p>Condition: ${item.weather[0].description}</p>
                <p>Humidity: ${item.main.humidity}%</p>
                <p>Wind Speed: ${item.wind.speed} MPH</p>
        forecastContainerEl.appendChild(forecastCard);
   ` }); 
} 

// Add the event listener to the form
document.querySelector('#search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var city = document.querySelector('#city').value;
    console.log('Searching for city:', city);
    getWeatherData(city);
});

// Add event listener to the search history buttons
var searchHistoryButtons = document.querySelectorAll('.search-history-button');
searchHistoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var city = this.textContent;
        console.log('Search history button clicked for city:', city);
        getWeatherData(city);
    });
});
