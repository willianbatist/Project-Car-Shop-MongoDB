import { Router } from 'express';
import CarsModel from '../models/CarsModel';
import CarsService from '../services/CarsService';
import CarsController from '../controllers/CarsController';

const carsRepository = new CarsModel();
const carsService = new CarsService(carsRepository);
const carsController = new CarsController(carsService);
const route = Router();

route.post('/cars', (req, res) => carsController.create(req, res));
