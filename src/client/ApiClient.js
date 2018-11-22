
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
