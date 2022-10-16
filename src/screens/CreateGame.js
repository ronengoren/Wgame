import queryString from 'query-string';
import * as React from 'react';
import {  useState } from 'react';
import Div100vh from 'react-div-100vh';
import { default as GraphemeSplitter } from 'grapheme-splitter';

// import { NewWord } from '../components/newWord/NewWord';
import { Navbar } from '../components/navbar/Navbar';

import {  GAME_COPIED_MESSAGE, SHARE_GAME_MODAL_WORD } from '../constants/strings';
// import { useAlert } from '../context/AlertContext';
// import { getStoredIsHighContrastMode } from '../lib/localStorage';
// import { findFirstUnusedReveal, getIsLatestGame, isWinningWord, isWordInWordList, unicodeLength } from '../lib/words';
// import { loadStats } from '../lib/stats';
// import { ShareGameModal } from '../components/modals/ShareGameModal';
// import { shareWord } from '../lib/shareWord';

const CreateGame = () => {
    // let [searchParams, setSearchParams] = useSearchParams();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [isShareGameModal, setIsShareGameModal] = useState(false);

    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false);
    // const [isHighContrastMode, setIsHighContrastMode] = useState(getStoredIsHighContrastMode());
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme')
    // ? localStorage.getItem('theme') === 'dark'
    // : prefersDarkMode
    //     ? true
    //     : false);
    // const [isHardMode, setIsHardMode] = useState(localStorage.getItem('gameMode')
    // ? localStorage.getItem('gameMode') === 'hard'
    // : false);
    //     const [guesses, setGuesses] = useState([])

    // const [guesses, setGuesses] = useState(() => {
    //     const loaded = loadGameStateFromLocalStorage(isLatestGame);
    //     console.log('=====loaded===============================');
        
    //     console.log('====================================');
    //     if (
    //         (loaded === null || loaded === void 0
    //             ? void 0
    //             : loaded.solution) !== solution
    //     ) {
    //         return [];
    //     }
        // const gameWasWon = loaded.guesses.includes(solution);
        // if (gameWasWon) {
        //     setIsGameWon(true);
        // }
        // if (loaded.guesses.length === NEW_CHALLENGE && !gameWasWon) {
        //     setIsGameLost(true);
        //     showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        //         persist: true,
        //     });
        // }
        // return loaded.guesses;
    // });
    // const isLatestGame = getIsLatestGame();
    // const [isGameWon, setIsGameWon] = useState(false);

    // const [currentGuess, setCurrentGuess] = useState('');
    // const [isRevealing, setIsRevealing] = useState(false);
    // const [currentRowClass, setCurrentRowClass] = useState('');
    // const [isGameLost, setIsGameLost] = useState(false);
    // const [stats, setStats] = useState(() => loadStats());
    // const {
    //     showError: showErrorAlert,
    //     showSuccess: showSuccessAlert,
    // } = useAlert();

    // const currentword = searchParams.get('currentword');
    // const queryParams = queryString.parse(window);
  //   const onChar = (value) => {
   
  //     if (unicodeLength(`${currentGuess}${value}`) <= 5 &&
  //         guesses.length < MAX_CHALLENGES &&
  //         !isGameWon) {

  //         setCurrentGuess(`${currentGuess}${value}`);
  //         setGuesses([...guesses, currentGuess]);
       

  //     }
  // };
//   const onDelete = () => {
  
//     setCurrentGuess(new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join(''));
//     setGuesses(new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join(''));

// };
// const onEnter = () => {

// if (currentGuess.length <5) {
//   return;
// }
// setIsShareGameModal(true)
//     // if (isGameWon || isGameLost) {
//     //     return;
//     // }
//     // if (!(unicodeLength(currentGuess) === solution.length)) {
//     //     setCurrentRowClass('jiggle');
//     //     return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
//     //         onClose: clearCurrentRowClass,
//     //     });
//     // }
//     // if (!isWordInWordList(currentGuess)) {
//     //     setCurrentRowClass('jiggle');
//     //     return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
//     //         onClose: clearCurrentRowClass,
//     //     });
//     // }
//     // enforce hard mode - all guesses must contain all previously revealed letters
//     // if (isHardMode) {
//     //     const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses);
//     //     if (firstMissingReveal) {
//     //         setCurrentRowClass('jiggle');
//     //         return showErrorAlert(firstMissingReveal, {
//     //             onClose: clearCurrentRowClass,
//     //         });
//     //     }
//     // }
//     // setIsRevealing(true);
//     // turn this back off after all
//     // chars have been revealed
//     // setTimeout(() => {
//     //     setIsRevealing(false);
//     // }, REVEAL_TIME_MS * solution.length);
//     // const winningWord = isWinningWord(currentGuess);

