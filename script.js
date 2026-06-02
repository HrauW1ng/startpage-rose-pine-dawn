function updateClock() {

    const now = new Date();

    const time = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Kyiv",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(now);

    const date = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Kyiv",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);

    document.getElementById("clock").textContent = time;
    document.getElementById("date").textContent = date;
}

updateClock();
setInterval(updateClock, 1000);

document
.getElementById("searchForm")
.addEventListener("submit", e => {

    e.preventDefault();

    const query =
    document.getElementById("search")
    .value
    .trim();

    if(query){

        window.location.href =
        `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }
});

async function loadWeather() {

    const weatherElement =
        document.getElementById("weather");

    try {

        // Определяем город по IP
        const ipResponse =
            await fetch("https://geolocation-db.com/json/");

        const ipData =
            await ipResponse.json();

        const city =
            ipData.city || "Unknown city";

        const latitude =
            ipData.latitude;

        const longitude =
            ipData.longitude;

        // Получаем погоду
        const weatherResponse =
            await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
            );

        const weatherData =
            await weatherResponse.json();

        const temp =
            typeof weatherData.current_weather?.temperature !== "undefined"
                ? Math.round(weatherData.current_weather.temperature)
                : null;

        if (temp === null) {
            throw new Error("No temperature data");
        }

        weatherElement.textContent =
            `${city} • ${temp}°C`;

    } catch (error) {

        weatherElement.textContent =
            "Weather unavailable";
        console.error(error);
    }
}

loadWeather();
