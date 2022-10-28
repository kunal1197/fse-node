import { Request, Response } from "express";

export default interface BookmarkControllerI {
  userCreatesBookmark(req: Request, res: Response): void;
  userDeletesBookmark(req: Request, res: Response): void;
  findAllBookmarksByUser(req: Request, res: Response): void;
  findAllBookmarks(req: Request, res: Response): void;
  findLatestBookmarksByUser(req: Request, res: Response): void;
}
