import * as React from 'react';

import { GamePlayCell } from './GamePlayCell';

export const GamePlayEmptyRow = solution => {
    const emptyCells = Array.from(Array(5));
    return (
        <div className="mb-1 flex justify-center">
            {emptyCells.map((_, i) => (
                <GamePlayCell key={i} />
            ))}
        </div>
    );
};
