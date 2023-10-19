const connectToMongo = require("./database");
const express = require("express");
const User = require("./models/User");
const cors = require("cors");
connectToMongo();
const app = express();

const port = 5000;

// Middleware to fix cors
// Set middleware of CORS
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    // "https://warm-alfajores-2d3392.netlify.app"
    "https://login-signup-frontend.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.get("/", (req, res) => {
  res.send("Hello Sinmbf");
});
app.get("/api/auth/login", (req, res) => {
  res.send("Login Sinmbf");
});
// Middleware to parse req body
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
