import { Container } from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import { FLIP_TYPE } from "./enum";

export const playFipAllAnimation = (type: FLIP_TYPE, gridView: Container) => {
    return Promise.all(
        gridView.children.map(
            (child: Container) => playFlipAnimation(type, child))
    )
}
export const playFlipAnimation = (type: FLIP_TYPE, cardView: Container) => {
    return new Promise((resolve) => {
        const toFront = type == FLIP_TYPE.FRONT;
        const [back, front] = cardView.children;

        const DURATION = 300;

        back.visible = front.visible = true;
        back.scale.x = front.scale.x = 0;

        const callback = () => {
            back.visible = !toFront;
            front.visible = toFront;
            resolve(cardView);
        }

        const tweenBack = new TWEEN.Tween(back.scale);
        const tweenFront = new TWEEN.Tween(front.scale);
        if (toFront) {
            back.scale.x = 1;
            tweenBack.to({ x: 0 }, DURATION).start().onComplete(() => {
                tweenFront.to({ x: 1 }, DURATION).start().onComplete(callback);
            });
        } else {
            front.scale.x = 1;
            tweenFront.to({ x: 0 }, DURATION).start().onComplete(() => {
                tweenBack.to({ x: 1 }, DURATION).start().onComplete(callback);
            });
        }

    })
}