import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {handleArrow} from "../../store/mainSlice";
function usePrevious(value: any) {
    const ref:any = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const Price = ({price, prevMoneyType}:any) => {
    const dispatch = useDispatch();
    const [style, setStyle] = useState<string>("text-black font-semibold");
    const moneyType = useSelector((state:RootState) => state.cart.moneyType);
    const prevAmount = usePrevious(price );
    const prevMoney = usePrevious(prevMoneyType);
    const arrow = useSelector((state: RootState) => state.main.arrow);

    useEffect(() => {
        if (prevMoney === true ) {
            setStyle("text-black ");
            dispatch(handleArrow(""));
        }
        if (moneyType === true ) {
            setStyle("text-black ");
            dispatch(handleArrow(""));
        }
        if (prevMoney === false  && moneyType === false ) {
                if ( prevAmount > price) {
                    dispatch(handleArrow("down"));
                    setStyle("text-green-400 ");
                }
                if (prevAmount < price) {
                    dispatch(handleArrow("up"));
                    setStyle("text-red-500 ");
                }
                return ;
            }

    }, [price, prevAmount, prevMoney]);
    return (
        <div className={ ` font-semibold flex justify-center align-middle py-2 ${style} transition duration-300 ease-linear`} >

            {arrow === "up" ? (
                <ArrowUpwardIcon className="animate-pulse" />
            ) : arrow === "down" ? (
                <ArrowDownwardIcon className="animate-pulse"/>
                ) : (
                    <></>
                )
            }
            <div className=" ease-linear transition duration-300" >
                { moneyType ? `$${Math.floor(price)}` : `${Math.floor(price)}c.`}
            </div>
        </div>
    )
}

export default Price;