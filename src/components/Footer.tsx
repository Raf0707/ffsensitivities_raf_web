import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/byteflipper', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/byteflipper', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/byteflipper', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@byteflipper.dev', label: 'Email' }
  ];

  return (
    <footer className="bg-dark-200 border-t border-dark-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
            ByteFlipper
          </Link>
          
          {/*<!div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-light-300 hover:text-primary-end transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>*/}

          <p className="text-sm text-light-300">
            © {currentYear} ByteFlipper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;