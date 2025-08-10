import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SensitivityCard from '../components/SensitivityCard';
import Toolbar from '../components/Toolbar';

// -------- Сырые данные из JSON (новая и старая схема)
type RawModel = {
    manufacturer: string;
    name: string;
    settings_source_url?: string;
    dpi?: number;
    fire_button?: number;
    review?: number;
    collimator?: number;
    x2_scope?: number;
    x4_scope?: number;
    sniper_scope?: number;
    free_review?: number;
    sensitivities?: {
        review?: number;
        collimator?: number;
        x2_scope?: number;
        x4_scope?: number;
        sniper_scope?: number;
        free_review?: number;
    };
};

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

// -------- Жёсткая база для GitHub Pages (без env)
const BASE = 'https://raf0707.github.io/ffsensitivities_raf_web/';

// -------- Нормализация новой схемы -> плоская (чтобы не менять SensitivityCard)
const normalizeModel = (m: RawModel): Model => {
    const s = m.sensitivities || {};
    return {
        manufacturer: m.manufacturer,
        name: m.name,
        settings_source_url: m.settings_source_url ?? '',
        dpi: Number(m.dpi ?? 0),
        fire_button: Number(m.fire_button ?? 0),
        review: Number(s.review ?? m.review ?? 0),
        collimator: Number(s.collimator ?? m.collimator ?? 0),
        x2_scope: Number(s.x2_scope ?? m.x2_scope ?? 0),
        x4_scope: Number(s.x4_scope ?? m.x4_scope ?? 0),
        sniper_scope: Number(s.sniper_scope ?? m.sniper_scope ?? 0),
        free_review: Number(s.free_review ?? m.free_review ?? 0),
    };
};

const Home = () => {
    const [openBrands, setOpenBrands] = useState<Record<string, boolean>>({});
    const [brandModels, setBrandModels] = useState<Record<string, Model[]>>({});
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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
        setOpenBrands(prev => ({ ...prev, [brand]: isOpen }));

        if (isOpen && !brandModels[brand]) {
            try {
                const url = `${BASE}data/${file}`;
                // ВАЖНО: cache: 'no-cache' заставляет браузер проверить ETag на CDN и взять свежие данные без костылей ?v=
                const response = await fetch(url, { cache: 'no-cache' });
                if (!response.ok) throw new Error(`HTTP ${response.status} при загрузке ${url}`);

                const data: { models?: RawModel[] } = await response.json();
                if (!Array.isArray(data.models)) throw new Error(`Некорректный формат: нет массива models в ${url}`);

                const normalized = data.models.map(normalizeModel);
                setBrandModels(prev => ({ ...prev, [brand]: normalized }));
            } catch (e) {
                console.error('Ошибка при загрузке данных:', e);
                setBrandModels(prev => ({ ...prev, [brand]: [] }));
            }
        }
    };

    const handleModelClick = (model: Model) => {
        setSelectedModel(model === selectedModel ? null : model);
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    // Цвета
    const darkThemeColors = {
        background: '#0F1511',
        surface: '#1B211D',
        text: '#DFE4DD',
        primary: '#91D5AC',
    };
    const lightThemeColors = {
        background: '#F6FBF4',
        surface: '#EAEFE9',
        text: '#171D19',
        primary: '#276A49',
    };
    const colors = theme === 'dark' ? darkThemeColors : lightThemeColors;

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center overflow-y-auto w-screen pt-24"
            style={{ backgroundColor: colors.background, color: colors.text }}
        >
            {/* Тулбар с переключателем темы */}
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
                            <h3 className="text-[28px] sm:text-[40px] font-bold text-center w-full mb-8">
                                {card.brand}
                            </h3>

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
                                        <div key={`${model.name}-${modelIndex}`}>
                                            <motion.div
                                                className="w-full max-w-md mx-auto border border-[#404942] rounded-xl p-4 sm:p-6 text-center cursor-pointer relative"
                                                style={{ backgroundColor: colors.surface }}
                                                onClick={() => handleModelClick(model)}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.7 }}
                                            >
                                                <h3 className="text-[20px] sm:text-[24px] font-bold text-center w-full mb-8">
                                                    {model.name}
                                                </h3>

                                                <div
                                                    className={`arrow-down flex items-center justify-center w-8 h-8 rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ${
                                                        selectedModel === model ? 'rotate-180' : 'rotate-0'
                                                    }`}
                                                    style={{ backgroundColor: colors.primary }}
                                                >
                                                    <span className="text-white">&#9660;</span>
                                                </div>
                                            </motion.div>

                                            {/* Карточка с настройками */}
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
