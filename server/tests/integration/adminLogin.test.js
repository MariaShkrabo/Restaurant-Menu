require("dotenv").config();
const userController = require("../../controllers/userController");
const { Admin } = require('../../models/models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const ApiError = require('../../error/ApiError');

// generate auto-mock of the module
jest.mock('../../models/models');

describe('UserController', () => {
  describe('Checks to login like admin', () => {
    const admin = 
    {
        login: "maria04",
        password: "123456789",
    };

    it('Expect to respond with code 404, when there is no admin with such login', async () => {
        const req = {body: admin};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        Admin.findOne.mockResolvedValue();
        await userController.login(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Пользователь не найден"));
    });

    it('Expect to respond with code 404, when there is no admin with such login', async () => {
        const req = {body: admin};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        //будут разные пароли, так как он еще шифруется, а мы вставляем одинаковые
        Admin.findOne.mockResolvedValue(admin);
        await userController.login(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(ApiError.badRequest("Указан неверный пароль"));
    });

    it('Expect to respond with admin token', async () => {
        const req = {body: admin};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        
        const hashPassword = await bcrypt.hash(admin.password, 5);
        //нашли администратора с таким же логином и паролем
        Admin.findOne.mockResolvedValue({login: admin.login, password: hashPassword});
        await userController.login(req, res, next);

        expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
  describe('Checks token for compliance', () => {
    const admin = 
    {
        id: 2,
        login: "maria04",
    };

    it('Expect to respond with json token', async () => {
        const req = {user: admin};
        const res = { 
            json: jest.fn(() => res) 
        }
        const next = jest.fn();
        await userController.check(req, res);

        expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});