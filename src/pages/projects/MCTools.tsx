// types.ts
interface Screenshot {
  url: string;
  alt: string;
}

interface Metric {
  icon: any;
  label: string;
  value: string;
}

interface ProjectLinks {
  github?: string;
  live?: string;
  googlePlay?: string;
  ruStore?: string;
}

interface Project {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  features: string[];
  screenshots: Screenshot[];
  links: ProjectLinks;
  metrics: Metric[];
}

// EverBook.tsx
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScreenshotGallery from '../../components/ScreenshotGallery';
import { useTranslation } from 'react-i18next';

const MCTools = () => {
  const { t } = useTranslation();
  
  const project = {
    title: t('mctools.title'),
    description: t('mctools.description'),
    icon: "/images/mc_tools/logo.jpg",
    technologies: [
      "Vue3", "Git", "Github Pages", "Firebase", 
    ],
    features: [
      t('mctools.features.list.1'),
      t('mctools.features.list.2'),
      t('mctools.features.list.3')
    ],
    links: {
      github: "https://github.com/byteflipper-58/ffsensitivities2",
      live: "https://byteflipper-58.github.io/mc-tools/",
    }
  };

  const screenshots = [
    { url: "/images/mc_tools/1.webp", alt: t('mctools.screenshots.main') },
    { url: "/images/mc_tools/2.webp", alt: t('mctools.screenshots.detail') },
    { url: "/images/mc_tools/3.webp", alt: t('mctools.screenshots.settings') }
  ];

  return (
    <>
      <Helmet>
        <title>{project.title} - ByteFlipper Projects</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-dark-200">
          <div className="max-w-8xl mx-auto px-4 py-16">
            <Link
              to="/projects"
              className="inline-flex items-center text-light-300 hover:text-primary-end transition-colors mb-12 group pt-10 pl-6"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              {t('navigation.back_to_projects')}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center mb-8">
                <motion.img
                  src={project.icon}
                  alt={project.title}
                  className="w-24 h-24 rounded-2xl shadow-lg mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
                  {project.title}
                </h1>
              </div>
              
              <p className="text-light-300 text-lg md:text-xl mb-12">
                {project.description}
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4">
                {/* All buttons with consistent size */}
                {project.links.github && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-[188px] h-[63px] rounded-lg bg-dark-300 text-light-100 hover:text-primary-end transition-colors"
                  >
                    <Github className="mr-2" size={24} />
                    {t('everbook.buttons.source')}
                  </motion.a>
                )}
                {project.links.live && (
                  <motion.a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-[188px] h-[63px] rounded-lg bg-gradient-to-r from-primary-start to-primary-end text-light-100"
                  >
                    <ExternalLink className="mr-2" size={24} />
                    { t('mctools.buttons.demo') }
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics Section */}
        {/*<section className="py-16 px-4 bg-dark-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {project.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-4 text-primary-end" />
                  <div className="text-2xl font-bold text-light-100 mb-2">{metric.value}</div>
                  <div className="text-light-300">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>*?/}

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 text-light-100">{t('everbook.technologies.title')}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-dark-200 text-light-200 border border-dark-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 text-light-100">{t('everbook.features.title')}</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-light-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-end mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Screenshots Section */}
        <ScreenshotGallery 
          screenshots={screenshots}
          title={t('everbook.screenshots.title')}
        />
      </div>
    </>
  );
};

export default MCTools;