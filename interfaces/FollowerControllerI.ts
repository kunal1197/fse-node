import { Request, Response } from "express";

export default interface FollowerControllerI {
  followUser(req: Request, res: Response): void;
  unfollowUser(req: Request, res: Response): void;
  findFolloweesOfUser(req: Request, res: Response): void;
  findFollowersOfUser(req: Request, res: Response): void;
  findTopFollowedUsers(req: Request, res: Response): void;
  findAllFollowers(req: Request, res: Response): void;
}
