const {Category} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { checkName } = require("../validation/checkCategoryInfo");

class CategoryController{
    async create(req, res, next){
        try{
            const {name} = req.body;
            const {picture} = req.files;

            let filename = uuid.v4() + ".jpg";
            picture.mv(path.resolve(__dirname, "..", "static", filename));
    
            if(!checkName(name)){
                return next(ApiError.badRequest('Название категории должно содержать от 3 до 20 латинских или русских символов'));
            }

            const category = await Category.create({name, picture: filename});
            return res.json(category);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res){
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    }

};

module.exports = new CategoryController();