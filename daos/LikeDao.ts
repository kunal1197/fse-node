/**
 * @file Implements DAO managing data storage of liked. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
  private static likeDao: LikeDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns likeDao
   */
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  };
  private constructor() {}

  /**
   * Uses LikeModel to retrieve all the users from like collection that liked the tuit
   * @param {string} tid Tuit ID
   * @returns Promise To be notified when the documents are retrieved from
   * database
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid }).populate("likedBy").exec();

  /**
   * Uses LikeModel to retrieve all the likes of a user
   * @param {string} uid User ID
   * @returns Promise To be notified when the documents are retrieved from
   * database
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid }).populate("tuit").exec();

  /**
   * Uses LikeModel to create a record of a user liking a tuit
   * @param {string} uid User ID
   * @param {string} tid Tuit ID
   * @returns Promise To be notified when the documents is created
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Uses LikeModel to delete a record of a user liking a tuit
   * @param {string} uid User ID
   * @param {string} tid Tuit ID
   * @returns Promise To be notified when the documents is deleted
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
