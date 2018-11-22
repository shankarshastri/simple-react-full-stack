const db = require('../persistence/db');

module.exports = {
  login(req, res) {
    const { username, password } = req.body;
    db.getCustomerForLogin(username, password, res);
  }
};
