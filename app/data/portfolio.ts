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
  greeting: '안녕하세요.',
  tagline: '서비스 개발부터 배포와 운영 환경까지 고민하는 개발자',
  bio: [
    '기능을 구현하는 것에 그치지 않고, 서비스가 어떤 구조로 동작하고 안정적으로 운영될 수 있는지까지 고민합니다.',
    '백엔드 개발 경험을 바탕으로 Docker와 CI/CD, 클라우드 환경까지 관심 영역을 넓히며 개발부터 배포까지의 흐름을 이해하는 개발자로 성장하고 있습니다.',
  ],
  email: 'warsfac@gmail.com',
  location: '서울',
  // 사진을 public/images/profile.jpg 에 넣고 아래 주석을 풀면 About Me 에 표시된다
  avatar: '/images/profile.jpg',
}

export const socialLinks: SocialLink[] = [
  { label: 'github', href: 'https://github.com/HandsomeSalgu', icon: 'github' },
  { label: 'Notion', href: 'https://app.notion.com/p/27e0380f207b80dbacdddf44a8c81534', icon: 'notion' },
]

export const skillGroups: SkillGroup[] = [
  { category: 'Front-end', items: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'React'] },
  { category: 'Back-end', items: ['Java', 'Python', 'Spring Boot', 'MyBatis'] },
  { category: 'Database', items: ['MySQL', 'Oracle'] },
  // 태그라인("배포와 운영까지 고민")을 뒷받침하는 카테고리
  { category: 'DevOps', items: ['Docker', 'Jenkins'] },
  // 비전(직접 학습)과 LLM(활용)을 한 카테고리로. 학습 경험이 더 희소하므로 비전을 앞에 둔다
  { category: 'AI & ML', items: ['YOLO', 'PaddleOCR', 'Prompt Engineering', 'RAG', 'Gemini', 'Claude'] },
  { category: 'Certifications', items: ['정보처리기사', 'SQLD'] },
]

export const projects: Project[] = [
  {
    slug: 'codinghi',
    title: 'SINUEDU',
    summary: '접근성과 효율성을 갖춘 온라인 코딩 교육 플랫폼',
    period: '2024.12.08 - 2025.01.14',
    role: '팀장 · 강의 목록/상세 · 질문 게시판',
    teamSize: 5,
    techStack: [
      'Java',
      'Spring Boot',
      'MyBatis',
      'jQuery',
      'MySQL',
      'Oracle',
      'AWS EC2',
      'Cloudflare R2',
    ],
    highlights: [
      '경로 변수와 조건부 Mapper 라우팅으로 카테고리별 강의 필터링 구현',
      '시청 기록 테이블 기반 진도율 계산 시스템 개발',
      'AJAX 비동기 북마크 토글과 질문 게시판 페이지네이션 구현',
      'AWS EC2 + Cloudflare CDN 환경에 배포',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/HandsomeSalgu/Semi-project-CodingHi' },
      { label: 'Live', href: 'http://sinuedu.online' },
    ],
  },
  {
    slug: 'vplay-pocopoco',
    title: 'VPLAY',
    summary: '영상 템플릿을 사고팔 수 있는 판매 · 수주 마켓플레이스 플랫폼',
    period: '2025.01.15 - 2025.03.26',
    role: '팀장 · 관리자/콘텐츠 관리 · 파일 처리',
    teamSize: 4,
    techStack: [
      'Java',
      'Spring Boot',
      'MyBatis',
      'jQuery',
      'Tailwind CSS',
      'MySQL',
      'Oracle',
      'AWS EC2',
      'Cloudflare R2',
    ],
    highlights: [
      'Cloudflare R2 오브젝트 스토리지 연동으로 템플릿 파일 업로드 · 관리 구현',
      '대용량 파일 다운로드를 스트리밍 방식으로 처리해 안정적인 전송 확보',
      '인터셉터 기반 관리자 페이지 접근 제어',
      'MD 추천 · 좋아요 · 장바구니 등 커머스 기능 구현',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/HandsomeSalgu/VPLAY-pocopoco' },
      { label: 'Live', href: 'http://vplay.cloud' },
    ],
  },
  {
    slug: 'capshop',
    title: 'CapShop',
    summary:
      '영상 속 상품을 캡처하면 AI가 분석해 유사한 쇼핑 상품을 추천해주는 서비스',
    period: '2026.06.01 - 2026.06.26',
    role: '프론트엔드 · 추천 시스템 · CI/CD',
    teamSize: 2,
    techStack: [
      'Vue 3',
      'Pinia',
      'Spring Boot',
      'MyBatis',
      'Redis',
      'MySQL',
      'FastAPI',
      'YOLO',
      'PaddleOCR',
      'Docker',
      'Jenkins',
    ],
    highlights: [
      '크롬 익스텐션으로 유튜브 영상 속 상품을 캡처하면 AI 분석을 거쳐 네이버 쇼핑 검색까지 이어지는 파이프라인',
      'YOLO · PaddleOCR 모델을 학습시켜 상품 특징(브랜드 · 색상 · 로고 · 형태) 추출',
      '위시리스트 · 시청 기록 기반 추천 시스템과 OAuth2(Google/Kakao) 로그인',
      'Docker + Jenkins 로 CI/CD 파이프라인 구축',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/HandsomeSalgu/CapShop' }],
  },
]

/** 왼쪽(과거)부터 오른쪽(현재) 순서로 렌더된다 */
export const experience: ExperienceItem[] = [
  {
    organization: 'FOURV',
    position: '편집/기획부서 CP — 프로그램 기획 · 연출 · 제작 총괄',
    period: '2022.06 - 2024.03',
    type: 'work',
    description: [
      '프로그램 기획 · 연출 · 편집 등 제작 전 과정 조율 및 총괄',
      '연출자 · 작가 · 기술진 · 출연진 등 제작 인력 및 인사 관리',
      '고객 미팅 및 영업 담당',
    ],
  },
  {
    organization: 'KH정보교육원',
    position: '(디지털컨버전스) 공공데이터 융합 자바개발자 양성과정 · 920시간',
    period: '2024.10.07 - 2025.03.27',
    type: 'education',
    description: [
      'Java 기반 웹 개발 과정 — 프론트엔드(HTML · CSS · JS · React)부터 백엔드(Servlet · JSP · MyBatis), DB(Oracle), Spring Framework까지 학습',
      '세미 · 파이널 두 번의 팀 프로젝트로 실무 감각 습득',
    ],
  },
  {
    organization: 'SSAFY',
    position: '삼성청년SW·AI아카데미 15기',
    period: '2026.01.07 - 2027.01.06',
    type: 'education',
    description: [
      'AI 기초 지식과 알고리즘 기반 코딩 역량 강화',
      'Java Full Stack — 백엔드 Spring, 프론트엔드 Vue 개발 역량 학습',
    ],
  },
]

/** 시작일 기준 오름차순(오래된 것부터). period 가 'YYYY.MM.DD - ...' 형태라는 전제 */
export const sortedProjects: Project[] = [...projects].sort((a, b) =>
  a.period.localeCompare(b.period),
)
