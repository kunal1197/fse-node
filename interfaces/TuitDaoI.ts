import Tuit from "../models/Tuit";

/**
 * @file Declares all the Tuit related DAO methods.
 */
export default interface TuitDaoI {
  findAllTuits(): Promise<Tuit[]>;
  findTuitsByUser(uid: string): Promise<Tuit[]>;
  findTuitById(tid: string): Promise<Tuit>;
  createTuit(user: Tuit): Promise<Tuit>;
  updateTuit(tid: string, tuit: Tuit): Promise<any>;
  deleteTuit(tid: string): Promise<any>;
}
