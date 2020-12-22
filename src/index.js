function formatDate(date) {
  let daydate = date.getDate();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${daydate} ${month}, ${hour}:${minutes}`;
}

let currentTime = new Date();
let dateSection = document.querySelector(".date");
dateSection.innerHTML = formatDate(currentTime);

function showWeather(response) {
  let mainTemp = document.querySelector("#mainTemp");
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city");
  let tempHi = document.querySelector(".mainHi");
  let maxTemp = Math.round(response.data.main.temp_max);
  let tempLo = document.querySelector(".mainLo");
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  mainTemp.innerHTML = `${temperature}°`;
  cityName.innerHTML = `${response.data.name}`;
  tempHi.innerHTML = `${maxTemp}`;
  tempLo.innerHTML = `${minTemp}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  windspeed.innerHTML = `${wind} `;
}

function displayCity(event) {
  event.preventDefault();
  let myCity = document.querySelector("#city-search").value;
  let metric = "metric";
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=${metric}`;
  axios.get(url).then(showWeather);
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", displayCity);

function retrievePosition(position) {
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let myWeather = document.querySelector("#findMe-button");
myWeather.addEventListener("click", findPosition);

function displayCelcius(event) {
  event.preventDefault();
  let myCity = document.querySelector("#city-search").value;
  let unit = "metric";
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showWeather);
}

let degreeCelci = document.querySelector("#celcius-button");
degreeCelci.addEventListener("click", displayCelcius);

function displayFarenheit(event) {
  event.preventDefault();
  let myCity = document.querySelector("#city-search").value;
  let unit = "imperial";
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showWeather);
}

let degreeFaren = document.querySelector("#farenheit-button");
degreeFaren.addEventListener("click", displayFarenheit);
