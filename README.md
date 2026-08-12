# 권태혁 포트폴리오

Nuxt 4 와 Tailwind CSS 4 로 만든 원페이지 포트폴리오 사이트입니다.
상단 탭은 페이지를 이동하지 않고 같은 문서 안의 해당 섹션으로 스크롤합니다.

## 기술 스택

| 분류 | 사용 기술 |
| --- | --- |
| 프레임워크 | Nuxt 4 (Vue 3, Vue Router 5) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS 4 (`@tailwindcss/vite`) |
| 폰트 | Pretendard Variable (jsDelivr CDN) |
| 빌드 | 정적 사이트 생성 (`nuxt generate`) |
| 배포 | Vercel |

Tailwind 4 의 CSS-first 방식을 쓰기 때문에 **`tailwind.config.js` 파일이 없습니다.**
색상·폰트·간격 토큰은 전부 `app/assets/css/main.css` 의 `@theme` 블록에 있습니다.
`scroll-mt-header`, `py-section`, `max-w-content`, `text-accent` 같은 유틸리티도
모두 여기서 생성된 것입니다.

## 주요 구현

**원페이지 앵커 스크롤** — 상단 탭은 `NuxtLink` 가 아니라 순수 `<a href="#id">` 입니다.
라우팅을 타지 않으므로 페이지 이동 없이 문서 내에서만 움직입니다. 부드러운 이동은
CSS `scroll-behavior: smooth`, 고정 헤더가 제목을 가리지 않게 띄우는 것은 각 섹션의
`scroll-mt-header` 가 담당합니다. JS 스크롤 위치 계산이 없습니다.
현재 보고 있는 섹션의 탭을 굵게 표시하는 것만 `app/composables/useScrollSpy.ts` 가
IntersectionObserver 로 처리합니다.

**다크 모드** — `.dark` 클래스 전략입니다. `nuxt.config.ts` 의 `head` 에 넣은 인라인
스크립트가 페인트 전에 클래스를 확정해서 새로고침 시 흰 화면이 번쩍이지 않습니다.
상태 관리는 `app/composables/useTheme.ts` 이며 라이트 / 다크 / 시스템 3단으로 동작합니다.

**좌측 게이지 선** — `app/components/SideRule.vue` 가 스크롤 진행률을 받아 `scaleY` 를
조절합니다. 아래로 내려갈수록 선이 위에서부터 짧아지고 맨 아래에서 사라집니다.

## 프로젝트 구조

```
app/
├── assets/css/main.css   디자인 토큰(@theme), 라이트/다크 색상 변수
├── components/           AppHeader, AppFooter, SideRule, BaseSection, Section*, Icon*
├── composables/          useTheme, useScrollSpy, useScrollProgress
├── data/portfolio.ts     화면에 들어가는 모든 콘텐츠
├── layouts/default.vue   헤더 + 본문 + 푸터 골격
├── pages/index.vue       섹션 조립
└── types/portfolio.ts    콘텐츠 타입 정의
```

섹션 공통 골격(번호·제목·2단 레이아웃)은 `BaseSection.vue` 하나에 모여 있습니다.
섹션 헤더 디자인을 바꾸려면 이 파일만 고치면 네 섹션에 한 번에 반영됩니다.

## 로컬 실행

```bash
npm install     # 의존성 설치
npm run dev     # 개발 서버 → http://localhost:3000
```

정적 빌드 결과를 실제 배포와 동일한 형태로 확인하려면:

```bash
npm run generate
npx serve .output/public
```

## 콘텐츠 수정하기

화면에 보이는 글자는 전부 **`app/data/portfolio.ts`** 한 곳에 있습니다.
컴포넌트를 고칠 필요 없이 이 파일만 수정하면 됩니다.

| export | 내용 |
| --- | --- |
| `navItems` | 상단 탭. `id` 는 각 섹션 엘리먼트의 `id` 와 반드시 일치해야 합니다 |
| `profile` | 이름, 히어로 문구, 소개 문단, 이메일, 지역 |
| `socialLinks` | GitHub · Notion 등 외부 링크 |
| `skillGroups` | 카테고리별 기술 목록 |
| `projects` | 프로젝트 목록. 시작일 기준 오름차순으로 자동 정렬됩니다 |
| `experience` | 경력 타임라인 |

각 항목의 타입은 `app/types/portfolio.ts` 에 정의되어 있으니 필드 이름과 필수 여부는
그쪽을 참고하면 됩니다.

색상을 바꿀 때는 `app/assets/css/main.css` 에서 **두 곳을 함께** 고쳐야 합니다.

1. `@theme` 의 `--color-brand-*` 스케일
2. `:root` 와 `.dark` 의 `--accent`

`.dark` 의 `--accent` 는 라이트 값을 복사하는 게 아니라 밝기를 올린 별도 값입니다.
어두운 배경 위에서 대비를 확보하기 위한 것이므로 같은 값을 넣으면 글자가 묻힙니다.

## 배포 (Vercel)

서버 로직이 없는 사이트라 서버리스 함수 없이 **전부 정적으로** 내보냅니다.
GitHub 저장소를 Vercel 에 연결한 뒤, 아래 두 항목을 기본값에서 재정의합니다.

| 항목 | 값 |
| --- | --- |
| Framework Preset | Nuxt.js (자동 감지) |
| Build Command | `npm run generate` |
| Output Directory | `.output/public` |

Vercel 이 자동으로 잡는 기본 빌드 명령은 `nuxt build` 인데, 이 경우 사용하지도 않는
서버리스 함수가 함께 생성됩니다. `nuxt generate` 로 바꾸면 정적 파일만 남아 더 빠르고
단순합니다.

루트 도메인에 배포되므로 `nuxt.config.ts` 의 `baseURL` 은 `'/'` 그대로 두면 됩니다.
서브 경로(`example.com/portfolio/`)에 올릴 경우에만 그 경로로 바꿔야 합니다.

설정을 마치면 `main` 브랜치에 푸시할 때마다 자동으로 재배포되고,
Pull Request 에는 프리뷰 배포가 생성됩니다.
