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

import * as $Color from './Color';

function unique<T>(vals: T[]): T[] {

    return Array.from(new Set(vals));
}

type IColor = $Color.EStdColor | $Color.IColorCode24Bit | $Color.IColorCode8Bit;

/**
 * A simple printer helps printing text in spcified styles, into the terminal.
 */
export class Printer {

    private _styles: $Color.EStyles[] = [];

    private _ctCode: string = '';

    private _bgColor!: IColor | undefined;

    private _foreColor!: IColor | undefined;

    private _writeFn: (text: string) => void = console.log;

    /**
     * Set the output writer function/callback for this printer.
     */
    public setWriter(fn: (text: string) => void): this {

        this._writeFn = fn;

        return this;
    }

    private _rebuildCtCode(): void {

        this._ctCode = $Color.createStyleControlCode({
            styles: this._styles,
            bgColor: this._bgColor,
            foreColor: this._foreColor
        });
    }

    /**
     * Set (overwrite) the new styles of output text by this printer.
     */
    public setStyles(styles: $Color.EStyles[]): this {

        this._styles = unique(styles);

        this._rebuildCtCode();

        return this;
    }

    /**
     * Remove determined styles of output text by this printer.
     */
    public removeStyles(styles: $Color.EStyles[]): this {

        this._styles = this._styles.filter((style) => !styles.includes(style));

        this._rebuildCtCode();

        return this;
    }

    /**
     * Add styles of output text by this printer.
     */
    public addStyles(styles: $Color.EStyles[]): this {

        this._styles = unique([...styles, ...this._styles]);

        this._rebuildCtCode();

        return this;
    }

    /**
     * Set the foreground color of output text by this printer.
     */
    public setForecolor(color: IColor): this {

        this._foreColor = color;

        this._rebuildCtCode();

        return this;
    }

    /**
     * Set the background color of output text by this printer.
     */
    public setBgcolor(color: IColor): this {

        this._bgColor = color;

        this._rebuildCtCode();

        return this;
    }

    /**
     * Reset background color into default state.
     */
    public resetBgcolor(): this {

        this._bgColor = undefined;

        this._rebuildCtCode();

        return this;
    }

    /**
     * Reset foreground color into default state.
     */
    public resetForecolor(): this {

        this._foreColor = undefined;

        this._rebuildCtCode();

        return this;
    }

    /**
     * Reset styles into default state.
     */
    public resetStyles(): this {

        this._styles = [];

        this._rebuildCtCode();

        return this;
    }

    /**
     * Reset all styles, forecolor, bgcolor into default state.
     */
    public resetAll(): this {

        this.resetStyles();
        this.resetForecolor();
        this.resetBgcolor();

        this._rebuildCtCode();

        return this;
    }

    /**
     * Get the styles
     */
    public getStyles(): $Color.EStyles[] {

        return [...this._styles];
    }

    /**
     * Get the foreground color of the printer.
     */
    public getForecolor(): IColor | null {

        return this._foreColor ?? null;
    }

    /**
     * Get the background color of the printer.
     */
    public getBgcolor(): IColor | null {

        return this._bgColor ?? null;
    }

    /**
     * This method writes text in specified style to the terminal.
     */
    public write(text: string): void {

        this._writeFn(this._ctCode + text + $Color.RESET_ALL);
    }
}
