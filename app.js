const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const session = require("express-session");

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

// Session
app.use(
  session({
    secret: "key",
    resave: true,
    saveUninitialized: true,
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
