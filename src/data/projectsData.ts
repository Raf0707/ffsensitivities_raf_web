import { Project } from '../types/project';

export const projectsData: Record<string, Project[]> = {
  en: [
    {
      id: 'everbook',
      title: 'EverBook',
      description: 'EverBook — a convenient eBook reader supporting multiple book formats.',
      image: '/images/everbook/banner.webp',
      category: 'android_apps',
      technologies: ["Jetpack Compose", "Kotlin", "MVVM"],
      links: {
        github: 'https://github.com/ByteFlipper-58/book-story'
      }
    },
    {
      id: 'ffsensitivities',
      title: 'FF Sensitivities',
      description: 'Sensitivity settings for smooth gameplay and optimal performance!',
      image: '/images/ffsensitivities/banner.webp',
      category: 'android_apps',
      technologies: ['Jetpack Compose', 'Kotlin', 'MVVM'],
      links: {
        github: 'https://github.com/ByteFlipper-58/FFSensitivities2'
        //live: 'https://ai-image-gen.demo'
      }
    },
    {
      id: 'mctools',
      title: 'MC Tools',
      description: 'This is a collection of powerful tools for Minecraft!!',
      image: '/images/mc_tools/banner.webp',
      category: 'web_apps',
      technologies: ["Vue3", "Git", "Github Pages", "Firebase"],
      links: {
        github: 'https://github.com/ByteFlipper-58/FFSensitivities2',
        live: 'https://byteflipper-58.github.io/mc-tools/'
      }
    }
  ],
  ru: [
    {
      id: 'everbook',
      title: 'EverBook',
      description: 'EverBook — удобный ридер, поддерживающий множество форматов электронных книг.',
      image: '/images/everbook/banner.webp',
      category: 'android_apps',
      technologies: ["Jetpack Compose", "Kotlin", "MVVM"],
      links: {
        github: 'https://github.com/ByteFlipper-58/book-story'
      }
    },
    {
      id: 'ffsensitivities',
      title: 'FF Sensitivities',
      description: 'Настройки чувствительности для более точных хедшотов!',
      image: '/images/ffsensitivities/banner.webp',
      category: 'android_apps',
      technologies: ['Jetpack Compose', 'Kotlin', 'MVVM'],
      links: {
        github: 'https://github.com/ByteFlipper-58/FFSensitivities2'
        //live: 'https://ai-image-gen.demo'
      }
    },
    {
      id: 'mctools',
      title: 'MC Tools',
      description: 'Это коллекция мощных инструментов для Minecraft!',
      image: '/images/mc_tools/banner.webp',
      category: 'web_apps',
      technologies: ["Vue3", "Git", "Github Pages", "Firebase"],
      links: {
        github: 'https://github.com/ByteFlipper-58/FFSensitivities2',
        live: 'https://byteflipper-58.github.io/mc-tools/'
      }
    }
  ]
};