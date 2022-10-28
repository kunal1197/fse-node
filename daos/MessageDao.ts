/**
 * @file Implements DAO managing data storage of messages.
 * Integrates MongoDB using the mongoose MessageModel.
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;
  /**
   * Creates singleton DAO instance
   * @returns MessageDAO
   */
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  };
  private constructor() {}

  /**
   * Uses MessageModel to create a new Message
   * @param {string} sender User ID of sender
   * @param {string} receiver User ID of receiver
   * @param {Message} message The message body
   * @returns Promise To be notified when the message has been created
   */
  createMessage = async (
    sender: string,
    receiver: string,
    message: Message
  ): Promise<Message> =>
    MessageModel.create({ sender, receiver, messageBody: message.messageBody });

  /**
   * Uses MessageModel to delete a sent message
   * @param {string} sender User ID of sender
   * @param {string} mid message to be deleted
   * @returns Promise To be notified when the message has been deleted
   */
  deleteMessage = async (sender: string, mid: string): Promise<any> =>
    MessageModel.deleteOne({ sender, _id: mid });

  /**
   * Uses MessageModel to get all the messages sent by the user
   * @param {string} uid User ID
   * @returns Promise To be notified when the message array has been retrieved
   */
  findMessagesSentByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ sender: uid });

  /**
   * Uses MessageModel to get all the messages received by the user
   * @param {string} uid User ID
   * @returns Promise To be notified when the message array has been retrieved
   */
  findMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ receiver: uid });

  /**
   * Uses MessageModel to get the five most recent messages received by the user
   * @param {string} uid User ID
   * @returns Promise To be notified when the message array has been retrieved
   */
  findRecentMessagesOfUser = async (uid: string): Promise<Message[]> =>
    MessageModel.find({ receiver: uid }).sort({ sentOn: -1 }).limit(5);

  /**
   * Uses MessageModel to get the messages
   * @returns Promise To be notified when the message array has been retrieved
   */
  findAllMessages = async (): Promise<Message[]> => MessageModel.find();
}
