import * as React from 'react';
import { useEffect } from "react";

import { DELETE_TEXT, ENTER_TEXT } from '../../constants/strings';
import { getStatuses } from '../../lib/getStatuses';
import { NewKey } from './NewKey';
import { localeAwareUpperCase } from '../../lib/getWord';
export const NewKeyboard = ({
    onChar,
    onDelete,
    onEnter,
    solution,
    guesses,
    isRevealing,
}) => {
    const charStatuses = getStatuses(solution, guesses);
    const onClick = value => {
        if (value === 'ENTER') {
            onEnter();
        } else if (value === 'DELETE') {
            onDelete();
        } else {
            onChar(value);
        }
    };
    useEffect(() => {
      const listener = (e) => {
        if (e.code === "Enter") {
          onEnter();
        } else if (e.code === "Backspace") {
          onDelete();
        } else {
          const key = localeAwareUpperCase(e.key);
          // TODO: check this test if the range works with non-english letters
          if (key.length === 1 && key >= "A" && key <= "Z") {
            onChar(key);
          }
        }
      };
      window.addEventListener("keyup", listener);
      return () => {
        window.removeEventListener("keyup", listener);
      };
    }, [onEnter, onDelete, onChar]);
    return (
        <div>
            <div className="mb-1 flex justify-center">
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                    <NewKey
                        value={key}
                        key={key}
                        solution={solution}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                    />
                ))}
            </div>
            <div className="mb-1 flex justify-center">
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                    <NewKey
                        solution={solution}
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <NewKey
                    solution={solution}
                    width={65.4}
                    value="ENTER"
                    onClick={onClick}
                >
                    {ENTER_TEXT}
                </NewKey>
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
                    <NewKey
                        solution={solution}
                        value={key}
                        key={key}
                        onClick={onClick}
                        status={charStatuses[key]}
                        isRevealing={isRevealing}
                    />
                ))}
                <NewKey
                    solution={solution}
                    width={65.4}
                    value="DELETE"
                    onClick={onClick}
                >
                    {DELETE_TEXT}
                </NewKey>
            </div>
        </div>
    );
};
