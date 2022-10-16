import { UAParser } from 'ua-parser-js';
import { MAX_CHALLENGES } from '../constants/settings';
import { GAME_TITLE } from '../constants/strings';
import { getGuessStatuses } from './statuses';
import { solutionIndex, unicodeSplit } from './words';
const webShareApiDeviceTypes = ['mobile', 'smarttv', 'wearable'];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();
export const shareStatus = (solution, guesses, lost, isHardMode, isDarkMode, isHighContrastMode, handleShareToClipboard, handleShareFailure) => {
    const textToShare = `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` +
        generateEmojiGrid(solution, guesses, getEmojiTiles(isDarkMode, isHighContrastMode));
    const shareData = { text: textToShare };
    let shareSuccess = false;
    try {
        if (attemptShare(shareData)) {
            navigator.share(shareData);
            shareSuccess = true;
        }
    }
    catch (error) {
        shareSuccess = false;
    }
    try {
        if (!shareSuccess) {
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(textToShare)
                    .then(handleShareToClipboard)
                    .catch(handleShareFailure);
            }
            else {
                handleShareFailure();
            }
        }
    }
    catch (error) {
        handleShareFailure();
    }
};
export const generateEmojiGrid = (solution, guesses, tiles) => {
    return guesses
        .map((guess) => {
        const status = getGuessStatuses(solution, guess);
        const splitGuess = unicodeSplit(guess);
        return splitGuess
            .map((_, i) => {
            switch (status[i]) {
                case 'correct':
                    return tiles[0];
                case 'present':
                    return tiles[1];
                default:
                    return tiles[2];
            }
        })
            .join('');
    })
        .join('\n');
};
const attemptShare = (shareData) => {
    var _a, _b;
    return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    ((_a = browser.name) === null || _a === void 0 ? void 0 : _a.toUpperCase().indexOf('FIREFOX')) === -1 &&
        webShareApiDeviceTypes.indexOf((_b = device.type) !== null && _b !== void 0 ? _b : '') !== -1 &&
        navigator.canShare &&
        navigator.canShare(shareData) &&
        navigator.share);
};
const getEmojiTiles = (isDarkMode, isHighContrastMode) => {
    let tiles = [];
    tiles.push(isHighContrastMode ? '🟧' : '🟩');
    tiles.push(isHighContrastMode ? '🟦' : '🟨');
    tiles.push(isDarkMode ? '⬛' : '⬜');
    return tiles;
};
