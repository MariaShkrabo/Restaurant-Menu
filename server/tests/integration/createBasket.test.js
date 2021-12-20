const basketDishController = require("../../controllers/basketDishController");
const { BasketDish } = require('../../models/models');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('BasketDishController', () => {
  describe('Checks to create basket of dishes', () => {
    const basketOfDishes = 
    {
        basketId: 1,
        dishId: 2,
    };

    beforeAll(() => {
        BasketDish.create.mockResolvedValue(basketOfDishes);
    });
    it('Expect to respond with basket of dishes data', async () => {
        const req = {
            body: basketOfDishes 
        };
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await basketDishController.create(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(basketOfDishes);
    });

    it('Expect to respond with error message with code 404, when an unexpected error happened (req is empty)', async () => {
        const req = {};
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await basketDishController.create(req, res, next);
    
        expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
  