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
 app.use(cors({
  origin: ["http://localhost:5173", "https://e-commerce-client-weld.vercel.app"],
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


