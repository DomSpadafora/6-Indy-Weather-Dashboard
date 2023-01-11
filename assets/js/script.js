// 1. Get the city value from the form
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather

//global variables 
var apiKey= '38666bf6ec0a15aad4a6332c669202c8';
var recentSearches = [];

//need to make a list of previously searched cities 
function searchFunction(datea){
  recentSearches.push($('#textboxSearch').val());

  $('#textboxSearch').val("");
  $('#searchHistory').text("");

  $.each(recentSearches, function (index, value) {
    $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox("+index+")'>" + value + '</li>');
}); 

}
 
function addtotextbox(id) {
  $('#textboxSearch').val(recentSearches[id]);
}



///code given by class teacher///
fetch('http://api.openweathermap.org/geo/1.0/direct?appid=38666bf6ec0a15aad4a6332c669202c8=Orlando'
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getWeather(data[0].lat,data[0].lon)
  });

function getWeather(lat,lon){
  console.log(lat,lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=38666bf6ec0a15aad4a6332c669202c8&units=imperial`
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

