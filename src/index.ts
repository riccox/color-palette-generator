const increaseDarkness = (hex: string, lum: number): string => {
    // validate hex string
    hex = String(hex).replace(/[^\da-f]/gi, "");
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    let rgb = "#",
        c,
        i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ("00" + c).substring(c.length);
    }
    return rgb;
};

const increaseBrightness = (hex: string, lum: number): string => {
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, "");

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length == 3) {
        hex = hex.replace(/(.)/g, "$1$1");
    }

    const r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);

    const pad = (n: string | number): string | number => {
        return n < 10 ? "0" + n : n;
    };
    return (
        "#" +
        pad((0 | ((1 << 8) + r + (256 - r) * lum)).toString(16).substring(1)) +
        pad((0 | ((1 << 8) + g + (256 - g) * lum)).toString(16).substring(1)) +
        pad((0 | ((1 << 8) + b + (256 - b) * lum)).toString(16).substring(1))
    );
};

/**
 * return a new hex color string (#000 or #FFF) by given background color.
 * @author Ricco Xie
 * @param bgHex background color hex string
 * @return a new hex color string (#000 or #FFF)
 */
export const guessForegroundColor = (bgHex: string): string => {
    bgHex = String(bgHex).replace(/[^\da-f]/gi, "");
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

/**
 * returns a new hex color string array by given primary color.
 * the primary color would be the middle of the array.
 * @author Ricco Xie
 * @param hex primary color hex string
 * @param numOfShades Optional, number of return shades
 * @return a new hex color string array
 */
export const generateColorPalette = (hex: string, numOfShades: number = 10): string[] => {
    const shades = [];
    const delta = 1.8 / numOfShades;
    let lum = -0.9;
    for (let i = 0; i < numOfShades; i++) {
        if (lum < 0.1) shades.push(increaseDarkness(hex, lum));
        else shades.push(increaseBrightness(hex, lum));
        lum += delta;
    }
    return shades;
}
