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
import { useParams } from "react-router-dom";
import { PageProps } from "./PageProps.tsx";

// -------- Типы роутов --------
type MassageDirection = "nonMedical" | "smile";
type MassageRole = "giver" | "receiver";

// -------- Состояние формы --------
interface MassageFormState {
    // Общие поля
    name: string;
    gender: string;
    age: string;
    countryCity: string;
    tg: string;

    // Немедицинский массаж
    nonMedicalTypes: string[]; // подтипы (классический, тайский и т.д.)

    // Смайл-терапия — блок "как тикля" (receiver)
    ticklishLevel: number; // общий уровень щекотливости
    mostTicklishPlace: string; // самое чувствительное место
    preferredPlacesTicklee: string[]; // предпочитаемые места для щекотки (как тикля)
    preferredPlaceLevelsTicklee: Record<string, number>; // уровни по местам (как тикля — насколько страшно/неприятно)
    noTicklishPlaces: string[]; // не щекотать
    tabuPlaces: string[]; // табу
    allowsFixationReceiver: string[]; // фиксация — что разрешаю, как тикля
    allowsToolsReceiver: string[]; // инструменты — что разрешаю, как тикля
    allowsOilsReceiver: string[]; // масла/гели — что разрешаю, как тикля

    // Аллергии (чекбоксы)
    oilAllergyOptions: string[]; // ["Нет аллергий"] или ["Есть аллергии (обсудим лично)"]

    // Смайл-терапия — блок "как тиклер" (giver)
    favouriteTicklingPlace: string; // любимое место для щекотки
    preferredPlacesTickler: string[]; // предпочитаемые места, куда люблю щекотать
    preferredPlaceLevelsTickler: Record<string, number>; // уровни предпочтений по местам
    noFavouritePlacesTickler: string[]; // не щекочу
    fixationTypesGiver: string[]; // фиксация — что использую (как тиклер)
    toolsGiver: string[]; // инструменты — что использую (как тиклер)
    oilsGelsGiver: string[]; // масла/гели — что использую (как тиклер)

    // Безопасность (стоп-слово / таймер)
    stopWordMode: "stopword" | "timer" | "both" | "later" | ""; // селект
    stopWordText: string; // ≤ 30 символов
    timerHours: string;   // 0-23, ≤ 2 символов
    timerMinutes: string; // 0-59, ≤ 2 символов
    timerSeconds: string; // 0-59, ≤ 2 символов

    // Общие организационные поля
    sessionDurationsMin: string[]; // длительности в минутах
    locationTypes: string[]; // место проведения
    acceptsGender: string[]; // кому оказываю / у кого принимаю (по полу)
    priceFrom: string; // "от" — только для giver, ≤ 5 символов
    priceTo: string;   // "до" — только для giver, ≤ 5 символов
}

// -------- Справочники --------
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

// фиксации
const FIXATIONS = [
    "Без фиксации",
    "Лёгкая фиксация руками/без приспособлений",
    "Кожаные наручники",
    "Металлические наручники",
    "Верёвки (мягкая фиксация)",
    "Стретч-ленты/резинки",
    "Ремни/пояса",
    "Плёнка (обмотка)",
    "Спортивные бинты",
    "Колодки",
    "Изолента",
    "Силиконовые/резиновые жгуты",
];

// инструменты для щекотки (без «взрослых» тем)
const TOOLS = [
    "Пальцы",
    "Ногти",
    "Перо",
    "Кисточка",
    "Щёточка массажная",
    "Зубная щётка (обычная)",
    "Зубная щётка (электрическая)",
    "Массажный ролик",
    "Металлический ролик с шипами",
    "Пуховка",
    "Расческа",
    "Металлические коготочки",
    "Вибромассажёр/палочка",
    "Вакуумные массажные банки",
];

// масла и гели (нейтральный набор)
const OILS_GELS = [
    "Без масел/гелей",
    "Миндальное масло",
    "Кокосовое масло",
    "Масло виноградной косточки",
    "Разогревающий гель",
    "Охлаждающий гель",
    "Нейтральный лосьон/крем",
    "Массажное масло (универсальное)",
];

// длительности
const DURATIONS = ["15", "30", "45", "60", "90", "120"];

