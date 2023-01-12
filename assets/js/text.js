searchBtn.on("click", getWeather);

async function getWeather() {
    var city = citySearch.val()
    //if you don't have a value nothing will happen
    if (!city) return;
  
    var url = `http://api.openweathermap.org/data/2.5/forecast?appid=2bab760dbf7801b6e0e943adadda9044&units=imperial&q=${city}`;
    var { list } = await ( await fetch(url)).json();
}



var {dt, main:{temp,humidity}, wind:{speed}, weather:[{icon}] } = list[0];

document.getElementById('current-weather').innerHTML = `
<div class="current-city border rounded px-3 py-3">
    <h2>${city} (${dt})</h2>
    <p>Temperature: ${temp} F </p>
    <p>Humidity: ${humidity} </p>
    <p>Wind Speed: ${speed} MPH<span></p>
</div>
`;

fetch('http://api.openweathermap.org/geo/1.0/direct?appid=2bab760dbf7801b6e0e943adadda9044&q=${city}'
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
    document.querySelector("current-city").append(btnText);
    //getting the Icon and make an image with it..
    let iconData = weather.list[0].weather[0].icon
    console.log(iconData);
    let temp = weather.list[0].main.temp
    document.querySelector("current-temp").append(temp);

    let icon =  document.createElement("img")

    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconData}@2x.png`)

    document.querySelector(".icon").append(icon);
  });
}
