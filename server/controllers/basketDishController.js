const {BasketDish, Basket} = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketDishController{
    async create(req, res, next){
        try{
            const {basketId, dishId} = req.body; 
            const basket_dish = await BasketDish.create({basketId, dishId});
            return res.json(basket_dish);
        } catch(e){
            next(ApiError.badRequest(e.message)); 
        }
    }

    async getAllBaskets(req, res){
        const baskets = await Basket.findAll();
        return res.json(baskets);
    }
}

module.exports = new BasketDishController();