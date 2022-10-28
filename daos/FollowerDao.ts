/**
 * @file Implements DAO managing data storage of follower.
 * Integrates MongoDB using the mongoose FollowerModel.
 */
import FollowerDaoI from "../interfaces/FollowerDaoI";
import FollowerModel from "../mongoose/followers/FollowerModel";
import Follower from "../models/followers/Follower";

/**
 * @class FollowerDao Implements Data Access Object managing data storage
 * of Followers
 * @property {FollowerDao} followerDao Private single instance of FollowerDao
 */
export default class FollowerDao implements FollowerDaoI {
  private static followerDao: FollowerDao | null = null;
  /**
   * Creates singleton DAO instance
   * @returns FollowerDao
   */
  public static getInstance = (): FollowerDao => {
    if (FollowerDao.followerDao === null) {
      FollowerDao.followerDao = new FollowerDao();
    }
    return FollowerDao.followerDao;
  };
  private constructor() {}

  /**
   * Uses FollowerModel to create a user following another user record
   * @param {string} follower Follower's primary key
   * @param {string} followee Followee's primary key
   * @returns Promise To be notified when the follow record is created
   */
  followUser = async (follower: string, followee: string): Promise<Follower> =>
    FollowerModel.create({ followee: followee, follower: follower });

  /**
   * Uses FollowerModel to delete a user following another user record
   * @param {string} follower Follower's primary key
   * @param {string} followee Followee's primary key
   * @returns Promise To be notified when the follow record is deleted
   */
  unfollowUser = async (follower: string, followee: string): Promise<any> =>
    FollowerModel.deleteOne({ followee: followee, follower: follower });

  /**
   * Uses FollowerModel to get a list of all the people who the user follow
   * @param {string} uid User's primary key
   * @returns Promise To be notified when the records are retrieved
   */
  findFolloweesOfUser = async (uid: string): Promise<Follower[]> =>
    FollowerModel.find({ follower: uid });

  /**
   * Uses FollowerModel to get a list of all the user's followers
   * @param {string} uid User's primary key
   * @returns Promise To be notified when the records are retrieved
   */
  findFollowersOfUser = async (uid: string): Promise<Follower[]> =>
    FollowerModel.find({ followee: uid });

  /**
   * Uses FollowerModel to get a list of top 5 most followed users along with their
   * follower count
   * @returns Promise To be notified when the records are retrieved
   */
  findTopFollowedUsers = async (): Promise<Follower[]> => {
    return FollowerModel.aggregate([
      { $group: { _id: "$followee", count: { $sum: 1 } } },
    ])
      .sort({ count: -1 })
      .limit(5);
  };

  /**
   * Uses FollowerModel to get a list of all followers
   * @returns Promise To be notified when the records are retrieved
   */
  findAllFollowers = async (): Promise<Follower[]> => FollowerModel.find();
}
