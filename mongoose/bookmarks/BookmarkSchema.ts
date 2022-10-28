/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents bookmarks of tuits by users
 * @property {ObjectId} tuit The tuid ID to be bookmarked
 * @property {ObjectId} bookmarkedBy The User ID who bookmarked the tuit
 * @property {Date} bookmarkedAt Time of bookmark
 */

const BookmarkSchema = new mongoose.Schema<Bookmark>(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    bookmarkedAt: { type: Date, default: Date.now },
  },
  { collection: "bookmarks" }
);
export default BookmarkSchema;
