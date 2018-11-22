const db = require('../persistence/db');

module.exports = {
  customerGet(req, res, next) {
    db.getCustomer(req.params, res, next);
  },

  customerPost(req, res, next) {
    db.insertIntoCustomer(req.body, res, next);
  },
  customerPut(req, res, next) {
    db.updateCustomer(req, res, next);
  }
};
