import * as React from "react";
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {addGoods, addTypes, increaseGoodAmount, reduceGoodAmount} from "../../store/mainSlice";
import {
    countTotalSum,
    handleCurrencyChange,
    incrementQuantity,
    decrementQuantity,
    handleSelectedNumber,
    minusChosenGood,
    addChosenGood,
    handleChosenGood, addSelectedNumber, minusSelectedNumber
} from "../../store/cartSlice";
import Navbar from "../components/Navbar";
import {sortedData} from "../../utils/sortData";

import Price from "../components/price";
import {useDebounce} from "../../utils/Debounce";
import {getRandomInt} from "../../utils/randomInteger";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {addednot, removenot} from "../../utils/notifications";
import { ToastContainer} from 'react-toastify';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const MainPage = () => {
    const dispatch = useDispatch();
    const types = useSelector((state: RootState) => state.main.types);
    const goods = useSelector((state: RootState) => state.main.goods);
    const mainData = useSelector((state: RootState) => state.main.mainData);
    const moneyType = useSelector((state:RootState) => state.cart.moneyType);
    const currency = useSelector((state: RootState) => state.cart.currency);
    const [value, setValue] = React.useState<number>(currency);
    const cartGoods = useSelector( (state:RootState) =>  state.cart.goods);
    const [noGoods, setNoGoods] = React.useState<boolean>(true);
    const selectedNumber = useSelector((state:RootState) => state.cart.selectedNumber);
    const chosenGoodNumber = useSelector((state: RootState) => state.cart.chosenGoodNumber);
    console.log("already selected number ", selectedNumber);
    console.log("chosen good number",  chosenGoodNumber);

    const contentStyle = { width: 120 };

    useEffect(() => {
        let typesArray: string[] = [];
        let goodsArray:any = [];
        const sortData:any = sortedData();
        sortData.map((item: any) => {
            let type = item.G;
            let goods = item.B;
            typesArray.push(type);
            goodsArray.push(goods);
            return;
        });
        dispatch(addTypes(typesArray));
        dispatch(addGoods(goodsArray));
    }, []);

    const maxInt = 80;
    const minInt = 20;
    useEffect(() => {
        setInterval(() => {
            let randomInt = getRandomInt(minInt, maxInt);
            dispatch(handleCurrencyChange(randomInt));
        }, 15000);
    }, [minInt, maxInt, getRandomInt, handleCurrencyChange  ]);


    const handleIncrement = (item:any, itemData:any) => {
        let price = itemData.C;
        let good = {item, itemData};
        if ( chosenGoodNumber !== 0 ) {
            // dispatch(reduceGoodAmount(good));
            // dispatch(incrementQuantity(good));
            dispatch(addSelectedNumber());
            // dispatch(countTotalSum( price));
            dispatch(minusChosenGood());
        }
    };
    const handleDecrement = (item:any, itemData:any) => {
        let price = itemData.C
        let good = {item, itemData};
        if (selectedNumber !== 0) {
            // dispatch(countTotalSum(-price));
            // dispatch(increaseGoodAmount(good));
            // dispatch(decrementQuantity(good.item[0]));
            dispatch(minusSelectedNumber());
            dispatch(addChosenGood());

        }
    };

    const confirmButton = (item:any, itemData:any) => {
        let price = itemData.C
        // let good = cartGoods.find((el:any) => item[0] === el.item[0] ) ;
        // if (   chosenGoodNumber >= 0) {
        if ( selectedNumber !== 0 ) {
            dispatch(incrementQuantity({item, itemData, selectedNumber}));
            dispatch(reduceGoodAmount({item, itemData, selectedNumber}));
            dispatch(countTotalSum(selectedNumber * price));
            addednot();
            dispatch(handleSelectedNumber(0));
            console.log("successfully added and will clear chosenGoodNumber and selected numbers")
        } else {
            console.log("did not add wont will clear chosenGoodNumber and selected numbers")
        }
    };

    const handlePopUp = (item:any, itemData:any) => {
        console.log("popup");
        dispatch(handleSelectedNumber(0));
        dispatch(handleChosenGood(0));
        dispatch(handleChosenGood(itemData.P));
    }

    return (
        <div className=" w-full bg-gradient-to-r from-cyan-500 to-green-500 flex flex-col align-middle  overflow-x-hidden " >
            <Navbar />
            <ToastContainer/>
            {types?.map((type:string, index:number) => (
                <div key={index} className=" mt-3 w-full p-6 pt-5 " >
                    < div className=" w-full pb-4 ml-16 text-2xl">
                        { type}
                    </div>
                    <div className=" w-full  ml-10 grid grid-cols-3 p-8">
                        {
                        Object.entries(goods[index])?.map((item: any) => {
                                    const itemData:any = mainData.Value.Goods.find((el:any) => el['T'] === +item[0]);
                            if (itemData === null) {
                                setNoGoods(false);
                            }
                                    const cartGood:any = cartGoods.find((cartgood:any) => cartgood.item[0] === item[0]);
                            return (
                                            itemData?.C ? (
                                            <div
                                                key={item[0]}
                                                className=" w-[400px] h-[200px] flex flex-col align-middle justify-between   p-4 rounded-xl bg-white"
                                            >
                                                <div className=" w-[350px] p-2 flex  justify-between ">
                                                    <div className=" w-[270px] ">{ itemData?.C && item[1].N} </div>
                                                    {
                                                        moneyType === false ? (
                                                             <Price className=" p-1 w-[35px] " price={itemData?.C * currency} prevMoneyType={moneyType}/>
                                                        ) : (
                                                            <Price className=" w-[35px] " price={ itemData?.C} prevMoneyType={moneyType}/>
                                                        )
                                                    }
                                                </div>
                                                <div className=" w-full flex justify-between">
                                                    <div>{  `Left ${itemData?.P}`}</div>
                                                    <div onClick={() => handlePopUp(item, itemData)}>
                                                        <Popup trigger={<ShoppingCartIcon
                                                            onClick={() => handlePopUp(item, itemData)}
                                                            className="cursor-pointer"
                                                        />}
                                                               {...{  contentStyle }}
                                                               position="right center"
                                                               onOpen={() => handlePopUp(item, itemData)}
                                                        >
                                                            <div className="  flex flex-col justify-between align-middle gap-1 ">
                                                                <div className="  flex justify-between align-middle gap-1 ">
                                                                    <RemoveIcon className=" cursor-pointer" onClick={() => handleDecrement(item, itemData)}/>
                                                                    {/*<div>{cartGood?.quantity ? cartGood?.quantity : 0}</div>*/}
                                                                    <div>{selectedNumber}</div>

                                                                    <AddIcon className=" cursor-pointer" onClick={() => handleIncrement(item, itemData)}/>
                                                                </div>
                                                                <button  className="text-white border-black bg-sky-500 rounded"
                                                                         onClick={() => confirmButton(item, itemData)}
                                                                >Confirm</button>

                                                            </div>

                                                        </Popup>
                                                    </div>


                                                </div>
                                            </div>
                                        ) : (<></>)
                                        )
                        })}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default MainPage;