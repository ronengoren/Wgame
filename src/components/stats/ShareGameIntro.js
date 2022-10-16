import { DuplicateIcon, LogoutIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useState } from 'react';

import {
    MIGRATE_BUTTON_TEXT,
    MIGRATE_DESCRIPTION_TEXT,
    SHARE_BUTTON_TEXT,
    SHARE_DESCRIPTION_TEXT,
} from '../../constants/strings';
import { copyTextToClipboard } from '../../lib/clipboard';
import { encrypt } from '../../lib/encryption';
import { saveNewWord } from '../../lib/localStorage';

export const ShareGameIntro = ({ handleShare,word }) => {

    const [copyButtonText, setCopyButtonText] = useState('Copy');
    const [isCopyButtonEnabled, setIsCopyButtonEnabled] = useState(true);
    const baseURL = `http://ronengoren.com/wordle?currentword=${word}`
    const shareStats = {
      url: baseURL,
  };
    const copyEmigrationCodeToClipboard = () => {
      var encodedData = window.btoa(word);
      const encrypt = `http://ronengoren.com/wordle?getword=${encodedData}`
      copyTextToClipboard(encrypt);
      setCopyButtonText('Copied!');
      setIsCopyButtonEnabled(false);
      saveNewWord(word)
  };
    return (
        <div className="mt-5 columns-2 items-center items-stretch justify-center text-center dark:text-white sm:mt-6">
            <div className="mt-3 text-xs">{SHARE_DESCRIPTION_TEXT}</div>
            <button
            disabled={!isCopyButtonEnabled}
                type="button"
                className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                onClick={copyEmigrationCodeToClipboard}
            >
                <DuplicateIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
                {copyButtonText}

                {/* {SHARE_BUTTON_TEXT} */}
            </button>
        </div>
    );
};
