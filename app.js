/* Global Variables */
const apiEndPoint = 'api.openweathermap.org/data/2.5/weather?';
const apiKey = '2f99093600097a9f026db4be38c89470';
const cityInp = document.querySelector('#city');
const getTempBtn = document.querySelector('#get-temp');
const outputHolder = document.querySelector('.output-holder');
const locationHolder = document.querySelector('#location-holder');
const dateHolder = document.querySelector('#date-holder');
const tempHolder = document.querySelector('#temp-holder');


// Create a new date instance dynamically with JS
let date = new Date();
let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

// Fetch the temp from the API
const getTemp = () => {
    let apiUrl = `https://${apiEndPoint}q=${cityInp.value}&appid=${apiKey}`;
    return fetch(apiUrl)
        .then(res => res.json())
        .then(data => Object.assign({
            temp: Math.floor(data.main.temp - 273.15), 
            location: `${data.name}, ${data.sys.country}`
        }))
}

// Update the UI
const updateUI = (temp, location) => {
    const hrElms = document.querySelectorAll('hr');
    if(hrElms.length < 2) {
        const hrElm = document.createElement('hr');
        outputHolder.insertAdjacentElement("beforebegin", hrElm);
    }
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