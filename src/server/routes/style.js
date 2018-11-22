const db = require('../persistence/db');

module.exports = {
  styleGet(req, res, next) {
    db.getStyle(res);
  },
  stylePost(req, res, next) {
    db.insertStyle(req.body, res, next);
  }
};
