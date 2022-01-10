import { Container } from "pixi.js";
import { FLIP_TYPE } from "../enum";

export const flipCardTo = (type: FLIP_TYPE, cardView: Container) => {
    const toFront = type == FLIP_TYPE.FRONT;
    const [back, front] = cardView.children;
    back.scale.x = 1;
    front.scale.x = 1;
    back.visible = !toFront;
    front.visible = toFront;
}

export const flipAllCardTo = (type: FLIP_TYPE, gridView: Container) => {
    gridView.children.forEach(
        (cardView: Container) => flipCardTo(type, cardView))
}