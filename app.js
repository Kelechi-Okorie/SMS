const express = require('express');

const app = express();

app.get('/', async (req, res) => {
    res.send('successful');
});




app.listen('3005', () => {
    console.log('the app has started');
});