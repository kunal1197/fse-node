/**
 * @file Declares Follower data type representing relationship between
 * two users, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follower Represents follower-followee relationship between two users
 * @property {User} follower User who is being followed
 * @property {User} followee User who is following
 */

export default interface Follower {
  follower: User;
  followee: User;
}
