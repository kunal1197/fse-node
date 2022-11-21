/**
 * @file Implements DAO managing data storage of tuits.
 * Integrates MongoDB using the mongoose TuitModel.
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}

  /**
   * Uses TuitModel to retrieve all tuit documents from tuits collection
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuits = async (): Promise<Tuit[]> =>
    TuitModel.find().populate("postedBy").exec();
  /**
   * Uses TuitModel to retrieve all tuit documents created by a user
   * @param {string} uid User's primary key
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid })
      .sort({ postedOn: -1 })
      .populate("postedBy")
      .exec();

  /**
   * Uses TuitModel to retrieve a specific tuit document from the database
   * @param {string} uid Tuit's primary key
   * @returns Promise To be notified when the tuit is retrieved from
   * database
   */
  findTuitById = async (uid: string): Promise<any> =>
    TuitModel.findById(uid).populate("postedBy").exec();

  /**
   * Uses TuitModel to create a new tuit by a user
   * @param {string} uid Users's primary key
   * @param {Tuit} tuit the body of the tuit
   * @returns Promise To be notified when the new tuit has been created
   */
  createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
    TuitModel.create({ ...tuit, postedBy: uid });

  /**
   * Uses TuitModel to update a tuit
   * @param {string} uid Tuit's primary key
   * @param {Tuit} tuit the body of the updated tuit
   * @returns Promise To be notified when the tuit has been updated
   */
  updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: tuit });

  /**
   * Uses TuitModel to delete a tuit
   * @param {string} uid Tuit's primary key
   * @returns Promise To be notified when the tuit has been deleted
   */
  deleteTuit = async (uid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: uid });

  /**
   * Uses TuitModel to retrieve all tuit documents from tuits collection
   * @param {string} tid Tuit's primary key
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  updateLikes = async (tid: string, newStats: any): Promise<any> =>
    TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } });
}
