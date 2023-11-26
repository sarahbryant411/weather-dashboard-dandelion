function fetchWeatherData(city){
    // Define the API and URL
    var apiKey = 'a4684f76edfce6759ec93925b4bd629e';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a4684f76edfce6759ec93925b4bd629e}';

    // Fetch the data
    fetch(apiUrl)
        .then(function(response){
            // Convert the response to JSON format
            return response.json();
        })
        .then(function(data){
            // Handle the data
            handleWeatherData(data);
        })
        .catch(function(error){
            // If there is any error you will catch them here
            console.error('Error:', error);
        });
    }
function handleWeatherData(data){
    // Get the elements where you want to display the data
    var temperatureEl = document.querySelector('#temperature');
    var conditionEl = document.querySelector('#condition');
    var locationEl = document.querySelector('#location');

    // Update the text content of the elements with data from the API
    temperatureEl.textContent = '${data.main.temp}°F';
}   conditionEl.textContent = data.weather[0].description;
    locationEl.textContent = data.name;
