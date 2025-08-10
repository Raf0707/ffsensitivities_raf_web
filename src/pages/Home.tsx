import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SensitivityCard from '../components/SensitivityCard';
import Toolbar from '../components/Toolbar'; // Импортируем Toolbar

interface Model {
    manufacturer: string;
    name: string;
    settings_source_url: string;
    dpi: number;
    fire_button: number;
    review: number;
    collimator: number;
    x2_scope: number;
    x4_scope: number;
    sniper_scope: number;
    free_review: number;
}

const Home = () => {
    const [openBrands, setOpenBrands] = useState<{ [key: string]: boolean }>({});
    const [brandModels, setBrandModels] = useState<{ [key: string]: Model[] }>({});
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Состояние темы

    const cardsData = [
        { brand: 'Samsung', file: 'samsung.json' },
        { brand: 'iPhone', file: 'iphone.json' },
        { brand: 'Xiaomi', file: 'xiaomi.json' },
        { brand: 'Redmi', file: 'redmi.json' },
        { brand: 'Huawei', file: 'huawei.json' },
        { brand: 'Honor', file: 'honor.json' },
        { brand: 'Oppo', file: 'oppo.json' },
        { brand: 'Poco', file: 'poco.json' },
        { brand: 'LG', file: 'lg.json' },
        { brand: 'ZTE', file: 'zte.json' },
        { brand: 'Vivo', file: 'vivo.json' },
        { brand: 'Motorola', file: 'motorola.json' },
        { brand: 'Realme', file: 'realme.json' },
        { brand: 'OnePlus', file: 'oneplus.json' },
        { brand: 'Tecno', file: 'tecno.json' },
        { brand: 'Infinix', file: 'infinix.json' },
    ];

    const handleBrandClick = async (brand: string, file: string) => {
        const isOpen = !openBrands[brand];
        setOpenBrands((prev) => ({
            ...prev,
            [brand]: isOpen,
        }));

        if (isOpen && !brandModels[brand]) {
            try {
                const response = await fetch(`/ffsensitivities_raf_web/data/${file}`);
                const data = await response.json();
                setBrandModels((prev) => ({
                    ...prev,
                    [brand]: data.models,
                }));
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        }
    };

    const handleModelClick = (model: Model) => {
        setSelectedModel(model === selectedModel ? null : model);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // Цвета для темной темы
    const darkThemeColors = {
        background: '#0F1511',
        surface: '#1B211D',
        text: '#DFE4DD',
        primary: '#91D5AC',
    };

    // Цвета для светлой темы
    const lightThemeColors = {
        background: '#F6FBF4',
        surface: '#EAEFE9',
        text: '#171D19',
        primary: '#276A49',
    };

    // Выбираем цвета в зависимости от темы
    const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center overflow-y-auto w-screen pt-24"
            style={{ backgroundColor: colors.background, color: colors.text }}
        >
            {/* Тулбар с кнопкой переключения темы */}
            <Toolbar theme={theme} toggleTheme={toggleTheme} />

            {/* Список карточек */}
            <div className="w-full max-w-4xl space-y-4 px-4 sm:px-8 py-6">
                {cardsData.map((card, index) => (
                    <div key={index}>
                        {/* Карточка бренда */}
                        <div
                            className="w-full border border-[#404942] rounded-xl p-4 sm:p-6 text-center cursor-pointer relative"
                            style={{ backgroundColor: colors.surface }}
                            onClick={() => handleBrandClick(card.brand, card.file)}
                        >
                            {/* Заголовок карточки */}
                            <h3 className="text-[28px] sm:text-[40px] font-bold text-center w-full mb-8">
                                {card.brand}
                            </h3>

                            {/* Стрелочка вниз в кружочке */}
                            <div
                                className={`arrow-down flex items-center justify-center w-8 h-8 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-1000 ${
                                    openBrands[card.brand] ? 'rotate-180' : 'rotate-0'
                                }`}
                                style={{ backgroundColor: colors.primary }}
                            >
                                <span className="text-white">&#9660;</span>
                            </div>
                        </div>

                        {/* Анимация появления моделей */}
                        <AnimatePresence>
                            {openBrands[card.brand] && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.7 }}
                                    className="mt-4 space-y-4"
                                >
                                    {brandModels[card.brand]?.map((model, modelIndex) => (
                                        <div key={modelIndex}>
                                            <motion.div
                                                className="w-full max-w-md mx-auto border border-[#404942] rounded-xl p-4 sm:p-6 text-center cursor-pointer relative"
                                                style={{ backgroundColor: colors.surface }}
                                                onClick={() => handleModelClick(model)}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.7 }}
                                            >
                                                {/* Заголовок модели */}
                                                <h3 className="text-[20px] sm:text-[24px] font-bold text-center w-full mb-8">
                                                    {model.name}
                                                </h3>

                                                {/* Стрелочка вниз */}
                                                <div
                                                    className={`arrow-down flex items-center justify-center w-8 h-8 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ${
                                                        selectedModel === model ? 'rotate-180' : 'rotate-0'
                                                    }`}
                                                    style={{ backgroundColor: colors.primary }}
                                                >
                                                    <span className="text-white">&#9660;</span>
                                                </div>
                                            </motion.div>

                                            {/* Анимация карточки с настройками */}
                                            <AnimatePresence>
                                                {selectedModel === model && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 20 }}
                                                        transition={{ duration: 0.7 }}
                                                    >
                                                        <SensitivityCard model={model} />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;