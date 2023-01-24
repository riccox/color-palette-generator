import chroma from "chroma-js";
import {HEXColor} from "./index";

/**
 * returns a new hex color string array by given primary color hue (and sat) value.
 * @author Ricco Xie
 * @param hue primary color hue
 * @param sat primary color sat, default:0.75
 * @param numOfShades Optional, number of return shades, default:12
 * @return a new hex color string array
 */
export const calculateColorPalette = (hue: number, sat: number = 0.75, numOfShades: number = 12): HEXColor[] => {
    return chroma.scale([
        0.97,
        0.94,
        0.86,
        0.77,
        0.66,
        0.50,
        0.45,
        0.39,
        0.33,
        0.27,
        0.21,
        0.11,
        0.03
    ].map(lum => chroma.hsl(hue, sat, lum))).colors(numOfShades, 'hex') as HEXColor[];
}

/**
 * returns a new hex color string array by given primary color.
 * @author Ricco Xie
 * @param color primary color string
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const singleColorPalette = (color: string, numOfShades: number = 12): HEXColor[] => {
    const [hue,sat] = chroma(color).hsl();
    return calculateColorPalette(hue,sat,numOfShades);
}

/**
 * returns a hex color string array from white to black scales.
 * @author Ricco Xie
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const getBlackWhiteColorPalette = (numOfShades: number = 12): HEXColor[] => {
    return chroma.scale()
        .colors(numOfShades, 'hex') as HEXColor[];
}
