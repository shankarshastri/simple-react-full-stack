const mysql = require('mysql');
const uuidv4 = require('uuid/v4');
const DbQueryStatements = require('./DbQueryStatement');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shalini@123',
  database: 'HairSalon'
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

module.exports = {
  insertIntoCustomer(data, res, next) {
    const inserts = [data.fname, data.lname, data.email,
      data.user_name, data.password, data.isadmin];
    const cmd = mysql.format(DbQueryStatements.customerInsert, inserts);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 400,
          message: 'User Already Exists'
        };
        next(errorObj);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ query: 'success' });
      }
    });
  },
  updateCustomer(data, res, next) {
    const updateData = [data.body.fname, data.body.lname, data.body.email,
      data.body.password, data.params.username];
    const cmd = mysql.format(DbQueryStatements.customerUpdate, updateData);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 400,
          message: 'Update Failed'
        };
        next(errorObj);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ query: 'success' });
      }
    });
  },
  getCustomer(data, resp, next) {
    const getUserName = data.username;
    const cmd = mysql.format(DbQueryStatements.customerGet, getUserName);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 404,
          message: 'User Doesn\'t Exist'
        };
        next(errorObj);
        return -1;
      }
      resp.set({ 'Content-Type': 'application/json' });
      return resp.send(JSON.stringify(results));
    });
  },
  getCustomerForLogin(username, password, resp) {
    const cmd = mysql.format(DbQueryStatements.customerGetForLogin, username);
    connection.query(cmd, (error, result) => {
      if (error || result.length === 0) {
        resp.set({ 'Content-Type': 'application/json' });
        resp.status(403).send({ message: 'User Doesn\'t Exist' });
      } else if (result[0].password === password) {
        resp.set({ 'Content-Type': 'application/json' });
        resp.send({
          isAuthenticated: true,
          isAdmin: Boolean(result[0].isadmin)
        });
      } else {
        resp.set({ 'Content-Type': 'application/json' });
        resp.status(403).send({ message: 'Wrong Password' });
      }
    });
  },
  getStylists(resp) {
    connection.query(DbQueryStatements.stylistGet, (error, results) => {
      if (error) {
        resp.send([]);
      } else {
        resp.set({ 'Content-Type': 'application/json' });
        resp.send(JSON.stringify(results));
      }
    });
  },
  insertStylist(data, res, next) {
    const inserts = [data.stylist_name, data.phone_number, data.email];
    const cmd = mysql.format(DbQueryStatements.stylistInsert, inserts);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 400,
          message: 'Stylist Already Exists'
        };
        next(errorObj);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ query: 'success' });
      }
    });
  },
  getStyle(resp) {
    connection.query(DbQueryStatements.styleGet, (error, results) => {
      if (error) {
        resp.send([]);
      } else {
        resp.set({ 'Content-Type': 'application/json' });
        resp.send(JSON.stringify(results));
      }
    });
  },
  insertStyle(data, res, next) {
    const inserts = [data.style_name, data.duration, data.rates];
    const cmd = mysql.format(DbQueryStatements.styleInsert, inserts);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 400,
          message: 'Style Already Exists'
        };
        next(errorObj);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ query: 'success' });
      }
    });
  },
  insertBooking(data, res, next) {
    console.log(data);
    const inserts = [uuidv4(), data.user_name, data.stylist_name, data.style_name,
      data.booking_date, data.stylist_rating];
    console.log(inserts);
    const cmd = mysql.format(DbQueryStatements.bookingInsert, inserts);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 400,
          message: 'Booking Insert Failed'
        };
        console.log(error);
        next(errorObj);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ query: 'success' });
      }
    });
  },
  getAllBookingForUser(data, res) {
    const { username } = data;
    const cmd = mysql.format(DbQueryStatements.bookingGet, username);
    connection.query(cmd, (error, results) => {
      if (error) {
        res.set({ 'Content-Type': 'application/json' });
        res.send([]);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send(JSON.stringify(results));
      }
    });
  },
  updateRating(data, res, next) {
    const updates = [data.stylist_rating, data.booking_id];
    const cmd = mysql.format(DbQueryStatements.bookingUpdateRating, updates);
    connection.query(cmd, (error, results) => {
      if (error) {
        const errorObj = {
          error,
          statusCode: 400,
          message: 'Rating Update Failed'
        };
        next(errorObj);
      } else {
        res.set({ 'Content-Type': 'application/json' });
        res.send({ query: 'success' });
      }
    });
  }
};
