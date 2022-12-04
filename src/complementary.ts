import {HEXColor} from "./index";

/**
 * return a new hex complementary color string by given source color.
 * @author Ricco Xie
 * @param color source color hex string
 * @return a new hex color string
 */
export const getComplementaryColor = (color: HEXColor): HEXColor => {
    const colorPart = color.slice(1);
    const ind = parseInt(colorPart, 16);
    let iter = ((1 << 4 * colorPart.length) - 1 - ind).toString(16);
    while (iter.length < colorPart.length) {
        iter = '0' + iter;
    }
    return `#${iter}`;
};