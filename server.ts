/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Implements a MongoDB Compass local database connection.
 */
// mongoose.connect("mongodb://localhost:27017/tuitdb").then(() => {
//   console.log("Connected to MongoDB");
// });

/**
 * Implements a MongoDB Cloud Atlas database connection.
 */
mongoose
  .connect(
    "mongodb+srv://kunal:fse123456@cluster0.wuwbxi4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!!!!")
);

app.get("/hello", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!")
);

new UserController(app, new UserDao());
new TuitController(app, new TuitDao());

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
