const config = require("config");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
// const home = require("./routes/home");
const customers = require("./routes/customers");
const helmet = require("helmet");
const mongoose = require("mongoose");
const rentals = require("./routes/rentals");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth.js");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/Vidly")
  .then(() => console.log("Connected to MOngoDB..."))
  .catch(err => console.error("Could not connect to MongoDB", err));

app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use("/api/genres", genres);
// app.use("/", home);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
