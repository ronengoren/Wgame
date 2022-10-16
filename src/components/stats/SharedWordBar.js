import * as React from 'react';
import { MAX_CHALLENGES, REVEAL_TIME_MS } from '../../constants/settings';

import {
    BEST_STREAK_TEXT,
    CURRENT_STREAK_TEXT,
    SHARE_GAME_MODAL_WORD,
    SUCCESS_RATE_TEXT,
    TOTAL_TRIES_TEXT,
} from '../../constants/strings';
import { unicodeSplit } from '../../lib/words';
import { CurrentRowModal } from '../newWord/CurrentRowModal';

const StatItem = ({ label, value }) => {
    return (
        <div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-xs">{label}</div>
        </div>
    );
};


export const SharedWordBar = ({ gameStats, word }) => {
    const splitGuess = unicodeSplit(word);
    const shouldReveal = true;
    const animationDelay = `${0 * REVEAL_TIME_MS}ms`;


    return (
      
        <div className="my-2 flex justify-center">
            {word.length + 1 <= MAX_CHALLENGES && (
                <CurrentRowModal
                    guess={word}
                    // className={currentRowClassName}
                    isRevealing={true}
                />
            )}
        </div>
    );
};


