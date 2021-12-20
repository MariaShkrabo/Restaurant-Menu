const basketDishController = require("../../controllers/basketDishController");
const { Basket } = require('../../models/models');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('BasketDishController', () => {
  describe('Checks to get all baskets', () => {
    const baskets = [
        {
          basketId: 1,
          dishId: 2,
        },
        {
          basketId: 2,
          dishId: 3,
        }
      ];
    beforeAll(() => {
      Basket.findAll.mockResolvedValue(baskets);
    });
    it('Expect to respond with all baskets data', async () => {
      const req = {};
      const res = { 
        json: jest.fn(() => res) 
      }
      const next = jest.fn();
      await basketDishController.getAllBaskets(req, res, next);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(baskets);
    });
  });
});
  