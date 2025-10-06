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

interface HugFormState {
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;
    hugFrequencyLevel: number;
    favoriteHugPlace: string;
    notes: string;
    meetingTypes: string[];
    meetingAvoid: string[];
    meetingDurationLevel: number;
    meetingPressureLevel: number;
    farewellTypes: string[];
    farewellAvoid: string[];
    farewellDurationLevel: number;
    farewellPressureLevel: number;
}

const HUG_TYPES = [
    "Короткие",
    "Долгие",
    "Тёплые",
    "С прижиманием",
    "Боковые",
    "Из-за спины",
    "С покачиваниями",
    "Очень нежные",
    "Очень крепкие",
];

const HUG_AVOID = [
    "Нет таких мест",
    "Со слишком сильным давлением",
    "Слишком долгие",
    "С незнакомыми",
    "В публичных местах",
    "Без настроения",
    "С неожиданным захватом",
];

// ---- Уровни ----
const levelToFreq = (l: number) =>
    l <= 2
        ? "редко"
        : l <= 4
            ? "иногда"
            : l <= 6
                ? "по настроению"
                : l <= 8
                    ? "довольно часто"
                    : "очень часто";

const levelToDuration = (l: number) =>
    l <= 3 ? "очень коротко" : l <= 6 ? "средне" : l <= 8 ? "долго" : "очень долго";

const levelToPressure = (l: number) =>
    l <= 3 ? "очень нежно" : l <= 6 ? "умеренно" : l <= 8 ? "крепко" : "очень крепко";

