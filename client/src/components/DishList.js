import {observer} from "mobx-react-lite";
import { useContext } from "react";
import {Context} from "../index";
import DishItem from "./DishItem";
import Row from "react-bootstrap/Row";

const DishList = observer(() => {
    const {dish} = useContext(Context);
    return (
        <Row className="d-flex">
            <Row className="d-flex flex-wrap justify-content-center">{dish.selectedCategory.name || "Все блюда"}</Row>
            {dish.dishes.map(dish =>
                <DishItem key={dish.id} dish={dish}/>
            )}
        </Row>
    );
});

export default DishList;