import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
  app: Express;
  tuitDao: TuitDao;
  constructor(app: Express, tuitDao: TuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get("/tuits", this.findAllTuits);
    this.app.get("/users/:uid/tuits", this.findTuitsByUser);
    this.app.get("/tuits/:uid", this.findTuitById);
    this.app.post("/tuits", this.createTuit);
    this.app.delete("/tuits/:uid", this.deleteTuit);
    this.app.put("/tuits/:uid", this.updateTuit);
  }

  findAllTuits = (req: Request, res: Response) =>
    this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));
  findTuitsByUser = (req: Request, res: Response) =>
    this.tuitDao
      .findTuitsByUser(req.params.uid)
      .then((tuits) => res.json(tuits));
  findTuitById = (req: Request, res: Response) =>
    this.tuitDao.findTuitById(req.params.uid).then((tuit) => res.json(tuit));
  createTuit = (req: Request, res: Response) =>
    this.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
  updateTuit = (req: Request, res: Response) =>
    this.tuitDao
      .updateTuit(req.params.uid, req.body)
      .then((status) => res.send(status));
  deleteTuit = (req: Request, res: Response) =>
    this.tuitDao.deleteTuit(req.params.uid).then((status) => res.send(status));
}
