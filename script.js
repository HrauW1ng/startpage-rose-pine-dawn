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