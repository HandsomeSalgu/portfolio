/**
 * 첫 진입 인트로의 진행 단계.
 *
 * 0  시작 전 (아무것도 안 보임)
 * 1  "안녕하세요." 가 화면 중앙에 뜸
 * 2  인사말이 사라짐
 * 3  소개 문장이 제자리(최종 위치)에 뜸
 * 4  연출 종료 — 이름이 아래에 뜨고, 같은 순간 헤더/사이드 룰 등장 + 스크롤 해제
 */
export const INTRO_DONE_STEP = 4

/** 각 단계로 넘어가는 시점(ms). 길이는 INTRO_DONE_STEP 과 같아야 한다. */
const BEAT_DELAYS = [200, 1200, 1800, 2600]

export function useIntro() {
  const step = useState('intro-step', () => 0)
  const done = computed(() => step.value >= INTRO_DONE_STEP)
  return { step, done }
}

/**
 * 실제 타이머를 돌리는 쪽. 히어로가 있는 페이지에서 한 번만 호출한다.
 */
export function useIntroSequence() {
  const { step } = useIntro()

  onMounted(() => {
    // 모션 최소화를 켠 사용자에게는 연출을 재생하지 않고 최종 상태로 바로 보낸다
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      step.value = INTRO_DONE_STEP
      return
    }

    // 새로고침 시 브라우저가 이전 스크롤 위치를 복원하면
    // 인트로가 화면 밖에서 재생돼버린다
    window.scrollTo(0, 0)

    const timers = BEAT_DELAYS.map((delay, i) =>
      window.setTimeout(() => {
        step.value = i + 1
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
    })
  })
}
