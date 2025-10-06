import { FC } from "react";

interface PageProps {
    theme: "light" | "dark";
    toggleTheme?: () => void;
}

const TermsOfUse: FC<PageProps> = ({ theme }) => {
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
                    Пользовательское соглашение
                </h1>

                <p className="mb-4">
                    Настоящее Пользовательское соглашение (далее – «Соглашение») регулирует условия использования приложения
                    <b> «Знакомства для тактильных» </b> (далее – «Приложение»).
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">1. Общие положения</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Используя Приложение, пользователь подтверждает, что ознакомлен с условиями Соглашения.</li>
                    <li>Приложение предоставляется «как есть» (as is) без каких-либо гарантий.</li>
                    <li>Разработчик вправе изменять функционал или прекращать работу Приложения в любое время без уведомления.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">2. Ограничения</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Запрещено использовать Приложение для незаконных действий.</li>
                    <li>Разработчик не несет ответственности за контент, размещаемый пользователями.</li>
                    <li>Приложение не предназначено для медицинских, интимных или иных профессиональных услуг.</li>
                    <li>Все взаимодействия происходят исключительно по личной инициативе пользователей.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">3. Ответственность</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Пользователь самостоятельно несет ответственность за свои действия в Приложении и за пределами его использования.</li>
                    <li>Разработчик не несет ответственности за прямые или косвенные убытки, причиненные в результате использования Приложения.</li>
                    <li>Разработчик не несет ответственности за технические сбои, утечки данных и неполадки оборудования.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">4. Правообладатель</h2>
                <p>Все права на исходный код принадлежат разработчику. Использование кода и бренда без разрешения запрещено.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">5. Заключительные положения</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Соглашение вступает в силу с момента начала использования Приложения.</li>
                    <li>Разработчик оставляет за собой право изменять Соглашение без уведомления.</li>
                    <li>Продолжение использования Приложения после изменений считается согласием с ними.</li>
                </ul>
            </div>
        </div>
    );
};

export default TermsOfUse;
