import { useState } from 'react'; // импортируем useState для состояния
import { motion } from 'framer-motion';
import { Github, Mail, Twitter, Code, Terminal, PenTool as Tool, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    // Определение цветов для темной и светлой темы
    const darkThemeColors = {
        background: '#0F1511',
        surface: '#1B211D',
        text: '#DFE4DD',
        primary: '#91D5AC',
    };

    const lightThemeColors = {
        background: '#F6FBF4',
        surface: '#EAEFE9',
        text: '#171D19',
        primary: '#276A49',
    };

    // Состояние для текущей темы, по умолчанию темная
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    // Функция для переключения темы
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
    };

    // Используем цвета в зависимости от текущей темы
    const currentTheme = isDarkTheme ? darkThemeColors : lightThemeColors;

    const skills = [
        {
            category: t('about.skills.frontend'),
            icon: Code,
            items: ['Jetpack Compose', 'Kotlin', 'Java', 'React', 'Vue3', 'TypeScript', 'Tailwind CSS'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            category: t('about.skills.backend'),
            icon: Terminal,
            items: ['Firebase Firestore & Database', 'MySQL', 'Node.js', 'Python'],
            color: 'from-green-500 to-emerald-500'
        },
        {
            category: t('about.skills.tools'),
            icon: Tool,
            items: ['Google Cloud Platform', 'Google Analytics', 'Firebase', 'Git', 'GitHub', 'Canva'],
            color: 'from-orange-500 to-amber-500'
        },
        {
            category: t('about.skills.other'),
            icon: Palette,
            items: ['UI/UX Design', 'Music Production', 'Performance Optimization', 'Testing'],
            color: 'from-purple-500 to-pink-500'
        }
    ];

    const socialLinks = [
        { icon: Github, href: 'https://github.com/byteflipper-58', color: 'hover:text-[#2ea44f]' },
        { icon: Twitter, href: 'https://X.com/byteflipper', color: 'hover:text-[#1da1f2]' },
        { icon: Mail, href: 'mailto:byteflipper.business@gmail.com', color: 'hover:text-primary-end' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div style={{ backgroundColor: currentTheme.background }} className="py-28 px-4 min-h-screen flex items-center justify-center w-full overflow-hidden">
            <div className="w-full max-w-screen-xl space-y-20 mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center relative"
                >
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-start to-primary-end opacity-75 blur-lg"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <img
                            src="/images/my-picture.jpg"
                            alt="Profile"
                            className="relative rounded-full w-full h-full object-cover border-4 border-dark-100"
                        />
                    </div>

                    <h1 style={{ color: currentTheme.primary }} className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-primary-start to-primary-end bg-clip-text">
                        {t('Ибрагим')}
                    </h1>
                    <p style={{ color: currentTheme.text }} className="text-lg mb-8 max-w-2xl mx-auto">
                        {t('Мой путь в программировании начался с создания модов для Minecraft PE под загрузчик модов InnerCore, ныне известный как Horizon. Во время работы я познакомился с крутыми людьми, которые значительно помогли мне развить навыки программирования. Мы стали командой друзей, придумавшей себе звание "Сектанты". С тех пор я продолжаю создавать приложения и инструменты, вдохновляясь технологиями и музыкой. Узнайте больше о моём опыте и подходе к разработке!')}
                    </p>

                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                className={`text-light-300 ${social.color} transition-colors`}
                            >
                                <social.icon size={24} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Кнопка для переключения темы */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            backgroundColor: currentTheme.primary,
                            color: currentTheme.background,
                        }}
                        className="mt-6 px-6 py-3 rounded-full font-semibold"
                    >
                        {t(isDarkTheme ? 'Светлая тема' : 'Темная тема')}
                    </button>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    key={t('about.skills.frontend')}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={`${skillGroup.category}-${index}`}
                            variants={itemVariants}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-dark-200 to-dark-300 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                            <div style={{ backgroundColor: currentTheme.surface }} className="relative p-6 rounded-xl border border-dark-300 group-hover:border-primary-end/20 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color}`}>
                                        <skillGroup.icon className="w-6 h-6 text-light-100" />
                                    </div>
                                    <h3 style={{ color: currentTheme.text }} className="text-xl font-bold">
                                        {skillGroup.category}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <motion.span
                                            key={`${skill}-${skillIndex}`}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-3 py-1 bg-dark-300 rounded-full text-light-200 text-sm border border-dark-400 group-hover:border-primary-end/20 transition-colors"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-start/10 to-primary-end/10 rounded-xl blur-xl" />
                    <blockquote style={{ backgroundColor: currentTheme.surface }} className="relative p-8 rounded-xl border border-dark-300">
                        <div className="text-6xl text-primary-end opacity-20 absolute top-4 left-4">"</div>
                        <p style={{ color: currentTheme.text }} className="text-2xl italic relative z-10">
                            {t('Каждый проект — это не просто код, это возможность сделать мир немного удобнее и интереснее')}
                        </p>
                        <div className="text-6xl text-primary-end opacity-20 absolute bottom-4 right-4">"</div>
                    </blockquote>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
