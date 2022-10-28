/**
 * @file Declares the user data type
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

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
export default interface User {
  _id?: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profilePhoto?: string;
  headerImage?: string;
  biography?: string;
  dateOfBirth?: Date;
  accountType?: AccountType;
  maritalStatus?: MaritalStatus;
  location?: Location;
  salary?: number;
}
