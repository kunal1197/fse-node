/**
 * @file Controller RESTful Web service API for follower resource
 */
import { Express, Request, Response } from "express";
import FollowerDao from "../daos/FollowerDao";
import FollowerControllerI from "../interfaces/FollowerControllerI";

/**
 * @class FollowerController Implements RESTful Web service API for follower resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:follower/following/:followee to record a user following another user
 *     </li>
 *     <li>DELETE /api/users/:follower/following/:followee to delete a user following another use
 *     </li>
 *     <li>GET /api/users/:uid/following/ to get all users the user is following
 *     </li>
 *     <li>GET /api/users/:uid/followers/ to get all the user's followers</li>
 *     <li>GET /api/followers/topFollowed/ get the top 5 most followed users</li>
 *     <li>GET /api/followers/ get all the followers</li>
 * </ul>
 * @property {FollowerDao} followerDao Singleton DAO implementing follower CRUD operations
 * @property {FollowerController} followerController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowerController implements FollowerControllerI {
  private static followerDao: FollowerDao = FollowerDao.getInstance();
  private static followerController: FollowerController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowerController
   */
  public static getInstance = (app: Express): FollowerController => {
    if (FollowerController.followerController === null) {
      FollowerController.followerController = new FollowerController();

      app.post(
        "/api/users/:follower/following/:followee",
        FollowerController.followerController.followUser
      );
      app.delete(
        "/api/users/:follower/following/:followee",
        FollowerController.followerController.unfollowUser
      );
      app.get(
        "/api/users/:uid/following",
        FollowerController.followerController.findFolloweesOfUser
      );
      app.get(
        "/api/users/:uid/followers",
        FollowerController.followerController.findFollowersOfUser
      );
      app.get(
        "/api/followers/topFollowed",
        FollowerController.followerController.findTopFollowedUsers
      );
      app.get(
        "/api/followers/",
        FollowerController.followerController.findAllFollowers
      );
    }
    return FollowerController.followerController;
  };

  private constructor() {}

  /**
   * Creates a record for a user following another user
   * @param {Request} req Represents request from client, including the path
   * parameter follower and followee
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the follower object
   */
  followUser = (req: Request, res: Response) =>
    FollowerController.followerDao
      .followUser(req.params.follower, req.params.followee)
      .then((follower) => res.json(follower));

  /**
   * Delets the record for a user following another user
   * @param {Request} req Represents request from client, including the path
   * parameter follower and followee
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the follower object
   */
  unfollowUser = (req: Request, res: Response) =>
    FollowerController.followerDao
      .unfollowUser(req.params.follower, req.params.followee)
      .then((unfollower) => res.json(unfollower));

  /**
   * Gets a list of all the people the user is following
   * @param {Request} req Represents request from client, including the path
   * parameter user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing a list of followees objects
   */
  findFolloweesOfUser = (req: Request, res: Response) =>
    FollowerController.followerDao
      .findFolloweesOfUser(req.params.uid)
      .then((followees) => res.json(followees));

  /**
   * Gets a list of all the people following the user
   * @param {Request} req Represents request from client, including the path
   * parameter user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing a list of follower objects
   */
  findFollowersOfUser = (req: Request, res: Response) =>
    FollowerController.followerDao
      .findFollowersOfUser(req.params.uid)
      .then((followers) => res.json(followers));

  /**
   * Gets a list of the top followed users
   * @param {Request} req Represents request from client, including the path
   * parameter user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing a list of top followed users
   */
  findTopFollowedUsers = (req: Request, res: Response) =>
    FollowerController.followerDao
      .findTopFollowedUsers()
      .then((topFollowers) => res.json(topFollowers));

  /**
   * Gets a list of all the followers
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing a list of follower objects
   */
  findAllFollowers = (req: Request, res: Response) =>
    FollowerController.followerDao
      .findAllFollowers()
      .then((followers) => res.json(followers));
}
