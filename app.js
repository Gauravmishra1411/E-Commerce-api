const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const route = require("./src/Router/userRoute");
const connect = require("./src/dbConnection/dbconnect");
const cookieParser = require("cookie-parser");

/*  middlewere   */
app.use(express.json());

app.use(cookieParser());

// app.use(cors({
//   origin: "https://e-commerce-client-weld.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://e-commerce-client-weld.vercel.app" // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy does not allow this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello",
  });
});

app.use("/api", route);

const PORT = process.env.PORT || 8080;
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`server are connecct successful on this ${PORT} post`);
  });
});

