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