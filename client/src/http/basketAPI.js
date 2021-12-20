import {$host} from "./index";

export const createDishBasket = async (basketId, dishId) => {
    const {data} = await $host.post('api/basket', {basketId, dishId});
    return data;
}

export const fetchBaskets = async () => {
    const {data} = await $host.get('api/basket');
    return data;
}