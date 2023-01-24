import chroma from "chroma-js";
import {HEXColor} from "./index";

/**
 * returns a new hex color string array by given primary color.
 * the primary color would be near the middle of the array.
 * @author Ricco Xie
 * @param color primary color string
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const singleColorPalette = (color: string, numOfShades: number = 12): HEXColor[] => {
    return chroma.scale([chroma(color).luminance(0.995), color, chroma(color).luminance(0.015)])
        .colors(numOfShades, 'hex') as HEXColor[];
}

/**
 * returns a new hex color string array by given primary color hue value.
 * the primary color would be near the middle of the array.
 * @author Ricco Xie
 * @param hue primary color hue
 * @param sat primary color sat, default:0.75
 * @param numOfShades Optional, number of return shades, default:12
 * @return a new hex color string array
 */
export const singleColorPaletteViaHue = (hue: number, sat: number = 0.75, numOfShades: number = 12): HEXColor[] => {
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
 * returns a hex color string array from white to black scales.
 * @author Ricco Xie
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const getBlackWhiteColorPalette = (numOfShades: number = 12): HEXColor[] => {
    return chroma.scale()
        .colors(numOfShades, 'hex') as HEXColor[];
}
