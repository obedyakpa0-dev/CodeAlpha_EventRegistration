const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/registrations', require('./routes/registration.routes'));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
