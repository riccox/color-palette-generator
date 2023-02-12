import chroma from "chroma-js";
import { HEXColor } from "./index";

/**
 * returns a new hex color string array by given primary color hue (and sat) value.
 * @author Ricco Xie
 * @param hue primary color hue
 * @param sat primary color sat, default:0.75
 * @param numOfShades Optional, number of return shades, default:12
 * @return a new hex color string array
 */
export const calculateColorPalette = (
  hue: number,
  sat: number = 0.75,
  numOfShades: number = 12
): HEXColor[] => {
  return chroma
    .scale(
      [
        0.97, 0.94, 0.86, 0.77, 0.66, 0.5, 0.45, 0.39, 0.33, 0.27, 0.21, 0.11,
        0.03,
      ].map((lum) => chroma.hsl(hue, sat, lum))
    )
    .colors(numOfShades, "hex") as HEXColor[];
};

/**
 * returns a new hex color string array by given primary color.
 * @author Ricco Xie
 * @param color primary color string
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const singleColorPalette = (
  color: string,
  numOfShades: number = 12
): HEXColor[] => {
  const [hue, sat] = chroma(color).hsl();
  return calculateColorPalette(hue, sat, numOfShades);
};

/**
 * returns a new hex color string array by given primary color.
 * reference: https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale
 * @author Ricco Xie
 * @param color primary color string
 * @param colorSchema Optional, default to 'light'
 * @return a new hex color string array whose length is 12. (50~1100)
 */
export const generateRadixColorPalette = (
  color: string,
  colorSchema: "light" | "dark" = "light"
): HEXColor[] => {
  const [hue, sat] = chroma(color).hsl();

  const lumScaleLight = [
    0.978, 0.938, 0.902, 0.868, 0.832, 0.804, 0.747, 0.659, 0.541, 0.453, 0.27,
    0.086,
  ];
  const lumScaleDark = [
    0.07, 0.11, 0.136, 0.158, 0.179, 0.205, 0.243, 0.313, 0.439, 0.52, 0.61,
    0.93,
  ];
  const lumScaleWhite = [
    1, 0.975, 0.94, 0.905, 0.875, 0.845, 0.815, 0.77, 0.18, 0.13, 0.07, 0,
  ];
  const lumScaleBlack = [
    0, 0.035, 0.075, 0.1, 0.12, 0.155, 0.19, 0.225, 0.91, 0.94, 0.975, 1,
  ];

  if (hue > 0 && sat > 0) {
    return (colorSchema === "dark" ? lumScaleDark : lumScaleLight).map(
      (lum) => chroma.hsl(hue, sat, lum).hex() as HEXColor
    );
  }

  return (colorSchema === "dark" ? lumScaleBlack : lumScaleWhite).map(
    (lum) => chroma.hsl(0, 0, lum).hex() as HEXColor
  );
};

/**
 * returns a hex color string array from white to black scales.
 * @author Ricco Xie
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const getBlackWhiteColorPalette = (
  numOfShades: number = 12
): HEXColor[] => {
  return chroma.scale().colors(numOfShades, "hex") as HEXColor[];
};
