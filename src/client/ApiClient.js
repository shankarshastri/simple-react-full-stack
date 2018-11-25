
export const login = (username, password, props, errorHandler) => fetch('/api/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username,
    password,
  })
}).then(response => Promise.all([response.ok, response.json()])).then(([respOk, json]) => {
  if (respOk) {
    props.userHasAuthenticated(json, props, username);
  } else {
    errorHandler(json.message);
  }
});

export const createCustomer = (customerObj, errorHandler) => fetch('/api/customer', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fname: customerObj.fname,
    lname: customerObj.lname,
    email: customerObj.email,
    user_name: customerObj.user_name,
    password: customerObj.password,
    isadmin: false
  })
}).then(response => Promise.all([response.ok, response.json()]))
  .then(([respOk, json]) => {
    if (respOk) {
      errorHandler(respOk, 'Customer Added Successfully');
    } else errorHandler(respOk, json.message || 'Failed To Add Customer');
  });

export const getCustomerBooking = (userName, handler) => fetch(`/api/booking/${userName}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
  .then((json) => {
    console.log(json);
    return handler(json || []);
  }).catch(() => handler([]));


export const createBooking = (bookingObj, errorHandler) => fetch('/api/booking', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_name: bookingObj.user_name,
    stylist_name: bookingObj.stylist_name,
    style_name: bookingObj.style_name,
    booking_date: bookingObj.booking_date,
    stylist_rating: -1
  })
}).then(response => Promise.all([response.ok, response.json()]))
  .then(([respOk, json]) => {
    if (respOk) {
      errorHandler(respOk, 'Booking Confirmed');
    } else errorHandler(respOk, json.message || 'Failed To Add Booking');
  });

export const getStylists = handler => fetch('/api/stylist', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
  .then((json) => {
    console.log(json);
    return handler(json || []);
  }).catch(() => handler([]));

export const getStyles = handler => fetch('/api/style', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}).then(response => response.json())
  .then((json) => {
    console.log(json);
    return handler(json || []);
  }).catch(() => handler([]));

export const updateRating = (booking_id, stylist_rating) => fetch('/api/booking', {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ stylist_rating, booking_id })
}).catch(() => {});

export const createStyle = (styleObj, errorHandler) => fetch('/api/style', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    style_name: styleObj.style_name,
    duration: styleObj.duration,
    rates: styleObj.rates
  })
}).then(response => Promise.all([response.ok, response.json()]))
  .then(([respOk, json]) => {
    if (respOk) {
      errorHandler(respOk, 'Added Style Successfully');
    } else errorHandler(respOk, json.message || 'Failed To Add Style');
  });


export const createStylist = (stylistObj, errorHandler) => fetch('/api/stylist', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    stylist_name: stylistObj.stylist_name,
    phone_number: stylistObj.phone_number,
    email: stylistObj.email
  })
}).then(response => Promise.all([response.ok, response.json()]))
  .then(([respOk, json]) => {
    if (respOk) {
      errorHandler(respOk, 'Added Stylist Successfully');
    } else errorHandler(respOk, json.message || 'Failed To Add Stylist');
  });
