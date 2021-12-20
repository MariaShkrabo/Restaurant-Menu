import { useContext } from "react";
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MENU_ROUTE, BASKET_ROUTE } from "../utils/consts";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';

const NavBar = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const {basket} = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    };

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
            <NavLink style={{color: "white", textDecoration: 'none'}} to={MENU_ROUTE}>МЕНЮ</NavLink>
            { user.isAuth ?
                <Nav className="ml-auto" style={{color: "white"}}>
                    <Button 
                        className="nav__button"
                        variant="outline-light" 
                        onClick={() => navigate(ADMIN_ROUTE)}
                    >
                        Панель администратора
                    </Button>{' '}
                    <Button 
                        className="nav__button"
                        variant="outline-light" 
                        onClick={() => logOut()}
                    >
                        Выйти
                    </Button>{' '}
                </Nav>
                :
                <Nav className="ml-auto" style={{color: "white"}}>
                    <Button 
                        className="nav__button"
                        variant="outline-light" 
                        onClick={() => navigate(LOGIN_ROUTE)}
                    >
                        Авторизация
                    </Button>{' '}
                    <Button 
                        className="nav__button"
                        variant="outline-light" 
                        onClick={() => navigate(BASKET_ROUTE)}
                    >
                        {basket.totalPrice} BYN | {basket.totalQuantity} шт
                    </Button>{' '}
                </Nav>
            }
        </Container>
      </Navbar>
    );
});
  
export default NavBar;