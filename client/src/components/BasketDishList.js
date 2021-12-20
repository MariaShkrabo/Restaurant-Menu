import {observer} from "mobx-react-lite";
import { useContext } from "react";
import {Context} from "../index";
import BasketDishItem from "./BasketDishItem"
import Row from "react-bootstrap/Row";

const BasketDishList = observer(() => {
    const {basket} = useContext(Context);

    const clearBasket = () => {
		basket.setBasketDishes([]);
		basket.updateTotalPrice(basket);
		basket.updateTotalQuantity(basket);
    }

    return (
        <Row className="d-flex justify-content-center">
            <Row className="basket-title">{basket.basketDishes.length ? "Корзина" : "Корзина пуста"}</Row>
            {basket.basketDishes.map(dish =>
                <BasketDishItem key={dish.id} dish={dish}/>
            )}
            {basket.basketDishes.length ?
            <button className="delete_all_items__button" onClick={clearBasket}>Очистить корзину</button>
             :
             ""}
        </Row>
    );
});

export default BasketDishList;