import { useState } from "react";
import Toolbar from "../components/Toolbar";

type SwitchFormState = {
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;
    dominantRole: string;
    ticklishLevel: number;
    ticklishPlaces: string[];
    ticklishPlaceLevels: Record<string, number>;
    mostTicklishPlace: string;
    preferredPlacesTicklee: string[];
    noTicklishPlaces: string[];
    tabuPlaces: string[];
    favouriteTicklingPlace: string;
    preferredPlacesTickler: string[];
    preferredPlaceLevelsTickler: Record<string, number>;
    noFavouritePlacesTickler: string[];
};

const initialState: SwitchFormState = {
    name: "",
    gender: "",
    age: "",
    countryCity: "",
    tg: "",
    dominantRole: "",
    ticklishLevel: 5,
    ticklishPlaces: [],
    ticklishPlaceLevels: {},
    mostTicklishPlace: "",
    preferredPlacesTicklee: [],
    noTicklishPlaces: [],
    tabuPlaces: [],
    favouriteTicklingPlace: "",
    preferredPlacesTickler: [],
    preferredPlaceLevelsTickler: {},
    noFavouritePlacesTickler: [],
};

const levelToText = (l: number) => {
    if (l <= 3) return "очень низкая";
    if (l <= 6) return "средняя";
    if (l <= 8) return "высокая";
    return "очень высокая";
};
const levelToPrefTickler = (l: number) => {
    if (l <= 3) return "почти не нравится";
    if (l <= 6) return "умеренно";
    if (l <= 8) return "нравится";
    return "очень нравится";
};

export default function Switch() {
    const [state, setState] = useState<SwitchFormState>(initialState);
    const [theme, setTheme] = useState<"dark" | "light">("dark");

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

    const isFormValid = (s: SwitchFormState) =>
        s.name &&
        s.gender &&
        s.age &&
        s.countryCity &&
        s.tg &&
        s.dominantRole &&
        s.mostTicklishPlace &&
        s.favouriteTicklingPlace;

    const copyToClipboard = () => {
        const msg = buildTelegramMessage(state);
        navigator.clipboard.writeText(msg);
        alert("Анкета скопирована!");
    };

    const openTelegram = () => {
        copyToClipboard();
        window.open("https://t.me/ibn_Rustum", "_blank");
    };

    // helper — для текстовых полей со списками
    const parseList = (text: string) => text.split(",").map(s => s.trim()).filter(Boolean);

    return (
        <div
            className="min-h-screen w-screen pt-24 overflow-y-auto"
            style={{ backgroundColor: colors.background, color: colors.text }}
        >
            <Toolbar theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center">Анкета (Свич)</h1>

                {/* Основная информация */}
                <div className="p-4 border rounded-xl" style={{ backgroundColor: colors.surface }}>
                    <input className="w-full p-2 mb-2 rounded bg-transparent border"
                           placeholder="Имя" value={state.name}
                           onChange={(e) => setState({ ...state, name: e.target.value })}/>
                    <input className="w-full p-2 mb-2 rounded bg-transparent border"
                           placeholder="Пол" value={state.gender}
                           onChange={(e) => setState({ ...state, gender: e.target.value })}/>
                    <input className="w-full p-2 mb-2 rounded bg-transparent border"
                           placeholder="Возраст" value={state.age}
                           onChange={(e) => setState({ ...state, age: e.target.value })}/>
                    <input className="w-full p-2 mb-2 rounded bg-transparent border"
                           placeholder="Страна, город" value={state.countryCity}
                           onChange={(e) => setState({ ...state, countryCity: e.target.value })}/>
                    <input className="w-full p-2 mb-2 rounded bg-transparent border"
                           placeholder="Телеграм" value={state.tg}
                           onChange={(e) => setState({ ...state, tg: e.target.value })}/>
                </div>

                {/* Доминирующая роль */}
                <div className="p-4 border rounded-xl" style={{ backgroundColor: colors.surface }}>
                    <label className="font-bold">Доминирующая роль</label>
                    {["Больше тиклер", "Больше тикля", "Оба одинаково"].map((opt) => (
                        <label key={opt} className="block mt-2">
                            <input type="radio" checked={state.dominantRole === opt}
                                   onChange={() => setState({ ...state, dominantRole: opt })}/> {opt}
                        </label>
                    ))}
                </div>

                {/* ===== Часть 1: как Тикля ===== */}
                <h2 className="text-xl font-bold">Часть 1: как Тикля</h2>
                <div className="p-4 border rounded-xl space-y-4" style={{ backgroundColor: colors.surface }}>
                    <label>
                        Уровень щекотливости: {state.ticklishLevel}/10 ({levelToText(state.ticklishLevel)})
                    </label>
                    <input type="range" min={1} max={10} value={state.ticklishLevel}
                           onChange={(e) => setState({ ...state, ticklishLevel: +e.target.value })}
                           className="w-full"/>
                </div>

                <input className="w-full p-2 rounded bg-transparent border"
                       placeholder="Самое чувствительное место"
                       value={state.mostTicklishPlace}
                       onChange={(e) => setState({ ...state, mostTicklishPlace: e.target.value })}/>

                <textarea className="w-full p-2 rounded bg-transparent border"
                          placeholder="Чувствительные места (через запятую)"
                          value={state.ticklishPlaces.join(", ")}
                          onChange={(e) =>
                              setState({ ...state, ticklishPlaces: parseList(e.target.value) })}/>

                {/* уровни для чувствительных мест */}
                {state.ticklishPlaces.map((place) => (
                    <div key={place} className="p-2">
                        <label>{place}: {state.ticklishPlaceLevels[place] || 5}/10 ({levelToText(state.ticklishPlaceLevels[place] || 5)})</label>
                        <input type="range" min={1} max={10}
                               value={state.ticklishPlaceLevels[place] || 5}
                               onChange={(e) =>
                                   setState({
                                       ...state,
                                       ticklishPlaceLevels: {
                                           ...state.ticklishPlaceLevels,
                                           [place]: +e.target.value,
                                       },
                                   })
                               } className="w-full"/>
                    </div>
                ))}

                <textarea className="w-full p-2 rounded bg-transparent border"
                          placeholder="Предпочитаемые места (ticklee)"
                          value={state.preferredPlacesTicklee.join(", ")}
                          onChange={(e) => setState({ ...state, preferredPlacesTicklee: parseList(e.target.value) })}/>
                <textarea className="w-full p-2 rounded bg-transparent border"
                          placeholder="Не щекотать (ticklee)"
                          value={state.noTicklishPlaces.join(", ")}
                          onChange={(e) => setState({ ...state, noTicklishPlaces: parseList(e.target.value) })}/>
                <textarea className="w-full p-2 rounded bg-transparent border"
                          placeholder="Табу места"
                          value={state.tabuPlaces.join(", ")}
                          onChange={(e) => setState({ ...state, tabuPlaces: parseList(e.target.value) })}/>

                {/* ===== Часть 2: как Тиклер ===== */}
                <h2 className="text-xl font-bold">Часть 2: как Тиклер</h2>
                <input className="w-full p-2 rounded bg-transparent border"
                       placeholder="Любимое место для щекотки"
                       value={state.favouriteTicklingPlace}
                       onChange={(e) => setState({ ...state, favouriteTicklingPlace: e.target.value })}/>

                <textarea className="w-full p-2 rounded bg-transparent border"
                          placeholder="Предпочитаемые места (tickler)"
                          value={state.preferredPlacesTickler.join(", ")}
                          onChange={(e) => setState({ ...state, preferredPlacesTickler: parseList(e.target.value) })}/>

                {/* уровни для предпочитаемых мест тиклера */}
                {state.preferredPlacesTickler.map((place) => (
                    <div key={place} className="p-2">
                        <label>{place}: {state.preferredPlaceLevelsTickler[place] || 5}/10 ({levelToPrefTickler(state.preferredPlaceLevelsTickler[place] || 5)})</label>
                        <input type="range" min={1} max={10}
                               value={state.preferredPlaceLevelsTickler[place] || 5}
                               onChange={(e) =>
                                   setState({
                                       ...state,
                                       preferredPlaceLevelsTickler: {
                                           ...state.preferredPlaceLevelsTickler,
                                           [place]: +e.target.value,
                                       },
                                   })
                               } className="w-full"/>
                    </div>
                ))}

                <textarea className="w-full p-2 rounded bg-transparent border"
                          placeholder="Не щекотать (tickler)"
                          value={state.noFavouritePlacesTickler.join(", ")}
                          onChange={(e) => setState({ ...state, noFavouritePlacesTickler: parseList(e.target.value) })}/>

                {/* Действия */}
                <button onClick={() => (isFormValid(state) ? copyToClipboard() : alert("Заполни все обязательные поля!"))}
                        className="w-full p-3 rounded bg-green-600 text-white font-bold">
                    Завершить и скопировать
                </button>
                <button onClick={() => (isFormValid(state) ? openTelegram() : alert("Заполни все обязательные поля!"))}
                        className="w-full p-3 rounded bg-blue-600 text-white font-bold">
                    Отправить в Telegram
                </button>
            </div>
        </div>
    );
}

