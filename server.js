// External Modules
const express = require('express');

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const app = express();

// set the static folder
app.use(express.static('website'));  
// Parse the request body
app.use(express.urlencoded({extended: false}));  
app.use(express.json())

// Log the incoming requests
app.use((req, res, next) => {
    console.log(`${req.method}  ${req.url}`);
    next();
});

app.get('/temp', (req, res) => {
    res.json(projectData)
});

app.post('/temp', (req, res) => {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feel = req.body.feel;
    res.end();
});

app.listen('3000', (req, res) => {
    console.log('Server is running...');
});