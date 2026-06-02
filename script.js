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
        `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

async function loadWeather() {

    const weatherElement =
        document.getElementById("weather");

    try {

        // Определяем город по IP
        const ipResponse =
            await fetch("https://ipapi.co/json/");

        const ipData =
            await ipResponse.json();

        const city =
            ipData.city;

        const latitude =
            ipData.latitude;

        const longitude =
            ipData.longitude;

        // Получаем погоду
        const weatherResponse =
            await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
            );

        const weatherData =
            await weatherResponse.json();

        const temp =
            Math.round(
                weatherData.current.temperature_2m
            );

        weatherElement.textContent =
            `${city} • ${temp}°C`;

    } catch {

        weatherElement.textContent =
            "Weather unavailable";
    }
}

loadWeather();
