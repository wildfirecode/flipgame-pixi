import { Container, Sprite } from "pixi.js";

const getTextureId = (image: Sprite) => {
    return image.texture.textureCacheIds[0]
}

export const getMatchedCards = (userCards: Container[]) => {
    const result:Container[]=[];
    userCards = userCards.concat();//深拷贝
    while (userCards.length > 0) {
        const item0 = userCards.pop();//如果本轮没有找到，那么说明没有可匹配元素，直接抛弃
        const [back0,front0] = item0.children as Sprite[];
        for (let i = 0; i < userCards.length; i++) {
            const item1 = userCards[i];
            const [back1,front1] = item1.children as Sprite[];
            if (getTextureId(front0) == getTextureId(front1)) {
                userCards.splice(i, 1); //匹配了之后需要移除                
                result.push(item0,item1)
                break;
            }
        }
    }
    return result;
}

export const isSuccess = (matched:Container[], gridView:Container)=>{
    return matched.length == gridView.children.length
}   