export default function Hugs({ theme, toggleTheme }: PageProps) {
    const [state, setState] = useState<HugFormState>({
        name: "",
        gender: "",
        age: "",
        countryCity: "",
        tg: "",
        hugFrequencyLevel: 5,
        favoriteHugPlace: "",
        notes: "",
        meetingTypes: [],
        meetingAvoid: [],
        meetingDurationLevel: 5,
        meetingPressureLevel: 5,
        farewellTypes: [],
        farewellAvoid: [],
        farewellDurationLevel: 5,
        farewellPressureLevel: 5,
    });

    const isFormValid = (s: HugFormState) =>
        s.name &&
        s.gender &&
        s.age &&
        s.countryCity &&
        s.tg &&
        s.meetingTypes.length > 0 &&
        s.favoriteHugPlace &&
        s.farewellTypes.length > 0;

    const copyToClipboard = () => {
        const msg = buildTelegramMessage(state);
        navigator.clipboard.writeText(msg).then(() => alert("Анкета скопирована!"));
    };

    const openTelegram = () => {
        copyToClipboard();
        window.open("https://t.me/ibn_Rustum", "_blank");
    };

    // --- Цвета темы (как в Home) ---
    const greenDark = "#91D5AC";
    const greenLight = "#276A49";
    const bgDark = "#0F1511";
    const bgLight = "#F6FBF4";
    const surfaceDark = "#1B211D";
    const surfaceLight = "#EAEFE9";
    const textDark = "#DFE4DD";
    const textLight = "#171D19";
    const hintDark = "#AAAAAA";

    // --- Стили для текстовых полей ---
    const textFieldSx = {
        "& .MuiInputBase-input": {
            color: theme === "dark" ? "#FFFFFF" : textLight,
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
        "&:hover": {
            backgroundColor: "transparent",
        },
    };

    const sliderSx = {
        color: theme === "dark" ? greenDark : greenLight,
        "& .MuiSlider-thumb": {
            boxShadow: "none",
        },
        "& .MuiSlider-rail": {
            opacity: 0.4,
        },
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center overflow-y-auto w-screen pt-24"
            style={{
                backgroundColor: theme === "dark" ? bgDark : bgLight,
                color: theme === "dark" ? textDark : textLight,
            }}
        >
            <div className="w-full max-w-4xl px-4 sm:px-8 py-6">
                {/* Заголовок */}
                <div className="flex justify-between items-center mb-6">
                    <Typography variant="h5">Анкета (Обнимашки)</Typography>
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
                <Card
                    sx={{
                        mb: 2,
                        backgroundColor: theme === "dark" ? surfaceDark : surfaceLight,
                        color: theme === "dark" ? textDark : textLight,
                    }}
                >
                    <CardContent>
                        <Typography fontWeight="bold">Основная информация</Typography>

                        <TextField
                            label="Имя"
                            fullWidth
                            margin="normal"
                            value={state.name}
                            inputProps={{ maxLength: 30 }}
                            onChange={(e) => setState({ ...state, name: e.target.value })}
                            sx={textFieldSx}
                        />

                        <Select
                            fullWidth
                            value={state.gender}
                            displayEmpty
                            onChange={(e) => setState({ ...state, gender: e.target.value })}
                            sx={{ ...textFieldSx, mt: 2 }}
                        >
                            <MenuItem value="">
                                <em>Выберите пол</em>
                            </MenuItem>
                            <MenuItem value="Парень">Парень</MenuItem>
                            <MenuItem value="Девушка">Девушка</MenuItem>
                        </Select>

                        <TextField
                            label="Возраст"
                            fullWidth
                            margin="normal"
                            value={state.age}
                            inputProps={{ maxLength: 3, inputMode: "numeric", pattern: "[0-9]*" }}
                            onChange={(e) =>
                                setState({
                                    ...state,
                                    age: e.target.value.replace(/\D/g, ""),
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
                            label="телеграм-ник (без @)"
                            fullWidth
                            margin="normal"
                            value={state.tg}
                            inputProps={{ maxLength: 32 }}
                            onChange={(e) => setState({ ...state, tg: e.target.value })}
                            sx={textFieldSx}
                        />
                    </CardContent>
                </Card>

                {/* Общее */}
                <Card
                    sx={{
                        mb: 2,
                        backgroundColor: theme === "dark" ? surfaceDark : surfaceLight,
                        color: theme === "dark" ? textDark : textLight,
                    }}
                >
                    <CardContent>
                        <Typography fontWeight="bold">Общее про обнимашки</Typography>
                        <Typography>
                            Как часто любишь обниматься: {state.hugFrequencyLevel}/10 — {levelToFreq(state.hugFrequencyLevel)}
                        </Typography>
                        <Slider
                            min={1}
                            max={10}
                            value={state.hugFrequencyLevel}
                            onChange={(_, val) => setState({ ...state, hugFrequencyLevel: val as number })}
                            sx={sliderSx}
                        />
                        <TextField
                            label="Любимое место/контекст"
                            fullWidth
                            margin="normal"
                            value={state.favoriteHugPlace}
                            inputProps={{ maxLength: 50 }}   // ⬅️ ограничение 50 символов
                            onChange={(e) => setState({ ...state, favoriteHugPlace: e.target.value })}
                            sx={textFieldSx}
                        />

                        <TextField
                            label="Дополнительно (по желанию)"
                            fullWidth
                            margin="normal"
                            value={state.notes}
                            inputProps={{ maxLength: 50 }}   // ⬅️ ограничение 50 символов
                            onChange={(e) => setState({ ...state, notes: e.target.value })}
                            sx={textFieldSx}
                        />

                    </CardContent>
                </Card>

                {/* При встрече */}
                <Card
                    sx={{
                        mb: 2,
                        backgroundColor: theme === "dark" ? surfaceDark : surfaceLight,
                        color: theme === "dark" ? textDark : textLight,
                    }}
                >
                    <CardContent>
                        <Typography fontWeight="bold">Обнимашки при встрече</Typography>
                        {HUG_TYPES.map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={state.meetingTypes.includes(type)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                meetingTypes: e.target.checked
                                                    ? [...state.meetingTypes, type]
                                                    : state.meetingTypes.filter((t) => t !== type),
                                            })
                                        }
                                        sx={checkboxSx}
                                    />
                                }
                                label={type}
                            />
                        ))}

                        <Typography>
                            Длительность: {state.meetingDurationLevel}/10 — {levelToDuration(state.meetingDurationLevel)}
                        </Typography>
                        <Slider
                            min={1}
                            max={10}
                            value={state.meetingDurationLevel}
                            onChange={(_, val) => setState({ ...state, meetingDurationLevel: val as number })}
                            sx={sliderSx}
                        />

                        <Typography>
                            Сила прижимания: {state.meetingPressureLevel}/10 — {levelToPressure(state.meetingPressureLevel)}
                        </Typography>
                        <Slider
                            min={1}
                            max={10}
                            value={state.meetingPressureLevel}
                            onChange={(_, val) => setState({ ...state, meetingPressureLevel: val as number })}
                            sx={sliderSx}
                        />

                        <Typography>Избегать:</Typography>
                        {HUG_AVOID.map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={state.meetingAvoid.includes(type)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                meetingAvoid: e.target.checked
                                                    ? [...state.meetingAvoid, type]
                                                    : state.meetingAvoid.filter((t) => t !== type),
                                            })
                                        }
                                        sx={checkboxSx}
                                    />
                                }
                                label={type}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* На прощание */}
                <Card
                    sx={{
                        mb: 2,
                        backgroundColor: theme === "dark" ? surfaceDark : surfaceLight,
                        color: theme === "dark" ? textDark : textLight,
                    }}
                >
                    <CardContent>
                        <Typography fontWeight="bold">Обнимашки на прощание</Typography>
                        {HUG_TYPES.map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={state.farewellTypes.includes(type)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                farewellTypes: e.target.checked
                                                    ? [...state.farewellTypes, type]
                                                    : state.farewellTypes.filter((t) => t !== type),
                                            })
                                        }
                                        sx={checkboxSx}
                                    />
                                }
                                label={type}
                            />
                        ))}

                        <Typography>
                            Длительность: {state.farewellDurationLevel}/10 — {levelToDuration(state.farewellDurationLevel)}
                        </Typography>
                        <Slider
                            min={1}
                            max={10}
                            value={state.farewellDurationLevel}
                            onChange={(_, val) => setState({ ...state, farewellDurationLevel: val as number })}
                            sx={sliderSx}
                        />

                        <Typography>
                            Сила прижимания: {state.farewellPressureLevel}/10 — {levelToPressure(state.farewellPressureLevel)}
                        </Typography>
                        <Slider
                            min={1}
                            max={10}
                            value={state.farewellPressureLevel}
                            onChange={(_, val) => setState({ ...state, farewellPressureLevel: val as number })}
                            sx={sliderSx}
                        />

                        <Typography>Избегать:</Typography>
                        {HUG_AVOID.map((type) => (
                            <FormControlLabel
                                key={type}
                                control={
                                    <Checkbox
                                        checked={state.farewellAvoid.includes(type)}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                farewellAvoid: e.target.checked
                                                    ? [...state.farewellAvoid, type]
                                                    : state.farewellAvoid.filter((t) => t !== type),
                                            })
                                        }
                                        sx={checkboxSx}
                                    />
                                }
                                label={type}
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

