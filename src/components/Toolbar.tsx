import { Link } from "react-router-dom";
import { Info, Home as HomeIcon } from "lucide-react"; // Импортируем иконки
import ThemeToggleButton from "./ThemeToggleButton"; // Импортируем кнопку переключения темы

interface ToolbarProps {
    theme: 'light' | 'dark'; // Тип для темы
    toggleTheme: (nextTheme: 'light' | 'dark') => void; // Функция для переключения темы
}

const Toolbar: React.FC<ToolbarProps> = ({ theme, toggleTheme }) => {
    return (
        <div className="fixed top-0 left-0 w-full bg-[#122428] border-b border-[#14442e] z-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
                {/* Логотип и название приложения (слева) */}

                <div className="flex items-center space-x-2">
                    <img
                        src="/app_logo.png"
                        alt="App Logo"
                        className="app-logo w-12 h-12" // Уменьшаем логотип
                    />
                    <h2 className="text-[20px] sm:text-[20px] font-bold text-[#86efac]">
                        Знакомства для тактильных
                    </h2>
                </div>

                {/* Иконки навигации и кнопка переключения темы (справа) */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/"
                        className="text-[#86efac] hover:text-[#4ade80] flex items-center"
                    >
                        <HomeIcon className="w-6 h-6 sm:w-6 sm:h-6" stroke="#86efac" />
                    </Link>

                    <Link
                        to="/about"
                        className="text-[#86efac] hover:text-[#4ade80] flex items-center"
                    >
                        <Info className="w-6 h-6 sm:w-6 sm:h-6" stroke="#86efac" />
                    </Link>

                    {/* Кнопка переключения темы */}
                    <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
