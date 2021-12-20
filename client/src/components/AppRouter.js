import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "..";
import Menu from "../pages/Menu";
import Admin from "../pages/Admin";
import { authRoutes, publicRoutes } from "../routes";
import { MENU_ROUTE,  ADMIN_ROUTE } from "../utils/consts";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
      <Routes>
          {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
          )}
          {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact/>
          )}
          <Route path={MENU_ROUTE} element={<Menu/>}/>
      </Routes>
      
    );
});
  
export default AppRouter;