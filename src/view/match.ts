import { Sprite, Container } from "pixi.js";

/**
 * 获取卡面图案ID
 * @param image 
 * @returns 
 */
 const getTextureId = (image: Sprite) => {
    return image.texture.textureCacheIds[0]
}

export const match = (card0: Container, card1: Container) => {
    const [back0, front0] = card0.children as Sprite[];
    const [back1, front1] = card1.children as Sprite[];
    return getTextureId(front0) == getTextureId(front1)
}

