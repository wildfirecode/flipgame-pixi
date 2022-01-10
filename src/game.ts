import { Container, Sprite, Texture } from "pixi.js";
import { wait } from "teddi-lodash";
import { parseXML } from "xml-pixi";
import { getRandomTypeList } from "./algorithm";
import { playFipAllAnimation } from "./animation";
import { FLIP_TYPE } from "./card";
import { gameStructure, MAX_COL, MAX_ROW, CARD_SIZE, ASSETS } from "./config";
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

const initCardType = (girdView: Container) => {
    const typeList = getRandomTypeList(ASSETS.frontList.length, MAX_COL * MAX_ROW);
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