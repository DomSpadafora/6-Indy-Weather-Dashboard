
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
                <div class="border rounded px-3 py-3">
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

var searchHistoryList = function (cityName) {
    $('.past-search:contains("' + cityName + '")').remove();

    // create entry with city name
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);

    // create container for entry
    var searchEntryContainer = $("<div>");
    searchEntryContainer.addClass("past-search-container");

    // append entry to container
    searchEntryContainer.append(searchHistoryEntry);

    // append entry container to search history container
    var searchHistoryContainerEl = $("#search-history-container");
    searchHistoryContainerEl.append(searchEntryContainer);

    if (savedSearches.length > 0) {
        // update savedSearches array with previously saved searches
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }

    // add city name to array of saved searches
    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    // reset search input
    $("#search-input").val("");

};

// load search history from local storage

var loadSearchHistory = function () {
    // get saved search history
    var savedSearchHistory = localStorage.getItem("savedSearches");

    // return false if there is no previous saved searches
    if (!savedSearchHistory) {
        return false;
    }

    // turn saved search history string into array
    savedSearchHistory = JSON.parse(savedSearchHistory);

    // go through savedSearchHistory array and make entry for each item in the list
    for (var i = 0; i < savedSearchHistory.length; i++) {
        searchHistoryList(savedSearchHistory[i]);
    }
};













