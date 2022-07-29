import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carsMongooseSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class Cars extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carsMongooseSchema)) {
    super(model);
  }
}

export default Cars;
