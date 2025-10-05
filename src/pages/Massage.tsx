import { useState } from "react";
import Toolbar from "../components/Toolbar";

type MassageDirection = "nonMedical" | "smile";
type MassageRole = "giver" | "receiver";

type MassageFormState = {
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;

    // Немедицинский массаж
    nonMedicalTypes: string[];

    // Смайл-терапия (ticklee/tickler)
    ticklishLevel: number;
    ticklishPlaces: string[];
    mostTicklishPlace: string;
    preferredPlacesTicklee: string[];
    noTicklishPlaces: string[];
    tabuPlaces: string[];

    favouriteTicklingPlace: string;
    preferredPlacesTickler: string[];
    noFavouritePlacesTickler: string[];

    // Общие
    sessionDurationsMin: string[];
    locationTypes: string[];
    acceptsGender: string[];
    priceFrom: string;
    priceTo: string;

    stopWordOrTimer: string;
};

const initialState: MassageFormState = {
    name: "",
    gender: "",
    age: "",
    countryCity: "",
    tg: "",

    nonMedicalTypes: [],

    ticklishLevel: 5,
    ticklishPlaces: [],
    mostTicklishPlace: "",
    preferredPlacesTicklee: [],
    noTicklishPlaces: [],
    tabuPlaces: [],

    favouriteTicklingPlace: "",
    preferredPlacesTickler: [],
    noFavouritePlacesTickler: [],

    sessionDurationsMin: [],
    locationTypes: [],
    acceptsGender: [],
    priceFrom: "",
    priceTo: "",

    stopWordOrTimer: ""
};

