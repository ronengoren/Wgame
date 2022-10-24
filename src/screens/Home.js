import * as React from 'react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Navbar } from '../components/navbar/Navbar';
import { InfoModal } from '../components/modals/InfoModal';
import { AlertContainer } from '../components/alerts/AlertContainer';
import { SettingsModal } from '../components/modals/SettingsModal';
import { MigrateStatsModal } from '../components/modals/MigrateStatsModal';
import { findFirstUnusedReveal, getGameDate, getIsLatestGame, isWinningWord, isWordInWordList, setGameDate, solution, solutionGameDate, unicodeLength, } from '../lib/words';
import { DatePickerModal } from '../components/modals/DatePickerModal';
import { getStoredIsHighContrastMode, setStoredIsHighContrastMode } from '../lib/localStorage';
import { StatsModal } from '../components/modals/StatsModal';
import { loadStats } from '../lib/stats';
import { useAlert } from '../context/AlertContext';
import { GAME_COPIED_MESSAGE, SHARE_FAILURE_TEXT } from '../constants/strings';
import { LONG_ALERT_TIME_MS } from '../constants/settings';

const Home = () => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert();

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [sentWords, setSentWords] = useState([]);
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme')
  ? localStorage.getItem('theme') === 'dark'
  : prefersDarkMode
      ? true
      : false);
  const [isHardMode, setIsHardMode] = useState(localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false);
  const [stats, setStats] = useState(() => loadStats());
  const isLatestGame = getIsLatestGame();
  const [guesses, setGuesses] = useState(() => {
    return [];
});
  const classes = classnames(
    'xxshort:w-11 xxshort:h-11 short:text-2xl short:w-12 short:h-12 w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    // {
    //     'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600': !status,
    //     'border-black dark:border-slate-100': value && !status,
    //     'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
    //         status === 'absent',
    //     'correct shadowed bg-orange-500 text-white border-orange-500':
    //         status === 'correct' && isHighContrast,
    //     'present shadowed bg-cyan-500 text-white border-cyan-500':
    //         status === 'present' && isHighContrast,
    //     'correct shadowed bg-green-500 text-white border-green-500':
    //         status === 'correct' && !isHighContrast,
    //     'present shadowed bg-yellow-500 text-white border-yellow-500':
    //         status === 'present' && !isHighContrast,
    //     'cell-fill-animation': isFilled,
    //     'cell-reveal': shouldReveal,
    // },
  );
  const [isHighContrastMode, setIsHighContrastMode] = useState(getStoredIsHighContrastMode());

  const handleHighContrastMode = (isHighContrast) => {
    setIsHighContrastMode(isHighContrast);
    setStoredIsHighContrastMode(isHighContrast);
};
const handleDarkMode = (isDark) => {
  setIsDarkMode(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};
const handleHardMode = (isHard) => {
  // if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
  //     setIsHardMode(isHard);
  //     localStorage.setItem('gameMode', isHard ? 'hard' : 'normal');
  // }
  // else {
  //     showErrorAlert(HARD_MODE_ALERT_MESSAGE);
  // }
};
  // useEffect(() => {
  //   const wordArr = getNewWord()
  //   if (wordArr) {
  //     setSentWords(wordArr);

  //   }

  // }, []);
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
        <div className="flex justify-center">
          <Link to="/wgame/create_game">
            <button
              // disabled={!isCopyButtonEnabled}
              // onClick={copyEmigrationCodeToClipboard}
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-left text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200
          disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm"
            >

              Create New Game
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to="/wgame/user_wordles">
            <button
              // disabled={!isCopyButtonEnabled}
              // onClick={copyEmigrationCodeToClipboard}
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-left text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200
          disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm"
            >

              Your Wordles
            </button>
          </Link>
        </div>
try7
        </div></div>
        <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <InfoModal isOpen={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} />
          <StatsModal isOpen={isStatsModalOpen} handleClose={() => setIsStatsModalOpen(false)} solution={solution} guesses={guesses} gameStats={stats} isLatestGame={isLatestGame} isGameLost={isGameLost} isGameWon={isGameWon} handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)} handleShareFailure={() => showErrorAlert(SHARE_FAILURE_TEXT, {
                        durationMs: LONG_ALERT_TIME_MS,
                    })} handleMigrateStatsButton={() => {
                        setIsStatsModalOpen(false);
                        setIsMigrateStatsModalOpen(true);
                    }} isHardMode={isHardMode} isDarkMode={isDarkMode} isHighContrastMode={isHighContrastMode} numberOfGuessesMade={guesses.length} />
                    <DatePickerModal isOpen={isDatePickerModalOpen} initialDate={solutionGameDate} handleSelectDate={(d) => {
                        setIsDatePickerModalOpen(false);
                        setGameDate(d);
                    }} handleClose={() => setIsDatePickerModalOpen(false)} />
                    <MigrateStatsModal isOpen={isMigrateStatsModalOpen} handleClose={() => setIsMigrateStatsModalOpen(false)} />
                    <SettingsModal isOpen={isSettingsModalOpen} handleClose={() => setIsSettingsModalOpen(false)} isHardMode={isHardMode} handleHardMode={handleHardMode} isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} isHighContrastMode={isHighContrastMode} handleHighContrastMode={handleHighContrastMode} />
                    <AlertContainer />
        </div>

      </div>

    </Div100vh>
  );
};

export default Home;