// Формирование текста для Telegram
function buildTelegramMessage(s: HugFormState): string {
    return `
📝 Новая анкета (Обнимашки)

👤 Основная информация:
Имя: ${s.name}
Пол: ${s.gender}
Возраст: ${s.age}
Страна, город: ${s.countryCity}
Телеграм: @${s.tg.replace("@", "")}

🤗 Общее:
Частота: ${s.hugFrequencyLevel}/10 (${levelToFreq(s.hugFrequencyLevel)})
Любимое место/контекст: ${s.favoriteHugPlace || "—"}
Заметки: ${s.notes || "—"}

👋 При встрече:
Предпочтительные стили: ${s.meetingTypes.join(", ") || "—"}
Длительность: ${s.meetingDurationLevel}/10 (${levelToDuration(s.meetingDurationLevel)})
Сила прижимания: ${s.meetingPressureLevel}/10 (${levelToPressure(s.meetingPressureLevel)})
Избегать: ${s.meetingAvoid.join(", ") || "—"}

👋 На прощание:
Предпочтительные стили: ${s.farewellTypes.join(", ") || "—"}
Длительность: ${s.farewellDurationLevel}/10 (${levelToDuration(s.farewellDurationLevel)})
Сила прижимания: ${s.farewellPressureLevel}/10 (${levelToPressure(s.farewellPressureLevel)})
Избегать: ${s.farewellAvoid.join(", ") || "—"}
`;
}
