import { Request, Response } from "express";

export default interface MessageControllerI {
  createMessage(req: Request, res: Response): void;
  deleteMessage(req: Request, res: Response): void;
  findMessagesSentByUser(req: Request, res: Response): void;
  findMessagesReceivedByUser(req: Request, res: Response): void;
  findRecentMessagesOfUser(req: Request, res: Response): void;
  findAllMessages(req: Request, res: Response): void;
}
