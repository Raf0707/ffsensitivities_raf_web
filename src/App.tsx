import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AboutApp from "./pages/About";
import Hugs from "./pages/Hugs";               // анкета обнимашек
import Tickler from "./pages/Tickler";
import Ticklee from "./pages/Ticklee";
import Switch from "./pages/Switch";        // анкета щекотки
import Massage from "./pages/Massage";         // анкета массажа

import Toolbar from "./components/Toolbar";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";

const App: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <Router basename="/">
            <Toolbar theme={theme} toggleTheme={toggleTheme} />
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<AboutApp theme={theme} toggleTheme={toggleTheme} />} />

                {/* анкета обнимашек */}
                <Route path="/hugs" element={<Hugs theme={theme} />} />

                {/* анкеты щекотки */}
                <Route path="/tickler" element={<Tickler theme={theme} />} />
                 <Route path="/ticklee" element={<Ticklee theme={theme} />} />
                <Route path="/switch" element={<Switch theme={theme} />} />

                {/* анкеты массажа */}
                <Route path="/massage/:direction/:role" element={<Massage theme={theme} toggleTheme={toggleTheme} />}/>


                <Route path="/privacy" element={<PrivacyPolicy theme={theme} />} />
                <Route path="/terms" element={<TermsOfUse theme={theme} />} />


            </Routes>
        </Router>
    );
};

export default App;
