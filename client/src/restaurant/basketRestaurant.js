import {makeAutoObservable} from "mobx";

export default class BasketRestaurant{
    constructor(){
        this._basketDishes = [];
        this._totalPrice = 0;
        this._quantity = 0 ;
        this._currentBasketId = 0 ;
        this._allBaskets = [];
        makeAutoObservable(this);
    }

    setBasketDishes(basketDishes){
        this._basketDishes = basketDishes;
    }

    setAllBaskets(allBaskets){
        this._allBaskets = allBaskets;
    }

    setCurrentBasketId(currentBasketId){
        this._currentBasketId = currentBasketId;
    }

    setTotalPrice(totalPrice) {
        this._totalPrice = totalPrice;
    }

    setTotalQuantity(quantity) {
        this._quantity = quantity;
    }

    get allBaskets(){
        return this._allBaskets;
    }

    get basketDishes(){
        return this._basketDishes;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    get totalQuantity() {
        return this._quantity;
    }

    get currentBasketId() {
        return this._currentBasketId;
    }

    updateTotalPrice(basket){
        let total_price = 0;
        basket.basketDishes.forEach(dish => {
            total_price += dish.price;
        });
        basket.setTotalPrice(total_price);
    };

    updateTotalQuantity(basket){
        basket.setTotalQuantity(basket.basketDishes.length);
    };
}