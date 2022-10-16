import * as React from 'react';

import { NEW_CHALLENGE, MAX_CHALLENGES } from '../../constants/settings';
import { CompletedRow } from './CompletedRow';
import { CurrentRow } from './CurrentRow';
import { EmptyRow } from './EmptyRow';

export const NewWord = ({
    solution,
    guesses,
    currentGuess,
    isRevealing,
    currentRowClassName,
}) => {
  // console.log(guesses);
    // const empties =
    //     guesses.length < NEW_CHALLENGE - 1
    //         ? Array.from(Array(NEW_CHALLENGE - 1 - guesses.length))
    //         : [];
    const empties = Array.from(Array(1))

    return (
        <>
            {/* {guesses.map((guess, i) => (
                <CompletedRow
                    key={i}
                    // solution={solution}
                    guess={guess}
                    isRevealing={isRevealing && guesses.length - 1 === i}
                />
            ))} */}
            {guesses.length + 1 <= MAX_CHALLENGES && (
                <CurrentRow
                    guess={currentGuess}
                    className={currentRowClassName}
                    isRevealing={isRevealing}
                />
            )}
            
            {/* {empties.map((_, i) => (
                <EmptyRow key={i} />
            ))} */}
        </>
    );
};
