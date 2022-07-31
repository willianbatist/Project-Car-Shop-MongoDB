import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/CarsModel';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carsMock';
const { expect } = chai;

describe('TESTING MODEL CAR', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carsModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});

    it('_id not found', async () => {
			try {
				await carsModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});