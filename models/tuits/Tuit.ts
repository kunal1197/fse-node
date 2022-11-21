/**
 * @file Declares the tuit data type
 */
import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Represents the tuit created by a User
 * @property {string} tuit the tuit content
 * @property {User} postedBy User creating the tuit
 * @property {Date} postedOn Time of creating the tuit
 */
export default interface Tuit {
  tuit: string;
  postedBy: User;
  postedOn?: Date;
  image?: String;
  youtube?: String;
  avatarLogo?: String;
  imageOverlay?: String;
  stats: Stats;
}
