import { HEXColor } from "./index";
import chroma from "chroma-js";

/**
 * return a new hex color string with high contrast by given background color.
 * @author Ricco Xie
 * @param bgColor background color string
 * @return a new hex color string
 */
export const foregroundColor = (bgColor: string): "#000000" | "#FFFFFF" => {
  const [r, g, b] = chroma(bgColor).rgb();
  const sum = Math.round((r * 299 + g * 587 + b * 114) / 1000);
  return sum > 128 ? "#000000" : "#FFFFFF";
};

/**
 * return a new hex color string by given background color.
 * use lum to calculate
 * @author Ricco Xie
 * @param bgColor background color hex string
 * @return a new hex color string
 */
export const foregroundColorViaLum = (bgColor: HEXColor): HEXColor => {
  const lum = chroma(bgColor).luminance();
  const alpha = chroma(bgColor).alpha();
  let targetLum;
  if (lum < 0.25) {
    targetLum = 0.75;
  } else if (lum < 0.5) {
    targetLum = 1;
  } else if (lum < 0.75) {
    targetLum = 0;
  } else {
    targetLum = 0.25;
  }
  if (targetLum > 0.5 && alpha < 0.5) targetLum = 0.4;
  return chroma(bgColor).luminance(targetLum).hex() as HEXColor;
};

/**
 * invert color
 * return a new hex color string by given background color.
 * This has a bw option that will decide whether to invert to black or white; so you'll get more contrast which is generally better for the human eye.
 * @author Ricco Xie
 * @param hex background color hex string
 * @param bw bool, indicate if output black/white as result
 * @return a new hex color string
 */
export const invertColor = (h: HEXColor, bw: boolean = false): HEXColor => {
  let hex: string = h;
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  let r: string | number = parseInt(hex.slice(0, 2), 16),
    g: string | number = parseInt(hex.slice(2, 4), 16),
    b: string | number = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
};
function padZero(str: string, len = 2) {
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}