// места проведения (+ новые варианты)
const LOCATIONS = [
    "У меня дома/в студии",
    "У клиента (выезд)",
    "Отель",
    "Съёмная квартира",
    "Загородный дом",
];

// кому оказываю/у кого принимаю
const ACCEPTS = ["Парням", "Девушкам"];

// немедицинский — подтипы как чекбоксы
const NON_MEDICAL_SUBTYPES = [
    "Классический",
    "Тайский",
    "Лимфодренажный",
    "Миофасциальный",
    "Спортивный",
    "Расслабляющий",
    "Шведский",
    "Антицеллюлитный",
    "Стоун-терапия (горячие камни)",
];

// аллергии — чекбоксы
//const OIL_ALLERGY_OPTIONS = ["Нет аллергий", "Есть аллергии (обсудим лично)"];

// шкала — для тикли (насколько боюсь/терплю)
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

// шкала — для тиклера (предпочтение)
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

// ---------- Компонент ----------
export default function Massage({ theme }: PageProps) {
    const params = useParams<{ direction: MassageDirection; role: MassageRole }>();
    const directionParam = (params.direction || "nonMedical") as MassageDirection;
    const roleParam = (params.role || "giver") as MassageRole;

    const [state, setState] = useState<MassageFormState>({
        // общие
        name: "",
        gender: "",
        age: "",
        countryCity: "",
        tg: "",

        // nonMedical
        nonMedicalTypes: [],

        // smile — тикля
        ticklishLevel: 5,
        mostTicklishPlace: "",
        preferredPlacesTicklee: [],
        preferredPlaceLevelsTicklee: {},
        noTicklishPlaces: [],
        tabuPlaces: [],
        allowsFixationReceiver: [],
        allowsToolsReceiver: [],
        allowsOilsReceiver: [],
        oilAllergyOptions: [],

        // smile — тиклер
        favouriteTicklingPlace: "",
        preferredPlacesTickler: [],
        preferredPlaceLevelsTickler: {},
        noFavouritePlacesTickler: [],
        fixationTypesGiver: [],
        toolsGiver: [],
        oilsGelsGiver: [],

        // безопасность
        stopWordMode: "",
        stopWordText: "",
        timerHours: "",
        timerMinutes: "",
        timerSeconds: "",

        // организация
        sessionDurationsMin: [],
        locationTypes: [],
        acceptsGender: [],
        priceFrom: "",
        priceTo: "",
    });

    // -------- Тема (как в остальных анкетах) --------
    const greenDark = "#91D5AC";
    const greenLight = "#276A49";
    const bgDark = "#0F1511";
    const bgLight = "#F6FBF4";
    const surfaceDark = "#1B211D";
    const surfaceLight = "#EAEFE9";
    const textLight = "#171D19";
    const hintDark = "#AAAAAA";

    const textColor = theme === "dark" ? "#FFFFFF" : textLight;

    // -------- Стили (единые) --------
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
                borderColor: theme === "dark" ? greenDark : greenLight,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme === "dark" ? greenDark : greenLight,
            },
        },
        "& .MuiSelect-iconOutlined": {
            color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        "&.Mui-focused .MuiSelect-iconOutlined": {
            color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
    };

    // ---------- Утилиты ввода ----------
    const onlyDigitsMax = (s: string, maxLen: number) => s.replace(/\D/g, "").slice(0, maxLen);
    const clamp2 = (s: string, max: number) => {
        const v = Number(onlyDigitsMax(s, 2) || "0");
        return String(Math.min(v, max));
    };

    // ---------- Группы чекбоксов ----------
    // "Нет таких" выключает остальные (и обратно)
    const renderCheckboxGroupWithNone = (
        list: string[],
        selected: string[],
        onChange: (next: string[]) => void,
        noneLabel: string = "Нет таких"
    ) => {
        const hasNone = selected.includes(noneLabel);
        const handleToggle = (item: string, checked: boolean) => {
            if (item === noneLabel) {
                if (checked) onChange([noneLabel]);
                else onChange([]);
                return;
            }
            if (hasNone) {
                // если стоит "Нет таких" — при клике на другие не даём включить
                return;
            }
            onChange(checked ? [...selected, item] : selected.filter((x) => x !== item));
        };

        return (
            <>
                {list.map((item) => (
                    <FormControlLabel
                        key={item}
                        control={
                            <Checkbox
                                checked={selected.includes(item)}
                                disabled={hasNone && item !== noneLabel}
                                onChange={(e) => handleToggle(item, e.target.checked)}
                                sx={checkboxSx}
                            />
                        }
                        label={item}
                        style={{ color: textColor }}
                    />
                ))}
            </>
        );
    };

    // Обычная группа чекбоксов
    const renderCheckboxGroup = (
        list: string[],
        selected: string[],
        onChange: (next: string[]) => void
    ) => (
        <>
            {list.map((item) => (
                <FormControlLabel
                    key={item}
                    control={
                        <Checkbox
                            checked={selected.includes(item)}
                            onChange={(e) =>
                                onChange(
                                    e.target.checked
                                        ? [...selected, item]
                                        : selected.filter((x) => x !== item)
                                )
                            }
                            sx={checkboxSx}
                        />
                    }
                    label={item}
                    style={{ color: textColor }}
                />
            ))}
        </>
    );

    // Аллергии — особые чекбоксы: "Нет аллергий" блокирует "Есть аллергии" и наоборот
    const renderAllergyCheckboxes = (
        selected: string[],
        onChange: (next: string[]) => void
    ) => {
        const none = "Нет аллергий";
        const some = "Есть аллергии (обсудим лично)";
        const hasNone = selected.includes(none);
        const hasSome = selected.includes(some);
        const toggle = (label: string, checked: boolean) => {
            if (label === none) {
                onChange(checked ? [none] : []);
            } else {
                onChange(checked ? [some] : []);
            }
        };
        return (
            <>
                {[none, some].map((label) => (
                    <FormControlLabel
                        key={label}
                        control={
                            <Checkbox
                                checked={label === none ? hasNone : hasSome}
                                onChange={(e) => toggle(label, e.target.checked)}
                                sx={checkboxSx}
                            />
                        }
                        label={label}
                        style={{ color: textColor }}
                    />
                ))}
            </>
        );
    };

    // ---------- Валидация ----------
    const isFormValid = (s: MassageFormState) => {
        const commonOk = s.name && s.gender && s.age && s.countryCity && s.tg;
        if (!commonOk) return false;

        if (directionParam === "nonMedical") {
            // Можно не заставлять выбирать подтипы; организация — опционально
            // Но ограничения на поля цены и т.д. соблюдаем на onChange
            return true;
        }

        // smile:
        if (roleParam === "giver") {
            // как тиклер — нужно хотя бы любимое место
            if (!s.favouriteTicklingPlace) return false;
        } else {
            // как тикля — нужно самое чувствительное место
            if (!s.mostTicklishPlace) return false;
        }

        // Безопасность: если выбран режим — заполнить соответствующие поля
        if (s.stopWordMode === "stopword" && !s.stopWordText) return false;
        if (s.stopWordMode === "timer") {
            const hh = Number(s.timerHours || "0");
            const mm = Number(s.timerMinutes || "0");
            const ss = Number(s.timerSeconds || "0");
            if (hh === 0 && mm === 0 && ss === 0) return false;
        }

        return true;
    };

    // ---------- Копирование / Телега ----------
    const copyToClipboard = () => {
        const msg = buildTelegramMessage(directionParam, roleParam, state);
        navigator.clipboard.writeText(msg).then(() => alert("Анкета скопирована!"));
    };

    const openTelegram = () => {
        copyToClipboard();
        window.open("https://t.me/ibn_Rustum", "_blank");
    };

    // ---------- Рендер ----------
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
                        Анкета (
                        {directionParam === "nonMedical" ? "Немедицинский массаж" : "Смайл-терапия"}
                        — {roleParam === "giver" ? "мастер" : "клиент"})
                    </Typography>

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
                            onChange={(e) => setState({ ...state, gender: String(e.target.value) })}
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
                                    age: onlyDigitsMax(e.target.value, 3), // только цифры, ≤3
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

                {/* Немедицинский массаж */}
                {directionParam === "nonMedical" && (
                    <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                        <CardContent>
                            <Typography fontWeight="bold" style={{ color: textColor }}>
                                Подтипы массажа
                            </Typography>
                            {renderCheckboxGroup(NON_MEDICAL_SUBTYPES, state.nonMedicalTypes, (next) =>
                                setState({ ...state, nonMedicalTypes: next })
                            )}

                            {/* Общая организация */}
                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                Длительность сеанса (мин)
                            </Typography>
                            {renderCheckboxGroup(DURATIONS, state.sessionDurationsMin, (next) =>
                                setState({ ...state, sessionDurationsMin: next })
                            )}

                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                Место проведения
                            </Typography>
                            {renderCheckboxGroup(LOCATIONS, state.locationTypes, (next) =>
                                setState({ ...state, locationTypes: next })
                            )}

                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                Кому оказываю / у кого принимаю
                            </Typography>
                            {renderCheckboxGroup(ACCEPTS, state.acceptsGender, (next) =>
                                setState({ ...state, acceptsGender: next })
                            )}

                            {/* Цена — ограничения 5 символов, только цифры */}
                            <div className="flex gap-4" style={{ marginTop: 8 }}>
                                <TextField
                                    label="Цена от"
                                    fullWidth
                                    margin="normal"
                                    value={state.priceFrom}
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 5 }}
                                    onChange={(e) =>
                                        setState({ ...state, priceFrom: onlyDigitsMax(e.target.value, 5) })
                                    }
                                    sx={textFieldSx}
                                />
                                <TextField
                                    label="Цена до"
                                    fullWidth
                                    margin="normal"
                                    value={state.priceTo}
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 5 }}
                                    onChange={(e) =>
                                        setState({ ...state, priceTo: onlyDigitsMax(e.target.value, 5) })
                                    }
                                    sx={textFieldSx}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Смайл-терапия — как Тиклер (giver) */}
                {directionParam === "smile" && roleParam === "giver" && (
                    <>
                        {/* Любимое место */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Любимое место для щекотки
                                </Typography>
                                <Select
                                    fullWidth
                                    value={state.favouriteTicklingPlace}
                                    displayEmpty
                                    onChange={(e) =>
                                        setState({ ...state, favouriteTicklingPlace: String(e.target.value) })
                                    }
                                    sx={selectSx}
                                >
                                    <MenuItem value="">
                                        <em>Выберите место</em>
                                    </MenuItem>
                                    {PLACES.map((place) => (
                                        <MenuItem key={place} value={place}>
                                            {place}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </CardContent>
                        </Card>

                        {/* Предпочитаемые места с уровнями */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Предпочитаемые места (куда щекотать)
                                </Typography>
                                {PLACES.map((place) => (
                                    <div key={place} style={{ marginBottom: 16 }}>
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
                                        {state.preferredPlacesTickler.includes(place) && (
                                            <div style={{ paddingLeft: 32, marginTop: 4 }}>
                                                <Slider
                                                    min={1}
                                                    max={10}
                                                    value={state.preferredPlaceLevelsTickler[place] || 5}
                                                    onChange={(_, val) =>
                                                        setState({
                                                            ...state,
                                                            preferredPlaceLevelsTickler: {
                                                                ...state.preferredPlaceLevelsTickler,
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
                                                    {state.preferredPlaceLevelsTickler[place] || 5}/10 —{" "}
                                                    {levelToPrefTickler(state.preferredPlaceLevelsTickler[place] || 5)}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Не щекочу */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Не щекочу
                                </Typography>
                                {renderCheckboxGroupWithNone(
                                    NO_TICKLISH,
                                    state.noFavouritePlacesTickler,
                                    (next) => setState({ ...state, noFavouritePlacesTickler: next }),
                                    "Нет таких"
                                )}
                            </CardContent>
                        </Card>

                        {/* Фиксация / Инструменты / Масла (что использую) */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Фиксация (что использую)
                                </Typography>
                                {renderCheckboxGroup(FIXATIONS, state.fixationTypesGiver, (next) =>
                                    setState({ ...state, fixationTypesGiver: next })
                                )}

                                <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                    Инструменты для щекотки (что использую)
                                </Typography>
                                {renderCheckboxGroup(TOOLS, state.toolsGiver, (next) =>
                                    setState({ ...state, toolsGiver: next })
                                )}

                                <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                    Масла/гели (что использую)
                                </Typography>
                                {renderCheckboxGroup(OILS_GELS, state.oilsGelsGiver, (next) =>
                                    setState({ ...state, oilsGelsGiver: next })
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Смайл-терапия — как Тикля (receiver) */}
                {directionParam === "smile" && roleParam === "receiver" && (
                    <>
                        {/* Общая чувствительность */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography style={{ color: textColor }}>
                                    Чувствительность: {state.ticklishLevel}/10 (
                                    {levelToPrefTicklee(state.ticklishLevel)})
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
                                    onChange={(e) => setState({ ...state, mostTicklishPlace: String(e.target.value) })}
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

                        {/* Предпочитаемые места (как тикля) */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Предпочитаемые места (как Тикля)
                                </Typography>
                                {PLACES.map((place) => (
                                    <div key={place} style={{ marginBottom: 16 }}>
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
                                        {state.preferredPlacesTicklee.includes(place) && (
                                            <div style={{ paddingLeft: 32, marginTop: 4 }}>
                                                <Slider
                                                    min={1}
                                                    max={10}
                                                    value={state.preferredPlaceLevelsTicklee[place] || 5}
                                                    onChange={(_, val) =>
                                                        setState({
                                                            ...state,
                                                            preferredPlaceLevelsTicklee: {
                                                                ...state.preferredPlaceLevelsTicklee,
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
                                                    {state.preferredPlaceLevelsTicklee[place] || 5}/10 —{" "}
                                                    {levelToPrefTicklee(state.preferredPlaceLevelsTicklee[place] || 5)}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Не щекотать / Табу */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Не щекотать
                                </Typography>
                                {renderCheckboxGroupWithNone(
                                    NO_TICKLISH,
                                    state.noTicklishPlaces,
                                    (next) => setState({ ...state, noTicklishPlaces: next }),
                                    "Нет таких"
                                )}

                                <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                    Табу (запретные места)
                                </Typography>
                                {renderCheckboxGroupWithNone(
                                    TABU,
                                    state.tabuPlaces,
                                    (next) => setState({ ...state, tabuPlaces: next }),
                                    "Нет таких"
                                )}
                            </CardContent>
                        </Card>

                        {/* Что разрешаю: фиксация / инструменты / масла + аллергии */}
                        <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                            <CardContent>
                                <Typography fontWeight="bold" style={{ color: textColor }}>
                                    Фиксация (что разрешаю)
                                </Typography>
                                {renderCheckboxGroup(FIXATIONS, state.allowsFixationReceiver, (next) =>
                                    setState({ ...state, allowsFixationReceiver: next })
                                )}

                                <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                    Инструменты (что разрешаю)
                                </Typography>
                                {renderCheckboxGroup(TOOLS, state.allowsToolsReceiver, (next) =>
                                    setState({ ...state, allowsToolsReceiver: next })
                                )}

                                <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                    Масла/гели (что разрешаю)
                                </Typography>
                                {renderCheckboxGroup(OILS_GELS, state.allowsOilsReceiver, (next) =>
                                    setState({ ...state, allowsOilsReceiver: next })
                                )}

                                <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                    Аллергии/непереносимость масел
                                </Typography>
                                {renderAllergyCheckboxes(state.oilAllergyOptions, (next) =>
                                    setState({ ...state, oilAllergyOptions: next })
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Общие для смайл-терапии: Стоп-слово / Таймер + Организация */}
                {directionParam === "smile" && (
                    <Card sx={{ mb: 2, backgroundColor: theme === "dark" ? surfaceDark : surfaceLight }}>
                        <CardContent>
                            <Typography fontWeight="bold" style={{ color: textColor }}>
                                Безопасность
                            </Typography>

                            {/* Выбор режима */}
                            <Select
                                fullWidth
                                value={state.stopWordMode}
                                displayEmpty
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        stopWordMode: String(e.target.value) as "stopword" | "timer" | "",
                                        // сбрасываем значения при смене
                                        stopWordText: "",
                                        timerHours: "",
                                        timerMinutes: "",
                                        timerSeconds: "",
                                    })
                                }
                                sx={{ ...selectSx, mt: 1 }}
                            >
                                <MenuItem value="">
                                    <em>Выберите режим</em>
                                </MenuItem>
                                <MenuItem value="stopword">Стоп-слово</MenuItem>
                                <MenuItem value="timer">Таймер</MenuItem>
                                <MenuItem value="both">Оба варианта допустимы</MenuItem>
                                <MenuItem value="later">Обсудим лично</MenuItem>
                            </Select>

                            {/* Поле стоп-слова */}
                            {state.stopWordMode === "stopword" && (
                                <TextField
                                    label="Стоп-слово"
                                    fullWidth
                                    margin="normal"
                                    value={state.stopWordText}
                                    inputProps={{ maxLength: 30 }}
                                    onChange={(e) => setState({ ...state, stopWordText: e.target.value })}
                                    sx={textFieldSx}
                                />
                            )}

                            {/* Таймер — ч/м/с */}
                            {state.stopWordMode === "timer" && (
                                <div className="flex gap-3 mt-3">
                                    <TextField
                                        label="Часы"
                                        value={state.timerHours}
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 2 }}
                                        onChange={(e) =>
                                            setState({ ...state, timerHours: clamp2(e.target.value, 23) })
                                        }
                                        sx={textFieldSx}
                                    />
                                    <TextField
                                        label="Минуты"
                                        value={state.timerMinutes}
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 2 }}
                                        onChange={(e) =>
                                            setState({ ...state, timerMinutes: clamp2(e.target.value, 59) })
                                        }
                                        sx={textFieldSx}
                                    />
                                    <TextField
                                        label="Секунды"
                                        value={state.timerSeconds}
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 2 }}
                                        onChange={(e) =>
                                            setState({ ...state, timerSeconds: clamp2(e.target.value, 59) })
                                        }
                                        sx={textFieldSx}
                                    />
                                </div>
                            )}

                            {/* Организация */}
                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 16 }}>
                                Организация
                            </Typography>

                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                Длительность сеанса (мин)
                            </Typography>
                            {renderCheckboxGroup(DURATIONS, state.sessionDurationsMin, (next) =>
                                setState({ ...state, sessionDurationsMin: next })
                            )}

                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                Место проведения
                            </Typography>
                            {renderCheckboxGroup(LOCATIONS, state.locationTypes, (next) =>
                                setState({ ...state, locationTypes: next })
                            )}

                            <Typography fontWeight="bold" style={{ color: textColor, marginTop: 8 }}>
                                Кому оказываю / у кого принимаю
                            </Typography>
                            {renderCheckboxGroup(ACCEPTS, state.acceptsGender, (next) =>
                                setState({ ...state, acceptsGender: next })
                            )}

                            {roleParam === "giver" && (
                                <div className="flex gap-4" style={{ marginTop: 8 }}>
                                    <TextField
                                        label="Цена от"
                                        fullWidth
                                        margin="normal"
                                        value={state.priceFrom}
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 5 }}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                priceFrom: onlyDigitsMax(e.target.value, 5),
                                            })
                                        }
                                        sx={textFieldSx}
                                    />
                                    <TextField
                                        label="Цена до"
                                        fullWidth
                                        margin="normal"
                                        value={state.priceTo}
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 5 }}
                                        onChange={(e) =>
                                            setState({
                                                ...state,
                                                priceTo: onlyDigitsMax(e.target.value, 5),
                                            })
                                        }
                                        sx={textFieldSx}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

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
function buildTelegramMessage(
    direction: MassageDirection,
    role: MassageRole,
    s: MassageFormState
): string {
    const tg = s.tg.trim().replace("@", "");

    const buildPlaces = (levels: Record<string, number>, conv: (l: number) => string) =>
        Object.entries(levels)
            .map(([place, lvl]) => `• ${place} — ${lvl}/10 (${conv(lvl)})`)
            .join("\n");

    let msg = `📝 Анкета (${direction === "nonMedical" ? "Немедицинский массаж" : "Смайл-терапия"} — ${role === "giver" ? "мастер" : "клиент"})\n\n`;

    msg += `👤 Имя: ${s.name}
Пол: ${s.gender}
Возраст: ${s.age}
Страна, город: ${s.countryCity}
Телеграм: @${tg}\n\n`;

    // ---- Немедицинский массаж ----
    if (direction === "nonMedical") {
        msg += `💼 Подтипы: ${s.nonMedicalTypes.join(", ") || "—"}\n`;

        if (
            s.sessionDurationsMin.length ||
            s.locationTypes.length ||
            s.acceptsGender.length ||
            s.priceFrom ||
            s.priceTo
        ) {
            msg += `\n🛠 Организация:
Длительность (мин): ${s.sessionDurationsMin.join(", ") || "—"}
Место: ${s.locationTypes.join(", ") || "—"}
Кому оказываю/принимаю: ${s.acceptsGender.join(", ") || "—"}
Цена: ${s.priceFrom ? `от ${s.priceFrom}` : "—"} ${s.priceTo ? `до ${s.priceTo}` : ""}\n`;
        }
    }

    // ---- Смайл-терапия ----
    if (direction === "smile") {
        if (role === "giver") {
            msg += `🫳 Как Тиклер:
Любимое место: ${s.favouriteTicklingPlace || "—"}
Предпочитаемые места:
${buildPlaces(s.preferredPlaceLevelsTickler, levelToPrefTickler) || s.preferredPlacesTickler.join(", ") || "—"}
Не щекочу: ${s.noFavouritePlacesTickler.join(", ") || "—"}

Фиксация (использую): ${s.fixationTypesGiver.join(", ") || "—"}
Инструменты (использую): ${s.toolsGiver.join(", ") || "—"}
Масла/гели (использую): ${s.oilsGelsGiver.join(", ") || "—"}\n`;
        } else {
            msg += `😆 Как Тикля:
Общая чувствительность: ${s.ticklishLevel}/10 (${levelToPrefTicklee(s.ticklishLevel)})
Самое чувствительное место: ${s.mostTicklishPlace || "—"}

Предпочитаемые места:
${buildPlaces(s.preferredPlaceLevelsTicklee, levelToPrefTicklee) || s.preferredPlacesTicklee.join(", ") || "—"}
Не щекотать: ${s.noTicklishPlaces.join(", ") || "—"}
Табу: ${s.tabuPlaces.join(", ") || "—"}

Фиксация (разрешаю): ${s.allowsFixationReceiver.join(", ") || "—"}
Инструменты (разрешаю): ${s.allowsToolsReceiver.join(", ") || "—"}
Масла/гели (разрешаю): ${s.allowsOilsReceiver.join(", ") || "—"}
Аллергии/непереносимость масел: ${s.oilAllergyOptions || "—"}\n`;
        }

        // --- стоп-слово/таймер ---
        if (s.stopWordMode === "stopword") {
            msg += `⏱ Стоп-слово: ${s.stopWordText || "—"}\n`;
        } else if (s.stopWordMode === "timer") {
            msg += `⏱ Таймер: ${s.timerHours || "00"}ч ${s.timerMinutes || "00"}м ${s.timerSeconds || "00"}с\n`;
        } else if (s.stopWordMode === "both") {
            msg += `⏱ Допустимы оба варианта (стоп-слово и таймер)\n`;
        } else if (s.stopWordMode === "later") {
            msg += `⏱ Обсудим лично\n`;
        } else {
            msg += `⏱ Стоп-слово/таймер: —\n`;
        }

        // --- общая организация ---
        if (
            s.sessionDurationsMin.length ||
            s.locationTypes.length ||
            s.acceptsGender.length ||
            (role === "giver" && (s.priceFrom || s.priceTo))
        ) {
            msg += `\n🛠 Организация:
Длительность (мин): ${s.sessionDurationsMin.join(", ") || "—"}
Место: ${s.locationTypes.join(", ") || "—"}
Кому оказываю/принимаю: ${s.acceptsGender.join(", ") || "—"}`;
            if (role === "giver") {
                msg += `\nЦена: ${s.priceFrom ? `от ${s.priceFrom}` : "—"} ${s.priceTo ? `до ${s.priceTo}` : ""}`;
            }
            msg += "\n";
        }
    }

    return msg;
}
