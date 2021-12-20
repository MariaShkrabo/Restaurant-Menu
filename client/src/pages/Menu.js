import Container from "react-bootstrap/esm/Container";
import {observer} from "mobx-react-lite";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoriesList from "../components/CategoriesList";
import DishList from "../components/DishList";
import React, { useContext, useEffect } from 'react';
import {Context} from "../index";
import { fetchCategory, fetchDish } from "../http/dishAPI";
import Pages from "../components/Pages";

const Menu = observer(() => { 
    const {dish} = useContext(Context);

    useEffect(() => {
      fetchCategory().then(data => dish.setCategories(data));
      fetchDish(null, 1, 4).then(data => {
        dish.setDishes(data.rows);
        dish.setTotalCount(data.count);
      })
    }, []);

    useEffect(() => {
      fetchDish(dish.selectedCategory.id, dish.page, 4).then(data => {
          dish.setDishes(data.rows);
          dish.setTotalCount(data.count);
      })
    }, [dish.page, dish.selectedCategory,]);
    
    return (
      <Container>
        <Row className="mt-2">
          <Col md={3}>
            <CategoriesList/>
          </Col>
          <Col md={9}>
            <DishList/>
            <Pages/>
          </Col>
        </Row>
      </Container>
    );
});
  
  export default Menu;