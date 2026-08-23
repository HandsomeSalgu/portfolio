/**
 * 첫 진입 인트로의 진행 단계.
 *
 * 0  시작 전 (아무것도 안 보임)
 * 1  "안녕하세요." 가 화면 중앙에 뜸
 * 2  인사말이 사라짐
 * 3  소개 문장이 제자리(최종 위치)에 뜸
 * 4  연출 종료 — 이름이 아래에 뜨고, 같은 순간 헤더/사이드 룰 등장 + 스크롤 해제
 *
 * 중요: 기본값은 4(완료)다. 서버 렌더 결과가 곧 최종 화면이어야 JS 가 없거나
 * 하이드레이션이 실패해도 페이지가 백지로 보이지 않는다. 연출을 재생할지는
 * nuxt.config.ts 의 인라인 스크립트가 페인트 전에 html[data-intro="play"] 로
 * 정해두고, 첫 페인트의 숨김은 main.css 가 담당한다.
 */
export const INTRO_DONE_STEP = 4

/** 각 단계로 넘어가는 시점(ms). 길이는 INTRO_DONE_STEP 과 같아야 한다. */
const BEAT_DELAYS = [200, 1200, 1800, 2600]

/** nuxt.config.ts 의 인트로 인라인 스크립트와 반드시 동일해야 하는 키 */
export const INTRO_SESSION_KEY = 'portfolio-intro-seen'

export function useIntro() {
  const step = useState('intro-step', () => INTRO_DONE_STEP)
  const done = computed(() => step.value >= INTRO_DONE_STEP)
  return { step, done }
}

/**
 * 실제 타이머를 돌리는 쪽. 히어로가 있는 페이지에서 한 번만 호출한다.
 */
export function useIntroSequence() {
  const { step } = useIntro()

  onMounted(() => {
    const root = document.documentElement

    // 인라인 스크립트가 "재생" 으로 표시하지 않았다면 이미 최종 상태다.
    // (앵커 진입 / 세션 재방문 / 모션 최소화)
    if (root.dataset.intro !== 'play') return

    // 새로고침 시 브라우저가 이전 스크롤 위치를 복원하면
    // 인트로가 화면 밖에서 재생돼버린다
    window.scrollTo(0, 0)

    step.value = 0

    const finish = () => {
      step.value = INTRO_DONE_STEP
      // 이 속성이 남아 있으면 main.css 의 숨김 규칙이 계속 이겨버린다
      delete root.dataset.intro
    }

    const timers = BEAT_DELAYS.map((delay, i) =>
      window.setTimeout(() => {
        if (i + 1 >= INTRO_DONE_STEP) finish()
        else step.value = i + 1
      }, delay),
    )

    // 연출이 끝나기 전에는 스크롤을 막아 인트로가 잘리지 않게 한다
    const stopLock = watch(
      step,
      (value) => {
        document.body.style.overflow = value >= INTRO_DONE_STEP ? '' : 'hidden'
      },
      { immediate: true },
    )

    onScopeDispose(() => {
      timers.forEach((id) => clearTimeout(id))
      stopLock()
      document.body.style.overflow = ''
      delete root.dataset.intro
    })
  })
}
