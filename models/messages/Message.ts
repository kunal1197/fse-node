/**
 * @file Declares Message data type representing a message sent between two users
 */
import User from "../users/User";

/**
 * @typedef Follower Represents follower-followee relationship between two users
 * @property {User} sender User who is sending the message
 * @property {User} receiver User who is receiving the message
 * @property {String} messageBody The message content
 * @property {Date} sentOn Time the message was sent
 *
 */

export default interface Message {
  sender: User;
  receiver: User;
  messageBody?: String;
  sentOn?: Date;
}
