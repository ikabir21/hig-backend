import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
const app = express();

//Routes
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import adminAuthRoute from "./routes/admin/auth.js";

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

//Route Middleware
app.get('/', (req, res) => {
  res.send("Welcome to HIG")
});

app.use("/", authRoute);
app.use("/", postRoute);
app.use("/", adminAuthRoute);

//DB connection
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
  .catch((err) => console.log(`error: ${err.message}`));

