const express = require("express");
const connectDb = require("./database/index");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandling");
const router = require("./routes/index");
const cors = require("cors");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));

app.use(router);

app.use(errorHandler);

connectDb()
  .then(() => {
    app.listen(
      process.env.PORT || 4000,
      console.log(`server is working at Port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
