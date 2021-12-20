import "../styles/categoryItemStyle.css";
import { REACT_APP_API_URL } from "../utils/consts";
import { useContext } from "react";
import {Context} from "../index";

const CategoryItem = ({category}) => {
    const {dish} = useContext(Context);
    
    return (
        <div className="categories__item">
            <img src={REACT_APP_API_URL + category.picture} className="categories__item__img" id="categories__item__img"
              onClick={() => dish.setSelectedCategory(category)}/>
            <span className="categories__text">{category.name}</span>
        </div> 
    );
};

export default CategoryItem;