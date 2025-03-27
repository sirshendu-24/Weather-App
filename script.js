let temperature = document.querySelector(".temperature");
let locationElement = document.querySelector("#loc");
let sbtn = document.getElementById("search-btn");
const loadingSpinner = document.getElementById("loadingSpinner");
let weatherIcon = document.querySelector(".weather-icon");

async function a() {
    const API_KEY = "9ccf94232b67a0f7021eaf9a142d7af6";
    loadingSpinner.style.visibility = "visible";
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            updateWeatherInfo(data);
        } catch (err) {
            console.error("Error fetching weather data:", err);
        } finally {
            loadingSpinner.style.visibility = "hidden";
        }
    });
}

function updateWeatherInfo(data) {
    console.log(data);

    if (data && data.main) {
        locationElement.innerHTML = data.name;
        temperature.innerHTML = `${data.main.temp}°C`;
        document.querySelector("#wind").innerHTML = `${data.wind.speed} km/h`;
        document.querySelector("#Humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector("#Feel").innerHTML = `${data.main.feels_like}°C`;
        document.querySelector("#temp_max").innerHTML = `⬆ ${data.main.temp_max}°C`;
        document.querySelector("#temp_min").innerHTML = `⬇ ${data.main.temp_min}°C`;
        document.querySelector("#pressure").innerHTML = `${data.main.pressure} hPa`;
        document.querySelector("#sea_level").innerHTML = `${data.main.sea_level}`;
        document.querySelector(".description").innerHTML = data.weather[0].main;

        // Weather icon based on condition
        if (data.weather[0].main === "Rain") {
            weatherIcon.innerHTML = "🌧️";  
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.innerHTML = "🌤️";  
        } else if (data.weather[0].main === "Clouds") {
            weatherIcon.innerHTML = "☁️";  
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.innerHTML = "❄️"; 
        } else {
            weatherIcon.innerHTML = "🌥️";
        }
    } else {
        locationElement.innerHTML = "Enter Correct Name";
        temperature.innerHTML = "--";
        document.querySelector("#wind").innerHTML = "--";
        document.querySelector("#Humidity").innerHTML = "--";
        document.querySelector("#Feel").innerHTML = "--";
        document.querySelector("#temp_max").innerHTML = "--";
        document.querySelector("#temp_min").innerHTML = "--";
        document.querySelector("#pressure").innerHTML = "--";
        document.querySelector("#sea_level").innerHTML = "--";
        document.querySelector(".description").innerHTML = "N/A";
        document.querySelector(".weather-icon").innerHTML = "❓";
    }
}

const searchData = async () => {
    const API_KEY = "9ccf94232b67a0f7021eaf9a142d7af6";

    sbtn.addEventListener("click", async () => {
        const city = document.getElementById("text").value.trim();
        if (!city) {
            alert("Please enter a city name.");
            return;
        }
        loadingSpinner.style.visibility = "visible";

        try {
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            const response = await fetch(api);
            const data = await response.json();
            updateWeatherInfo(data);
        } catch (err) {
            console.error("Error fetching weather data:", err);
        } finally {
            loadingSpinner.style.visibility = "hidden";
        }
    });

    document.getElementById("text").addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            const city = document.getElementById("text").value.trim();
            if (!city) {
                alert("Please enter a city name.");
                return;
            }
            loadingSpinner.style.visibility = "visible";

            try {
                const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
                const response = await fetch(api);
                const data = await response.json();
                updateWeatherInfo(data);
            } catch (err) {
                console.error("Error fetching weather data:", err);
            } finally {
                loadingSpinner.style.visibility = "hidden";
            }
        }
    });
};

function load() {
    a();
    searchData();
}

window.onload = load;
