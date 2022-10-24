import { CalendarIcon, ChartBarIcon, CogIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { FaInfo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings';
import { GAME_TITLE } from '../../constants/strings';

export const Navbar = ({
    setIsInfoModalOpen,
    setIsStatsModalOpen,
    setIsDatePickerModalOpen,
    setIsSettingsModalOpen,
}) => {
    return (
        <div className="navbar">
            <div className="navbar-content px-5 short:h-auto">
                <div className="flex">
                    <FaInfo
                        className="h-6 w-6 cursor-pointer dark:stroke-white"
                        onClick={() => setIsInfoModalOpen(true)}
                    />
                    {ENABLE_ARCHIVED_GAMES && (
                        <CalendarIcon
                            className="ml-3 h-6 w-6 cursor-pointer dark:stroke-white"
                            onClick={() => setIsDatePickerModalOpen(true)}
                        />
                    )}
                </div>
                <Link to="/">
                    <p className="text-xl font-bold dark:text-white">
                        {GAME_TITLE}
                    </p>
                </Link>

                <div className="right-icons">
                    <ChartBarIcon
                        className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
                        onClick={() => setIsStatsModalOpen(true)}
                    />
                    <CogIcon
                        className="h-6 w-6 cursor-pointer dark:stroke-white"
                        onClick={() => setIsSettingsModalOpen(true)}
                    />
                </div>
            </div>
            <hr></hr>
        </div>
    );
};
