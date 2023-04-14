
//global variables for 
// var searchHistory = $('#search-history')
var citySearch = $('#city-search')
// var clearHistoryBtn = $('#clear-history-btn')
// var currentCity = $('#current-city')
// var currentTemp = $('#current-temp')
// var currentHumidity = $('#current-humidity')
// var currentWindSpeed = $('#current-wind-speed')
// var uvIndex = $('#uv-index')
// var currentWeather = $('#current-weather')
var searchBtn = $('.search-btn')
// var futureForecast = $('#future-forecast')

//API Key
var apiKey = '2bab760dbf7801b6e0e943adadda9044';

//Search History Variables
var lastCitySearched = ""
var previousCities = []

//creating click event for the city search button    
searchBtn.on('click', function() {
    var city = citySearch.val().trim();
    if (city) {
      getWeather(city);
      saveSearchHistory(city);
    }
  });


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

            let { dt, wind: { speed }, main: { temp, humidity }, weather: [{ icon }] } = data.list[0];

            $('main').html('')
            $('main').append(`
            <h3>Current Weather:</h3></div>
            <div id="current-weather" class="col-12 col-md-12 border rounded px-3 py-3 mb-3">
                <div class="current-city border rounded px-3 py-3"><h2>${city} ${new Date(dt * 1000).toDateString()}</h2>
                    <img src='http://openweathermap.org/img/w/${icon}.png'>
                    <p>Temperature: ${temp} </p>
                    <p>Humidity: ${humidity}<p>
                    <p>Wind Speed: ${speed}</p>
                </div>
            </div>
            <h3>5-Day Forecast:</h3></div>

        `)

            for (var i = 0; i < data.list.length; i++) {
                // Check if the current index is a multiple of 8
                if (i % 8 === 0) {

                    let { dt, wind: { speed }, main: { temp, humidity }, weather: [{ icon }] } = data.list[i];

                    $('#five-day-cards').append(`
            <div id="fiveDay" class="border rounded px-3 py-3">
                <div id='interiorCard' class="border rounded px-3 py-3">
                    <h3>${new Date(dt * 1000).toDateString()}</h3>
                    <img src='http://openweathermap.org/img/w/${icon}.png'>
                    <p>Temperature: ${temp} </p>
                    <p>Humidity: ${humidity}<p>
                    <p>Wind Speed: ${speed}</p>
                </div>
            </div>
            `)
                }
            }
        })
}

//Display and save the search history of cities

function saveSearchHistory(city) {
    // add the current city to the array of previous cities
    previousCities.push(city);
    
    // store the array in local storage
    localStorage.setItem('previousCities', JSON.stringify(previousCities));
  }

// load search history from local storage

// function to load the search history from local storage and append it to the search history container
function loadSearchHistory() {
    // get the array of previous cities from local storage
    var previousCitiesStr = localStorage.getItem('previousCities');
    if (previousCitiesStr) {
      previousCities = JSON.parse(previousCitiesStr);
    }
  
    // append each previous city to the search history container
    var searchHistoryContainer = $('#search-history');
    previousCities.forEach(function(city) {
      var listItem = $('<li>').text(city);
      searchHistoryContainer.append(listItem);
    });
  }
  
  // call the loadSearchHistory function when the page loads
  loadSearchHistory();












