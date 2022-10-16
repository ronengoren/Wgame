const gameStateKey = 'gameState';
const wordArrKey = 'wordArr';

const archiveGameStateKey = 'archiveGameState';
const highContrastKey = 'highContrast';
export const saveGameStateToLocalStorage = (isLatestGame, gameState) => {
    const key = isLatestGame ? gameStateKey : archiveGameStateKey;
    localStorage.setItem(key, JSON.stringify(gameState));
};
export const loadGameStateFromLocalStorage = isLatestGame => {
    const key = isLatestGame ? gameStateKey : archiveGameStateKey;
    const state = localStorage.getItem(key);
    return state ? JSON.parse(state) : null;
};
const gameStatKey = 'gameStats';
export const saveStatsToLocalStorage = gameStats => {
    localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};
export const saveNewWord = newWord => {
    let wordArr = JSON.parse(localStorage.getItem(wordArrKey)) || [];
    wordArr.push(newWord);

    localStorage.setItem(wordArrKey, JSON.stringify(wordArr));
};
export const getNewWord = () => {
    const newWord = JSON.parse(localStorage.getItem(wordArrKey)) || [];

    return newWord;
};
export const loadStatsFromLocalStorage = () => {
    const stats = localStorage.getItem(gameStatKey);
    return stats ? JSON.parse(stats) : null;
};
export const setStoredIsHighContrastMode = isHighContrast => {
    if (isHighContrast) {
        localStorage.setItem(highContrastKey, '1');
    } else {
        localStorage.removeItem(highContrastKey);
    }
};
export const getStoredIsHighContrastMode = () => {
    const highContrast = localStorage.getItem(highContrastKey);
    return highContrast === '1';
};
