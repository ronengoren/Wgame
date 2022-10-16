import { SaveIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useState } from 'react';

import { decrypt } from '../../lib/encryption';
import {
    saveGameStateToLocalStorage,
    saveStatsToLocalStorage,
} from '../../lib/localStorage';

export const ImmigratePanel = () => {
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
    const textareaClassNames = {
        valid: ['bg-gray-100', 'dark:bg-gray-700'],
        invalid: ['bg-red-400', 'dark:bg-red-900'],
    };
    const allClassNames = [
        ...textareaClassNames.valid,
        ...textareaClassNames.invalid,
    ];
    const handleImmigrationCodeChange = event => {
        var _a;
        if (event.target instanceof Element) {
            const textarea = event.target;
            allClassNames.forEach(cn => textarea.classList.remove(cn));
            setIsSaveButtonEnabled(false);
            const text = textarea.value;
            try {
                const migrationStats = JSON.parse(
                    (_a = decrypt(text)) !== null && _a !== void 0 ? _a : '',
                );
                if (
                    !migrationStats ||
                    (!migrationStats.gameState && !migrationStats.statistics)
                ) {
                    textareaClassNames.invalid.forEach(cn =>
                        textarea.classList.add(cn),
                    );
                    return;
                }
                textareaClassNames.valid.forEach(cn =>
                    textarea.classList.add(cn),
                );
                setIsSaveButtonEnabled(true);
            } catch (error) {
                textareaClassNames.invalid.forEach(cn =>
                    textarea.classList.add(cn),
                );
            }
        }
    };
    const handleSaveButton = () => {
        var _a;
        const textarea = document.getElementById('immigration-code');
        if (
            textarea &&
            window.confirm(
                'Are you sure you want to override the statistics on this device? This action is not reversable.',
            )
        ) {
            var migrationStats = JSON.parse(
                (_a = decrypt(textarea.value)) !== null && _a !== void 0
                    ? _a
                    : '',
            );
            if (!migrationStats) return;
            if (migrationStats.gameState) {
                saveGameStateToLocalStorage(true, migrationStats.gameState);
            }
            if (migrationStats.statistics) {
                saveStatsToLocalStorage(migrationStats.statistics);
            }
            alert('The site will now reload.');
            window.location.reload();
        }
    };
    return (
        <div className="text-sm text-gray-500 dark:text-gray-300">
            <label
                htmlFor="message"
                className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-gray-400"
            >
                Paste your migration code:
            </label>
            <textarea
                onChange={e => handleImmigrationCodeChange(e)}
                id="immigration-code"
                rows={8}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            ></textarea>
            <button
                disabled={!isSaveButtonEnabled}
                onClick={handleSaveButton}
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-left text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200 
          disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm"
            >
                {isSaveButtonEnabled && (
                    <SaveIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
                )}
                Save
            </button>
        </div>
    );
};
