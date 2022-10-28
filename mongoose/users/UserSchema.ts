/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef User Represents a user
 * @property {string} username PK of the user
 * @property {string} password the user's password
 * @property {string} firstName first name of user
 * @property {string} lastName last name of user
 * @property {string} email email of user
 * @property {string} profilePhoto profile photo of user
 * @property {string} headerImage img name of user
 * @property {string} biography  biography of user
 * @property {string} accountType account type of user
 * @property {string} maritalStatus  marital status of user
 * @property {Object} location latitude and longitude of user
 * @property {Number} salary salary of user
 */
const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      default: `testusername${Date.now()}`,
    },
    password: {
      type: String,
      required: true,
      default: `testpassword${Date.now()}`,
    },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, default: `testemail${Date.now()}` },
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {
      type: String,
      enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
    },
    maritalStatus: { type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"] },
    location: {
      latitude: Number,
      longitude: Number,
    },
    salary: { type: Number, default: 50000 },
  },
  { collection: "users" }
);

export default UserSchema;
