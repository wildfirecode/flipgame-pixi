import { Container, InteractionEvent, Sprite } from "pixi.js";
import { wait } from "teddi-lodash";
import { getGridCellIndex, getMatchedCards, isSuccess } from "./algorithm";
import { playFlipAnimation } from "./animation";
import { CARD_SIZE, MAX_COL } from "./config";
import { FLIP_TYPE } from "./enum";
import { match } from "./view";

let matchedCards: Container[] = [];
const userCards: Container[] = [];
const lockedCards: Container[] = [];

function isMatchedCard(card: Container) {
    return matchedCards.indexOf(card) != -1
}
function isLockedCard(card: Container) {
    return lockedCards.indexOf(card) != -1
}

function isUserCard(card: Container) {
    return userCards.indexOf(card) != -1
}

function removeFromUserCards(card) {
    const index = userCards.indexOf(card);
    userCards.splice(index, 1)
}
function removeFromLockedCards(card) {
    const index = lockedCards.indexOf(card);
    lockedCards.splice(index, 1)
}

const onUserClick = async (e: InteractionEvent) => {
    const gridView = e.target as Container;
    const { x: stageX, y: stageY } = e.data.global;
    const index = getGridCellIndex([stageX, stageY], CARD_SIZE[0], CARD_SIZE[1], MAX_COL);
    const clickedCard = gridView.children[index] as Sprite;

    if (isMatchedCard(clickedCard)
        || isUserCard(clickedCard)
        || isLockedCard(clickedCard)) return;//已经匹配的元素不能再参与交互处理

    userCards.push(clickedCard);

    const currentMatchedCards = getMatchedCards(userCards,match);
    matchedCards = matchedCards.concat(currentMatchedCards);

    currentMatchedCards.forEach(matchedCard => removeFromUserCards(matchedCard));//匹配的元素立刻从userCards移除

    playFlipAnimation(FLIP_TYPE.FRONT, clickedCard);

    if (isSuccess(matchedCards, gridView.children)) {
        wait(1000).then(() => alert('勝利了'));
    } else {
        await wait(1000);
        if (!isMatchedCard(clickedCard)) {
            playFlipAnimation(FLIP_TYPE.BACK, clickedCard).then(() => {
                removeFromLockedCards(clickedCard)
            });
            removeFromUserCards(clickedCard);
            lockedCards.push(clickedCard)
        }
    }
}

export const addUserInteraction = (gridView: Container) => {
    gridView.interactive = true;
    gridView.on('pointerdown', onUserClick);
}