import { wait } from "teddi-lodash";
import { parseXML } from "xml-pixi";
import { playFipAllAnimation } from "./animation";
import { CARD_SIZE, gameStructure, MAX_COL, MAX_ROW } from "./config";
import { FLIP_TYPE } from "./enum";
import { addUserInteraction } from "./user";
import { flipAllCardTo, initCardType } from "./view";


export const createGame = () => {
    const gridView = parseXML(gameStructure,
        { cols: MAX_COL, rows: MAX_ROW, cellWidth: CARD_SIZE[0], cellHeight: CARD_SIZE[1] });

    initCardType(gridView);

    flipAllCardTo(FLIP_TYPE.FRONT, gridView);

    wait(1000).then(async () => {
        await playFipAllAnimation(FLIP_TYPE.BACK, gridView)
        addUserInteraction(gridView);
    });

    return gridView
}

