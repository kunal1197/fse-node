/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";

/**
 * @typedef Bookmark Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} tuit Tuit being bookmarks
 * @property {User} bookmarkedBy User bookmarking the tuit
 */

export default interface Bookmark {
  tuit: Tuit;
  bookmarkedBy: User;
  bookmarkedAt: Date;
}
