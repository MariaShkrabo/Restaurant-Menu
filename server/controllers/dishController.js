const {Dish} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { checkQuantity, checkName, checkDescription, checkPrice } = require("../validation/checkDishInfo");

class DishController{
    async create(req, res, next){
        const {name, description, quantity, price, categoryId} = req.body;
        const {picture} = req.files;
            
        let filename = uuid.v4() + ".jpg";
        picture.mv(path.resolve(__dirname, "..", "static", filename));
    
        if(!checkName(name)){
            return next(ApiError.badRequest('Название блюда должно содержать от 3 до 30 латинских или русских символов'));
        }
        if(!checkDescription(description)){
            return next(ApiError.badRequest('Описание не может быть длиннее 100 символов'));
        }
        if(!checkQuantity(quantity)){
            return next(ApiError.badRequest('Количество должно быть числом в диапазоне от 10 до 10000 грамм'));
        }
        if(!checkPrice(price)){
            return next(ApiError.badRequest('Цена должна быть числом в диапазоне от 0 до 10000 б.р.'));
        }
        if(!categoryId){
            return next(ApiError.badRequest('Категория не выбрана!'));
        }

        const dish = await Dish.create({name, picture: filename, description, quantity, price, categoryId});
        return res.json(dish);
    }

    async getAll(req, res, next){
        try{
            let {categoryId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 4;
            let offset = page * limit - limit;
            let dishes;
            if(categoryId){
                dishes = await Dish.findAndCountAll({where: {categoryId}, limit, offset});
            }else{
                dishes = await Dish.findAndCountAll({limit, offset});
            }
            return res.json(dishes); 
        }catch(e){
            next(ApiError.badRequest(e.message)); 
        }
    }  
};

module.exports = new DishController();