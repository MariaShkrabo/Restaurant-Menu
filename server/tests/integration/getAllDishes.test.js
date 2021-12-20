const dishController = require("../../controllers/dishController");
const { Dish } = require('../../models/models');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('DishController', () => {
  describe('Checks to get all dishes', () => {
    const dishes = [
        {
          name: 'Сырники',
          picture: 'sdgsdgdg.jpg',
          description: 'Вкусно',
          quantity: "30",
          price: "4",
        },
        {
          name: 'Каша',
          picture: 'sdgsdgdg.jpg',
          description: 'Вкусно',
          quantity: "1000",
          price: "6",
        }
      ];
      beforeAll(() => {
        Dish.findAndCountAll.mockResolvedValue(dishes);
      });

      it('Expect to respond with 200 code and dishes data of specific category', async () => {
          const req = {
              query: {categoryId: 1, limit: 4, page: 1}
          };
          const res = {  
              json: jest.fn(() => res) 
          }
          const next = jest.fn();
          await dishController.getAll(req, res, next);

          expect(res.json).toHaveBeenCalledTimes(1);
          expect(res.json).toHaveBeenCalledWith(dishes);
       });

       it('Expect to respond with 200 code and all dishes data', async () => {
        const req = {
            query: {limit: 4, page: 1}
        };
        const res = {  
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await dishController.getAll(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(dishes);
     });

       it('Expect to respond with error message with code 404, when an unexpected error happened (req is empty)', async () => {
        const req = {};
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.getAll(req, res, next);
    
        expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
  