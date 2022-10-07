import namesData from "../data/names.json";
import mainData from "../data/data.json";
import {useDebounce} from "./Debounce";
import {handleCurrencyChange} from "../store/cartSlice";


export const sortedData =  () => {
        let names = Object.assign([], namesData);
        let notEmpty:any = [];
        for (let i = 0 ; i < names.length; i++) {
                if ( names[i] !== undefined ) {
                        notEmpty.push(names[i])
                }
        }
        return notEmpty;
};

export const sortedGoodData =  () => {
        let sortedItemData = [];
        let oneItem = [];
        const itemData = mainData.Value.Goods.map((el) => {
                const price = el.C;
                const category = el.G;
                const remained = el.P;
                const goodId = el.T;
        })

};




