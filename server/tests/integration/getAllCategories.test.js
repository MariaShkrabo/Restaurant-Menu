require("dotenv").config();
const categoryController = require("../../controllers/categoryController");
const { Category } = require('../../models/models');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('CategoryController', () => {
  describe('Checks to get all categories', () => {
    const categories = [
        {
          name: 'Завтраки',
          picture: 'sdgsdgdg.jpg',
        },
        {
          name: 'Обеды',
          picture: 'sdgsdgdg.jpg',
        }
      ];
      beforeAll(() => {
        Category.findAll.mockResolvedValue(categories);
      });
      it('Expect to respond with 200 code and categories data', async () => {
          const req = {};
          const res = { 
              status: jest.fn(() => res), 
              json: jest.fn(() => res) 
          }
          const next = jest.fn();
          await categoryController.getAll(req, res, next);

          expect(res.json).toHaveBeenCalledTimes(1);
          expect(res.status).toHaveBeenCalledTimes(1);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(categories);
    });
  });
});
  