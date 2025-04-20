// backend/db.js
const oracledb = require('oracledb');

async function getConnection() {
  try {
    return await oracledb.getConnection({
      user: 'SYSTEM',
      password: 'newpassword',
      connectString: 'localhost/XEPDB1' // Oracle connect string
    });
  } catch (err) {
    console.error('Oracle DB Connection Error:', err);
    throw err;
  }
}

module.exports = getConnection;
