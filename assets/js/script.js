const apiKey = "a584648550aab74ded1872e83f105b24";
console.log('API Key:', apiKey);

function constructForecastUrl(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
}
function getWeatherData(_city) {
    // Define the URL
   var url = "https://api.openweathermap.org/data/2.5/weather?q=" + _city + "&appid=" + apiKey + "&units=imperial";

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Data from API:", data);
        handleWeatherData(data);
        fetchForecastData(data.coord.lat, data.coord.lon);
    })
    .catch(error  => {
        console.error('Error fetching weather data:', error);
        alert('Failed to get weather data. Please try again.');
    });
}

function addCityToHistory(cityName) {
    var historyContainer = document.querySelector('.search-history-buttons');
    var button = document.createElement('button');
    button.classList.add('search-history-button');
    button.textContent = cityName;

    // Add a click event listener to the button
    button.addEventListener('click', function () {
        // Implement logic to displa weather for the selected city
        getWeatherData(cityName);
    });
    historyContainer.appendChild(button);
}

function fetchForecastData(lat, lon) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    // Use the variable in a function
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
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

    // Verify the structure of the data object
    console.log('Temperature:', data);
    console.log('Temperature:', data.main.temp);
    console.log('Weather condition:', data.weather[0].description);

    var temperatureEl = document.querySelector('.temperature');
    var conditionEl = document.querySelector('#condition-icon');
    var locationEl = document.querySelector('.location');
    var humidityEl = document.querySelector('.humidity');
    var windSpeedEl = document.querySelector('.wind-speed');

    // Update the text content of the elements with data from the API
    temperatureEl.textContent = `${data.main.temp}°F`;
    conditionEl.textContent = data.weather[0].description;
    locationEl.textContent = data.name;
    humidityEl.textContent = `${data.main.humidity}%`;
    windSpeedEl.textContent = `${data.wind.speed} MPH`;

    // Display the weather icon
    var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var iconImg = document.createElement('img');
    iconImg.setAttribute('src', iconUrl);
    conditionEl.appendChild(iconImg);
}

function handleForecastData(data) {
    console.log('Handling forecast data:', data);
    // Get the element where you want to display the data
    var forecastContainerEl = document.getElementById('forecast-container');
    forecastContainerEl.innerHTML = '';

    for (var i = 4; i < data.list.length; i+=8) {
        var item = data.list[i];
        var forecastDate = new Date(item.dt_txt).toLocaleDateString();

            var forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');

        forecastCard.innerHTML = `
            <h3>${forecastDate}</h3>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"/>
            <p> Temperature: ${item.main.temp}°F</p>
            <p> Condition: ${item.weather[0].description}</p>
            <p> Humidity: ${item.main.humidity}%</p>
            <p> Wind Speed: ${item.wind.speed} MPH</p>
            `;
        forecastContainerEl.appendChild(forecastCard);
   }; 
} 

// Add the event listener to the form
document.querySelector('#search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var city = document.querySelector('#city').value;
    console.log('Searching for city:', city);
    getWeatherData(city);
});

function setupSearchHistoryButtons() {
// Add event listener to the search history buttons
var searchHistoryButtons = document.querySelectorAll('.search-history-button');
searchHistoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var city = this.textContent;
        console.log('Search history button clicked for city:', city);
        getWeatherData(city);
    });
});
}