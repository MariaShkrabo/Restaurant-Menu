const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {User, Basket, Admin} = require("../models/models");
const {checkPassword, checkLogin} = require("../validation/checkAdminInfo");
const {checkName, checkPhone} = require("../validation/checkUserInfo");

const generateAdminJwt = (id, login) => {
    return jwt.sign(
        {id, login},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

const generateUserJwt = (id, name, phone) => {
    return jwt.sign(
        {id, name, phone},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

class UserController{
    async identification(req, res, next) {
        const {name, phone} = req.body;
        if (!checkName(name)) {
            return next(ApiError.badRequest('Имя должно содержать от 2 до 100 символов (возможно написание только в кириллице и в латинице)'));
        }
        if (!checkPhone(phone)) {
            return next(ApiError.badRequest('Номер должен содержать 9 числовых символов'));
        }
        const user = await User.create({name, phone});
        const basket = await Basket.create({userId: user.id});
        const token = generateUserJwt(user.id, user.name, user.phone);
        return res.json({token});
    }   
    
    async registration(req, res, next) {
        const {login, password} = req.body;
        if (!checkLogin(login)) {
            return next(ApiError.badRequest('Логин должен содержать от 5 до 20 символов (латинских букв и цифр)'));
        }
        if (!checkPassword(password)) {
            return next(ApiError.badRequest('Пароль должен содержать от 8 до 20 символов'));
        }
        const candidate = await Admin.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const admin = await Admin.create({login, password: hashPassword});
        const token = generateAdminJwt(admin.id, admin.login);
        return res.json({token});
    }  

    async login(req, res, next) {
        const {login, password} = req.body;
        const admin = await Admin.findOne({where: {login}});
        if (!admin) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, admin.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateAdminJwt(admin.id, admin.login);
        return res.json({token}); 
    }

    async check(req, res){
        const token = generateAdminJwt(req.user.id, req.user.login);
        return res.json({token});
    }
};

module.exports = new UserController();