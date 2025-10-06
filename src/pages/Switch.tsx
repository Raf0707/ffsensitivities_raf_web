import { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Slider,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { PageProps } from "./PageProps.tsx";

interface SwitchFormState {
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;
    dominantRole: string;

    // Ticklee
    ticklishLevel: number;
    mostTicklishPlace: string;
    preferredPlacesTicklee: string[];
    preferredPlaceLevelsTicklee: Record<string, number>;
    noTicklishPlaces: string[];
    tabuPlaces: string[];

    // Tickler
    favouriteTicklingPlace: string;
    preferredPlacesTickler: string[];
    preferredPlaceLevelsTickler: Record<string, number>;
    noFavouritePlacesTickler: string[];
}

const PLACES = [
    "Шея и область над грудью",
    "Подмышки",
    "Локти",
    "Кисти рук",
    "Грудь",
    "Под грудью",
    "Живот",
    "Рёбра",
    "Бока",
    "Ягодицы",
    "Бёдра",
    "Стопы",
    "Спина",
];

const NO_TICKLISH = ["Нет таких мест", ...PLACES];
const TABU = ["Нет таких мест", ...PLACES];

// шкалы
const levelToPrefTicklee = (lvl: number) =>
    lvl <= 2
        ? "не боюсь"
        : lvl <= 4
            ? "чуть-чуть боюсь"
            : lvl <= 6
                ? "боюсь"
                : lvl <= 8
                    ? "очень боюсь"
                    : "не могу терпеть";

const levelToPrefTickler = (lvl: number) =>
    lvl <= 2
        ? "не предпочитаю"
        : lvl <= 4
            ? "можно иногда"
            : lvl <= 6
                ? "нравится"
                : lvl <= 8
                    ? "очень нравится"
                    : "одно из любимых мест";

export default function Switch({ theme, toggleTheme }: PageProps) {
    const [state, setState] = useState<SwitchFormState>({
        name: "",
        gender: "",
        age: "",
        countryCity: "",
        tg: "",
        dominantRole: "",

        ticklishLevel: 5,
        mostTicklishPlace: "",
        preferredPlacesTicklee: [],
        preferredPlaceLevelsTicklee: {},
        noTicklishPlaces: [],
        tabuPlaces: [],

        favouriteTicklingPlace: "",
        preferredPlacesTickler: [],
        preferredPlaceLevelsTickler: {},
        noFavouritePlacesTickler: [],
    });

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
        navigator.clipboard.writeText(msg).then(() => alert("Анкета скопирована!"));
    };

    const openTelegram = () => {
        copyToClipboard();
        window.open("https://t.me/ibn_Rustum", "_blank");
    };

    // цвета
    const greenDark = "#91D5AC";
    const greenLight = "#276A49";
    const bgDark = "#0F1511";
    const bgLight = "#F6FBF4";
    const surfaceDark = "#1B211D";
    const surfaceLight = "#EAEFE9";
    const textLight = "#171D19";
    const hintDark = "#AAAAAA";

    const textColor = theme === "dark" ? "#FFFFFF" : textLight;

    const textFieldSx = {
        "& .MuiInputBase-input": { color: textColor },
        "& .MuiInputLabel-root": {
            color: theme === "dark" ? hintDark : textLight,
            "&.Mui-focused": { color: theme === "dark" ? greenDark : greenLight },
        },
        "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? greenDark : greenLight,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? greenDark : greenLight,
            },
        },
    };

    const checkboxSx = {
        color: theme === "dark" ? "#FFFFFF" : greenLight,
        "&.Mui-checked": {
            color: theme === "dark" ? greenDark : greenLight,
        },
        "&:hover": { backgroundColor: "transparent" },
    };

    const sliderSx = {
        color: theme === "dark" ? greenDark : greenLight,
        "& .MuiSlider-thumb": { boxShadow: "none" },
        "& .MuiSlider-rail": { opacity: 0.4 },
    };

    const selectSx = {
        "& .MuiInputBase-input": { color: textColor },
        "& .MuiInputLabel-root": {
            color: theme === "dark" ? hintDark : textLight,
            "&.Mui-focused": { color: theme === "dark" ? greenDark : greenLight },
        },
        "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? greenDark : greenLight,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? greenDark : greenLight,
            },
        },
        "& .MuiSelect-iconOutlined": {
            color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center overflow-y-auto w-screen pt-24"
            style={{
                backgroundColor: theme === "dark" ? bgDark : bgLight,
                color: textColor,
            }}
        >
            <div className="w-full max-w-4xl px-4 sm:px-8 py-6">
                {/* Заголовок */}
                <div className="flex justify-between items-center mb-6">
                    <Typography variant="h5" style={{ color: textColor }}>
                        Анкета (Свич)
                    </Typography>
                    {toggleTheme && (
                        <Button
                            variant="contained"
                            onClick={toggleTheme}
                            style={{
                                backgroundColor: theme === "dark" ? greenDark : greenLight,
                                color: theme === "dark" ? bgDark : "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Сменить тему
                        </Button>
                    )}
                </div>

                {/* Основная информация */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Основная информация
                        </Typography>
                        <TextField label="Имя" fullWidth margin="normal" value={state.name}
                                   inputProps={{ maxLength: 30 }}
                                   onChange={(e) => setState({ ...state, name: e.target.value })}
                                   sx={textFieldSx}/>
                        <Select fullWidth value={state.gender} displayEmpty
                                onChange={(e) => setState({ ...state, gender: e.target.value })}
                                sx={{ ...selectSx, mt: 2 }}>
                            <MenuItem value=""><em>Выберите пол</em></MenuItem>
                            <MenuItem value="Парень">Парень</MenuItem>
                            <MenuItem value="Девушка">Девушка</MenuItem>
                        </Select>
                        <TextField label="Возраст" fullWidth margin="normal" value={state.age}
                                   inputProps={{ maxLength: 3, inputMode: "numeric", pattern: "[0-9]*" }}
                                   onChange={(e) => setState({ ...state, age: e.target.value.replace(/\D/g, "") })}
                                   sx={textFieldSx}/>
                        <TextField label="Страна, город" fullWidth margin="normal" value={state.countryCity}
                                   onChange={(e) => setState({ ...state, countryCity: e.target.value })}
                                   sx={textFieldSx}/>
                        <TextField label="телеграм-ник (без @)" fullWidth margin="normal" value={state.tg}
                                   onChange={(e) => setState({ ...state, tg: e.target.value })}
                                   sx={textFieldSx}/>
                    </CardContent>
                </Card>

                {/* Роль */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>Доминирующая роль</Typography>
                        <Select fullWidth value={state.dominantRole} displayEmpty
                                onChange={(e) => setState({ ...state, dominantRole: e.target.value })}
                                sx={selectSx}>
                            <MenuItem value=""><em>Выберите роль</em></MenuItem>
                            <MenuItem value="Больше тиклер">Больше тиклер</MenuItem>
                            <MenuItem value="Больше тикля">Больше тикля</MenuItem>
                            <MenuItem value="Оба одинаково">Оба одинаково</MenuItem>
                        </Select>
                    </CardContent>
                </Card>

                {/* Часть 1: Ticklee */}
                <Typography variant="h6" style={{ color: textColor, marginBottom: 8 }}>Часть 1: как Тикля</Typography>
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography style={{ color: textColor }}>
                            Чувствительность: {state.ticklishLevel}/10 ({levelToPrefTicklee(state.ticklishLevel)})
                        </Typography>
                        <Slider min={1} max={10} value={state.ticklishLevel}
                                onChange={(_, val) => setState({ ...state, ticklishLevel: val as number })}
                                sx={sliderSx}/>
                    </CardContent>
                </Card>
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Самое чувствительное место
                        </Typography>
                        <Select fullWidth value={state.mostTicklishPlace} displayEmpty
                                onChange={(e) => setState({ ...state, mostTicklishPlace: e.target.value })}
                                sx={selectSx}>
                            <MenuItem value=""><em>Выберите место</em></MenuItem>
                            {PLACES.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </Select>
                    </CardContent>
                </Card>
                {/* Предпочитаемые места Ticklee */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>Предпочитаемые места (Ticklee)</Typography>
                        {PLACES.map((place) => (
                            <div key={place}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.preferredPlacesTicklee.includes(place)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setState({
                                                    ...state,
                                                    preferredPlacesTicklee: checked
                                                        ? [...state.preferredPlacesTicklee, place]
                                                        : state.preferredPlacesTicklee.filter((p) => p !== place),
                                                    preferredPlaceLevelsTicklee: {
                                                        ...state.preferredPlaceLevelsTicklee,
                                                        [place]: checked ? 5 : 5,
                                                    },
                                                });
                                            }}
                                            sx={checkboxSx}
                                        />
                                    }
                                    label={place}
                                    style={{ color: textColor }}
                                />
                                {state.preferredPlacesTicklee.includes(place) && (
                                    <div style={{ paddingLeft: 32 }}>
                                        <Slider min={1} max={10}
                                                value={state.preferredPlaceLevelsTicklee[place] || 5}
                                                onChange={(_, val) => setState({
                                                    ...state,
                                                    preferredPlaceLevelsTicklee: {
                                                        ...state.preferredPlaceLevelsTicklee,
                                                        [place]: val as number,
                                                    },
                                                })}
                                                sx={sliderSx}/>
                                        <Typography variant="body2" style={{ color: textColor }}>
                                            {state.preferredPlaceLevelsTicklee[place] || 5}/10 — {levelToPrefTicklee(state.preferredPlaceLevelsTicklee[place] || 5)}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                {/* Не щекотать */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Не щекотать
                        </Typography>
                        {NO_TICKLISH.map((place) => {
                            const isNoneSelected = state.noTicklishPlaces.includes("Нет таких мест");
                            const isNoneOption = place === "Нет таких мест";

                            return (
                                <FormControlLabel
                                    key={place}
                                    control={
                                        <Checkbox
                                            checked={state.noTicklishPlaces.includes(place)}
                                            disabled={!isNoneOption && isNoneSelected} // блокируем остальные
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setState((prev) => {
                                                    let updated = [...prev.noTicklishPlaces];
                                                    if (checked) {
                                                        if (isNoneOption) {
                                                            updated = ["Нет таких мест"];
                                                        } else {
                                                            updated = updated.filter((p) => p !== "Нет таких мест");
                                                            updated.push(place);
                                                        }
                                                    } else {
                                                        updated = updated.filter((p) => p !== place);
                                                    }
                                                    return { ...prev, noTicklishPlaces: updated };
                                                });
                                            }}
                                            sx={checkboxSx}
                                        />
                                    }
                                    label={place}
                                    style={{ color: textColor }}
                                />
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Табу */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Табу
                        </Typography>
                        {TABU.map((place) => {
                            const isNoneSelected = state.tabuPlaces.includes("Нет таких мест");
                            const isNoneOption = place === "Нет таких мест";

                            return (
                                <FormControlLabel
                                    key={place}
                                    control={
                                        <Checkbox
                                            checked={state.tabuPlaces.includes(place)}
                                            disabled={!isNoneOption && isNoneSelected}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setState((prev) => {
                                                    let updated = [...prev.tabuPlaces];
                                                    if (checked) {
                                                        if (isNoneOption) {
                                                            updated = ["Нет таких мест"];
                                                        } else {
                                                            updated = updated.filter((p) => p !== "Нет таких мест");
                                                            updated.push(place);
                                                        }
                                                    } else {
                                                        updated = updated.filter((p) => p !== place);
                                                    }
                                                    return { ...prev, tabuPlaces: updated };
                                                });
                                            }}
                                            sx={checkboxSx}
                                        />
                                    }
                                    label={place}
                                    style={{ color: textColor }}
                                />
                            );
                        })}
                    </CardContent>
                </Card>


                {/* Часть 2: Tickler */}
                <Typography variant="h6" style={{ color: textColor, marginBottom: 8 }}>Часть 2: как Тиклер</Typography>
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Любимое место для щекотки
                        </Typography>
                        <Select fullWidth value={state.favouriteTicklingPlace} displayEmpty
                                onChange={(e) => setState({ ...state, favouriteTicklingPlace: e.target.value })}
                                sx={selectSx}>
                            <MenuItem value=""><em>Выберите место</em></MenuItem>
                            {PLACES.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                        </Select>
                    </CardContent>
                </Card>
                {/* Предпочитаемые места Tickler */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>Предпочитаемые места (Tickler)</Typography>
                        {PLACES.map((place) => (
                            <div key={place}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.preferredPlacesTickler.includes(place)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setState({
                                                    ...state,
                                                    preferredPlacesTickler: checked
                                                        ? [...state.preferredPlacesTickler, place]
                                                        : state.preferredPlacesTickler.filter((p) => p !== place),
                                                    preferredPlaceLevelsTickler: {
                                                        ...state.preferredPlaceLevelsTickler,
                                                        [place]: checked ? 5 : 5,
                                                    },
                                                });
                                            }}
                                            sx={checkboxSx}
                                        />
                                    }
                                    label={place}
                                    style={{ color: textColor }}
                                />
                                {state.preferredPlacesTickler.includes(place) && (
                                    <div style={{ paddingLeft: 32 }}>
                                        <Slider min={1} max={10}
                                                value={state.preferredPlaceLevelsTickler[place] || 5}
                                                onChange={(_, val) => setState({
                                                    ...state,
                                                    preferredPlaceLevelsTickler: {
                                                        ...state.preferredPlaceLevelsTickler,
                                                        [place]: val as number,
                                                    },
                                                })}
                                                sx={sliderSx}/>
                                        <Typography variant="body2" style={{ color: textColor }}>
                                            {state.preferredPlaceLevelsTickler[place] || 5}/10 — {levelToPrefTickler(state.preferredPlaceLevelsTickler[place] || 5)}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                {/* Избегаемые места Tickler */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Избегаемые места
                        </Typography>
                        {NO_TICKLISH.map((place) => {
                            const isNoneSelected = state.noFavouritePlacesTickler.includes("Нет таких мест");
                            const isNoneOption = place === "Нет таких мест";

                            return (
                                <FormControlLabel
                                    key={place}
                                    control={
                                        <Checkbox
                                            checked={state.noFavouritePlacesTickler.includes(place)}
                                            disabled={!isNoneOption && isNoneSelected} // блокируем остальные, если выбран "Нет таких мест"
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setState((prev) => {
                                                    let updated = [...prev.noFavouritePlacesTickler];
                                                    if (checked) {
                                                        if (isNoneOption) {
                                                            updated = ["Нет таких мест"];
                                                        } else {
                                                            updated = updated.filter((p) => p !== "Нет таких мест");
                                                            updated.push(place);
                                                        }
                                                    } else {
                                                        updated = updated.filter((p) => p !== place);
                                                    }
                                                    return { ...prev, noFavouritePlacesTickler: updated };
                                                });
                                            }}
                                            sx={checkboxSx}
                                        />
                                    }
                                    label={place}
                                    style={{ color: textColor }}
                                />
                            );
                        })}
                    </CardContent>
                </Card>


                {/* Кнопки */}
                <Button variant="contained" fullWidth sx={{
                    mb: 2,
                    backgroundColor: theme === "dark" ? greenDark : greenLight,
                    color: theme === "dark" ? bgDark : "#fff",
                    fontWeight: "bold",
                }}
                        onClick={() => { if (isFormValid(state)) copyToClipboard(); else alert("Заполните все поля!"); }}>
                    Завершить и скопировать анкету
                </Button>
                <Button variant="outlined" fullWidth sx={{
                    borderColor: theme === "dark" ? greenDark : greenLight,
                    color: theme === "dark" ? greenDark : greenLight,
                    fontWeight: "bold",
                }}
                        onClick={() => { if (isFormValid(state)) openTelegram(); else alert("Заполните все поля!"); }}>
                    Отправить анкету автору на модерацию
                </Button>
            </div>
        </div>
    );
}

// Формирование сообщения
function buildTelegramMessage(s: SwitchFormState): string {
    const tg = s.tg.trim().replace("@", "");
    const buildPlaces = (levels: Record<string, number>, conv: (n: number) => string) =>
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
Общая чувствительность: ${s.ticklishLevel}/10 (${levelToPrefTicklee(s.ticklishLevel)})
Самое чувствительное место: ${s.mostTicklishPlace || "—"}
Предпочитаемые места:
${buildPlaces(s.preferredPlaceLevelsTicklee, levelToPrefTicklee) || s.preferredPlacesTicklee.join(", ") || "—"}
Не щекотать: ${s.noTicklishPlaces.join(", ") || "—"}
Табу: ${s.tabuPlaces.join(", ") || "—"}

🫳 Как Тиклер:
Любимое место для щекотки: ${s.favouriteTicklingPlace || "—"}
Предпочитаемые места:
${buildPlaces(s.preferredPlaceLevelsTickler, levelToPrefTickler) || s.preferredPlacesTickler.join(", ") || "—"}
Избегаемые места: ${s.noFavouritePlacesTickler.join(", ") || "—"}
`;
}
