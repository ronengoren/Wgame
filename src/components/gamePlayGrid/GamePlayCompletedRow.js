import classnames from 'classnames';
import * as React from 'react';

import { REVEAL_TIME_MS } from '../../constants/settings';
import { getGuessStatuses } from '../../lib/getStatuses';
import { unicodeSplit } from '../../lib/getWord';
import { getStoredIsHighContrastMode } from '../../lib/localStorage';
import { GamePlayCell } from './GamePlayCell';

export const GamePlayCompletedRow = ({ solution, guess, isRevealing }) => {
    const statuses = getGuessStatuses(solution, guess);
    const splitGuess = unicodeSplit(guess);
    return (
        <div className="mb-1 flex justify-center">
            {splitGuess.map((letter, i) => (
                <GamePlayCell
                    key={i}
                    value={letter}
                    status={statuses[i]}
                    position={i}
                    isRevealing={isRevealing}
                    isCompleted
                />
            ))}
        </div>
    );
};
