import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // навигация
import Toolbar from "../components/Toolbar";
import MassageOptionCard from "../components/MassageOptionCard";

type SubItem = {
    name: string;
    children?: SubItem[];
};

type CardItem = {
    name: string;
    children?: SubItem[];
};

const Home = () => {
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const navigate = useNavigate(); // хук навигации

    const cardsData: CardItem[] = [
        { name: "Обнимашки" },
        {
            name: "Щекотка",
            children: [
                { name: "Тиклер" },
                { name: "Тикля" },
                { name: "Свич" },
            ],
        },
        {
            name: "Массаж",
            children: [
                {
                    name: "Делаю массаж",
                    children: [
                        { name: "Классический немедицинский" },
                        { name: "Смайл-терапия" },
                    ],
                },
                {
                    name: "Мне делают массаж",
                    children: [
                        { name: "Классический немедицинский" },
                        { name: "Смайл-терапия" },
                    ],
                },
            ],
        },
    ];

    const toggleCard = (name: string) => {
        setOpenCards((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const darkThemeColors = {
        background: "#0F1511",
        surface: "#1B211D",
        text: "#DFE4DD",
        primary: "#91D5AC",
    };
    const lightThemeColors = {
        background: "#F6FBF4",
        surface: "#EAEFE9",
        text: "#171D19",
        primary: "#276A49",
    };
    const colors = theme === "dark" ? darkThemeColors : lightThemeColors;

    const renderChildren = (children?: SubItem[]) => {
        if (!children) return null;
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="mt-4 space-y-4 pl-6"
            >
                {children.map((child, idx) => (
                    <div key={idx}>
                        {child.name === "Делаю массаж" || child.name === "Мне делают массаж" ? (
                            <MassageOptionCard
                                name={child.name}
                                isOpen={openCards[child.name]}
                                toggle={() => toggleCard(child.name)}
                                background={colors.surface}
                                primary={colors.primary}
                            />
                        ) : (
                            <div
                                className="w-full border border-[#404942] rounded-xl p-4 sm:p-6 text-center relative cursor-pointer"
                                style={{ backgroundColor: colors.surface }}
                                onClick={() => {
                                    if (child.children) {
                                        toggleCard(child.name);
                                    } else {
                                        if (child.name === "Тиклер") navigate("/tickler");
                                        else if (child.name === "Тикля") navigate("/ticklee");
                                        else if (child.name === "Свич") navigate("/switch");
                                        //else if (child.name === "Обнимашки") navigate("/hugs");
                                        else navigate(`/${child.name.toLowerCase()}`);
                                    }
                                }}

                            >
                                <h3 className="text-[20px] sm:text-[24px] font-bold mb-2">
                                    {child.name}
                                </h3>
                                {child.children && (
                                    <div
                                        className={`arrow-down flex items-center justify-center w-8 h-8 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform ${
                                            openCards[child.name] ? "rotate-180" : "rotate-0"
                                        }`}
                                        style={{ backgroundColor: colors.primary }}
                                    >
                                        <span className="text-white">&#9660;</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <AnimatePresence>
                            {openCards[child.name] && renderChildren(child.children)}
                        </AnimatePresence>
                    </div>
                ))}
            </motion.div>
        );
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center overflow-y-auto w-screen pt-24"
            style={{ backgroundColor: colors.background, color: colors.text }}
        >
            <Toolbar theme={theme} toggleTheme={toggleTheme} />

            <div className="w-full max-w-4xl space-y-4 px-4 sm:px-8 py-6">
                {cardsData.map((card, index) => (
                    <div key={index}>
                        <div
                            className="w-full border border-[#404942] rounded-xl p-6 text-center cursor-pointer"
                            style={{ backgroundColor: colors.surface }}
                            onClick={() =>
                                card.children
                                    ? toggleCard(card.name)
                                    : card.name === "Обнимашки"
                                        ? navigate("/hugs") // переход на анкету обнимашек
                                        : navigate(`/${card.name.toLowerCase()}`)
                            }
                        >
                            <h3 className="text-[28px] sm:text-[40px] font-bold mb-4">
                                {card.name}
                            </h3>

                            {card.children && (
                                <div
                                    className={`arrow-down flex items-center justify-center w-8 h-8 rounded-full mx-auto mt-8 transition-transform ${
                                        openCards[card.name] ? "rotate-180" : "rotate-0"
                                    }`}
                                    style={{ backgroundColor: colors.primary }}
                                >
                                    <span className="text-white">&#9660;</span>
                                </div>
                            )}
                        </div>

                        <AnimatePresence>
                            {openCards[card.name] && renderChildren(card.children)}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
