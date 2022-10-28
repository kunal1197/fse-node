/**
 * @file Implements mongoose schema for likes
 */

import mongoose, { Schema } from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @typedef Like Represents a like on a tuit by a user
 * @property {ObjectId} tuit Tuit ID to be liked
 * @property {ObjectId} likedBy The user who liked the tuit
 */

const LikeSchema = new mongoose.Schema(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "likes" }
);
export default LikeSchema;
