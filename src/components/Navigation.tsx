import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Code, Flame, Home, FolderGit2, User, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  const menuItems = [
    { path: '/', label: t('navigation.home'), icon: Home },
    { path: '/projects', label: t('navigation.projects'), icon: FolderGit2 },
    ...(process.env.NODE_ENV === 'development' ? [
      { path: '/sectants', label: t('navigation.sectants'), icon: Flame }
    ] : []),
    { path: '/about', label: t('navigation.about'), icon: User },
    { path: '/contact', label: t('navigation.contact'), icon: Mail }
  ];

  return (
    <nav className="fixed w-full z-50 bg-dark-100/90 backdrop-blur-sm border-b border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-light-100 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-lg"
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-10 h-10"
              />
            </motion.div>
            <span className="font-bold text-xl group-hover:text-primary-end transition-colors">
              ByteFlipper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-light-100 hover:text-primary-end transition-colors flex items-center gap-2 ${
                  location.pathname === item.path ? 'text-primary-end' : ''
                }`}
              >
                <item.icon size={16} />
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-start to-primary-end"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="text-light-100 hover:text-primary-end transition-colors"
            >
              <Globe size={20} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-light-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-100/95 backdrop-blur-sm border-b border-dark-300"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 text-light-100 hover:text-primary-end transition-colors ${
                    location.pathname === item.path ? 'text-primary-end bg-dark-200/50' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-light-100 hover:text-primary-end transition-colors"
              >
                <Globe size={20} className="inline mr-2" />
                {i18n.language === 'en' ? 'Русский' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;