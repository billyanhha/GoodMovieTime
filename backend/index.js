const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const config = require('./config.json');
const session = require("express-session");
const listRouter = require('./modules/api/lists/router');
const movieRouter = require('./modules/api/movies/router');
const userRouter = require('./modules/api/users/router');
const authRouter = require('./modules/api/auth/router');

//set up session sd
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.secureCookie,
      maxAge: 12 * 60 * 60 * 1000
    }
  })
);
mongoose.set('useFindAndModify', false);


// coors
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app use

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

// api
app.use('/api/lists', listRouter);
app.use('/api/users', userRouter);
app.use('/api/moveis', movieRouter);
app.use('/api/auth', authRouter);


// connect

mongoose.connect(config.mongoPath, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

const port = process.env.PORT || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server started at port " + port);
});
