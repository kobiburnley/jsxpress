import {NextFunction, Response} from "express"

export interface MyHandler {
  (req: any, res: Response, next: NextFunction): any;
}
