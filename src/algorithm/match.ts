/**
 * 在卡面朝上且未配对的卡片中找出可配对的卡片
 * @param userCards 卡面朝上且未配对的卡片
 * @param match 配对检测方法
 */
export const getMatchedCards = (userCards: any[], match: (card0, card1) => boolean) => {
    const result: any[] = [];
    userCards = userCards.concat();//深拷贝
    while (userCards.length > 0) {
        const card0 = userCards.pop();//如果本轮没有找到，那么说明没有可匹配元素，直接抛弃
        for (let i = 0; i < userCards.length; i++) {
            const card1 = userCards[i];
            if (match(card0, card1)) { //判断是否配对
                userCards.splice(i, 1); //匹配了之后需要移除                
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