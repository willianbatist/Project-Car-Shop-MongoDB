import IService from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
// import { ErrorTypes } from '../errors/catalog';

class CarsService implements IService<ICar> {
  private _cars:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._cars.create(obj);
  }

  public async read(): Promise<ICar[]> {
    return this._cars.read();
  }

  public async readOne(id: string): Promise<ICar> {
    const car = await this._cars.readOne(id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default CarsService;
