import { Container, Sprite, Texture } from "pixi.js";
import { shuffle, wait } from "teddi-lodash";
import { parseXML } from "xml-pixi";

import { getTypeList } from "./algorithm/type";
import { playFipAllAnimation, playFlipAnimation } from "./animation";
import { ASSETS } from "./config/assets";
import { CARD_SIZE, MAX_COL, MAX_ROW } from "./config/config";
import { gameStructure } from "./config/structure";
import { addUserInteraction } from "./user";

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

export enum FLIP_TYPE {
    FRONT = 'FRONT',
    BACK = 'BACK',
}

const initCardType = (girdView: Container) => {
    const typeList = shuffle(getTypeList());
    girdView.children.forEach(
        async (cardView: Container, index) => {
            const [back, front] = cardView.children as Sprite[];
            const type = typeList[index];
            front.texture = await Texture.fromURL(ASSETS.frontList[type]);
        }
    );
}

const flipCardTo = (type: FLIP_TYPE, cardView: Container) => {
    const toFront = type == FLIP_TYPE.FRONT;
    const [back, front] = cardView.children;
    back.scale.x = 1;
    front.scale.x = 1;
    back.visible = !toFront;
    front.visible = toFront;
}

const flipAllCardTo = (type: FLIP_TYPE, gridView: Container) => {
    gridView.children.forEach(
        (cardView: Container) => flipCardTo(type, cardView))
}