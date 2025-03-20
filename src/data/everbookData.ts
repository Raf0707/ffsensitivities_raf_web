import { Project } from '../types/project';

export const everbookData: Record<string, Project[]> = {
  en: [
    {
      id: 'everbook',
      title: 'EverBook',
      description: 'EverBook — a convenient eBook reader supporting multiple book formats.',
      image: '/images/everbook/banner.png',
      category: 'android_apps',
      technologies: ['Jetpack Compose', 'MVVM', 'MongoDB'],
      links: {
        github: 'https://github.com/ByteFlipper-58/book-story'
      }
    },
    {
      id: 'ffsensitivities',
      title: 'FF Sensitivities',
      description: 'Sensitivity settings for smooth gameplay and optimal performance!',
      image: '/images/ffsensitivities/banner.png',
      category: 'android_apps',
      technologies: ['Jetpack Compose', 'MVVM', 'React'],
      links: {
        github: 'https://github.com/ByteFlipper-58/FFSensitivities2'
        //live: 'https://ai-image-gen.demo'
      }
    }
  ],
  ru: [
    {
      id: 'everbook',
      title: 'EverBook',
      description: 'EverBook — удобный ридер, поддерживающий множество форматов электронных книг.',
      image: '/images/everbook/banner.png',
      category: 'android_apps',
      technologies: ['Jetpack Compose', 'Node.js', 'MongoDB'],
      links: {
        github: 'https://github.com/ByteFlipper-58/book-story'
      }
    },
    {
      id: 'ffsensitivities',
      title: 'FF Sensitivities',
      description: 'Настройки чувствительности для более точных хедшотов!',
      image: '/images/ffsensitivities/banner.png',
      category: 'android_apps',
      technologies: ['Jetpack Compose', 'MVVM', 'React'],
      links: {
        github: 'https://github.com/ByteFlipper-58/FFSensitivities2'
        //live: 'https://ai-image-gen.demo'
      }
    }
  ]
};