//     // if (unicodeLength(currentGuess) === solution.length &&
//     //     guesses.length < NEW_CHALLENGE &&
//     //     !isGameWon) {
//           // console.log('===enter=================================');
//           // console.log(currentGuess);
//           // console.log('====================================');
//         // setGuesses([...guesses, currentGuess]);
//         // setCurrentGuess('');
//         // if (winningWord) {
//         //     if (isLatestGame) {
//         //         setStats(addStatsForCompletedGame(stats, guesses.length));
//         //     }
//         //     return setIsGameWon(true);
//         // }
//         // if (guesses.length === NEW_CHALLENGE - 1) {
//         //     if (isLatestGame) {
//         //         setStats(addStatsForCompletedGame(stats, guesses.length + 1));
//         //     }
//         //     setIsGameLost(true);
//         //     showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
//         //         persist: true,
//         //         delayMs: REVEAL_TIME_MS * solution.length + 1,
//         //     });
//         // }
//     // }
// };
// const clearCurrentRowClass = () => {
//   setCurrentRowClass('');
// };

// const handleShare = () => {
//   const baseURL = `http://ronengoren/wordle?currentword=${currentGuess}`
//   // shareWord(solution, guesses, isGameLost, isHardMode, isDarkMode, isHighContrastMode, baseURL);
//    shareWord(baseURL,handleShareFailure,handleShareToClipboard);

// };

const handleShareFailure = () => {
console.log('handleShareFailure');

};
const handleShareToClipboard = () => {
  
//  console.log(showSuccessAlert(GAME_COPIED_MESSAGE));

};

    return (
        <Div100vh>
            <div className="flex h-full flex-col">
                <Navbar
                    setIsInfoModalOpen={setIsInfoModalOpen}
                    setIsStatsModalOpen={setIsStatsModalOpen}
                    setIsDatePickerModalOpen={setIsDatePickerModalOpen}
                    setIsSettingsModalOpen={setIsSettingsModalOpen}
                />
                <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">

                    <div className="flex grow flex-col justify-center pb-6 short:pb-2">
                        {/* <NewWord
                            // solution={solution}
                            guesses={guesses}
                            currentGuess={currentGuess}
                            // isRevealing={isRevealing}
                            // currentRowClassName={currentRowClass}
                        /> */}
                         <div className="flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white">
                                <p className="text-xl font-bold dark:text-white">{SHARE_GAME_MODAL_WORD}</p>

                                        </div>
                    </div>
                    {/* <CreateGameKeyboard 
                    onChar={onChar} 
                    onDelete={onDelete} 
                    onEnter={onEnter} 
                    // solution={solution} 
                    guesses={guesses} 
                    isRevealing={isRevealing}
                    /> */}
                     {/* <ShareGameModal 
                     isOpen={isShareGameModal} 
                     handleClose={() => setIsShareGameModal(false)} 
                     solution={currentGuess} 
                     guesses={guesses} 
                     gameStats={stats} 
                    //  isLatestGame={isLatestGame} 
                     isGameLost={isGameLost} 
                     isGameWon={isGameWon} 
                     handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)} 
                   

                     handleShareFailure={() => handleShareFailure()} 

                    //  handleShareFailure={() => showErrorAlert(SHARE_FAILURE_TEXT, { durationMs: LONG_ALERT_TIME_MS,})} 
                    // handleShare={() => handleShare()} 

                    isHardMode={isHardMode} 
                    isDarkMode={isDarkMode} 
                    isHighContrastMode={isHighContrastMode} 
                    numberOfGuessesMade={guesses.length}
                      /> */}
                </div>
                {/* <p>Value of location: {currentword}</p> */}
            </div>
        </Div100vh>
    );
};

export default CreateGame;
