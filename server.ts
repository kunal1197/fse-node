/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import DislikeController from "./controllers/DislikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowerController from "./controllers/FollowerController";
import MessageController from "./controllers/MessageController";
import AuthenticationController from "./controllers/auth-controller";
import SessionController from "./controllers/SessionController";
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
app.use(cors({ credentials: true, origin: true }));

let sess = {
  // secret: process.env.EXPRESS_SESSION_SECRET,
  secret: "Ssdsd@#e$#Rfe@#$d#$#",
  saveUninitialized: true,
  resave: true,
  cookie: {
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
}

app.use(session(sess));
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Welcome!"));

app.get("/add/:a/:b", (req: Request, res: Response) =>
  res.send(req.params.a + req.params.b)
);

// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);

SessionController(app);
AuthenticationController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
// app.listen(PORT);
