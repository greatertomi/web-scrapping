const { Router } = require('express');
const util = require('util');
const db = require('./database');
const query = util.promisify(db.query).bind(db);

const router = Router();

router.get('/', async (req, res) => {
  const { level } = req.query;
  let courses;

  if (level) {
    courses = await query('SELECT * FROM courses where level = ?', [level]);
  } else {
    courses = await query('SELECT * FROM courses');
  }
  res.send(courses);
});

module.exports = router;
