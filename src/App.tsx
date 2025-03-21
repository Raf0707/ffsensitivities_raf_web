import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Toolbar from './components/Toolbar';
import AboutApp from "./pages/About";

const App: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Функция для переключения темы
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Используем useEffect, чтобы применить тему к body
    useEffect(() => {
        document.body.className = theme; // Изменяем класс на body, чтобы применить стили
    }, [theme]);

    return (
        <Router basename="/ffsensitivities_raf_web">
            {/* Передаем тему и функцию переключения в Toolbar */}
            <Toolbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutApp theme={theme}  toggleTheme={toggleTheme} />} />
            </Routes>
        </Router>
    );
};

export default App;
