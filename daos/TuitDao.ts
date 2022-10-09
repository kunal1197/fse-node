import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";

export default class TuitDao implements TuitDaoI {
  async findAllTuits(): Promise<Tuit[]> {
    const tuits = await TuitModel.find();
    return tuits;
  }
  async findTuitsByUser(uid: string): Promise<Tuit[]> {
    return TuitModel.find({ postedBy: uid });
  }
  async findTuitById(tid: string): Promise<any> {
    return TuitModel.findById(tid);
  }
  async createTuit(tuit: Tuit): Promise<Tuit> {
    return TuitModel.create(tuit);
  }
  async updateTuit(tid: string, tuit: Tuit): Promise<any> {
    return TuitModel.updateOne({ _id: tid }, { $set: tuit });
  }
  async deleteTuit(tid: string): Promise<any> {
    return TuitModel.deleteOne({ _id: tid });
  }
}
