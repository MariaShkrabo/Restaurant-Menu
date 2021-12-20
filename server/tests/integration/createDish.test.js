const dishController = require("../../controllers/dishController");
const { Dish } = require('../../models/models');
const ApiError = require('../../error/ApiError');

// generate auto-mock of the module
jest.mock('../../models/models');

function certainLengthString(len){
    let str = "";
    for (let i = 0; i < len; i++){
      str += "a";
    }
    return str;
  }

describe('DishController', () => {
  describe('Checks to create dish', () => {
    const dish = 
    {
        name: 'Каша',
        picture: 'sdgsdgdg.jpg',
        description: 'Вкусно',
        quantity: "1000",
        price: "6",
        categoryId: 1,
    };

    beforeAll(() => {
        Dish.create.mockResolvedValue(dish);
    });
    it('Expect to respond with dish data', async () => {
        const req = {
            body: {name: "Завтраки", description: 'Вкусно', quantity: "1000", price: "6", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(dish);
    });

    it('Expect to respond with incorrect name message with code 404, when name do not consists latin or cirillic letters', async () => {
        const req = {
            body: {name: "1111", description: 'Вкусно', quantity: "1000", price: "6", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Название блюда должно содержать от 3 до 30 латинских или русских символов"));
    });

    it('Expect to respond with incorrect description message with code 404, when description length is 101', async () => {
        const req = {
            body: {name: "Каша", description: certainLengthString(101), quantity: "1000", price: "6", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Описание не может быть длиннее 100 символов"));
    });

    it('Expect to respond with incorrect quantity message with code 404, when quantity is 9', async () => {
        const req = {
            body: {name: "Каша", description: "aaaaa", quantity: "9", price: "6", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Количество должно быть числом в диапазоне от 10 до 10000 грамм"));
    });

    it('Expect to respond with incorrect quantity message with code 404, when quantity is 10001', async () => {
        const req = {
            body: {name: "Каша", description: "aaaaa", quantity: "10001", price: "6", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Количество должно быть числом в диапазоне от 10 до 10000 грамм"));
    });

    it('Expect to respond with incorrect price message with code 404, when price is -1', async () => {
        const req = {
            body: {name: "Каша", description: "aaaaa", quantity: "100", price: "-1", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Цена должна быть числом в диапазоне от 0 до 10000 б.р."));
    });

    it('Expect to respond with incorrect price message with code 404, when price is 10001', async () => {
        const req = {
            body: {name: "Каша", description: "aaaaa", quantity: "100", price: "10001", categoryId: 1}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Цена должна быть числом в диапазоне от 0 до 10000 б.р."));
    });

    it('Expect to respond with incorrect category id message with code 404, when category is not passed', async () => {
        const req = {
            body: {name: "Каша", description: "aaaaa", quantity: "100", price: "100"}, 
            files: {picture: {name: "sdgsdgdg.jpg", mv(){}}},
        };
        const res = { 
            json: jest.fn(() => res), 
        }
        const next = jest.fn();
        await dishController.create(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Категория не выбрана!"));
    });
  });
});
  