/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record a bookmark by a user
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to delete a bookmark by a user
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to get all bookmarks of a user
 *     </li>
 *     <li>GET /api/bookmarks to get all bookmarks</li>
 *     <li>GET /api/users/:uid/bookmarks/latest to get the latest bookmarks of a user</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return BookmarkController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();

      app.post(
        "/api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userCreatesBookmark
      );
      app.delete(
        "/api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.userDeletesBookmark
      );
      app.get(
        "/api/users/:uid/bookmarks",
        BookmarkController.bookmarkController.findAllBookmarksByUser
      );
      app.get(
        "/api/bookmarks",
        BookmarkController.bookmarkController.findAllBookmarks
      );
      app.get(
        "/api/users/:uid/bookmarks/latest",
        BookmarkController.bookmarkController.findLatestBookmarksByUser
      );
    }
    return BookmarkController.bookmarkController;
  };

  private constructor() {}
  /**
   * Creates a bookmark for a user
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the bookmarked tuit, and the user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the bookmarked object
   */
  userCreatesBookmark = (req: Request, res: Response) => {
    BookmarkController.bookmarkDao
      .userCreatesBookmark(req.params.tid, req.params.uid)
      .then((bookmarks) => res.json(bookmarks))
      .catch((e) => console.log("Bookmark could not be created because: ", e));
  };
  /**
   * Deletes the bookmark for a user
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the bookmarked tuit, and the user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the deleted bookmark object
   */
  userDeletesBookmark = (req: Request, res: Response) => {
    BookmarkController.bookmarkDao
      .userDeletesBookmark(req.params.tid, req.params.uid)
      .then((bookmarks) => res.json(bookmarks));
  };
  /**
   * Retrieves all bookmarks of a user
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing an array of bookmarked objects of the user
   */
  findAllBookmarksByUser = (req: Request, res: Response) => {
    return BookmarkController.bookmarkDao
      .findAllBookmarksByUser(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));
  };
  /**
   * Retrieves all bookmarks
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing an array of bookmarked objects
   */
  findAllBookmarks = (req: Request, res: Response) => {
    return BookmarkController.bookmarkDao
      .findAllBookmarks()
      .then((bookmarks) => res.json(bookmarks));
  };
  /**
   * Retrieves all bookmarks of a user sorted by time
   * @param {Request} req Represents request from client, including the path
   * parameter tid representing the bookmarked tuit, and the user id
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing an array of bookmarked objects of the user
   */
  findLatestBookmarksByUser = (req: Request, res: Response) => {
    return BookmarkController.bookmarkDao
      .findLatestBookmarksByUser(req.params.uid)
      .then((bookmarks) => res.json(bookmarks));
  };
}
