import {$authHost, $host} from "./index";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category);;
    return data;
}

export const fetchCategory = async () => {
    const {data} = await $host.get('api/category');
    return data;
}

export const createDish = async (dish) => {
    const {data} = await $authHost.post('api/dish', dish);
    return data;
}

export const fetchDish = async (categoryId, page, limit= 4) => {
    const {data} = await $host.get('api/dish', {params: {
        categoryId, page, limit
    }});
    return data;
}

