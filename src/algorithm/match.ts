/**
 * 在卡面朝上且未配对的卡片中找出可配对的卡片
 * @param cards 需要配对的卡片
 * @param match 配对检测方法
 */
export const getMatchedCards = (cards: any[], match: (card0, card1) => boolean) => {
    const result: any[] = [];
    cards = cards.concat();//深拷贝
    while (cards.length > 0) {
        const card0 = cards.pop();//如果本轮没有找到，那么说明没有可匹配元素，直接抛弃
        for (let i = 0; i < cards.length; i++) {
            const card1 = cards[i];
            if (match(card0, card1)) { //判断是否配对
                cards.splice(i, 1); //匹配了之后需要移除                
                result.push(card0, card1)
                break;
            }
        }
    }
    return result;
}

export const isSuccess = (matched: any[], allCards: any[]) => {
    return matched.length == allCards.length
}

function includeCard(card, cardList) { return cardList.indexOf(card) != -1 }
export const getUnmatchedCard = (allCard: any[], matchedCards: any[], userCards: any[], lockedCards: any[]) => {
    return allCard.filter(
        card =>
            !includeCard(card, matchedCards) &&
            !includeCard(card, userCards) &&
            !includeCard(card, lockedCards)
    )
}