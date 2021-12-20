import Container from "react-bootstrap/esm/Container";
import {observer} from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import BasketDishList from "../components/BasketDishList";
import React, { useContext, useEffect, useState } from 'react';
import {Context} from "../index";
import { createDishBasket, fetchBaskets } from "../http/basketAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {identification} from "../http/userAPI";
import Modal from 'react-bootstrap/Modal';

const Basket = observer((onHide) => {
  
    const {dish} = useContext(Context);
    const {user} = useContext(Context);
    const {basket} = useContext(Context);
    const [nameValue, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [smShow, setSmShow] = useState(false);

    useEffect(() => {
      fetchBaskets().then(data => basket.setAllBaskets(data));
    }, []);
    
    const click = async () => {
      try {
        if(basket.basketDishes.length != 0){
            let data;
            data = await identification(nameValue, phone);
            user.setUser(user);
            createBasket();
            setSmShow(true);
        }
        else{
          alert("Для оформления заказа необходимо минимум одно блюдо в корзине");
        }
      } 
      catch (e) {
          alert(e.response.data.message)
      }
    }
    
    async function createBasket(){
      basket.setCurrentBasketId(basket.allBaskets[basket.allBaskets.length-1].id+1);
      let data;
      for(let i = 0; i < basket.basketDishes.length; i++){
        data = await createDishBasket(basket.currentBasketId, basket.basketDishes[i].id);
      }
    }

    return (
        <Container>
          <Row className="mt-2">
              <BasketDishList />
          </Row>
          <Form className="d-flex flex-column justify-content-center align-items-center">
              <Form.Control
                className="mt-3 w-50"
                placeholder="Введите Ваше имя..."
                value={nameValue}
                onChange={e => setName(e.target.value)}
              />
              <Form.Control
                className="mt-3 w-50"
                placeholder="Введите Ваш номер телефона (последние 9 цифр с кодом)..."
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <Button
                className="mt-3 w-50"
                variant="outline-danger"
                onClick={click}
              >
                Оформить заказ
              </Button>

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
                <Modal.Body className="modal_text">Заказ принят! С Вами свяжутся в течение 30 минут:)</Modal.Body>
            </Modal>

            </Form>
        </Container>
    );
  });
  
  export default Basket;