export default function Massage({
                                    direction,
                                    role
                                }: {
    direction: MassageDirection;
    role: MassageRole;
}) {
    const [state, setState] = useState<MassageFormState>(initialState);
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

    const isFormValid = (s: MassageFormState) => {
        return s.name && s.gender && s.age && s.countryCity && s.tg;
    };

    const copyToClipboard = () => {
        const msg = buildTelegramMessage(direction, role, state);
        navigator.clipboard.writeText(msg);
        alert("Анкета скопирована!");
    };

    const openTelegram = () => {
        copyToClipboard();
        window.open("https://t.me/ibn_Rustum", "_blank");
    };

    return (
        <div
            className="min-h-screen w-screen pt-24 overflow-y-auto"
            style={{ backgroundColor: colors.background, color: colors.text }}
        >
            <Toolbar
                theme={theme}
                toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
            />

            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center">
                    Анкета ({direction === "nonMedical" ? "Немедицинский массаж" : "Смайл-терапия"})
                </h1>

                {/* Основная инфа */}
                <div
                    className="p-4 border rounded-xl"
                    style={{ backgroundColor: colors.surface }}
                >
                    <input
                        className="w-full p-2 mb-2 rounded bg-transparent border"
                        placeholder="Имя"
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                    />
                    <input
                        className="w-full p-2 mb-2 rounded bg-transparent border"
                        placeholder={role === "giver" ? "Кто вы (массажист/массажистка)" : "Ваш пол"}
                        value={state.gender}
                        onChange={(e) => setState({ ...state, gender: e.target.value })}
                    />
                    <input
                        className="w-full p-2 mb-2 rounded bg-transparent border"
                        placeholder="Возраст"
                        value={state.age}
                        onChange={(e) => setState({ ...state, age: e.target.value })}
                    />
                    <input
                        className="w-full p-2 mb-2 rounded bg-transparent border"
                        placeholder="Страна, город"
                        value={state.countryCity}
                        onChange={(e) =>
                            setState({ ...state, countryCity: e.target.value })
                        }
                    />
                    <input
                        className="w-full p-2 mb-2 rounded bg-transparent border"
                        placeholder="Телеграм"
                        value={state.tg}
                        onChange={(e) => setState({ ...state, tg: e.target.value })}
                    />
                </div>

                {/* Немедицинский массаж */}
                {direction === "nonMedical" && (
                    <textarea
                        className="w-full p-2 rounded bg-transparent border"
                        placeholder="Подтипы (например: классический, тайский)"
                        value={state.nonMedicalTypes.join(", ")}
                        onChange={(e) =>
                            setState({
                                ...state,
                                nonMedicalTypes: e.target.value.split(",").map((s) => s.trim()),
                            })
                        }
                    />
                )}

                {/* Смайл-терапия */}
                {direction === "smile" && (
                    <>
                        {role === "giver" ? (
                            <>
                                <input
                                    className="w-full p-2 rounded bg-transparent border"
                                    placeholder="Любимое место для щекотки"
                                    value={state.favouriteTicklingPlace}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            favouriteTicklingPlace: e.target.value,
                                        })
                                    }
                                />
                                <textarea
                                    className="w-full p-2 rounded bg-transparent border"
                                    placeholder="Предпочитаемые места (tickler)"
                                    value={state.preferredPlacesTickler.join(", ")}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            preferredPlacesTickler: e.target.value
                                                .split(",")
                                                .map((s) => s.trim()),
                                        })
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <label>
                                    Уровень щекотливости: {state.ticklishLevel}/10
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={10}
                                    value={state.ticklishLevel}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            ticklishLevel: +e.target.value,
                                        })
                                    }
                                    className="w-full"
                                />

                                <input
                                    className="w-full p-2 rounded bg-transparent border"
                                    placeholder="Самое чувствительное место"
                                    value={state.mostTicklishPlace}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            mostTicklishPlace: e.target.value,
                                        })
                                    }
                                />
                            </>
                        )}

                        <input
                            className="w-full p-2 rounded bg-transparent border"
                            placeholder="Стоп-слово или таймер"
                            value={state.stopWordOrTimer}
                            onChange={(e) =>
                                setState({ ...state, stopWordOrTimer: e.target.value })
                            }
                        />
                    </>
                )}

                {/* Действия */}
                <button
                    onClick={() =>
                        isFormValid(state)
                            ? copyToClipboard()
                            : alert("Заполни все поля!")
                    }
                    className="w-full p-3 rounded bg-green-600 text-white font-bold"
                >
                    Завершить и скопировать
                </button>
                <button
                    onClick={() =>
                        isFormValid(state) ? openTelegram() : alert("Заполни все поля!")
                    }
                    className="w-full p-3 rounded bg-blue-600 text-white font-bold"
                >
                    Отправить в Telegram
                </button>
            </div>
        </div>
    );
}

function buildTelegramMessage(
    direction: MassageDirection,
    role: MassageRole,
    s: MassageFormState
): string {
    const tg = s.tg.trim().replace(/^@/, "");

    let msg = `📝 Анкета (${
        direction === "nonMedical" ? "Немедицинский массаж" : "Смайл-терапия"
    } — ${role === "giver" ? "мастер" : "клиент"})\n\n`;

    msg += `👤 Имя: ${s.name}\nПол: ${s.gender}\nВозраст: ${s.age}\nГород: ${s.countryCity}\nТелеграм: @${tg}\n\n`;

    if (direction === "nonMedical") {
        msg += `💼 Подтипы: ${s.nonMedicalTypes.join(", ") || "—"}\n`;
    }

    if (direction === "smile") {
        if (role === "giver") {
            msg += `🫳 Как Тиклер:\nЛюбимое место: ${s.favouriteTicklingPlace || "—"}\nПредпочитаемые места: ${s.preferredPlacesTickler.join(", ") || "—"}\n`;
        } else {
            msg += `😆 Как Тикля:\nУровень: ${s.ticklishLevel}/10\nСамое чувствительное место: ${s.mostTicklishPlace || "—"}\n`;
        }
        msg += `Стоп-слово/таймер: ${s.stopWordOrTimer || "—"}\n`;
    }

    return msg;
}
