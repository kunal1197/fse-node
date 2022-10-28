/**
 * @file Implements mongoose model to CRUD
 * documents in the followers collection
 */
import mongoose from "mongoose";
import FollowerSchema from "./FollowerSchema";
const FollowerModel = mongoose.model("FollowerModel", FollowerSchema);
export default FollowerModel;
