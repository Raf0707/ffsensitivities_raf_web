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

interface TicklerFormState {
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;
    favouriteTicklingPlace: string;
    preferredPlaces: string[];
    preferredPlaceLevels: Record<string, number>;
    noFavouritePlaces: string[];
}

const PLACES = [
    "Шея и область над грудью",
    "Подмышки",
    "Локти",
    "Кисти рук",
    "Грудь",
    "Под грудью",
    "Живот",
    "Ребра",
    "Бока",
    "Ягодицы",
    "Бедра",
    "Стопы",
    "Спина",
];

const NO_TICKLISH = ["Нет таких", ...PLACES];

// --- шкала предпочтений ---
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

export default function Tickler({ theme, toggleTheme }: PageProps) {
    const [state, setState] = useState<TicklerFormState>({
        name: "",
        gender: "",
        age: "",
        countryCity: "",
        tg: "",
        favouriteTicklingPlace: "",
        preferredPlaces: [],
        preferredPlaceLevels: {},
        noFavouritePlaces: [],
    });

    const isFormValid = (s: TicklerFormState) =>
        s.name &&
        s.gender &&
        s.age &&
        s.countryCity &&
        s.tg &&
        s.favouriteTicklingPlace &&
        s.preferredPlaces.length > 0;

    const copyToClipboard = () => {
        const msg = buildTelegramMessage(state);
        navigator.clipboard.writeText(msg).then(() => alert("Анкета скопирована!"));
    };

    const openTelegram = () => {
        copyToClipboard();
        window.open("https://t.me/ibn_Rustum", "_blank");
    };

    // --- Цвета темы ---
    const greenDark = "#91D5AC";
    const greenLight = "#276A49";
    const bgDark = "#0F1511";
    const bgLight = "#F6FBF4";
    const surfaceDark = "#1B211D";
    const surfaceLight = "#EAEFE9";
    const textLight = "#171D19";
    const hintDark = "#AAAAAA";

    const textColor = theme === "dark" ? "#FFFFFF" : textLight;

    // --- Стили ---
    const textFieldSx = {
        "& .MuiInputBase-input": {
            color: textColor,
        },
        "& .MuiInputLabel-root": {
            color: theme === "dark" ? hintDark : textLight,
            "&.Mui-focused": {
                color: theme === "dark" ? greenDark : greenLight,
            },
        },
        "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : greenLight,
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
        "& .MuiInputBase-input": {
            color: textColor,
        },
        "& .MuiInputLabel-root": {
            color: theme === "dark" ? hintDark : textLight,
            "&.Mui-focused": {
                color: theme === "dark" ? greenDark : greenLight,
            },
        },
        "& .MuiOutlinedInput-root": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000", // Белая рамка в тёмной, чёрная в светлой
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
        },
        "& .MuiSelect-icon": {
            color: theme === "dark" ? "#FFFFFF" : "#000000", // Стрелка белая в dark, чёрная в light
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
                        Анкета (Тиклер)
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
                        <TextField
                            label="Имя"
                            fullWidth
                            margin="normal"
                            value={state.name}
                            inputProps={{ maxLength: 30 }}
                            onChange={(e) => setState({ ...state, name: e.target.value })}
                            sx={textFieldSx}
                        />

                        {/* Пол */}
                        <Select
                            fullWidth
                            value={state.gender}
                            displayEmpty
                            onChange={(e) => setState({ ...state, gender: e.target.value })}
                            sx={{ ...selectSx, mt: 2 }}
                        >
                            <MenuItem value="">
                                <em>Выберите пол</em>
                            </MenuItem>
                            <MenuItem value="Парень">Парень</MenuItem>
                            <MenuItem value="Девушка">Девушка</MenuItem>
                        </Select>

                        {/* Возраст */}
                        <TextField
                            label="Возраст"
                            fullWidth
                            margin="normal"
                            value={state.age}
                            inputProps={{ maxLength: 3, inputMode: "numeric", pattern: "[0-9]*" }}
                            onChange={(e) =>
                                setState({
                                    ...state,
                                    age: e.target.value.replace(/\D/g, ""), // только цифры
                                })
                            }
                            sx={textFieldSx}
                        />

                        <TextField
                            label="Страна, город"
                            fullWidth
                            margin="normal"
                            value={state.countryCity}
                            inputProps={{ maxLength: 30 }}
                            onChange={(e) => setState({ ...state, countryCity: e.target.value })}
                            sx={textFieldSx}
                        />

                        <TextField
                            label="Телеграм-ник"
                            fullWidth
                            margin="normal"
                            value={state.tg}
                            inputProps={{ maxLength: 32 }}
                            onChange={(e) => setState({ ...state, tg: e.target.value })}
                            sx={textFieldSx}
                        />
                    </CardContent>
                </Card>

                {/* Любимое место (Select) */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Любимое место для щекотки
                        </Typography>
                        <Select
                            fullWidth
                            value={state.favouriteTicklingPlace}
                            onChange={(e) =>
                                setState({ ...state, favouriteTicklingPlace: e.target.value })
                            }
                            displayEmpty
                            sx={selectSx}
                        >
                            <MenuItem value="">
                                <em>Выберите самое любимое место для щекотки</em>
                            </MenuItem>
                            {PLACES.map((place) => (
                                <MenuItem key={place} value={place}>
                                    {place}
                                </MenuItem>
                            ))}
                        </Select>

                    </CardContent>
                </Card>

                {/* Предпочитаемые места */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Предпочитаемые места
                        </Typography>
                        {PLACES.map((place) => (
                            <div key={place} style={{ marginBottom: 16 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={state.preferredPlaces.includes(place)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setState({
                                                    ...state,
                                                    preferredPlaces: checked
                                                        ? [...state.preferredPlaces, place]
                                                        : state.preferredPlaces.filter((p) => p !== place),
                                                    preferredPlaceLevels: {
                                                        ...state.preferredPlaceLevels,
                                                        ...(checked ? { [place]: 5 } : { [place]: 5 }),
                                                    },
                                                });
                                            }}
                                            sx={checkboxSx}
                                        />
                                    }
                                    label={place}
                                    style={{ color: textColor }}
                                />
                                {state.preferredPlaces.includes(place) && (
                                    <div style={{ paddingLeft: 32, marginTop: 4 }}>
                                        <Slider
                                            min={1}
                                            max={10}
                                            value={state.preferredPlaceLevels[place] || 5}
                                            onChange={(_, val) =>
                                                setState({
                                                    ...state,
                                                    preferredPlaceLevels: {
                                                        ...state.preferredPlaceLevels,
                                                        [place]: val as number,
                                                    },
                                                })
                                            }
                                            sx={sliderSx}
                                        />
                                        <Typography
                                            variant="body2"
                                            style={{ color: textColor, textAlign: "right", marginTop: 2 }}
                                        >
                                            {state.preferredPlaceLevels[place] || 5}/10 —{" "}
                                            {levelToPrefTickler(state.preferredPlaceLevels[place] || 5)}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Избегаемые места */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Избегаемые места
                        </Typography>
                        {NO_TICKLISH.map((place) => (
                            <FormControlLabel
                                key={place}
                                control={
                                    <Checkbox
                                        checked={state.noFavouritePlaces.includes(place)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                noFavouritePlaces: e.target.checked
                                                    ? [...state.noFavouritePlaces, place]
                                                    : state.noFavouritePlaces.filter((p) => p !== place),
                                            })
                                        }
                                        sx={checkboxSx}
                                    />
                                }
                                label={place}
                                style={{ color: textColor }}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Действия */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mb: 2,
                        backgroundColor: theme === "dark" ? greenDark : greenLight,
                        color: theme === "dark" ? bgDark : "#fff",
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        if (isFormValid(state)) copyToClipboard();
                        else alert("Заполните все обязательные поля!");
                    }}
                >
                    Завершить и скопировать анкету
                </Button>

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        borderColor: theme === "dark" ? greenDark : greenLight,
                        color: theme === "dark" ? greenDark : greenLight,
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        if (isFormValid(state)) openTelegram();
                        else alert("Заполните все обязательные поля!");
                    }}
                >
                    Отправить анкету автору на модерацию
                </Button>
            </div>
        </div>
    );
}

// --------- Формирование сообщения ---------
function buildTelegramMessage(s: TicklerFormState): string {
    const tg = s.tg.trim().replace("@", "");
    const prefLevels = Object.entries(s.preferredPlaceLevels)
        .map(
            ([place, lvl]) =>
                `• ${place} — ${lvl}/10 (${levelToPrefTickler(lvl)})`
        )
        .join("\n");

    return `
📝 Новая анкета (Тиклер)

👤 Основная информация:
Имя: ${s.name}
Пол: ${s.gender}
Возраст: ${s.age}
Страна, город: ${s.countryCity}
Телеграм: @${tg}

❤️ Самое любимое место для щекотки: ${s.favouriteTicklingPlace || "—"}

👍 Предпочитаемые места:
${prefLevels || s.preferredPlaces.join(", ") || "—"}

🙅 Избегаемые места: ${s.noFavouritePlaces.join(", ") || "—"}
`;
}
