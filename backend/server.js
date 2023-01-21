const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const path = require('path')
const cors = require("cors");


const app = express();
app.use(cors());


// Init Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname + 'public')));

app.use(
  cors({
    origin: "http://192.168.43.78:4200",
  })
)

const port = process.env.PORT || 4200;

// Define Routes
app.use("/api/auth-user", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/payment", require("./routes/checkoutPayment"));

//  Connecting to mongodb atlas cloud
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    })
  })
  .catch(err => {
    console.error("The Error", err.message)
  })