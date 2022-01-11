import { parseXML } from "xml-pixi";
import { playFipAllAnimation } from "./animation";
import { CARD_SIZE, gameStructure, MAX_COL, MAX_ROW } from "./config";
import { FLIP_TYPE } from "./enum";
import { showUI } from "./ui";
import { addUserInteraction } from "./user";
import { wait } from "./utils";
import { flipAllCardTo, initCardType } from "./view";

export let gridView;

export const createGame = () => {
    gridView = parseXML(gameStructure,
        { cols: MAX_COL, rows: MAX_ROW, cellWidth: CARD_SIZE[0], cellHeight: CARD_SIZE[1] });

    initCardType(gridView);

    flipAllCardTo(FLIP_TYPE.FRONT, gridView);

    wait(1000).then(async () => {
        await playFipAllAnimation(FLIP_TYPE.BACK, gridView)
        addUserInteraction(gridView);

        showUI();

    });

    return gridView
}

