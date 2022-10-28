/**
 * @file Implements mongoose schema for messages
 */

import mongoose, { Schema } from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents a message sent from one user to another
 * @property {ObjectId} sender User Id of sender
 * @property {ObjectId} receiver User Id of receiver
 * @property {string} messageBody The content of the message
 * @property {Date} sentOn the time the message was sent
 *
 */

const MessageSchema = new mongoose.Schema<Message>(
  {
    sender: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
    receiver: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
    messageBody: {
      type: String,
      required: true,
      default: `Test Message sent at ${Date.now}`,
    },
    sentOn: { type: Date, required: true, default: Date.now() },
  },
  { collection: "messages" }
);
export default MessageSchema;
