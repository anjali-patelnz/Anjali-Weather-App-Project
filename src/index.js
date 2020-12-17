let now = new Date();
let dateSection = document.querySelector(".date");

let year = now.getFullYear();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
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

let month = months[now.getMonth()];

dateSection.innerHTML = `Last updated: ${day}, ${date} ${month} ${year} ${hour}:${minutes}`;

let cityName = document.querySelector("h2");

function displayCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-search");
  cityName.innerHTML = `${userCity.value}`;
  let myCity = document.querySelector("#city-search").value;
  let metric = "metric";
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}&units=${metric}`;
  axios.get(url).then(showWeather);
}

let changeCity = document.querySelector(".form-inline");
changeCity.addEventListener("submit", displayCity);

let currentTemp = document.querySelector("h1");

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

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  let tempHi = document.querySelector(".tempHi");
  let maxTemp = Math.round(response.data.main.temp_max);
  let tempLo = document.querySelector(".tempLo");
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  h1.innerHTML = `${temperature}°`;
  h2.innerHTML = `${response.data.name}`;
  tempHi.innerHTML = `${maxTemp}°`;
  tempLo.innerHTML = `${minTemp}°`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;
}

function retrievePosition(position) {
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let myWeather = document.querySelector("#findMe-button");
myWeather.addEventListener("click", findPosition);

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

navigator.geolocation.getCurrentPosition(retrievePosition);
