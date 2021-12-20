const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
});

const Admin = sequelize.define("admin", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
});

const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketDish = sequelize.define("basket_dish", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Dish = sequelize.define("dish", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    picture: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    quantity: {type: DataTypes.DOUBLE, allowNull: false},
    price: {type: DataTypes.DOUBLE, allowNull: false},
});

const Category = sequelize.define("category", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    picture: {type: DataTypes.STRING, allowNull: false},
});


//связь один к одному-у одного пользователя-одна корзина
User.hasOne(Basket);
Basket.belongsTo(User);

//в корзине может быть много блюд
Basket.hasMany(BasketDish);
BasketDish.belongsTo(Basket);

Dish.hasMany(BasketDish);
BasketDish.belongsTo(Basket);

Category.hasMany(Dish);
Dish.belongsTo(Category);


module.exports = {
    User,
    Admin,
    Basket,
    BasketDish,
    Category,
    Dish
};

