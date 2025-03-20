import React, { createContext, useContext, useState } from 'react';

// Определим цвета для тем
const lightTheme = {
    background: '#F6FBF4',
    surface: '#EAEFE9',
    text: '#171D19',
    primary: '#276A49',
};

const darkTheme = {
    background: '#0F1511',
    surface: '#1B211D',
    text: '#DFE4DD',
    primary: '#91D5AC',
};

// Создаем ThemeContext
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Провайдер для темы
export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: isDarkTheme ? darkTheme : lightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
