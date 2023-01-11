// 1. Get the city value from the form
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather

//global variables for 
var apiKey = '32bab760dbf7801b6e0e943adadda9044';
var searchHistory = $('#search-history')
var citySearch = $('#city-search')
var clearHistoryBtn = $('#clear-history-btn')
var currentcity = $('#current-city')
var currentTemp = $('#current-temp')
var currentHumidity = $('#current-humidity')
var currentWindSpeed = $('#current-wind-speed') 
var uvIndex = $('#uv-index')
var previousCities = []
var currentWeather = $('#current-weather')
//API Key
var apiKey = '32bab760dbf7801b6e0e943adadda9044';


//need to create the click listener for the search button and go grab the value that was inputted
$(document).on("click", function(event){
  event.preventDefault();
//need to finish...not sure how
});


//need to clear the previous city lists when clear history button is clicked
clearHistoryBtn.on("click", function(){
  previousCities = []
  listArray();
  $(this).addClass('hide'); 
});

//This is to Request Open Weather based on city inputted




//Display and save the search history of cities


//Create a conditional function to remove the hide class so the hidden text will show once a city is searched





///code given to us by our teacher 
fetch('http://api.openweathermap.org/geo/1.0/direct?appid=2bab760dbf7801b6e0e943adadda9044&q=Indianapolis'
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getWeather(data[0].lat,data[0].lon)
  });

function getWeather(lat,lon){
  console.log(lat,lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2bab760dbf7801b6e0e943adadda9044`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (weather) {
    console.log(weather)

    let btnText = weather.city.name;
    document.querySelector(".city").append(btnText);
    //getting the Icon and make an image with it..
    let iconData = weather.list[0].weather[0].icon
    console.log(iconData);
    let temp = weather.list[0].main.temp
    document.querySelector(".temp").append(temp);

    let icon =  document.createElement("img")

    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconData}@2x.png`)

    document.querySelector(".icon").append(icon);
  });
}

