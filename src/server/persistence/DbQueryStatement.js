const customerInsert = 'INSERT INTO Customer(fname,lname, email, user_name, password, isadmin) VALUES(?, ?, ?, ? ,?, ?);';
const customerUpdate = 'UPDATE Customer SET fname=?, lname=?, email=?, password=? WHERE user_name=?';
const customerGet = 'SELECT fname, lname, email, user_name, isadmin from Customer WHERE user_name=?';
const customerGetForLogin = 'SELECT user_name, password, isadmin from Customer WHERE user_name=?';

const stylistInsert = 'INSERT INTO Stylists(stylist_name, phone_number, email) VALUES(?, ?, ?)';
const stylistDelete = 'DELETE FROM Stylists WHERE stylist_name=?';
const stylistGet = 'SELECT stylist_name, phone_number, email, (SELECT avg_rating FROM AvgRating WHERE stylist_name=Stylists.stylist_name) AS avg_rating from Stylists';

const styleInsert = 'INSERT INTO Styles(style_name, duration, rates) VALUES(?,?,?)';
const styleUpdate = 'UPDATE Styles SET duration=?, rates=? WHERE style_name=?';
const styleDelete = 'DELETE FROM Styles Where style_name=?';
const styleGet = 'CALL getStyles()';

const bookingGet = 'SELECT * FROM CustomerBooking WHERE user_name=?';
const bookingInsert = 'INSERT INTO CustomerBooking(booking_id, user_name, stylist_name, style_name, booking_date, stylist_rating) VALUES(?,?,?,?,?,?)';
const bookingUpdateRating = 'UPDATE CustomerBooking SET stylist_rating=? WHERE booking_id=?';


module.exports = {
  customerInsert,
  customerUpdate,
  customerGet,
  customerGetForLogin,
  stylistInsert,
  stylistGet,
  stylistDelete,
  styleInsert,
  styleGet,
  styleUpdate,
  styleDelete,
  bookingGet,
  bookingInsert,
  bookingUpdateRating
};
