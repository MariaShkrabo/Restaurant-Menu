import {observer} from "mobx-react-lite";
import { useContext } from "react";
import {Context} from "../index";
import CategoryItem from "./CategoryItem";
import Col from "react-bootstrap/Col";

const CategoriesList = observer(() => {
    const {dish} = useContext(Context);
    return (
        <Col>
            {dish.categories.map(category =>
                <CategoryItem 
                    key={category.id}
                    category={category}
                    active={category.id === dish.selectedCategory.id}  
                />
            )}
        </Col>
    );
});

export default CategoriesList;