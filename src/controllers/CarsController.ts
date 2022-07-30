import { Request, Response, NextFunction } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class FrameController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request & { body: ICar }, 
    res: Response<ICar>,
    next: NextFunction,
  ) {
    try {
      const results = await this._service.create(req.body);
      return res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  }
}