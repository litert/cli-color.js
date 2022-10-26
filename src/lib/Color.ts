/**
 * Copyright 2022 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/restrict-plus-operands */

/**
 * The color code for 256 colors.
 *
 * - `0   -   7`:  standard colors (as in ESC [ 30–37 m)
 * - `8   -  15`:  high intensity colors (as in ESC [ 90–97 m)
 * - `16  - 231`:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5)
 * - `232 - 255`:  grayscale from black to white in 24 steps
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 */
export type IColorCode8Bit = `5;${number}`;

/**
 * A color code for 24-bit color, with red, green, and blue 3 channels.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#24-bit
 */
export type IColorCode24Bit = `2;${number};${number};${number}`;

/**
 * The 3-bit color codes collection.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit
 */
export enum EStdColor {

    /**
     * Usually black, but may be a dark grey, closed to black.
     */
    BLACK = 0,
    RED = 1,
    GREEN = 2,
    YELLOW = 3,
    BLUE = 4,
    MAGENTA = 5,
    CYAN = 6,
    /**
     * Usually light grey color, closed to white.
     */
    WHITE = 7,

    /**
     * Usually dark grey color, darker than light grey.
     */
    BRIGHT_BLACK = 60,
    BRIGHT_RED = 61,
    BRIGHT_GREEN = 62,
    BRIGHT_YELLOW = 63,
    BRIGHT_BLUE = 64,
    BRIGHT_MAGENTA = 65,
    BRIGHT_CYAN = 66,

    /**
     * High intensity white color, very closed to white.
     */
    BRIGHT_WHITE = 67,
}

export enum EStyles {

    /**
     * Reset all attributes
     */
    RESET_ALL = 0,

    /**
     * Bold or increased intensity
     */
    BOLD = 1,

    /**
     * Bold or increased intensity
     */
    HIGHER_INTENSITY = 1,

    /**
     * Faint, decreased intensity or second colour
     */
    LOWER_INTENSITY = 2,

    /**
     * Make text italic.
     */
    ITALIC = 3,

    /**
     * Add underline for text.
     */
    UNDERLINE = 4,

    /**
     * Sets blinking to less than 150 times per minute
     */
    SLOW_BLINKING = 5,

    /**
     * MS-DOS ANSI.SYS, 150+ per minute; not widely supported
     */
    RAPID_BLINKING = 6,

    /**
     * Reset the foreground color to the default.
     */
    RESET_FORECOLOR = 39,

    /**
     * Reset the background color to the default.
     */
    RESET_BGCOLOR = 49,
}

export interface IStyleOptions {

    /**
     * The foreground color.
     *
     * Use `create8BitColorCode`, `create24BitColorCode` or `EStdColor` to select your color code.
     *
     * @default default_terminal_forecolor
     */
    foreColor?: IColorCode24Bit | IColorCode8Bit | EStdColor;

    /**
     * The background color.
     *
     * Use `create8BitColorCode`, `create24BitColorCode` or `EStdColor` to select your color code.
     *
     * @default default_terminal_bgcolor
     */
    bgColor?: IColorCode24Bit | IColorCode8Bit | EStdColor;

    /**
     * The style flags.
     */
    styles?: EStyles[];
}

export interface IStyleRenderer {

    /**
     * This is a style renderer function for text in the terminal.
     *
     * > The renderer will wrap text in given style, and add a reset control code at the end.
     */
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (text: string): string;
}

/**
 * Create a 8-bit color, of 256 colors, while:
 *
 * - `0   -   7`:  standard colors (as in ESC [ 30–37 m)
 * - `8   -  15`:  high intensity colors (as in ESC [ 90–97 m)
 * - `16  - 231`:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5)
 * - `232 - 255`:  grayscale from black to white in 24 steps
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 *
 * @param code  The 8-bit color code.
 */
export function create8BitColorCode(code: number): IColorCode8Bit {

    return `5;${code}`;
}

/**
 * Create a color using 24-bit color space, with R,G,B 3 channels.
 *
 * @param red       The red channel, from 0 to 255.
 * @param green     The green channel, from 0 to 255.
 * @param blue      The blue channel, from 0 to 255.
 */
export function create24BitColorCode(red: number, green: number, blue: number): IColorCode24Bit {

    return `2;${red};${green};${blue}`;
}

/**
 * Create a styling control code of text in the terminal.
 */
export function createStyleControlCode(opts: IStyleOptions): string {

    const segs: Array<number | string> = opts.styles ?? [];

    if (opts.bgColor) {

        if (typeof opts.bgColor === 'string') {

            segs.push(`48;${opts.bgColor}`);
        }
        else {

            segs.push(opts.bgColor + 40);
        }
    }

    if (opts.foreColor) {

        if (typeof opts.foreColor === 'string') {

            segs.push(`38;${opts.foreColor}`);
        }
        else {

            segs.push(opts.foreColor + 30);
        }
    }

    if (!segs.length) {

        return '';
    }

    return `\x1b[${segs.join(';')}m`;
}

/**
 * This control code helps reset all control code to defaults.
 *
 * Output this to reset all styles in the terminal.
 */
export const RESET_ALL = createStyleControlCode({ styles: [EStyles.RESET_ALL] });

/**
 * This control code helps reset forecolor to default color.
 *
 * Output this to reset forecolor to default color. in the terminal.
 */
export const RESET_FORECOLOR = createStyleControlCode({ styles: [EStyles.RESET_FORECOLOR] });

/**
 * This control code helps reset backcolor to default color.
 *
 * Output this to reset backcolor to default color. in the terminal.
 */
export const RESET_BGCOLOR = createStyleControlCode({ styles: [EStyles.RESET_BGCOLOR] });

/**
 * Create a style renderer function for text in the terminal.
 *
 * > The renderer will wrap text in given style, and add a reset control code at the end.
 */
export function createStyleRenderer(opts: IStyleOptions): IStyleRenderer {

    const prefix = createStyleControlCode(opts);

    return (text: string) => text.length ? `${prefix}${text}${RESET_ALL}` : RESET_ALL;
}
