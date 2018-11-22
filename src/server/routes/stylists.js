const db = require('../persistence/db');

module.exports = {
  stylistsGet(req, res, next) {
    db.getStylists(res);
  },
  stylistPost(req, res, next) {
    db.insertStylist(req.body, res, next);
  }
};
