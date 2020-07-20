/* Global Variables */
const apiBase = 'api.openweathermap.org/data/2.5/weather?';
const apiKey = '2f99093600097a9f026db4be38c89470'
const zipInp = document.querySelector('#zip');
const textArea = document.querySelector('#feelings');
const generateBtn = document.querySelector('#generate');
const dataContainer = document.querySelector('#entryHolder');
const dateHolder = document.querySelector('#date-holder');
const tempHolder = document.querySelector('#temp-holder');
const feelHolder = document.querySelector('#feel-holder');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

const getTemp = async () => {
    let apiUrl = `https://${apiBase}zip=${zipInp.value}&appid=${apiKey}`;
    return fetch(apiUrl)
    .then(res => res.json())
    .then(data => data.main.temp)
    .then(kTemp => kTemp -  273.15)
    .then(ctemp => Math.floor(ctemp))
}

const postData = async (temp) => {
    const data = {
        date: newDate,
        temp: temp,
        feel: textArea.value
    }
    return fetch('/temp', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
}

const updateUI = async () => {
    return fetch('/temp')
        .then(res => res.json())
        .then(data => {
            dataContainer.style.visibility = 'visible'
            dateHolder.innerHTML = `Date: <span>${data.date}</span>`;
            tempHolder.innerHTML = `Temperature: <span>${data.temp}°C</span>`;
            feelHolder.innerHTML = `Feelings: <span>${data.feel}</span>`;
        })
}

const processHandler = () => {
    getTemp()
    .then(temp => postData(temp))
    .then(() => updateUI())
}

generateBtn.addEventListener('click', processHandler);