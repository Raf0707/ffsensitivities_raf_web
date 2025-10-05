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

interface TickleeFormState {
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;
    ticklishLevel: number;
    mostTicklishPlace: string;
    preferredPlaces: string[];
    preferredPlaceLevels: Record<string, number>;
    noTicklishPlaces: string[];
    tabuPlaces: string[];
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

const NO_TICKLISH = ["Нет таких", ...PLACES];
const TABU = ["Нет таких", ...PLACES];

// шкала предпочтений для Тикли
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

export default function Ticklee({ theme, toggleTheme }: PageProps) {
    const [state, setState] = useState<TickleeFormState>({
        name: "",
        gender: "",
        age: "",
        countryCity: "",
        tg: "",
        ticklishLevel: 5,
        mostTicklishPlace: "",
        preferredPlaces: [],
        preferredPlaceLevels: {},
        noTicklishPlaces: [],
        tabuPlaces: [],
    });

    const isFormValid = (s: TickleeFormState) =>
        s.name &&
        s.gender &&
        s.age &&
        s.countryCity &&
        s.tg &&
        s.mostTicklishPlace &&
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
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? "#FFFFFF" : "#000000",
            },
        },
        // именно иконка для Outlined Select
        "& .MuiSelect-iconOutlined": {
            color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        "&.Mui-focused .MuiSelect-iconOutlined": {
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
                        Анкета (Тикля)
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

                {/* Общая чувствительность */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography style={{ color: textColor }}>
                            Чувствительность: {state.ticklishLevel}/10 ({levelToPrefTicklee(state.ticklishLevel)})
                        </Typography>
                        <Slider
                            min={1}
                            max={10}
                            value={state.ticklishLevel}
                            onChange={(_, val) => setState({ ...state, ticklishLevel: val as number })}
                            sx={sliderSx}
                        />
                    </CardContent>
                </Card>

                {/* Самое чувствительное место */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Самое чувствительное место
                        </Typography>
                        <Select
                            fullWidth
                            value={state.mostTicklishPlace}
                            displayEmpty
                            onChange={(e) => setState({ ...state, mostTicklishPlace: e.target.value })}
                            sx={selectSx}
                        >
                            <MenuItem value="">
                                <em>Выберите самое чувствительное место</em>
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
                                            {levelToPrefTicklee(state.preferredPlaceLevels[place] || 5)}
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
                        {NO_TICKLISH.map((place) => (
                            <FormControlLabel
                                key={place}
                                control={
                                    <Checkbox
                                        checked={state.noTicklishPlaces.includes(place)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                noTicklishPlaces: e.target.checked
                                                    ? [...state.noTicklishPlaces, place]
                                                    : state.noTicklishPlaces.filter((p) => p !== place),
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

                {/* Табу */}
                <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                    <CardContent>
                        <Typography fontWeight="bold" style={{ color: textColor }}>
                            Табу (запретные места)
                        </Typography>
                        {TABU.map((place) => (
                            <FormControlLabel
                                key={place}
                                control={
                                    <Checkbox
                                        checked={state.tabuPlaces.includes(place)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                tabuPlaces: e.target.checked
                                                    ? [...state.tabuPlaces, place]
                                                    : state.tabuPlaces.filter((p) => p !== place),
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
function buildTelegramMessage(s: TickleeFormState): string {
    const tg = s.tg.trim().replace("@", "");
    const prefLevels = Object.entries(s.preferredPlaceLevels)
        .map(
            ([place, lvl]) =>
                `• ${place} — ${lvl}/10 (${levelToPrefTicklee(lvl)})`
        )
        .join("\n");

    return `
📝 Новая анкета (Тикля)

👤 Основная информация:
Имя: ${s.name}
Пол: ${s.gender}
Возраст: ${s.age}
Страна, город: ${s.countryCity}
Телеграм: @${tg}

😆 Общая чувствительность: ${s.ticklishLevel}/10 (${levelToPrefTicklee(s.ticklishLevel)})

✨ Самое чувствительное место: ${s.mostTicklishPlace || "—"}

👍 Предпочитаемые места:
${prefLevels || s.preferredPlaces.join(", ") || "—"}

🙅 Не щекотать: ${s.noTicklishPlaces.join(", ") || "—"}

🚫 Табу: ${s.tabuPlaces.join(", ") || "—"}
`;
}
