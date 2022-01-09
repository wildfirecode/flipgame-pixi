import { random } from "teddi-lodash";
import { ASSETS } from "../config/assets";
import { MAX_COL, MAX_ROW } from "../config/config";

const getNextType = () => {
    return random(ASSETS.frontList.length-1)
}

export const getTypeList = () => {
    let cardTypeList = [];
    for (let index = 0; index < (MAX_COL * MAX_ROW) / 2; index++) {
        const nextType = getNextType();
        cardTypeList.push(nextType, nextType);
    }    
    return cardTypeList
}