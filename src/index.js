function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

let currentTime = new Date();
let dateSection = document.querySelector(".date");
dateSection.innerHTML = formatDate(currentTime);

function showWeather(response) {
  let mainIcon = document.querySelector("#mainIcon");
  let mainTemp = document.querySelector("#mainTemp");
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city");
  let dateSection = document.querySelector(".date");
  let tempHi = document.querySelector(".mainHi");
  let maxTemp = Math.round(response.data.main.temp_max);
  let tempLo = document.querySelector(".mainLo");
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);

  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  mainTemp.innerHTML = `${temperature}°`;
  cityName.innerHTML = `${response.data.name}`;
  dateSection.innerHTML = formatDate(response.data.dt * 1000);
  tempHi.innerHTML = ` ${maxTemp}`;
  tempLo.innerHTML = ` ${minTemp}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  windspeed.innerHTML = `${wind} `;

  mainCelciTemp = response.data.main.temp;
  mainCelciTempHi = response.data.main.temp_max;
  mainCelciTempLo = response.data.main.temp_min;
}

function showHourlyForcast(response) {
  let hourlyForcast = document.querySelector("#hourlyForcast");
  hourlyForcast.innerHTML = null;
  let hourlydata = null;

  for (let index = 0; index < 5; index++) {
    hourlydata = response.data.list[index];
    hourlyForcast.innerHTML += `
  <div class="card">
              <div class="card-body">
                <h5 class="card-title"><img
        src="http://openweathermap.org/img/wn/${
          hourlydata.weather[0].icon
        }@2x.png"
      /></h5>
                <p class="card-text">${Math.round(hourlydata.main.temp)}°</p>
                <p class="card-text">${formatHours(hourlydata.dt * 1000)}</p>
              </div>
            </div>`;
  }
}

function findWeather(city) {
  let metric = "metric";
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`;
  axios.get(url).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showHourlyForcast);
}

function searchbarCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  findWeather(city);
}

let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", searchbarCity);

function retrievePosition(position) {
  let apiKey = "c31b4fce1a46009ae0af063ea44bb353";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showHourlyForcast);
}

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let myWeather = document.querySelector("#findMe-button");
myWeather.addEventListener("click", findPosition);

function displayFarenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#mainTemp");
  let tempHi = document.querySelector(".mainHi");
  let tempLo = document.querySelector(".mainLo");

  let mainFarenTemp = (mainCelciTemp * 9) / 5 + 32;
  let convertFarenMain = Math.round(mainFarenTemp);
  let mainFarenHi = (mainCelciTempHi * 9) / 5 + 32;
  let convertFarenHi = Math.round(mainFarenHi);
  let mainFarenLo = (mainCelciTempLo * 9) / 5 + 32;
  let convertFarenLo = Math.round(mainFarenLo);

  mainTemp.innerHTML = `${convertFarenMain}°`;
  tempHi.innerHTML = ` ${convertFarenHi}`;
  tempLo.innerHTML = ` ${convertFarenLo}`;

  celciusButton.classList.remove("active");
  farenheitButton.classList.add("active");
}

function displayCelcius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#mainTemp");
  let tempHi = document.querySelector(".mainHi");
  let tempLo = document.querySelector(".mainLo");

  let convertCelciMain = Math.round(mainCelciTemp);
  let convertCelciHi = Math.round(mainCelciTempHi);
  let convertCelciLo = Math.round(mainCelciTempLo);

  mainTemp.innerHTML = `${convertCelciMain}°`;
  tempHi.innerHTML = ` ${convertCelciHi}`;
  tempLo.innerHTML = ` ${convertCelciLo}`;

  celciusButton.classList.add("active");
  farenheitButton.classList.remove("active");
}

let mainCelciTemp = null;

let farenheitButton = document.querySelector("#farenheitButton");
farenheitButton.addEventListener("click", displayFarenheit);

let celciusButton = document.querySelector("#celciusButton");
celciusButton.addEventListener("click", displayCelcius);

findWeather("Wellington");
