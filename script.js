const API_KEY = "1ed73da07cc82ded4a3d016342fa2d7b";

// ==================== CLOCK ====================

setInterval(() => {
    const time = new Date();

    document.querySelector(".hour").textContent =
        `${time.getHours()}:`;

    document.querySelector(".minute").textContent =
        `${time.getMinutes()}:`;

    document.querySelector(".sec").textContent =
        time.getSeconds();

}, 1000);


// ==================== CURRENT WEATHER ====================

async function getWeather() {

    try {

        const searchname = document.querySelector(".searchCity");
        const city = searchname.value.trim();
        const cityName = document.querySelector(".cityname");

        if (!city) {
            cityName.textContent = "Enter a city";
            return;
        }

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }

        const data = await response.json();

        if (data.cod == "404") {
            cityName.textContent = "City not found";
            return;
        }

        cityName.textContent = searchname.value;

        document.querySelector(".country").textContent =
            data.sys.country;

        document.querySelector(".temp").textContent =
            `${data.main.temp}°C`;

        const date = new Date();

        document.querySelector(".datetime").textContent =
            date.toLocaleString();

        document.querySelector(".feelslike").textContent =
            `Feels Like : ${data.main.feels_like}°C`;

        document.querySelector(".minTemp").textContent =
            `Min Temp : ${data.main.temp_min}°C`;

        document.querySelector(".maxTemp").textContent =
            `Max Temp : ${data.main.temp_max}°C`;

        document.querySelector(".humidity").textContent =
            `Humidity : ${data.main.humidity}%`;

        document.querySelector(".pressure").textContent =
            `Pressure : ${data.main.pressure}hPA`;

        document.querySelector(".visibilty").textContent =
            `Visibility : ${data.visibility / 1000}km`;

        document.querySelector(".speed").textContent =
            `Speed : ${data.wind.speed * 3.6}km/h`;

        document.querySelector(".cloud").textContent =
            `Cloud : ${data.clouds.all}%`;

    } catch (error) {

        console.error("getWeather error:", error);

    }
}


// ==================== HOURLY FORECAST ====================

async function forecast() {

    try {

        const searchname = document.querySelector(".searchCity");
        const city = searchname.value.trim();

        if (!city) return;

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch forecast");
        }

        const data = await response.json();

        if (data.cod !== "200") {
            return;
        }

        const cards = document.querySelectorAll(".forecard");

        data.list.slice(0, 6).forEach((item, index) => {

            cards[index].innerHTML = `
                <h3>
                    ${item.dt_txt.split(" ")[1].slice(0, 5)}
                </h3>

                <p>
                    ${item.main.temp}°C
                </p>

                <p>
                    ${item.weather[0].main}
                </p>
            `;

        });

    } catch (error) {

        console.error("forecast error:", error);

    }
}


// ==================== PER DAY FORECAST ====================

async function perDayForecast() {

    try {

        const searchname = document.querySelector(".searchCity");
        const city = searchname.value.trim();

        if (!city) return;

        const days = document.querySelectorAll(".day");

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch daily forecast");
        }

        const data = await response.json();

        let index = 0;

        data.list.forEach(forecast => {

            const time =
                forecast.dt_txt.split(" ")[1];

            if (
                time === "12:00:00" &&
                index < days.length
            ) {

                days[index].innerHTML = `
                    <p>
                        Temp : ${forecast.main.temp}°C
                    </p>

                    <p>
                        Weather : ${forecast.weather[0].main}
                    </p>

                    <p>
                        Clouds : ${forecast.clouds.all}%
                    </p>
                `;

                index++;

            }

        });

    } catch (error) {

        console.error("perDayForecast error:", error);

    }
}


// ==================== SEARCH BUTTON ====================

const search = document.querySelector(".searchbtn");

search.addEventListener("click", () => {

    getWeather();
    forecast();
    perDayForecast();

});


// ==================== ENTER KEY ====================

const cityInput = document.querySelector(".searchCity");

cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        getWeather();
        forecast();
        perDayForecast();

    }

});


// ==================== HAMBURGER ====================

const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {

    sidebar.classList.toggle("active");

});


// ==================== SIDEBAR SEARCH ====================

const searchInput = document.querySelector(".searchCity");
const sidebarSearch = document.querySelector(".sidebarSearch");

sidebarSearch.addEventListener("click", (e) => {

    e.preventDefault();

    sidebar.classList.remove("active");

    setTimeout(() => {

        searchInput.focus();

    }, 300);

});
