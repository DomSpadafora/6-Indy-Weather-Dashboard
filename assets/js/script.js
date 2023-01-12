// 1. Get the city value from the form
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather

//global variables for 
var searchHistory = $('#search-history')
var citySearch = $('#city-search')
var clearHistoryBtn = $('#clear-history-btn')
var currentCity = $('#current-city')
var currentTemp = $('#current-temp')
var currentHumidity = $('#current-humidity')
var currentWindSpeed = $('#current-wind-speed') 
var uvIndex = $('#uv-index')
var previousCities = []
var currentWeather = $('#current-weather')
var searchBtn = $('.search-btn')
var futureForecast = $('#future-forecast')
//API Key
var apiKey = '2bab760dbf7801b6e0e943adadda9044';

//creating click event for the city search button    
searchBtn.on('click', getWeather);

function getWeather() {
    var city = citySearch.val()

    var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=2bab760dbf7801b6e0e943adadda9044&units=imperial&q=${city}`;

    fetch(requestUrl)
        .then(function (response) {
        return response.json();
     })
        .then(function (data) {
        //Check the data
        console.log(data);
        for (var i = 0; i < data.length; i++) {

            //use the data in the payload
            currentTemp.text = data.main.temp;

            //Now need to put it on the page
            currentTemp.append("&deg;F");
            
        }
        });
}





//Display and save the search history of cities


//Create a conditional function to remove the 'hide' class so the text will show once a city is searched





 


