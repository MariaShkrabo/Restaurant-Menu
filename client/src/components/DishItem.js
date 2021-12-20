import "../styles/dishItemStyle.css";
import { REACT_APP_API_URL, LOGIN_ROUTE } from "../utils/consts";
import { useContext, useState } from "react";
import {Context} from "../index";
import Modal from 'react-bootstrap/Modal';

const DishItem = ({dish}) => {
	const {basket} = useContext(Context);
	const {user} = useContext(Context);
	const [smShow, setSmShow] = useState(false);
	const isLogin = user.isAuth;

    const addDish = () => {
		basket.basketDishes.push(dish);
		setSmShow(true);
		basket.updateTotalPrice(basket);
		basket.updateTotalQuantity(basket);
    }

    return (
        <div className="dishes__item">
			<img src={REACT_APP_API_URL + dish.picture} className="dishes__item__img"/>
			<span className="dish-name">{dish.name}</span>
			<p className="dish-description">{dish.description}</p>
			<span className="dish-quantity">{dish.quantity} гр</span>
			<div className="container-dish-line">
				<span className="dish-price">{dish.price} BYN</span>
				{isLogin ?
				""	
				:<button className="dish-block-bucket" onClick={addDish}>В корзину</button>
				}
			</div> 

			<Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal_title" id="example-modal-sizes-title-sm">
                    	Сообщение
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal_text">Товар '{dish.name}' стоимостью {dish.price} BYN добавлен в корзину</Modal.Body>
            </Modal>
		</div>
    );
};

export default DishItem;

