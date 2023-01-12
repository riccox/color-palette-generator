import chroma from "chroma-js";
import {HEXColor} from "./index";

/**
 * returns a new hex color string array by given primary color.
 * the primary color would be the middle of the array.
 * @author Ricco Xie
 * @param color primary color string
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const singleColorPalette = (color: string, numOfShades: number = 12): HEXColor[] => {
    return chroma.scale([chroma(color).luminance(0.975), color, chroma(color).luminance(0.015)])
        .colors(numOfShades, 'hex') as HEXColor[];
}
