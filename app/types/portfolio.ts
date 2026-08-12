export interface Profile {
  name: string
  /** 인트로 첫 박자에 홀로 뜨는 인사말 */
  greeting: string
  /** 인사말 옆으로 이어붙는 소개 한 줄 */
  tagline: string
  /** 소개 문단. 줄바꿈 단위로 배열 */
  bio: string[]
  email: string
  location?: string
  /** public/ 기준 경로 또는 절대 URL */
  avatar?: string
  /** 이력서 PDF 등 */
  resumeUrl?: string
}

export interface SocialLink {
  label: string
  href: string
  /** app/components/icons 의 아이콘 키 */
  icon: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  /** URL 및 key로 쓰이므로 고유해야 함 */
  slug: string
  title: string
  /** 카드에 노출되는 한 줄 요약 */
  summary: string
  /** 상세 설명 문단 */
  description?: string[]
  /** "2025.03 - 2025.06" 같은 표기 문자열 */
  period: string
  /** 개인/팀 구분 및 담당 역할 */
  role: string
  teamSize?: number
  techStack: string[]
  links?: ProjectLink[]
  thumbnail?: string
  images?: string[]
  /** 정량 성과. 예: ["LCP 4.1s → 1.2s", "번들 크기 38% 감소"] */
  highlights?: string[]
  /** 목록 상단 고정 여부 */
  featured?: boolean
}

export interface ExperienceItem {
  organization: string
  position: string
  period: string
  /** 타임라인 색 구분 — 근무는 accent, 교육은 밝은 톤 */
  type: 'work' | 'education'
  description?: string[]
}
