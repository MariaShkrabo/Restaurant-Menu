require("dotenv").config();
const userController = require("../../controllers/userController");
const { Admin } = require('../../models/models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const ApiError = require('../../error/ApiError');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('UserController', () => {
  describe('Checks to create admin', () => {
    const admin = 
    {
        login: "maria04",
        password: "123456789",
    };

    it('Expect to respond with code 404, when login length is 4', async () => {
        const req = {body: {login: "mas2", password: "123456789"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.registration(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Логин должен содержать от 5 до 20 символов (латинских букв и цифр)"));
    });

    it('Expect to respond with code 404, when login length does not consist numbers', async () => {
        const req = {body: {login: "masjfgbnytmnvtrd", password: "123456789"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.registration(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Логин должен содержать от 5 до 20 символов (латинских букв и цифр)"));
    });

    it('Expect to respond with code 404, when login length does not consist latin letters', async () => {
        const req = {body: {login: "4784747875", password: "123456789"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.registration(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Логин должен содержать от 5 до 20 символов (латинских букв и цифр)"));
    });

    it('Expect to respond with code 404, when password length is 7', async () => {
        const req = {body: {login: "maria04", password: "1234567"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.registration(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Пароль должен содержать от 8 до 20 символов"));
    });

    it('Expect to respond with code 404, when password length is 21', async () => {
        const req = {body: {login: "maria04", password: "123456789123456789012"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.registration(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Пароль должен содержать от 8 до 20 символов"));
    });

    it('Expect to respond with code 404, when an admin with this login already exists', async () => {
        const req = {body: {login: "maria04", password: "12345678"}};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        Admin.findOne.mockResolvedValue(admin);
        await userController.registration(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Пользователь с таким логином уже существует"));
    });

    it('Expect to respond with admin token', async () => {
        const req = {body: admin};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        
        //не нашли админимстратора с таким же логином
        Admin.findOne.mockResolvedValue();
        const hashPassword = await bcrypt.hash(admin.password, 5);
        Admin.create.mockResolvedValue({login: admin.login, password: hashPassword});
        await userController.registration(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});