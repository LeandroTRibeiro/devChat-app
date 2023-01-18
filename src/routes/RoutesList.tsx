import { useRoutes } from "react-router-dom"
import { AcessMail } from "../pages/AcessMail";
import { AlmostThere } from "../pages/AlmostThere";
import { AuthenticateAcount } from "../pages/AuthenticateAcount";
import { Home } from "../pages/Home"
import { LiveChat } from "../pages/LiveChat";
import { NotFound } from "../pages/NotFound";
import { Recover } from "../pages/Recover";
import { Recovering } from "../pages/Recovering";
import { Register } from "../pages/Register";
import { useAppSelector } from "../redux/hooks/useAppselector";

export const RouterList = () => {

    const isLogin = useAppSelector(state => state.isLogin);

    return useRoutes ([
        {path: '*', element: <NotFound />},
        {path: '/', element: <Home />},
        {path: '/livechat', element: isLogin.status ? <LiveChat /> : <Home />},
        {path: '/register', element: <Register />},
        {path: '/recover', element: <Recover />},
        {path: '/recoverpasswordmail', element: <Recovering /> },
        {path: '/acessmail', element: <AcessMail /> },
        {path: '/almostthere', element: <AlmostThere />},
        {path: '/authenticateacount', element: <AuthenticateAcount />},
    ])
};