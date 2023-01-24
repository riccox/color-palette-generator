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
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const singleColorPaletteViaHue = (hue: number, numOfShades: number = 12): HEXColor[] => {
    return chroma.scale([chroma.hsl(hue,1,0.99), chroma.hsl(hue,1,0.01)])
        .colors(numOfShades, 'hex') as HEXColor[];
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
