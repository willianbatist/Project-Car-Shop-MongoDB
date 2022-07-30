import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';
import CarsController from '../controllers/CarsController';

export const CarsFactory = () => {
  const repository = new CarsModel();
  const service = new CarsService(repository);
  const controller = new CarsController(service);
  return controller;
};

export const test = {};
