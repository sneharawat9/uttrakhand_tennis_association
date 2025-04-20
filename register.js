const express = require('express');
const router = express.Router();
const getConnection = require('../db');

router.post('/', async (req, res) => {
  const { name, age, email, category } = req.body;

  try {
    const connection = await getConnection();

    await connection.execute(
      `INSERT INTO players (name, age, email, category) VALUES (:name, :age, :email, :category)`,
      { name, age, email, category },
      { autoCommit: true }
    );

    await connection.close();
    res.status(200).send('Player registered successfully!');
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).send('Failed to register player');
  }
});

module.exports = router;