function buildTelegramMessage(s: SwitchFormState): string {
    const tg = s.tg.trim().replace(/^@/, "");
    const buildPlaces = (levels: Record<string, number>, conv: (l: number) => string) =>
        Object.entries(levels).map(([place, lvl]) => `• ${place} — ${lvl}/10 (${conv(lvl)})`).join("\n");

    return `
📝 Новая анкета (Свич)

👤 Основная информация:
Имя: ${s.name}
Пол: ${s.gender}
Возраст: ${s.age}
Страна, город: ${s.countryCity}
Телеграм: @${tg}
Доминирующая роль: ${s.dominantRole || "—"}

😆 Как Тикля:
Общий уровень: ${s.ticklishLevel}/10 (${levelToText(s.ticklishLevel)})
Чувствительные места:
${buildPlaces(s.ticklishPlaceLevels, levelToText) || s.ticklishPlaces.join(", ") || "—"}
Самое чувствительное место: ${s.mostTicklishPlace || "—"}
Предпочитаемые места: ${s.preferredPlacesTicklee.join(", ") || "—"}
Не щекотать: ${s.noTicklishPlaces.join(", ") || "—"}
Табу: ${s.tabuPlaces.join(", ") || "—"}

🫳 Как Тиклер:
Любимое место для щекотки: ${s.favouriteTicklingPlace || "—"}
Предпочитаемые места:
${buildPlaces(s.preferredPlaceLevelsTickler, levelToPrefTickler) || s.preferredPlacesTickler.join(", ") || "—"}
Предпочитаю не щекотать: ${s.noFavouritePlacesTickler.join(", ") || "—"}
`;
}
