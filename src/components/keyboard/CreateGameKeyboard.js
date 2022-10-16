import * as React from "react";
import { useEffect } from "react";
import { DELETE_TEXT, ENTER_TEXT } from "../../constants/strings";
import { getStatuses } from "../../lib/statuses";
import { localeAwareUpperCase } from "../../lib/words";
import { CreateGameKey } from "./CreateGameKey";
export const CreateGameKeyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
}) => {

//  console.log(guesses);
//   const charStatuses = getStatuses(solution, guesses);
  const onClick = (value) => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DELETE") {
      onDelete();
    } else {
      onChar(value);
    }
  };
//   useEffect(() => {
//     const listener = (e) => {
//       if (e.code === "Enter") {
//         onEnter();
//       } else if (e.code === "Backspace") {
//         onDelete();
//       } else {
//         const key = localeAwareUpperCase(e.key);
//         // TODO: check this test if the range works with non-english letters
//         if (key.length === 1 && key >= "A" && key <= "Z") {
//           onChar(key);
//         }
//       }
//     };
//     window.addEventListener("keyup", listener);
//     return () => {
//       window.removeEventListener("keyup", listener);
//     };
//   }, [onEnter, onDelete, onChar]);
  return (
    <div>
      <div className="mb-1 flex justify-center">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <CreateGameKey
            value={key}
            key={key}
            onClick={onClick}
            // status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="mb-1 flex justify-center">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <CreateGameKey
            value={key}
            key={key}
            onClick={onClick}
            // status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <CreateGameKey width={65.4} value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </CreateGameKey>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <CreateGameKey
            value={key}
            key={key}
            onClick={onClick}
            // status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        <CreateGameKey width={65.4} value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </CreateGameKey>
      </div>
    </div>
  );
};
