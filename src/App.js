import './App.css';

import * as React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CreateGame from './screens/CreateGame';
import Game from './screens/Game';
import Home from './screens/Home';
import SharedWordls from './screens/SharedWordls';

function App() {
    return (
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/wgame/game/:getword" element={<Game />} />

            <Route index path="/wgame/create_game" element={<CreateGame />} />
            <Route
                index
                path="/wgame/user_wordles"
                element={<SharedWordls />}
            />
        </Routes>
    );
}
export default App;
