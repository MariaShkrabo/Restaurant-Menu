import Container from "react-bootstrap/esm/Container";
import {observer} from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { LOGIN_ROUTE, MENU_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import Row from "react-bootstrap/Row";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [loginValue, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
      try {
          let data;
          if (isLogin) {
              data = await login(loginValue, password);
          } else {
              data = await registration(loginValue, password);
          }
          user.setUser(user);
          user.setIsAuth(true);
          navigate(MENU_ROUTE);
      }
      catch (e) {
          alert(e.response.data.message)
      }
    }

    return (
      <Container 
          className="d-flex justify-content-center align-items-center"
          style={{height: window.innerHeight - 54}}
      >
         <Card style={{width: 600}} className="p-5">
            <h2 className="auth-title m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
            <Form className="d-flex flex-column">
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш логин..."
                value={loginValue}
                onChange={e => setLogin(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
              <Row className="auth-change-message">
                    {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                    <Button
                        className="auth__button"
                        variant={"outline-success"}
                        onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Регистрация'}
                    </Button>
                </Row>
            </Form>
         </Card>
      </Container>
    );
});
 
export default Auth;