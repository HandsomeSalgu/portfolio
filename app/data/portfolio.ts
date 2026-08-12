import type {
  ExperienceItem,
  Profile,
  Project,
  SkillGroup,
  SocialLink,
} from '~/types/portfolio'

// TODO(콘텐츠): 아래 값들은 전부 채워 넣어야 하는 자리표시자다.
// 구조를 먼저 확정해두고 실제 내용은 나중에 교체한다.

/** 한 페이지 내 앵커 이동용. id 는 각 섹션 엘리먼트의 id 와 일치해야 한다. */
export const navItems = [
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

export const profile: Profile = {
  name: '권태혁',
  tagline: '안녕하세요. 저는 Full Stack 개발자',
  bio: [
    'TODO: 첫 번째 소개 문단.',
    'TODO: 두 번째 소개 문단.',
  ],
  email: 'warsfac@gmail.com',
  location: 'TODO: 지역',
}

export const socialLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/HandsomeSalgu', icon: 'github' },
  { label: 'Notion', href: 'https://app.notion.com/p/27e0380f207b80dbacdddf44a8c81534', icon: 'notion' },
]

export const skillGroups: SkillGroup[] = [
  { category: 'Frontend', items: ['TODO'] },
  { category: 'Backend', items: ['TODO'] },
  { category: 'Tools', items: ['TODO'] },
]

export const projects: Project[] = [
  {
    slug: 'todo-project-1',
    title: 'TODO: 프로젝트 이름',
    summary: 'TODO: 한 줄 요약',
    period: 'TODO: 2025.01 - 2025.03',
    role: 'TODO: 담당 역할',
    techStack: ['TODO'],
    featured: true,
  },
]

export const experience: ExperienceItem[] = [
  {
    organization: 'TODO: 소속',
    position: 'TODO: 직무',
    period: 'TODO: 기간',
  },
]

/** featured 를 앞으로 끌어올린 프로젝트 목록 */
export const sortedProjects: Project[] = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
]
