import "../styles/basketDishItemStyle.css";
import { REACT_APP_API_URL } from "../utils/consts";
import { useContext } from "react";
import {Context} from "../index";

const BasketDishItem = ({dish}) => {
    const {basket} = useContext(Context);

    const deleteBasketDish = () => {
        let tempBasketDishes = [];
        if( basket.basketDishes.length === 1 ){
            tempBasketDishes = [];
        } else {
            for(let i = 0; i < basket.basketDishes.length; i++){
                if(JSON.stringify(basket.basketDishes[i]) === JSON.stringify(dish)){
                    i++;
                }
                tempBasketDishes.push(basket.basketDishes[i]);
            }
        }
        basket.setBasketDishes(tempBasketDishes);
		basket.updateTotalPrice(basket);
		basket.updateTotalQuantity(basket);
    }

    return (        
        <div className="basket_dish__item">
			<img src={REACT_APP_API_URL + dish.picture} className="basket_dish__item__img"/>
			<span className="dish-name">{dish.name}</span>
			<span className="dish-quantity">{dish.quantity} гр</span>
			<span className="dish-price">{dish.price} BYN</span>
            <button className="delete_item__button" onClick={deleteBasketDish}>x</button>
		</div>
    );
};

export default BasketDishItem;