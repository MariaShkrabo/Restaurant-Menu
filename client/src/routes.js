//здесь описаны все маршруты, имеющиеся в данном приложении

import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import Menu from "./pages/Menu"
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MENU_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    
    {
        path: MENU_ROUTE,
        Component: Menu
    },
]

export const publicRoutes = [
    {
        path: MENU_ROUTE,
        Component: Menu
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: BASKET_ROUTE, 
        Component: Basket
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]