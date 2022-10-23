import * as React from 'react';

import { MAX_CHALLENGES } from '../../constants/settings';
import { GamePlayCompletedRow } from './GamePlayCompletedRow';
import { GamePlayCurrentRow } from './GamePlayCurrentRow';
import { GamePlayEmptyRow } from './GamePlayEmptyRow';

export const GamePlayGrid = ({
    solution,
    guesses,
    currentGuess,
    isRevealing,
    currentRowClassName,
}) => {
    const empties =
        guesses.length < MAX_CHALLENGES - 1
            ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
            : [];
    return (
        <>
            {guesses.map((guess, i) => (
                <GamePlayCompletedRow
                    key={i}
                    solution={solution}
                    guess={guess}
                    isRevealing={isRevealing && guesses.length - 1 === i}
                />
            ))}
            {guesses.length < MAX_CHALLENGES && (
                <GamePlayCurrentRow
                    solution={solution}
                    guess={currentGuess}
                    className={currentRowClassName}
                />
            )}
            {empties.map((_, i) => (
                <GamePlayEmptyRow solution={solution} key={i} />
            ))}
        </>
    );
};
