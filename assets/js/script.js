function getWeatherData(city) {

    // Define the URL
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch the data
    fetch(apiUrl)
        .then(function (response) {
            // Convert the response to JSON format
            return response.json();
        })
        .then(function (data) {
            // Handle the data
            handleWeatherData(data);
            var { lat, lon } = data.coord;
            fetchForecastData(lat, lon);
        })
        .catch(function (error) {
            // If there is any error you will catch them here
            console.error('Error:', error);
            alert('Failed to get weather data. Please try again.');
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
    var forecastContainerEl = document.getElementById('forecast-container');

    // Clear the container
    forecastContainerEl.innerHTML = '';

    data.list.forEach(item => {
        // Create a forecast card element
        var forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        // Populate the forecast card with HTML
        forecastCard.innerHTML = `
           <h3>$(new Date(item.dt_txt).toLocaleDateString())</h3>
           <p>Temperature: ${item.main.temp}°F</p>
              <p>Condition: ${item.weather[0].description}</p>
        `;
        // Append the forecast card to the container
        forecastContainerEl.appendChild(forecastCard);
    });
}

function fetchForecastData(lat, lon) {
    // Define the URL
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
            alert('Failed to get forecast data. Please try again.');
        });
}
// Add the event listener to the form
document.querySelector('#search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var city = document.querySelector('#city').value;
    getWeatherData(city);
});


// Add event listener to the search history buttons
var searchHistoryButtons = document.querySelectorAll('.search-history-button');
searchHistoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var city = this.textContent;
        getWeatherData(city);
    });
});






