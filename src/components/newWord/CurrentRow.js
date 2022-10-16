import * as React from 'react';

import { getGuessStatuses } from '../../lib/statuses';
import { solution, unicodeSplit } from '../../lib/words';
import { Cell } from './Cell';

export const CurrentRow = ({ guess, className, isRevealing }) => {
    const splitGuess = unicodeSplit(guess);
    const emptyCells = Array.from(Array(5 - splitGuess.length));
    const statuses = getGuessStatuses(guess, guess);
    const classes = `flex justify-center mb-1 ${className}`;
    return (
        <div className={classes}>
            {splitGuess.map((letter, i) => (
                <Cell
                    key={i}
                    value={letter}
                    isRevealing={!isRevealing}
                    isCompleted
                    status={statuses[i]}
                />
            ))}
            {emptyCells.map((_, i) => (
                <Cell key={i} />
            ))}
        </div>
    );
};
