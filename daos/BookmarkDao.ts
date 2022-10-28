/**
 * @file Implements DAO managing data storage of bookmark.
 * Combines MongoDB with the help of the mongoose BookmarkModel.
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao manages the Data Access Object storage of bookmarks.
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
  private static bookmarkDao: BookmarkDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns BookmarkDAO
   */
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao === null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  };
  private constructor() {}

  /**
   * Uses BookmarkModel to create a bookmark for a user
   * @param {string} tid Tuit ID
   * @param {string} uid User ID
   * @returns Promise To be notified when a bookmark is created
   */
  userCreatesBookmark = async (tid: string, uid: string): Promise<any> =>
    BookmarkModel.create({ tuit: tid, bookmarkedBy: uid });

  /**
   * Uses BookmarkModel to delete a bookmark for a user
   * @param {string} tid Tuit ID
   * @param {string} uid User ID
   * @returns Promise To be notified when a bookmark is deleted
   */
  userDeletesBookmark = async (tid: string, uid: string): Promise<any> =>
    BookmarkModel.deleteOne({ tuit: tid, bookmarkedBy: uid });

  /**
   * Uses BookmarkModel to find all bookmarks of a user
   * @param {string} uid User ID
   * @returns Promise To be notified when all the bookmark records of the user are retrieved
   */
  findAllBookmarksByUser = async (uid: string): Promise<Bookmark[]> =>
    BookmarkModel.find({ bookmarkedBy: uid });

  /**
   * Uses BookmarkModel to find all bookmarks
   * @returns Promise To be notified when all the bookmark records are retrieved
   */
  findAllBookmarks = async (): Promise<any> => BookmarkModel.find();

  /**
   * Uses BookmarkModel to find latest bookmarks of a user
   * @param {string} uid User ID
   * @returns Promise To be notified when the latest bookmark records are retrieved
   */
  findLatestBookmarksByUser = async (uid: String): Promise<Bookmark[]> =>
    BookmarkModel.find({ bookmarkedBy: uid }).sort({ bookmarkedAt: -1 });
}
