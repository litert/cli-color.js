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

import * as $Color from '../lib';

const tRed = $Color.createStyleRenderer({
    foreColor: $Color.EStdColor.RED
});

const tSkyblue = $Color.createStyleRenderer({
    foreColor: $Color.create24BitColorCode(0, 180, 255)
});

const tOrange208 = $Color.createStyleRenderer({
    foreColor: $Color.create8BitColorCode(208)
});

const tUnderlineRed = $Color.createStyleRenderer({
    foreColor: $Color.EStdColor.RED,
    styles: [ $Color.EStyles.UNDERLINE ]
});
const tUnderlineRedYellow = $Color.createStyleRenderer({
    foreColor: $Color.EStdColor.RED,
    bgColor: $Color.EStdColor.YELLOW,
    styles: [ $Color.EStyles.UNDERLINE ]
});

console.log(tSkyblue('Skyblue text: Hello World!'));
console.log(tRed('Red text: Hello World!'));
console.log(tOrange208('Orange (color 208, in 8-8it color) text: Hello World!'));
console.log(tUnderlineRed('Red & underline text: Hello World!'));
console.log(tUnderlineRedYellow('Red & yellow bg & underline text: Hello World!'));

const ctUnderline = $Color.createStyleControlCode({
    styles: [ $Color.EStyles.UNDERLINE ]
});

const ctRedF = $Color.createStyleControlCode({
    foreColor: $Color.EStdColor.RED
});

const ctYellowBG = $Color.createStyleControlCode({
    bgColor: $Color.EStdColor.BRIGHT_YELLOW
});

const ctBlink = $Color.createStyleControlCode({
    styles: [ $Color.EStyles.SLOW_BLINKING ]
});

console.log([
    ctUnderline,
    'Underline starts here.',
    ctRedF,
    'Red text starts here.',
    ctYellowBG,
    'Yellow background starts here.',
    ctBlink,
    'Blinking starts here.',
    $Color.RESET_FORECOLOR,
    'Text color ends here.',
    $Color.RESET_BGCOLOR,
    'Background color ends here.',
    $Color.RESET_ALL,
    'And finally all styles end here.'
].join(' '));
