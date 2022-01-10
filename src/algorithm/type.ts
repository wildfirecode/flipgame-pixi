/**
 * 费舍尔-耶茨洗牌方法
 * @param array 
 */
export const shuffle = (array: number[]) => {
    const length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    let index = -1
    const lastIndex = length - 1
    const result = array.concat();
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
    }
    return result
}

const getNextPairType = (textureTypeNumbers: number) => {
    return Math.floor(Math.random() * textureTypeNumbers)
}
/**
 * 获取所有卡牌初始的卡面纹理
 * @param textureTypeNumber 卡面纹理类型的数量
 * @param cardNumber 卡片总数
 * @returns 
 */
export const getRandomTypeList = (textureTypeNumbers: number, cardNumbers: number) => {
    let cardTypeList = [];
    for (let index = 0; index < cardNumbers / 2; index++) {
        const nextType = getNextPairType(textureTypeNumbers);
        cardTypeList.push(nextType, nextType);
    }
    cardTypeList = shuffle(cardTypeList);
    return cardTypeList
}