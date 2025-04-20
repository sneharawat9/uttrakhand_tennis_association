const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // to handle form data
app.use(express.static('public')); // if your HTML is in /public

// Oracle DB connection
async function insertPlayer(player) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "newpassword",
      connectString: "localhost/XEPDB1"
    });

    const result = await connection.execute(
      `INSERT INTO players (name, age, email, category) VALUES (:name, :age, :email, :category)`,
      {
        name: player.name,
        age: player.age,
        email: player.email,
        category: player.category
      },
      { autoCommit: true }
    );

    console.log("✅ Player inserted:", result.rowsAffected);
  } catch (err) {
    console.error("❌ Insertion error:", err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// POST route to handle registration
app.post('/register', (req, res) => {
  const { name, age, email, category } = req.body;
  insertPlayer({ name, age, email, category });
  res.send('✅ Registration successful!');
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
