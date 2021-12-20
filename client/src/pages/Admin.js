import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import CreateDish from "../components/modals/CreateDish";
import CreateCategory from "../components/modals/CreateCategory";
import React, { useState } from 'react';

function Admin() {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [dishVisible, setDishVisible] = useState(false);
    return (
      <div>
         <Container className="d-flex flex-column">
           <Button 
              variant="outline-light"
              className="mt-4 p-2"
              onClick={() => {setCategoryVisible(true)}} 
            >
              Добавить категорию
            </Button>
            <Button 
              variant="outline-light"
              className="mt-4 p-2"
              onClick={() => {setDishVisible(true)}} 
            >
              Добавить блюдо
            </Button>
            <CreateCategory show={categoryVisible} onHide={() => {setCategoryVisible(false)}}/>
            <CreateDish show={dishVisible} onHide={() => {setDishVisible(false)}}/>
         </Container>
      </div>
    );
}
  
export default Admin;