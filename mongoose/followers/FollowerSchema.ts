/**
 * @file Implements mongoose schema for followers
 */
import mongoose, { Schema } from "mongoose";
import Follower from "../../models/followers/Follower";

/**
 * @typedef Follower Represents the record of a user folllowing another user
 * @property {ObjectId} follower The user who is following
 * @property {ObjectId} followee The user who is being followed
 */

const FollowerSchema = new mongoose.Schema<Follower>(
  {
    follower: { type: Schema.Types.ObjectId, ref: "UserModel" },
    followee: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "followers" }
);
export default FollowerSchema;
