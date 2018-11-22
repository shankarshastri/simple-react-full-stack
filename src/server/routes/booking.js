const db = require('../persistence/db');

module.exports = {
  bookingInsert(req, res, next) {
    db.insertBooking(req.body, res, next);
  },
  ratingUpdate(req, res, next) {
    db.updateRating(req.body, res, next);
  },
  getBookings(req, res) {
    db.getAllBookingForUser(req.params, res);
  }
};
