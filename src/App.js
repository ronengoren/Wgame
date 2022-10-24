import './App.css';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Div100vh from 'react-div-100vh';
import { Link, Route, BrowserRouter as Router, Routes, createBrowserRouter } from 'react-router-dom';

import CreateGame from './screens/CreateGame';
import Home from './screens/Home';
import SharedWordls from './screens/SharedWordls';
// import Wordle from './screens/Wordle';
import Game from './screens/Game';



function App() {
    return (
       
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route index path="/wgame/game/:getword" element={<Game />} />

                {/* <Route path="/wgame/wordle" element={<Wordle />} /> */}
                <Route index path="/wgame/create_game" element={<CreateGame />} />
                <Route index path="/wgame/user_wordles" element={<SharedWordls />} />
            </Routes>
      
    );
}
export default App;
