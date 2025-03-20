import { TeamMember } from '../types/project';

export const teamMembersData: Record<string, TeamMember[]> = {
  en: [
    {
      id: "kirbo",
      name: "Kirbo",
      title: "Programmer and musician. ",
      image: "https://avatars.githubusercontent.com/u/62571450?v=4",
      description: "Programmer and musician. Co-founder of JVMFrog (now @intkgc).",
      isRitualMaster: false,
      skills: ["Java", "Rust", "dark_skills.legacy", "dark_skills.cicd"],
      projects: [
        {
          name: "SectWiki",
          description: "Вики Секты",
          link: "https://github.com/intkgc/sectwiki",
          status: 'active'
        },
        {
          name: "dark_projects.reaper.title",
          description: "dark_projects.reaper.description",
          link: "https://github.com/dark-sect/reaper",
          status: 'forbidden'
        }
      ],
      links: {
        github: "https://github.com/kirbodevv",
        website: "https://wiki.intkgc.xyz/members/kirbo"
      }
    },
    {
      id: "void-weaver",
      name: "Intbyte",
      title: "dark_title.frontend",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      description: "dark_description.technomancer",
      skills: ["dark_skills.state", "dark_skills.dom", "dark_skills.reactive", "dark_skills.patterns"],
      projects: [
        {
          name: "dark_projects.whispers.title",
          description: "dark_projects.whispers.description",
          link: "https://github.com/dark-sect/whispers",
          status: 'completed'
        }
      ],
      links: {
        github: "https://github.com/void-weaver",
      }
    }
  ],
  ru: [
    {
      id: "shadow-master",
      name: "dark_title.archimage",
      title: "dark_title.architect",
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=400&fit=crop",
      description: "dark_description.archimage",
      isRitualMaster: true,
      skills: ["dark_skills.architecture", "dark_skills.microservices", "dark_skills.legacy", "dark_skills.cicd"],
      projects: [
        {
          name: "dark_projects.portal.title",
          description: "dark_projects.portal.description",
          link: "https://github.com/dark-sect/portal",
          status: 'active'
        },
        {
          name: "dark_projects.reaper.title",
          description: "dark_projects.reaper.description",
          link: "https://github.com/dark-sect/reaper",
          status: 'forbidden'
        }
      ],
      links: {
        github: "https://github.com/archimage",
        website: "https://dark-sect.dev"
      }
    },
    {
      id: "void-weaver",
      name: "dark_title.technomancer",
      title: "dark_title.frontend",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      description: "dark_description.technomancer",
      skills: ["dark_skills.state", "dark_skills.dom", "dark_skills.reactive", "dark_skills.patterns"],
      projects: [
        {
          name: "dark_projects.whispers.title",
          description: "dark_projects.whispers.description",
          link: "https://github.com/dark-sect/whispers",
          status: 'completed'
        }
      ],
      links: {
        github: "https://github.com/void-weaver",
      }
    }
  ]
};