const categoryController = require("../../controllers/categoryController");
const { Category } = require('../../models/models');
const ApiError = require('../../error/ApiError');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('CategoryController', () => {
  describe('Checks to create category', () => {
    const category = 
    {
        name: 'Завтраки',
        picture: 'sdgsdgdg.jpg',
    };

    beforeAll(() => {
        Category.create.mockResolvedValue(category);
    });
    it('Expect to respond with category data', async () => {
        const req = {
            body: {name: "Завтраки"}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await categoryController.create(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(category);
    });
  });

  it('Expect to respond with incorrect name message with code 404, when name do not consists latin or cirillic letters', async () => {
    const req = {
        body: {name: "11111"},  
        files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
    };
    const res = { 
        json: jest.fn(() => res), 
    }
    const next = jest.fn();
    await categoryController.create(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(ApiError.badRequest("Название категории должно содержать от 3 до 20 латинских или русских символов"));
    });

    it('Expect to respond with error message with code 404, when an unexpected error happened (req is empty)', async () => {
        const req = {};
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await categoryController.create(req, res, next);
    
        expect(next).toHaveBeenCalledTimes(1);
    });
});
  