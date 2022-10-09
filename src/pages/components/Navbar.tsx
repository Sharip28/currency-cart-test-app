import {Link, useLocation} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {handleMoneyType} from "../../store/cartSlice";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {useState} from "react";


const Navbar = () => {
    const dispatch = useDispatch();
    const cartGoods = useSelector( (state:RootState) =>  state.cart.goods);
    const moneyType = useSelector((state:RootState) => state.cart.moneyType);
    const arrow = useSelector((state: RootState) => state.main.arrow);
    const [style, setStyle] = useState<string>("text-black");


    const getTotalQuantity = () => {
        let total = 0
        cartGoods?.forEach((item:any) => {
            total += item.quantity
        })
        return total;
    }
    return (
        <nav className="w-[1360px] ml-20 flex justify-around align-middle p-3 bg-white rounded-xl sticky top-0 justify-self-start ">
            <Link className="mt-3 cursor-pointer" to="/"><HomeIcon  /></Link>
            <div className=" flex ">
                <div className= "cursor-pointer" >
                    {/*{ location.pathname.includes("/cart") ? "hidden" :*/}
                    <div className={moneyType ? "text-blue-600 w-16 font-semibold" : ""}  onClick={() => dispatch(handleMoneyType())} >USD</div>
                    <div className={moneyType  ? ""  : "text-blue-600  w-16 font-semibold "} onClick={() => dispatch(handleMoneyType())} >KGS</div>
                </div>
                <div>
                    {arrow === "up" ? (
                        <div className=" text-red-600 " >
                            <ArrowUpwardIcon className="animate-pulse " />
                        </div>
                    ) : arrow === "down" ? (
                        <div className="text-green-500 ">
                            <ArrowDownwardIcon className="animate-pulse  "/>
                        </div>
                    ) : (
                        <></>
                    )
                    }
                </div>
            </div>

            <Link className="mt-3  cursor-pointer " to="/cart">
                <ShoppingCartIcon />
                <div className="absolute  top-3 ml-4 w-6 h-6 bg-red-600 rounded-3xl text-white flex justify-center align-top">
                    <p >{getTotalQuantity() || 0}</p>
                </div>

            </Link>
        </nav>
    )
}

export default Navbar;