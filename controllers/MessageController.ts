/**
 * @file Controller RESTful Web service API for messages resource
 */
import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * Defines the messaging HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:sender/messages/:receiver to record a user sending a message to another user
 *     </li>
 *     <li>DELETE /api/users/:sender/messages/:mide to delete a message sent by the user
 *     </li>
 *     <li>GET /api/users/:uid/messages/sent to get all the messages sent by the user
 *     </li>
 *     <li>GET /api/users/:uid/messages/received to get all the messages received by the user</li>
 *     <li>GET /api/users/:uid/messages/recent get all the recent messages of the user</li>
 *     <li>GET /api/messages/ get all the messages</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
  private static messageDao: MessageDao = MessageDao.getInstance();
  private static messageController: MessageController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();

      app.post(
        "/api/users/:sender/messages/:receiver",
        MessageController.messageController.createMessage
      );
      app.delete(
        "/api/users/:sender/messages/:mid",
        MessageController.messageController.deleteMessage
      );
      app.get(
        "/api/users/:uid/messages/sent",
        MessageController.messageController.findMessagesSentByUser
      );
      app.get(
        "/api/users/:uid/messages/received",
        MessageController.messageController.findMessagesReceivedByUser
      );
      app.get(
        "/api/users/:uid/messages/recent",
        MessageController.messageController.findRecentMessagesOfUser
      );
      app.get(
        "/api/messages",
        MessageController.messageController.findAllMessages
      );
    }
    return MessageController.messageController;
  };

  private constructor() {}

  /**
   * Creates a record of a user sending a message to another user
   * @param {Request} req Represents request from client, including the path
   * parameter sender and receiver, along with the message body
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the message object
   */
  createMessage = (req: Request, res: Response) => {
    console.log(req.params.sender, req.params.receiver);
    MessageController.messageDao
      .createMessage(req.params.sender, req.params.receiver, req.body)
      .then((message) => res.json(message));
  };

  /**
   * Delete a record of a user sending a message to another user
   * @param {Request} req Represents request from client, including the path
   * parameter sender and the message ID to be deleted
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the message object deleted
   */
  deleteMessage = (req: Request, res: Response) =>
    MessageController.messageDao
      .deleteMessage(req.params.sender, req.params.mid)
      .then((message) => res.json(message));

  /**
   * Gets all the messages sent by the user
   * @param {Request} req Represents request from client, including the path
   * parameter user ID
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON array containing the message objects
   */
  findMessagesSentByUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .findMessagesSentByUser(req.params.uid)
      .then((messages) => res.json(messages));

  /**
   * Gets all the messages received by the user
   * @param {Request} req Represents request from client, including the path
   * parameter user ID
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON array containing the message objects
   */
  findMessagesReceivedByUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .findMessagesReceivedByUser(req.params.uid)
      .then((messages) => res.json(messages));

  /**
   * Gets all the recent messages received by the user
   * @param {Request} req Represents request from client, including the path
   * parameter user ID
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON array containing the message objects
   */
  findRecentMessagesOfUser = (req: Request, res: Response) =>
    MessageController.messageDao
      .findRecentMessagesOfUser(req.params.uid)
      .then((messages) => res.json(messages));

  /**
   * Gets all the messages
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON array containing the message objects
   */
  findAllMessages = (req: Request, res: Response) =>
    MessageController.messageDao
      .findAllMessages()
      .then((messages) => res.json(messages));
}
