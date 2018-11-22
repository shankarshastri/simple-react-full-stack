const customerInsert = 'INSERT INTO Customer(fname,lname, email, user_name, password, isadmin) VALUES(?, ?, ?, ? ,?, ?);';
const customerUpdate = 'UPDATE Customer SET fname=?, lname=?, email=?, password=? WHERE user_name=?';
const customerGet = 'SELECT fname, lname, email, user_name, isadmin from Customer WHERE user_name=?';
const customerGetForLogin = 'SELECT user_name, password, isadmin from Customer WHERE user_name=?';

const stylistInsert = 'INSERT INTO Stylists(stylist_name, style_name, ratings) VALUES(?, ?, ?)';
const stylistUpdate = 'UPDATE Stylists SET ratings=? WHERE stylist_name=? AND style_name=?';
const stylistDelete = 'DELETE FROM Stylists WHERE stylist_name=? AND style_name=?';
const stylistGet = 'SELECT * from Stylists';

const styleInsert = 'INSERT INTO Styles(style_name, duration, rates) VALUES(?,?,?)';
const styleUpdate = 'UPDATE Styles SET duration=?, rates=? WHERE style_name=?';
const styleDelete = 'DELETE FROM Styles Where style_name=?';
const styleGet = 'SELECT * from Styles';

module.exports = {
  customerInsert,
  customerUpdate,
  customerGet,
  customerGetForLogin,
  stylistInsert,
  stylistGet,
  stylistUpdate,
  stylistDelete,
  styleInsert,
  styleGet,
  styleUpdate,
  styleDelete
};
