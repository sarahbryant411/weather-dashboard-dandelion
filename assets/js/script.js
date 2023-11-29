const apiKey = "e38f1f3c83719cf96fbce49bc31a4fdd";
console.log('API Key:', apiKey);

function constructForecastUrl(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

function getWeatherData(city) {
    // Define the URL
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    var url = forecastUrl + city;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error  => {
        console.error('Error:', error);
        alert('Failed to get weather data. Please try again.');

function fetchForecastData(lat, lon) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}";
    // Use the variable in a function
    getWeatherData(city);
    // Fetch the data
    fetch(apiUrl)
        .then(function (response) {
            console.log('API Response:', response);
            // Convert the response to JSON format
            return response.json();
        })
        .then(function (data) {
            var { lat, lon } = data.coord;
            var forecastUrl = constructForecastUrl(lat, lon);
            // Handle the data
            handleWeatherData(data);
            fetchForecastData(lat, lon);
        })
        .catch(function (error) {
            // If there is any error you will catch them here
            console.error('Error:', error);
            alert('Failed to get weather data. Please try again.');
        });
        
function handleWeatherData(data) {
    console.log('Handling weather data:', data);
    // Get the elements where you want to display the data
    var temperatureEl = document.querySelector('#temperature');
    var conditionEl = document.querySelector('#condition');
    var locationEl = document.querySelector('#location');

    // Update the text content of the elements with data from the API
    temperatureEl.textContent = `${data.main.temp}°F`;
    conditionEl.textContent = data.weather[0].description;
    locationEl.textContent = data.name;

function handleForecastData(data) {
    console.log('Handling forecast data:', data);
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

// Add the event listener to the form
document.querySelector('#search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var city = document.querySelector('#city').value;
    console.log('Searching for city:', city);
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
}}}}






