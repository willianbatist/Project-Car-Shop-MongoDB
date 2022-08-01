import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/CarsModel';
import CarsService from '../../../services/CarsService';
import { carMock, carMockWithId } from '../../mocks/carsMock';

describe('TESTING SERVICE CAR', () => {

  const carsModel = new CarsModel();
	const carsService = new CarsService(carsModel);
  

  before(() => {
		sinon.stub(carsModel, 'create').resolves(carMockWithId);
		sinon.stub(carsModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null);
		sinon.stub(carsModel, 'read').resolves([carMockWithId]);
	})
	after(() => {
		sinon.restore()
	})

  describe('Create Car Service', () => {
		it('Success', async () => {
			const carCreated = await carsService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				// o "as any"(casting) abaixo pois o create não aceita um parâmetro inválido
				await carsService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carCreated = await carsService.readOne(carMockWithId._id);
			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carsService.readOne(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

	describe('List Cars', () => {
		it('successfully list cars', async () => {
      const cars = await carsService.read();
			expect(cars).to.be.deep.equal([carMockWithId]);
    });
	});
});