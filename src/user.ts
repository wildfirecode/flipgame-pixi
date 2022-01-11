import { Container, InteractionEvent, Sprite } from "pixi.js";
import { getGridCellIndex, getMatchedCards, isSuccess } from "./algorithm";
import { playFlipAnimation } from "./animation";
import { CARD_SIZE, MAX_COL } from "./config";
import { FLIP_TYPE } from "./enum";
import { wait } from "./utils";
import { match } from "./view";

function includeCard(card, cardList) { return cardList.indexOf(card) != -1 }

function removeCard(card, cardList) {
    const index = cardList.indexOf(card);
    cardList.splice(index, 1)
}

let matchedCards: Container[] = [];
const userCards: Container[] = [];
const lockedCards: Container[] = [];

const onUserClick = async (e: InteractionEvent) => {
    const gridView = e.target as Container;
    const { global } = e.data;
    const index = getGridCellIndex([global.x, global.y], CARD_SIZE[0], CARD_SIZE[1], MAX_COL);
    const clickedCard = gridView.children[index] as Sprite;//获取到点击位置对应的卡片

    if (includeCard(clickedCard, matchedCards)//已经配对的元素不能再参与交互处理
        || includeCard(clickedCard, userCards) //在未完成回退翻转前，userCards内的卡片不能参与交互处理。
        || includeCard(clickedCard, lockedCards)) //回退动画播放过程中，需要禁用目标卡片的交互，而且还不能和其他卡片进行匹配。
        return;

    userCards.push(clickedCard);//立刻存储，在之后的1秒内等待配对

    const currentMatchedCards = getMatchedCards(userCards, match);//在卡面朝上且未配对的卡片中找出可配对的卡片，每次点击都要处理

    matchedCards = matchedCards.concat(currentMatchedCards);//立刻存储配对卡片，currentMatchedCards可能为空

    currentMatchedCards.forEach(matchedCard => removeCard(matchedCard, userCards));//匹配的元素立刻从userCards移除

    playFlipAnimation(FLIP_TYPE.FRONT, clickedCard);//立刻翻转，没有动画

    if (isSuccess(matchedCards, gridView.children)) {
        wait(1000).then(() => alert('胜利了'));
    } else {
        await wait(1000);//这里的wait没有做中断处理，但是会让代码的可读性有一些提升
        if (!includeCard(clickedCard, matchedCards)) { //如果没有配对，就需要回退翻转，并且恢复交互
            playFlipAnimation(FLIP_TYPE.BACK, clickedCard).then(()=>{
                removeCard(clickedCard,lockedCards)
            });
            removeCard(clickedCard, userCards);
            lockedCards.push(clickedCard);
        }
    }
}

export const addUserInteraction = (gridView: Container) => {
    gridView.interactive = true;
    gridView.on('pointerdown', onUserClick);
}