const weatherIcons = {
    Clouds: "clouds.png",
    Rain: "rain.png",
    Drizzle: "drizzle.png",
    Snow: "snow.png",
    Clear: "clear.png",
    Mist: "mist.png",
};

const apiKey = "b4b21008b67a5320d4f4555c4c159039";

const searchInput = document.querySelector(".weather__input");
const searchBtn = document.querySelector(".weather__btn");
const weatherResult = document.querySelector(".weather__result");
const textError = document.querySelector(".weather__error");

const tempEl = document.querySelector(".weather__temp");
const cityEl = document.querySelector(".weather__city");
const descEl = document.querySelector(".weather__desc");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind-speed");
const imgWeather = document.querySelector(".weather__img");

searchBtn.onclick = () => {
    searchWeather();
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

async function getWeather(city) {
    if (!city) {
        weatherResult.style.display = "none";
        textError.style.display = "block";
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

    try {
        const res = await fetch(`${apiUrl}&appid=${apiKey}&units=metric`);
        if (!res.ok) throw new Error(`HTTP code: ${res.status}`);
        const data = await res.json();

        // Render UI
        renderWeather(data);
    } catch (error) {
        weatherResult.style.display = "none";
        console.log("Error: ", error);
        alert("Error fetching current weather data. Please try again.");
    }
}

function searchWeather() {
    const city = searchInput.value.trim();
    getWeather(city);
    searchInput.value = "";
}

const renderWeather = (data) => {
    tempEl.textContent = Math.round(data.main.temp) + "°C";
    cityEl.textContent = data.name;
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = data.main.humidity + "%";
    windEl.textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";

    const imgUrl = "./assets/imgs/";
    imgWeather.src =
        `${imgUrl}${weatherIcons[data.weather[0].main]}` ||
        `${imgUrl}clear.png`;

    weatherResult.style.display = "block";
    textError.style.display = "none";
};
