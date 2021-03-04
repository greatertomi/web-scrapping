const express = require('express');

const app = express();

app.use(express.json({ extended: false }));

app.use('/api/v1/courses', require('./routes.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
