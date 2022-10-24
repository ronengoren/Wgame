import * as React from 'react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { Link } from 'react-router-dom';
import classnames from 'classnames';


import { Navbar } from '../components/navbar/Navbar';
// import { unicodeSplit } from '../lib/words';
import { LONG_ALERT_TIME_MS, REVEAL_TIME_MS } from '../constants/settings';
import { getNewWord, getStoredIsHighContrastMode, setStoredIsHighContrastMode } from '../lib/localStorage';
import { unicodeSplit } from '../lib/getWord';
import { SettingsModal } from '../components/modals/SettingsModal';
import { GAME_COPIED_MESSAGE, SHARE_FAILURE_TEXT } from '../constants/strings';
import { InfoModal } from '../components/modals/InfoModal';
import { getIsLatestGame, solution } from '../lib/words';
import { useAlert } from '../context/AlertContext';
import { StatsModal } from '../components/modals/StatsModal';
import { loadStats } from '../lib/stats';

const SharedWordls = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [sentWords, setSentWords] = useState([]);
  // const splitGuess = unicodeSplit(guess);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme')
    ? localStorage.getItem('theme') === 'dark'
    : prefersDarkMode
      ? true
      : false);
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isGameWon, setIsGameWon] = useState(false);
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const isLatestGame = getIsLatestGame();
  const [stats, setStats] = useState(() => loadStats());
  const [guesses, setGuesses] = useState([])

  const animationDelay = `${ 0 * REVEAL_TIME_MS }ms`;
  const [isHighContrastMode, setIsHighContrastMode] = useState(getStoredIsHighContrastMode());
  const [isHardMode, setIsHardMode] = useState(localStorage.getItem('gameMode')
    ? localStorage.getItem('gameMode') === 'hard'
    : false);
    const {
      showError: showErrorAlert,
      showSuccess: showSuccessAlert,
  } = useAlert();
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
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
    else {
      document.documentElement.classList.remove('dark');
    }
    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast');
    }
    else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isDarkMode, isHighContrastMode]);
  useEffect(() => {
    const wordArr = getNewWord()
    if (wordArr) {
      setSentWords(wordArr);

    }

  }, []);
  
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
  return (
    <Div100vh>
      <div className="flex h-full flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />

        <div className="flex justify-center">
          <h1>המילים שיצרתם</h1>
        </div>
        {sentWords ? sentWords.map((i =>
          <div key={i} className="mx-auto flex pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            {unicodeSplit(i).map((letter, h) =>
              <div
                key={h}
                className={classes}
                style={{ animationDelay }}
              >
                <div className="letter-container" style={{ animationDelay }}> <h1>{letter}</h1>
                </div>
              </div>

            )}


          </div>
        )) : null}
        <SettingsModal isOpen={isSettingsModalOpen} handleClose={() => setIsSettingsModalOpen(false)} isHardMode={isHardMode} handleHardMode={handleHardMode} isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} isHighContrastMode={isHighContrastMode} handleHighContrastMode={handleHighContrastMode} />
        <StatsModal isOpen={isStatsModalOpen} handleClose={() => setIsStatsModalOpen(false)} solution={solution} guesses={guesses} gameStats={stats} isLatestGame={isLatestGame} isGameLost={isGameLost} isGameWon={isGameWon} handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)} handleShareFailure={() => showErrorAlert(SHARE_FAILURE_TEXT, {
          durationMs: LONG_ALERT_TIME_MS,
        })} handleMigrateStatsButton={() => {
          setIsStatsModalOpen(false);
          setIsMigrateStatsModalOpen(true);
        }} isHardMode={isHardMode} isDarkMode={isDarkMode} isHighContrastMode={isHighContrastMode} numberOfGuessesMade={guesses.length} />
        <InfoModal isOpen={isInfoModalOpen} handleClose={() => setIsInfoModalOpen(false)} />
        {/* <Link to="/wordle">Wordle</Link> */}

      </div>

    </Div100vh>
  );
};

export default SharedWordls;
