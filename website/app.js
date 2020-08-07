/* Global Variables */
const apiBase = 'api.openweathermap.org/data/2.5/weather?';
const apiKey = '2f99093600097a9f026db4be38c89470';
const cityInp = document.querySelector('#city');
const getTempBtn = document.querySelector('#get-temp');
const locationHolder = document.querySelector('#location-holder');
const dateHolder = document.querySelector('#date-holder');
const tempHolder = document.querySelector('#temp-holder');


// Create a new date instance dynamically with JS
let date = new Date();
let currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

const getTemp = async () => {
    let apiUrl = `https://${apiBase}q=${cityInp.value}&appid=${apiKey}`;
    return fetch(apiUrl)
        .then(res => res.json())
        .then(data => Object.assign({
            temp: Math.floor(data.main.temp - 273.15), 
            location: `${data.name}, ${data.sys.country}`
        }))
}

const updateUI = (temp, location) => {
    locationHolder.innerHTML = `Location: <span>${location}</span>`;
    dateHolder.innerHTML = `Date: <span>${currentDate}</span>`;
    tempHolder.innerHTML = `Temperature: <span>${temp}°C</span>`;
}

const processHandler = () => {
    getTemp()
        .then(data => {
            console.log(data.temp);
            updateUI(data.temp, data.location);
        })
}

getTempBtn.addEventListener('click', processHandler);

document.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' && cityInp.value.length > 0)
        processHandler();
});