const nav = document.querySelector("nav ul");
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "☰";
toggleBtn.classList.add("menu-toggle");
document.querySelector("nav").prepend(toggleBtn);

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// WEATHER FETCH WITH ICONS
const weatherContainer = document.querySelector(".weather-container");

async function fetchWeather() {
  const city = "Taghazout"; // City for weather
  const apiKey = "508a98c1f319636d2e64a962e9b88e00";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(url)
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Get icon code from API
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherContainer.innerHTML = `
      <div class="weather-item">
        <img src="${iconUrl}" alt="${data.weather[0].description}" style="width:50px; vertical-align:middle;">
        🌡️ Temp: ${data.main.temp}°C
      </div>
      <div class="weather-item">💨 Wind: ${data.wind.speed} m/s</div>
      <div class="weather-item">☁️ ${data.weather[0].description}</div>
      <div class="weather-item">🌊 Humidity: ${data.main.humidity}%</div>
    `;
  } catch (err) {
    weatherContainer.innerHTML = "<p>⚠️ Unable to load weather data</p>";
  }
}

fetchWeather();
