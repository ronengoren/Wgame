import { ClockIcon, ShareIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import * as React from 'react';
import Countdown from 'react-countdown';

import {
    DATE_LOCALE,
    ENABLE_ARCHIVED_GAMES,
    ENABLE_MIGRATE_STATS,
    MAX_CHALLENGES,
} from '../../constants/settings';
import {
    ARCHIVE_GAMEDATE_TEXT,
    GUESS_DISTRIBUTION_TEXT,
    NEW_WORD_TEXT,
    SHARE_GAME_MODAL_TITLE,
    SHARE_GAME_MODAL_WORD,
    SHARE_TEXT,
    STATISTICS_TITLE,
} from '../../constants/strings';
import { shareStatus } from '../../lib/share';
import { solutionGameDate, tomorrow } from '../../lib/words';
import { Histogram } from '../stats/Histogram';
import { MigrationIntro } from '../stats/MigrationIntro';
import { ShareGameIntro } from '../stats/ShareGameIntro';
import { SharedWordBar } from '../stats/SharedWordBar';
import { StatBar } from '../stats/StatBar';
import { BaseModal } from './BaseModal';
import { CurrentRowModal } from '../newWord/CurrentRowModal';

export const ShareGameModal = ({
    isOpen,
    handleClose,
    solution,
    guesses,
    gameStats,
    isLatestGame,
    isGameLost,
    isGameWon,
    handleShareToClipboard,
    handleShareFailure,
    handleShare,
    isHardMode,
    isDarkMode,
    isHighContrastMode,
    numberOfGuessesMade,
}) => {
    if (gameStats.totalGames <= 0) {
        return (
            <BaseModal
                title={SHARE_GAME_MODAL_TITLE}
                isOpen={isOpen}
                handleClose={handleClose}
            >
                <SharedWordBar gameStats={gameStats} word={solution} />
                {ENABLE_MIGRATE_STATS && (
                    <ShareGameIntro
                    word={solution} 
                    handleShare={handleShare}
                    />
                )}
            </BaseModal>
        );
    }
    return (
        <BaseModal
            title={SHARE_GAME_MODAL_TITLE}
            isOpen={isOpen}
            handleClose={handleClose}
        >
           
            <SharedWordBar gameStats={gameStats} word={solution}  />
            <h4 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                {/* {SHARE_GAME_MODAL_WORD} */}
            </h4>
            {/* <Histogram
                isLatestGame={isLatestGame}
                gameStats={gameStats}
                isGameWon={isGameWon}
                numberOfGuessesMade={numberOfGuessesMade}
            /> */}
            {/* {(isGameLost || isGameWon) && (
                <div className="mt-5 columns-2 items-center items-stretch justify-center text-center dark:text-white sm:mt-6">
                    <div className="inline-block w-full text-left">
                        {(!ENABLE_ARCHIVED_GAMES || isLatestGame) && (
                            <div>
                                <h5>{NEW_WORD_TEXT}</h5>
                                <Countdown
                                    className="text-lg font-medium text-gray-900 dark:text-gray-100"
                                    date={tomorrow}
                                    daysInHours={true}
                                />
                            </div>
                        )}
                        {ENABLE_ARCHIVED_GAMES && !isLatestGame && (
                            <div className="mt-2 inline-flex">
                                <ClockIcon className="mr-1 mt-2 mt-1 h-5 w-5 stroke-black dark:stroke-white" />
                                <div className="mt-1 ml-1 text-center text-sm sm:text-base">
                                    <strong>{ARCHIVE_GAMEDATE_TEXT}:</strong>
                                    <br />
                                    {format(solutionGameDate, 'd MMMM yyyy', {
                                        locale: DATE_LOCALE,
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            type="button"
                            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
                            onClick={() => {
                                shareStatus(
                                    solution,
                                    guesses,
                                    isGameLost,
                                    isHardMode,
                                    isDarkMode,
                                    isHighContrastMode,
                                    handleShareToClipboard,
                                    handleShareFailure,
                                );
                            }}
                        >
                            <ShareIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
                            {SHARE_TEXT}
                        </button>
                    </div>
                </div>
            )} */}
            {ENABLE_MIGRATE_STATS && (
                <div>
                    <hr className="mt-4 -mb-4 border-gray-500" />
                    <ShareGameIntro
                    word={solution} 
                    handleShare={handleShare}
                    />
                </div>
            )}
        </BaseModal>
    );
};
