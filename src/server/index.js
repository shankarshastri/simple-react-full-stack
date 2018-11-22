const express = require('express');
const os = require('os');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const customerHandler = require('./routes/customer');
const loginHandler = require('./routes/login');
const stylistHandler = require('./routes/stylists');
const styleHandler = require('./routes/style');
const bookingHandler = require('./routes/booking');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// Customer Routes
app.get('/api/customer/:username', customerHandler.customerGet);
app.post('/api/customer', customerHandler.customerPost);
app.put('/api/customer/:username', customerHandler.customerPut);

// Login Routes
app.post('/api/login', loginHandler.login);

// Stylist Routes
app.post('/api/stylist', stylistHandler.stylistPost);
app.get('/api/stylist', stylistHandler.stylistsGet);

// Style Routes
app.post('/api/style', styleHandler.stylePost);
app.get('/api/style', styleHandler.styleGet);

//Booking routes
app.post('/api/booking', bookingHandler.bookingInsert);
app.put('/api/booking', bookingHandler.ratingUpdate);
app.get('/api/booking/:username', bookingHandler.getBookings);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    errMessage: err.message
  });
});
app.listen(8080, () => console.log('Listening on port 8080!'));
