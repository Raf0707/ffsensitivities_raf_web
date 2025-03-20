import { motion } from 'framer-motion';
import { Github, Mail, Twitter, Code, Terminal, PenTool as Tool, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    const darkThemeColors = {
        background: '#0F1511',
        surface: '#1B211D',
        text: '#DFE4DD',
        primary: '#91D5AC', // Цвет, который используется для заголовка
        primaryDark: '#276A49' // Добавляем primaryDark
    };

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
        { icon: Github, href: 'https://github.com/byteflipper-58', color: 'hover:text-primaryDark' },
        { icon: Twitter, href: 'https://X.com/byteflipper', color: 'hover:text-primaryDark' },
        { icon: Mail, href: 'mailto:byteflipper.business@gmail.com', color: 'hover:text-primaryDark' }
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
        <div style={{ backgroundColor: darkThemeColors.background }} className="py-28 px-4 min-h-screen flex items-center justify-center w-full overflow-hidden">
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

                    <h1 style={{ color: darkThemeColors.primary }} className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-primary-start to-primary-end bg-clip-text">
                        {t('Ибрагим')}
                    </h1>
                    <p style={{ color: darkThemeColors.text }} className="text-lg mb-8 max-w-2xl mx-auto">
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
                                className={`text-light-300 ${darkThemeColors.primaryDark} transition-colors`}
                            >
                                <social.icon size={24} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    key={t('about.skills.frontend')} // Add key to force re-render on language change
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
                            <div style={{ backgroundColor: darkThemeColors.surface }} className="relative p-6 rounded-xl border border-dark-300 group-hover:border-primary-end/20 transition-colors">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color}`}>
                                        <skillGroup.icon className="w-6 h-6 text-light-100" />
                                    </div>
                                    <h3 style={{ color: darkThemeColors.text }} className="text-xl font-bold">
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
                    <blockquote style={{ backgroundColor: darkThemeColors.surface }} className="relative p-8 rounded-xl border border-dark-300">
                        <div className="text-6xl text-primary-end opacity-20 absolute top-4 left-4">"</div>
                        <p style={{ color: darkThemeColors.text }} className="text-2xl italic relative z-10">
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
