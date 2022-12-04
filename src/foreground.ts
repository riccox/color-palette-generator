import {HEXColor} from "./index";

/**
 * return a new hex color string (#000 or #FFF) by given background color.
 * @author Ricco Xie
 * @param bgColor background color hex string
 * @return a new hex color string (#000 or #FFF)
 */
export const guessForegroundColor = (bgColor: HEXColor): "#000" | "#fff" => {
    let bgHex = String(bgColor).replace(/[^\da-f]/gi, "");
    if (bgHex.length < 6) {
        bgHex = bgHex[0] + bgHex[0] + bgHex[1] + bgHex[1] + bgHex[2] + bgHex[2];
    }
    const rgb = parseInt(bgHex, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma > 164 ? "#000" : "#fff";
};