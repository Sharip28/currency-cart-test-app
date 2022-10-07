import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../pages/mainPage/mainPage";
import Cart from "../pages/cart/Cart";


const MainRoutes = () => {
    return (
        <React.Suspense fallback={<span>Loading...</span>} >
            <BrowserRouter>
                <Routes>
                    <Route path = "/"  element={<MainPage/>} />
                    <Route path = "/cart"  element={<Cart/>} />
                </Routes>
            </BrowserRouter>

        </React.Suspense>
    )
}

export default MainRoutes;