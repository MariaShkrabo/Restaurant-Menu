import {makeAutoObservable} from "mobx";

export default class DishRestaurant{
    constructor(){
        this._dishes = [];
        this._categories = [];
        this._selectedCategory = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;
        makeAutoObservable(this);
    }

    setDishes(dishes){
        this._dishes = dishes;
    }

    setCategories(categories){
        this._categories = categories;
    }

    setSelectedCategory(category){
        this.setPage(1);
        this._selectedCategory = category;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get dishes(){
        return this._dishes;
    }

    get categories(){
        return this._categories;
    }

    get selectedCategory(){
        return this._selectedCategory;
    }

    get totalCount() {
        return this._totalCount;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }
}