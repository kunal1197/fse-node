import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
  userCreatesBookmark(tid: string, uid: string): Promise<Bookmark>;
  userDeletesBookmark(tid: string, uid: string): Promise<Bookmark>;
  findAllBookmarksByUser(uid: string): Promise<Bookmark[]>;
  findAllBookmarks(): Promise<Bookmark[]>;
  findLatestBookmarksByUser(uid: String): Promise<Bookmark[]>;
}
