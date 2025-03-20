import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-xl overflow-hidden group"
    >
      {/* Gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-start to-primary-end opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner content with dark background */}
      <div className="relative bg-dark-200 m-[1px] rounded-xl overflow-hidden">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-transparent to-transparent opacity-60" />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-light-100 group-hover:text-primary-end transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex gap-3">
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-300 hover:text-primary-end transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={22} />
                </motion.a>
              )}
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-300 hover:text-primary-end transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink size={22} />
                </motion.a>
              )}
            </div>
          </div>
          
          <p className="text-light-300 mb-6 line-clamp-2 text-lg">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm rounded-full bg-dark-300 text-light-200 border border-dark-400 group-hover:border-primary-end/20 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <Link
            to={`/${project.id}`}
            className="inline-flex items-center text-primary-end hover:text-primary-start transition-colors group/link text-lg"
          >
            {t('projects.card.learnMore')}
            <motion.span
              className="inline-block ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;