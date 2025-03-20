import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projectsData';

const categories = ['All', 'android_apps', 'web_apps'];

const Projects = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const projects = projectsData[i18n.language] || projectsData['en'];
  
  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? projects
      : projects.filter(project => project.category === selectedCategory);
  }, [selectedCategory, projects]);

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
    <div className="py-28 px-4 min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
      <motion.div 
        className="max-w-7xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-start/10 to-primary-end/10 rounded-full blur-3xl opacity-30" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent relative">
            {t('projects.title')}
          </h1>
          <p className="text-light-300 text-lg max-w-2xl mx-auto relative">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-start to-primary-end text-light-100 shadow-lg shadow-primary-start/20'
                  : 'bg-dark-200 text-light-300 hover:text-light-100 border border-dark-300 hover:border-primary-end/20'
              }`}
            >
              {t(`projects.categories.${category.toLowerCase()}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dark-200 to-dark-300 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <ProjectCard project={project} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-light-300 py-12"
          >
            {t('projects.noResults')}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;