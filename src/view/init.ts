import { Container, Sprite, Texture } from "pixi.js";
import { getRandomTypeList } from "../algorithm";
import { ASSETS, MAX_COL, MAX_ROW } from "../config";

export const initCardType = (girdView: Container) => {
    const typeList = getRandomTypeList(ASSETS.frontList.length, MAX_COL * MAX_ROW);
    girdView.children.forEach(
        async (cardView: Container, index) => {
            const [back, front] = cardView.children as Sprite[];
            const type = typeList[index];
            front.texture = await Texture.fromURL(ASSETS.frontList[type]);
        }
    );
}

