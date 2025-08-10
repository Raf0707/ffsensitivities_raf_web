import { useState } from "react";
import {
    FaAndroid,
    FaInfoCircle,
    FaCode,
    FaUser,
    FaEnvelope,
    FaShieldAlt,
    FaShareAlt,
} from "react-icons/fa";

interface AboutProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const AboutApp: React.FC<AboutProps> = ({ theme }) => {
    const [isVersionDialogOpen, setVersionDialogOpen] = useState(false);
    const [isDownloadIosDialogOpen, setDownloadIosDialogOpen] = useState(false);

    const openVersionDialog = () => setVersionDialogOpen(true);
    const closeVersionDialog = () => setVersionDialogOpen(false);

    const closeDownloadIosDialog = () => setDownloadIosDialogOpen(false);

    const darkThemeColors = {
        background: "#122428",
        surface: "#14442e",
        text: "#86efac",
        primary: "#22c55e",
    };

    const lightThemeColors = {
        background: "#f6fbf4",
        surface: "#eaeaea",
        text: "#171d19",
        primary: "#276a49",
    };

    const colors = theme === "dark" ? darkThemeColors : lightThemeColors;

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center overflow-y-auto w-screen"
            style={{ backgroundColor: colors.background }}
        >
            {/* Основной контейнер */}
            <div className="w-full max-w-screen-md mx-auto px-4 sm:px-8 py-6">
                {/* Карточка с названием приложения */}
                <div
                    className="w-full border rounded-xl p-6 sm:p-8 text-center mt-16"
                    style={{ backgroundColor: colors.surface, borderColor: colors.primary }}
                >
                    <h2 className="text-[25px] sm:text-[30px] font-bold" style={{ color: colors.text }}>
                        FF Sensitivities Raf
                    </h2>
                    <p className="text-xl sm:text-2xl" style={{ color: colors.primary }}>
                        from ByteFlipper
                    </p>
                </div>

