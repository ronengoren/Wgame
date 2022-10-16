import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
} from "date-fns";
import { default as GraphemeSplitter } from "grapheme-splitter";
import queryString from "query-string";
import { ENABLE_ARCHIVED_GAMES } from "../constants/settings";
import {
  NOT_CONTAINED_MESSAGE,
  WRONG_SPOT_MESSAGE,
} from "../constants/strings";
import { VALID_GUESSES } from "../constants/validGuesses";
import { WORDS, WORD } from "../constants/wordlist";
import { getToday } from "./dateutils";
import { getGuessStatuses } from "./statuses";
// 1 January 2022 Game Epoch
export const firstGameDate = new Date(2022, 0);
export const periodInDays = 1;
export const isWordInWordList = (word) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  );
};
export const isWinningWord = (word) => {
  return solution === word;
};
// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word, guesses) => {
  if (guesses.length === 0) {
    return false;
  }
  const lettersLeftArray = [];
  const guess = guesses[guesses.length - 1];
  const statuses = getGuessStatuses(solution, guess);
  const splitWord = unicodeSplit(word);
  const splitGuess = unicodeSplit(guess);
  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === "correct" || statuses[i] === "present") {
      lettersLeftArray.push(splitGuess[i]);
    }
    if (statuses[i] === "correct" && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1);
    }
  }
  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n;
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter);
    if (n !== -1) {
      lettersLeftArray.splice(n, 1);
    }
  }
  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0]);
  }
  return false;
};
export const unicodeSplit = (word) => {
  return new GraphemeSplitter().splitGraphemes(word);
};
export const unicodeLength = (word) => {
  return unicodeSplit(word).length;
};
export const localeAwareLowerCase = (text) => {
  if (!text) {
    return;
  }
    return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase();
 
};
export const localeAwareUpperCase = (text) => {
  if (!text) {
    return;
  }

 return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase();
};
export const getLastGameDate = (today) => {
  const t = startOfDay(today);
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays;
  return addDays(t, -daysSinceLastGame);
};
export const getNextGameDate = (today) => {
  return addDays(getLastGameDate(today), periodInDays);
};
export const isValidGameDate = (date) => {
  if (date < firstGameDate || date > getToday()) {
    return false;
  }
  return differenceInDays(firstGameDate, date) % periodInDays === 0;
};
export const getIndex = (gameDate) => {
  let start = firstGameDate;
  let index = -1;
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);
  return index;
};
export const getWordOfDay = (index) => {

  if (index < 0) {
    throw new Error("Invalid index");
  }
  const queryString = window.location.search;
  if (!queryString) {
   return;
  }
 
  console.log('=====queryString===============================');
  console.log(queryString);
  console.log('====================================');
  const urlParams = new URLSearchParams(queryString);
  console.log('=====urlParams===============================');
  console.log(urlParams);
  console.log('====================================');
  const currentEncWord = urlParams.get('getword')
  console.log('=====currentEncWord===============================');
  console.log(currentEncWord);
  console.log('====================================');
  var decodedData = window.atob(currentEncWord); // decode the string
  console.log('=====decodedData===============================');
  console.log(decodedData);
  console.log('====================================');

  
let WordBefore = WORD.length

  WORD.push(decodedData.toLowerCase())
  WORDS.push(decodedData.toLowerCase())
if (WORD.length > WordBefore) {
  return localeAwareUpperCase(WORD[index % WORD.length]);
}

 
};
export const getSolution = (gameDate) => {
 
  const nextGameDate = getNextGameDate(gameDate);
 
  const index = getIndex(gameDate);
 
  const wordOfTheDay = getWordOfDay(index);
  return {
    solution: wordOfTheDay,
    solutionGameDate: gameDate,
    solutionIndex: index,
    tomorrow: nextGameDate.valueOf(),
  };
};
export const getGameDate = () => {
 
  if (getIsLatestGame()) {
    return getToday();
  }
  const parsed = queryString.parse(window.location.search);
  try {
    const d = startOfDay(parseISO(parsed.d.toString()));
    if (d >= getToday() || d < firstGameDate) {
      setGameDate(getToday());
    }
    return d;
  } catch (e) {
    console.log(e);
    return getToday();
  }
};
export const setGameDate = (d) => {
  try {
    if (d < getToday()) {
      window.location.href = "/?d=" + formatISO(d, { representation: "date" });
      return;
    }
  } catch (e) {
    console.log(e);
  }
  window.location.href = "/";
};
export const getIsLatestGame = () => {
 
  if (!ENABLE_ARCHIVED_GAMES) {
    return true;
  }
  const parsed = queryString.parse(window.location.search);

  return parsed === null || !("d" in parsed);
};
export const {
  solution,
  solutionGameDate,
  solutionIndex,
  tomorrow,
} = getSolution(getGameDate());
