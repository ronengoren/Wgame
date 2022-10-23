import * as React from 'react';

import { unicodeSplit } from '../../lib/getWord';
import { GamePlayCell } from './GamePlayCell';

export const GamePlayCurrentRow = ({ guess, className, solution }) => {
    const splitGuess = unicodeSplit(guess);
    const emptyCells = Array.from(Array(solution.length - splitGuess.length));
    const classes = `flex justify-center mb-1 ${className}`;
    return (
        <div className={classes}>
            {splitGuess.map((letter, i) => (
                <GamePlayCell key={i} value={letter} />
            ))}
            {emptyCells.map((_, i) => (
                <GamePlayCell key={i} />
            ))}
        </div>
    );
};
