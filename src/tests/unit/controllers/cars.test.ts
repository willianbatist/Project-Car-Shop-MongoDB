import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { carMock, carMockWithId } from '../../mocks/carsMock';
import CarsController from '../../../controllers/CarsController';
import CarsService from '../../../services/CarsService';
import CarsModel from '../../../models/CarsModel';

describe('TESTING CAR CONTROLLER', () => {

  const carsModel = new CarsModel()
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);
  const req = {} as Request; 
  const res = {} as Response;
  const next = {} as NextFunction;

  before(() => {
    sinon.stub(carsService, 'create').resolves(carMock);
    sinon.stub(carsService, 'readOne').resolves(carMock);
    sinon.stub(carsService, 'read').resolves([carMock]);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car Controller', () => {
    it('Success', async () => {
      req.body = carMock;
      await carsController.create(req, res, next);
      // o cast de `res.status` é feito pois `res` foi criado como do tipo `Resquest` 
      // e agora, que queremos validar com o que foi chamado, precisar ser tratado como um `sinon.SinonStub`
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('ReadOne Car Controller', () => {
    it('Success', async () => {
      // como fizemos o dublê da service o valor do `req.params.id` não vai chegar na model
      // logo ele só precisa ser um string e existir
      req.params = { id: carMockWithId._id };
      await carsController.readOne(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('list Car Controller', () => {
    it('Success', async () => {
      // como fizemos o dublê da service o valor do `req.params.id` não vai chegar na model
      // logo ele só precisa ser um string e existir
      await carsController.read(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });
});