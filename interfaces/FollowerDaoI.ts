import Follower from "../models/followers/Follower";

/**
 * @file Declares API for Follower related data access object methods
 */
export default interface FollowerDaoI {
  followUser(follower: string, followee: string): Promise<Follower>;
  unfollowUser(follower: string, followee: string): Promise<Follower>;
  findFolloweesOfUser(uid: string): Promise<Follower[]>;
  findFollowersOfUser(uid: string): Promise<Follower[]>;
  findTopFollowedUsers(): Promise<Follower[]>;
  findAllFollowers(): Promise<Follower[]>;
}
