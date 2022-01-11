import { GlowFilter } from "@pixi/filter-glow"
export const highlight = (card) => {
    card.filters = [new GlowFilter({ distance: 30, outerStrength: 2, color: 0x00ff00 })]
}
export const clearHighlight = (card) => {
    card.filters = []
}