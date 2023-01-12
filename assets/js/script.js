

//global variables for 
var searchHistory = $('#search-history')
var citySearch = $('#city-search')
var clearHistoryBtn = $('#clear-history-btn')
var currentCity = $('#current-city')
var currentTemp = $('#current-temp')
var currentHumidity = $('#current-humidity')
var currentWindSpeed = $('#current-wind-speed') 
var uvIndex = $('#uv-index')
var currentWeather = $('#current-weather')
var searchBtn = $('.search-btn')
var futureForecast = $('#future-forecast')
//API Key
var apiKey = '2bab760dbf7801b6e0e943adadda9044';

//Search History Variables
var lastCitySearched = ""
var previousCities = []

//creating click event for the city search button    
searchBtn.on('click', getWeather);


//function to display the information that was collected from Open Weather//curent weather 
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

//Need to make an API call for the 5-day forcast 



//Display and save the search history of cities



// load search history from local storage



//Create a conditional function to remove the 'hide' class so the text will show once a city is searched





 


