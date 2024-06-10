const APIKey = '0ca9f266f666087adcfcea49a0e1c74d';
const APIUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherContainer = document.querySelector('.weather');
const errorContainer = document.querySelector('.error');

async function checkWeather(city) {
    const response = await fetch(APIUrl + city + `&appid=${APIKey}`);
    if (response.status == 404) {
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
        return;
    } else {
        errorContainer.style.display = "none";
        weatherContainer.style.display = "block";
    }

    let data = await response.json();

    const cityName = document.querySelector('.city');
    cityName.innerText = data.name;

    const temp = document.querySelector('.temp');
    temp.innerText = Math.round(data.main.temp) + '°C';

    const humidity = document.querySelector('.humidity-text');
    humidity.innerText = data.main.humidity + '%';

    const wind = document.querySelector('.wind-text');
    wind.innerText = data.wind.speed + 'km/h';

    const weatherDescription = document.querySelector('.weather-description');
    const description = data.weather[0].description;
    weatherDescription.innerText = description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();

    const minTemp = document.querySelector('h3');
    minTemp.innerText = Math.round(data.main.temp_min) + '°C';

    const maxTemp = document.querySelectorAll('h3')[1];
    maxTemp.innerText = Math.round(data.main.temp_max) + '°C';

    const weatherIcon = document.querySelector('.weather-icon');
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = 'images/clouds.png';
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = 'images/clear.png';
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = 'images/mist.png';
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = 'images/rain.png';
    } else {
        weatherIcon.src = 'images/snow.png';
    }

    /* console.log(data); */
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(searchBox.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    checkWeather('Lisbon');
});
