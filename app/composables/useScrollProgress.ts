/**
 * 문서 전체 스크롤 진행률을 0(맨 위) ~ 1(맨 아래) 로 반환한다.
 *
 * scroll 이벤트마다 값을 쓰면 프레임당 여러 번 스타일이 재계산되므로
 * requestAnimationFrame 으로 프레임당 한 번만 갱신한다.
 */
export function useScrollProgress() {
  const progress = ref(0)

  onMounted(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      progress.value = scrollable > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollable))
        : 0
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    // 뷰포트가 바뀌면 scrollable 높이가 달라져 진행률 기준도 달라진다
    window.addEventListener('resize', schedule, { passive: true })
    update()

    onScopeDispose(() => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    })
  })

  return { progress }
}
