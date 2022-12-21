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