                {/* Остальные карточки */}
                {[
                    {
                        icon: null,
                        text: "FF Sensitivities Raf – это вторичный и неофициальный клиент приложения FF Sensitivities.\n" +
                            "ByteFlipper является единственным автором и владельцем мобильного и веб-приложения FF Sensitivities.\n" +
                            "Разработка FF Sensitivities Raf основана на оригинальном приложении и не является его официальной версией.\n" +
                            "Все права на оригинальный код, данные и бренд принадлежат ByteFlipper.\n" +
                            "Автор FF Sensitivities оставляет за собой право потребовать удаления данного вторичного неофициального клиента в любое время.\n" +
                            "\n" +
                            "Этот проект распространяется без каких-либо гарантий",
                        onClick: null,
                    },
                    { icon: <FaInfoCircle size={24} style={{ color: colors.primary }} />, text: "Версия: 1.0", onClick: openVersionDialog },
                    { icon: <img src="/ffsensitivities_raf_web/favicon.svg" alt="Favicon" width={24} height={24} />, text: "ByteFlipper (WEB)", onClick: () => window.open("https://byteflipper.web.app/", "_blank") },
                    { icon: <FaShieldAlt size={24} style={{ color: colors.primary }} />, text: "Политика приватности", onClick: () => window.open("https://byteflipper.web.app/privacy-policy", "_blank") },
                    { icon: <FaCode size={24} style={{ color: colors.primary }} />, text: "Исходный код", onClick: () => window.open("https://github.com/Raf0707/ffsensitivities_web", "_blank") },
                    { icon: <FaAndroid size={24} style={{ color: colors.primary }} />, text: "Скачать на Android в Google Play", onClick: () => window.open("https://play.google.com/store/apps/details?id=com.byteflipper.ffsensitivities", "_blank") },
                    { icon: <FaAndroid size={24} style={{ color: colors.primary }} />, text: "Скачать на Android в RuStore", onClick: () => window.open("https://www.rustore.ru/catalog/app/com.byteflipper.ffsensitivities", "_blank") },
                    { icon: <FaUser size={24} style={{ color: colors.primary }} />, text: "Рафаил Кикматулин", onClick: () => window.open("https://github.com/Raf0707", "_blank") },
                    { icon: <FaEnvelope size={24} style={{ color: colors.primary }} />, text: "raf_android-dev@mail.ru", onClick: () => window.open("mailto:raf_android-dev@mail.ru", "_blank") },
                    { icon: <FaUser size={24} style={{ color: colors.primary }} />, text: "ByteFlipper (GitHub)", onClick: () => window.open("https://github.com/ByteFlipper-58", "_blank") },
                    { icon: <FaEnvelope size={24} style={{ color: colors.primary }} />, text: "byteflipper.business@gmail.com", onClick: () => window.open("mailto:byteflipper.business@gmail.com", "_blank") },
                    { icon: <FaCode size={24} style={{ color: colors.primary }} />, text: "Другие Приложения", onClick: () => window.open("https://www.rustore.ru/catalog/developer/90b1826e", "_blank") },
                    { icon: <FaShareAlt size={24} style={{ color: colors.primary }} />, text: "Поделиться приложением", onClick: () => window.open("https://raf0707.github.io/zickreee_web", "_blank") },
                ].map((card, index) => (
                    <div
                        key={index}
                        className="w-full border rounded-xl p-4 sm:p-6 text-center cursor-pointer mt-4"
                        style={{ backgroundColor: colors.surface, borderColor: colors.primary }}
                        onClick={card.onClick ? card.onClick : undefined}
                    >
                        <div className="flex items-center justify-center space-x-4">
                            {card.icon}
                            <p className="text-xl sm:text-2xl" style={{ color: colors.text }}>
                                {card.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Диалоговое окно для версии */}
            {isVersionDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#122428] border border-[#14442e] rounded-xl p-6 text-center max-w-md mx-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#86efac] mb-4">
                            Версия 1.0
                        </h3>
                        <p className="text-lg sm:text-xl text-[#4ade80]">
                            Текущая версия приложения: 1.0, но если у вас есть пожелания по новому функционалу —
                            напишите ваши предложения нам на почту
                        </p>

                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                onClick={() => window.open("mailto:raf_android-dev@mail.ru", "_blank")}
                                className="bg-[#4ade80] px-4 py-2 rounded-lg"
                            >
                                Написать пожелания по функционалу
                            </button>
                            <button
                                onClick={closeVersionDialog}
                                className="bg-[#4ade80] px-4 py-2 rounded-lg"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Диалоговое окно для скачивания на iOS */}
            {isDownloadIosDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#122428] border border-[#14442e] rounded-xl p-6 text-center max-w-md mx-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#86efac] mb-4">
                            Скачать на iOS
                        </h3>
                        <p className="text-lg sm:text-xl text-[#4ade80]">
                            Наше приложение выйдет в App Store для iOS совсем скоро —
                            когда у разработчика появится MacBook Pro 16 M3 Pro для разработки,
                            iPhone 13 Pro Max для тестирования и лицензия разработчика App Store для публикации приложения.
                            <br />
                            (Да, разработчик татарин)
                        </p>

                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                onClick={() => window.open("https://www.donationalerts.com/r/raf0707", "_blank")}
                                className="bg-[#4ade80] px-4 py-2 rounded-lg"
                            >
                                Помочь разработчику с покупками
                            </button>
                            <button
                                onClick={() => window.open("mailto:raf_android-dev@mail.ru", "_blank")}
                                className="bg-[#4ade80] px-4 py-2 rounded-lg"
                            >
                                Связаться с разработчиком и купить ему MacBook Pro 16 M3 Pro,
                                iPhone 13 Pro Max и лицензию разработчика App Store
                            </button>
                            <button
                                onClick={closeDownloadIosDialog}
                                className="bg-[#4ade80] px-4 py-2 rounded-lg"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutApp;