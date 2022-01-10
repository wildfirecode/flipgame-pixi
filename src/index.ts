import * as TWEEN from "@tweenjs/tween.js";
import { Application } from "pixi.js";
import { initParser } from "xml-pixi";
import { ASSETS } from "./config";
import { createGame } from "./game";

//Create a Pixi Application
let app = new Application({
    width: 750,
    height: 750 / window.innerWidth * window.innerHeight,
});

app.renderer.view.style.width = '100%'
app.renderer.view.style.height = '100%'

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// Setup the animation loop.
function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}
requestAnimationFrame(animate)

const setup =  () => {

    initParser(ASSETS);

    const game = createGame();

    app.stage.addChild(game);
}

setup();
