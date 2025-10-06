import { FC } from "react";

interface PageProps {
    theme: "light" | "dark";
    toggleTheme?: () => void;
}

const PrivacyPolicy: FC<PageProps> = ({ theme }) => {
    const colors = theme === "dark"
        ? { background: "#122428", surface: "#14442e", text: "#86efac" }
        : { background: "#f6fbf4", surface: "#eaeaea", text: "#171d19" };

    return (
        <div
            className="min-h-screen flex flex-col items-center overflow-y-auto w-screen pt-24 pb-24 px-4"
            style={{ backgroundColor: colors.background, color: colors.text }}
        >
            <div
                className="w-full max-w-4xl border rounded-xl p-6 sm:p-8"
                style={{ backgroundColor: colors.surface, borderColor: colors.text }}
            >
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
                    Политика конфиденциальности
                </h1>

                <p className="mb-4">
                    Настоящая Политика конфиденциальности (далее – «Политика») регулирует порядок
                    обработки, хранения и использования информации пользователями приложения
                    <b> «Знакомства для тактильных» </b> (далее – «Приложение»).
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">1. Общие положения</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Разработчик Приложения не несет ответственности за достоверность данных, предоставленных пользователями.</li>
                    <li>Приложение является любительским, экспериментальным продуктом и не гарантирует постоянную работу.</li>
                    <li>Использование Приложения осуществляется исключительно на добровольной основе и под личную ответственность пользователя.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">2. Обрабатываемые данные</h2>
                <p>Мы можем собирать следующие данные:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Имя или псевдоним</li>
                    <li>Возраст, пол, город проживания</li>
                    <li>Информация о предпочтениях (анкеты, ответы)</li>
                    <li>Контактные данные (например, Telegram-ник)</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">3. Цели обработки данных</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Обеспечение работы приложения и его функциональности.</li>
                    <li>Улучшение качества сервиса и удобства использования.</li>
                    <li>Формирование пользовательских анкет для поиска единомышленников.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">4. Отказ от ответственности</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Разработчик не несет ответственности за действия и поведение пользователей внутри и вне Приложения.</li>
                    <li>Разработчик не предоставляет медицинских, психологических или иных профессиональных услуг.</li>
                    <li>Все последствия встреч, договоренностей и взаимодействий пользователей находятся вне контроля Приложения.</li>
                    <li>Разработчик не гарантирует бесперебойную работу и полную защиту данных.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">5. Хранение данных</h2>
                <p>Данные могут храниться на устройствах пользователей или серверах сторонних сервисов. Разработчик не гарантирует полную сохранность информации.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">6. Согласие</h2>
                <p>Используя Приложение, пользователь соглашается с настоящей Политикой.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">7. Изменения</h2>
                <p>Разработчик оставляет за собой право изменять Политику без предварительного уведомления.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
