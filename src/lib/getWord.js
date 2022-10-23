import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
} from "date-fns";
import { default as GraphemeSplitter } from "grapheme-splitter";
import { WORDS, WORD } from "../constants/wordlist";
import { VALID_GUESSES } from "../constants/validGuesses";
import { getGuessStatuses } from "./getStatuses";
import { NOT_CONTAINED_MESSAGE, WRONG_SPOT_MESSAGE } from "../constants/strings";
import { ENABLE_ARCHIVED_GAMES } from "../constants/settings";
import queryString from "query-string";
import { getToday } from "./dateutils";

export const firstGameDate = new Date(2022, 0);

export const getSolution = () => {
 
  // const nextGameDate = getNextGameDate(gameDate);
 
  // const index = getIndex(gameDate);
 
  // const wordOfTheDay = getWordOfDay(index);


  return {
    solution: "RONEN",
   
  };
};


export const unicodeSplit = (word) => {
  return new GraphemeSplitter().splitGraphemes(word);
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

export const unicodeLength = (word) => {
  return unicodeSplit(word).length;
};

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
export const isWordInWordList = (word) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  );
};

export const isWinningWord = (word, solution) => {
  return solution === word;
};

export const getIsLatestGame = () => {
 
  if (!ENABLE_ARCHIVED_GAMES) {
    return true;
  }
  const parsed = queryString.parse(window.location.search);

  return parsed === null || !("d" in parsed);
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
export const {
  solution,
  solutionGameDate,
  solutionIndex,
  tomorrow,
} = getSolution(getGameDate());
