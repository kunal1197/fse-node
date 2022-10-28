import Message from "../models/messages/Message";

/**
 * @file Declares API for Message related data access object methods
 */
export default interface BookmarkDaoI {
  createMessage(
    sender: string,
    receiver: string,
    messageBody: Message
  ): Promise<Message>;
  deleteMessage(sender: string, mid: string): Promise<Message>;
  findMessagesSentByUser(uid: string): Promise<Message[]>;
  findMessagesReceivedByUser(uid: string): Promise<Message[]>;
  findRecentMessagesOfUser(uid: string): Promise<Message[]>;
  findAllMessages(): Promise<Message[]>;
}
