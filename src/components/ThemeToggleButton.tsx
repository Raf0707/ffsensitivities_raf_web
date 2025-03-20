import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ThemeToggleButtonProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const SunIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#86efac"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
    >
        <circle cx="12" cy="12" r="5" /> {/* Центральный круг */}
        <line x1="12" y1="1" x2="12" y2="4" /> {/* Лучи */}
        <line x1="12" y1="20" x2="12" y2="23" />
        <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
        <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
        <line x1="1" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="23" y2="12" />
        <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
        <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
    </svg>
);

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, toggleTheme }) => {
    return (
        <Link
            onClick={toggleTheme}
            className="text-[#86efac] hover:text-[#4ade80] transition-colors focus:outline-none"
            to=""
        >
            {theme === "dark" ? <FaMoon className="w-6 h-6" color="#86efac" /> : <SunIcon />}
        </Link>
    );
};

export default ThemeToggleButton;
