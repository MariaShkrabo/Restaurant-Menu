require("dotenv").config();
const userController = require("../../controllers/userController");
const { User, Basket } = require('../../models/models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const ApiError = require('../../error/ApiError');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('UserController', () => {
  describe('Checks to create user', () => {
    const user = 
    {
        name: "Мария",
        phone: "336629830",
    };

    it('Expect to respond with code 404, when name length is 1', async () => {
        const req = {body: {name: "М", phone: "336629830"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.identification(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Имя должно содержать от 2 до 100 символов (возможно написание только в кириллице и в латинице)"));
    });

    it('Expect to respond with code 404, when name consist not only letters', async () => {
        const req = {body: {name: "Маша123", phone: "336629830"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.identification(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Имя должно содержать от 2 до 100 символов (возможно написание только в кириллице и в латинице)"));
    });

    it('Expect to respond with code 404, when phone length is 8', async () => {
        const req = {body: {name: "Мария", phone: "33662983"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.identification(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Номер должен содержать 9 числовых символов"));
    });

    it('Expect to respond with code 404, when phone length is 10', async () => {
        const req = {body: {name: "Мария", phone: "3366298300"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.identification(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Номер должен содержать 9 числовых символов"));
    });

    it('Expect to respond with code 404, when phone consists not only numbers', async () => {
        const req = {body: {name: "Мария", phone: "number"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.identification(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Номер должен содержать 9 числовых символов"));
    });

    it('Expect to respond with user token', async () => {
        const req = {body: user};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
    
        User.create.mockResolvedValue(user);
        Basket.create.mockResolvedValue({userId: 1});
        await userController.identification(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});