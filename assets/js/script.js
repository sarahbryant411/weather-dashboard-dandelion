function fetchWeatherData(city) {
    // Define the API and URL
    var apiKey = 'a4684f76edfce6759ec93925b4bd629e';
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Fetch the data
    fetch(apiUrl)
        .then(function (response) {
            // Convert the response to JSON format
            return response.json();
        })
        .then(function (data) {
            // Handle the data
            handleWeatherData(data);
        })
        .catch(function (error) {
            // If there is any error you will catch them here
            console.error('Error:', error);
        });
}
function handleWeatherData(data) {
    // Get the elements where you want to display the data
    var temperatureEl = document.querySelector('#temperature');
    var conditionEl = document.querySelector('#condition');
    var locationEl = document.querySelector('#location');

    // Update the text content of the elements with data from the API
    temperatureEl.textContent = `${data.main.temp}°F`;
    conditionEl.textContent = data.weather[0].description;
    locationEl.textContent = data.name;
}
function handleForecastData(data) {
    // Get the element where you want to display the data
    var forecastContainerEl = document.querySelector('#forecast-container');

    data.list.forEach(item => {
        var forecastItem = document.createEl('div');
        forecastItem.textContent = `${new Date(item.dt_txt).toLocaleDateString()} - ${item.main.temp}°F - ${item.weather[0].description}`;
        forecastContainerEl.appendChild(forecastItem);
    });

// Add event listener to the search history buttons
var searchHistoryButtons = document.querySelectorAll('.search-history-button');
searchHistoryButtons.forEach(function(button) {
    button.addEventListener('click', function(){
        var city = this.textContent;
        fetchWeatherData(city);
    });
});

function fetchForecastData(lat, lon){
    // Define the API key and URL
    var apiKey = 'a4684f76edfce6759ec93925b4bd629e';
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Use the fetch API to get the forecast data
    fetch(apiUrl)
        .then(function (response) {
            // Convert the response to JSON format
            return response.json();
        })
        .then(function (data) {
            // Handle the data
            handleForecastData(data);
        })
        .catch(function (error) {
            // If there is any error you will catch them here
            console.error('Error:', error);
        });

    //Fetch the forecast data
    fetchForecastData(data.coord.lat, data.coord.lon);
    
        // Add the event listener to the form
document.querySelector('#search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var city = document.querySelector('#city').value;
    fetchWeatherData(city);
});
}
}

