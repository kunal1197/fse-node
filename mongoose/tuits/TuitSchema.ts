/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, { Schema } from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents a tuit by a user
 * @property {string} tuit the content of the tuit
 * @property {ObjectId} postedBy The user who created the tuit
 * @property {Date} postedOn The time of creating the tuit
 */

const TuitSchema = new mongoose.Schema<Tuit>(
  {
    tuit: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    postedOn: { type: Date, default: Date.now },
  },
  { collection: "tuits" }
);
export default TuitSchema;
