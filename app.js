const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");
const { create } = require("connect-mongo");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Loggs
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", exphbs.engine({ defaultLayouts: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "public")));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// Session
app.use(
  session({
    secret: "wijdpdj0897214908709q290eurq0c98n701q92",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
