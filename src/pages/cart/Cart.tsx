import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {countTotalSum, decrementQuantity,  incrementQuantity, removeItem} from "../../store/cartSlice";
import ClearIcon from '@mui/icons-material/Clear';
import * as React from "react";
import {increaseGoodAmount, reduceGoodAmount} from "../../store/mainSlice";
import Price from "../components/price";
import {addednot, removenot} from "../../utils/notifications";
import {ToastContainer} from "react-toastify";

const Cart = () => {
    const dispatch = useDispatch();
    const goods = useSelector( (state:RootState) =>  state.cart.goods);
    const totalSum = useSelector((state: RootState) => state.cart.totalSum);
    const moneyType = useSelector((state: RootState) => state.cart.moneyType);
    const currency = useSelector((state: RootState) => state.cart.currency);

    const handleIncrement = (good:any) => {
        let price = good.itemData.C
        if (good.itemData.P !== 0) {
            dispatch(reduceGoodAmount(good));
            dispatch(incrementQuantity(good));
            dispatch(countTotalSum( price));
            addednot();
        }
    };
    const handleDecrement = (good:any) => {
        let price = good.itemData.C
            if (good.quantity !== 1) {
                dispatch(countTotalSum(-price));
                dispatch(increaseGoodAmount(good));
                dispatch(decrementQuantity(good.item[0]));
                removenot();
            }
    };

    const handleRemove = (good:any) => {
        let price = good.itemData.C
        dispatch(removeItem(good.item[0]));
            dispatch(countTotalSum(-(good.quantity * price)));
            removenot();
        for (let i = 0; i < good.quantity; i++) {
            dispatch(increaseGoodAmount(good));
        }
    };


    return (
        <div className=" w-full h-screen  bg-gradient-to-r from-cyan-500 to-green-500 flex flex-col align-middle  overflow-x-hidden">
            <Navbar/>
            <ToastContainer/>
            <div className=" px-12 bottom-20 right-20 ml-10 text-xl text-white" >Total: { moneyType ? `$${totalSum}` : `${totalSum*currency}c.`} </div>
            <div  className=" w-full  grid grid-cols-3 p-10  gap-8 ml-10 ">
                {
                    goods  ? (
                            goods?.map((good:any) => (
                                <div
                                    key={good.item[0]}
                                    className="  w-[400px] h-[200px] flex flex-col justify-between   p-4 rounded-xl bg-white"
                                >
                                    <div className=" w-[350px] flex justify-between ">
                                        <div>{good.item[1].N}</div>
                                        <ClearIcon className=" cursor-pointer"  onClick={() => handleRemove(good)} />
                                    </div>
                                    <div  className=" w-full flex justify-between ">
                                        {
                                            moneyType === false ? (
                                                <Price price={good.itemData.C*currency} prevMoneyType={moneyType} />
                                            ) : (
                                                <Price price={ good.itemData.C ? good.itemData.C : 0} prevMoneyType={moneyType}/>
                                            )
                                        }
                                        <div className="  flex justify-between align-middle gap-1">
                                            <RemoveIcon className=" cursor-pointer" onClick={() => handleDecrement(good)}/>
                                            <div>{good.quantity}</div>
                                            <AddIcon className=" cursor-pointer" onClick={() => handleIncrement(good)}/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Cart is empty</div>
                    )
                }
            </div>
        </div>
    )
}

export default Cart;