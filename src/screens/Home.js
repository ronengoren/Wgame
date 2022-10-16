import * as React from 'react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Grid } from '../components/grid/Grid';
import { WordsGrid } from '../components/home/WordsGrid';
import { Navbar } from '../components/navbar/Navbar';
import { unicodeSplit } from '../lib/words';
import { REVEAL_TIME_MS } from '../constants/settings';
import { getNewWord } from '../lib/localStorage';

const Home = () => {
  console.log('=======Home1=============================');
  console.log('Home1');
  console.log('==========Home1==========================');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [sentWords, setSentWords] = useState([]);
  let getword;
  // const splitGuess = unicodeSplit(guess);
  const animationDelay = `${ 0 * REVEAL_TIME_MS }ms`;

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
    const wordArr = getNewWord()
    if (wordArr) {
      setSentWords(wordArr);

    }

  }, []);
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
          <Link to="/create_game">

            <button
              // disabled={!isCopyButtonEnabled}
              // onClick={copyEmigrationCodeToClipboard}
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-left text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200
          disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm"
            >
              {/* {isCopyButtonEnabled && (
                    <DuplicateIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
                )} */}
              Create New Game
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link to="/user_wordles">

            <button
              // disabled={!isCopyButtonEnabled}
              // onClick={copyEmigrationCodeToClipboard}
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-left text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200
          disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm"
            >
              {/* {isCopyButtonEnabled && (
                    <DuplicateIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
                )} */}
              Your Wordles
            </button>
          </Link>
        </div>
        {/* <div className="flex justify-center">
          <h1>Your Wordles:</h1>
        </div>
        {sentWords ? sentWords.map((i =>
          <div key={i} className="mx-auto flex pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
            {unicodeSplit(i).map((letter, h) => <div
              key={h}
              className={classes}
              style={{ animationDelay }}
            > <div className="letter-container" style={{ animationDelay }}> <h1>{letter}</h1> </div></div>)}


          </div>)) : null} */}

        <Link to={`/wordle`}>Wordle</Link>

      </div>

    </Div100vh>
  );
};

export default Home;
