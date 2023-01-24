import {HEXColor} from "./index";
import chroma from 'chroma-js';

/**
 * return a new hex color string (#000 or #FFF) by given background color.
 * @author Ricco Xie
 * @param bgColor background color hex string
 * @return a new hex color string (#000 or #FFF)
 */
export const foregroundColor = (bgColor: HEXColor): "#000000" | "#FFFFFF" => {
    const luma = chroma(bgColor).luminance();
    const alpha = chroma(bgColor).alpha();
    if (luma < 0.5 && alpha < 0.5) return '#000000';
    return luma > 0.5 ? "#000000" : "#FFFFFF";
};

/**
 * return a new hex color string by given background color.
 * use lum to calculate
 * @author Ricco Xie
 * @param bgColor background color hex string
 * @return a new hex color string
 */
export const foregroundColorViaLum = (bgColor: HEXColor): HEXColor => {
    const luma = chroma(bgColor).luminance();
    const alpha = chroma(bgColor).alpha();
    let targetLum = luma > 0.5 ? luma - 0.5 : luma + 0.5;
    if (targetLum > 0.5 && alpha < 0.5) targetLum = 0.4;
    return chroma(bgColor).luminance(targetLum).hex() as HEXColor;
};