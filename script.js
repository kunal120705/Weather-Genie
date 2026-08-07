const API_KEY = "1ed73da07cc82ded4a3d016342fa2d7b";
setInterval(() => {
    const time = new Date();
    document.querySelector(".hour").textContent = `${time.getHours()}:`;
    document.querySelector(".minute").textContent = `${time.getMinutes()}:`;
    document.querySelector(".sec").textContent = time.getSeconds();
}, 900);

async function getWeather() {
    const searchname = document.querySelector(".searchCity");
    const cityName = document.querySelector(".cityname");
    const city = searchname.value.trim();
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod == "404") {
        cityName.textContent = "City not found";
        return;
    }
    cityName.textContent = searchname.value;
    document.querySelector(".country").textContent=`${data.sys.country}`; 
    document.querySelector(".temp").innerHTML = `${data.main.temp}°C`;
    const date = new Date();
    document.querySelector(".datetime").textContent = date.toLocaleString();
    document.querySelector(".feelslike").innerHTML =
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
        `Visibilty : ${data.visibility / 1000}km`;
    document.querySelector(".speed").textContent =
        `Speed : ${data.wind.speed}km/s`;
    document.querySelector(".cloud").textContent = `cloud : ${data.clouds.all}%`;
}
async function forecast() {
    const searchname = document.querySelector(".searchCity");
    const city = searchname.value.trim();

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== "200") return;

    const cards = document.querySelectorAll(".forecard");

    data.list.slice(0, 6).forEach((item, index) => {
        cards[index].innerHTML = `
            <h3>${item.dt_txt.split(" ")[1].slice(0, 5)}</h3>
            <p>${item.main.temp}°C</p>
            <p>${item.weather[0].main}</p>
        `;
    });
}
const search = document.querySelector(".searchbtn");
search.addEventListener("click", () => {
    getWeather();
    forecast();
    perHourForecast();
});
const cityInput = document.querySelector(".searchCity");

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
        forecast();
    }
});
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");

hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});
const searchInput = document.querySelector(".searchCity");
const sidebarSearch = document.querySelector(".sidebarSearch");
sidebarSearch.addEventListener("click", (e) => {
    e.preventDefault();

    sidebar.classList.remove("active");

    setTimeout(() => {
        searchInput.focus();
    }, 300); // Match your sidebar closing animation
});