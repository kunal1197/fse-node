/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowerController from "./controllers/FollowerController";
import MessageController from "./controllers/MessageController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
const cors = require("cors");
const session = require("express-session");
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

const app = express();
app.use(cors({ origin: "*", credentials: false }));

let sess = {
  secret: process.env.SECRET,
  cookie: {
    secure: false,
  },
};

if (process.env.ENV === "PRODUCTION") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(express.json());

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!!!!")
);

app.get("/hello", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!")
);

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const followerController = FollowerController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */

const PORT = 4000;
app.listen(process.env.PORT || PORT);
