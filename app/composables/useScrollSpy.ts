/**
 * 지금 화면에 걸린 섹션 id 를 추적한다. 내비게이션 활성 표시에 쓴다.
 *
 * rootMargin 으로 뷰포트를 얇은 가로 띠(위 40% / 아래 55% 잘라냄)로 좁혀서,
 * 그 띠를 지나는 섹션 하나만 활성으로 잡히게 한다. 이렇게 안 하면 화면에
 * 두 섹션이 동시에 보일 때 활성 항목이 튄다.
 */
export function useScrollSpy(ids: readonly string[]) {
  const active = ref<string>('')

  onMounted(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    targets.forEach((el) => observer.observe(el))

    const lastId = ids[ids.length - 1] ?? ''

    const sync = () => {
      // 맨 위(히어로)로 돌아오면 어떤 섹션도 활성이 아니어야 한다
      if (window.scrollY < window.innerHeight * 0.5) {
        active.value = ''
        return
      }

      // 마지막 섹션(Contact)은 짧고 그 아래 푸터도 얇아서, 문서 끝까지
      // 내려도 관측 띠 안으로 들어오지 못하는 경우가 있다. 그러면 끝까지
      // 내렸는데 Projects 가 계속 활성으로 남는다. 바닥에 닿으면 마지막
      // 항목을 활성으로 고정해 그 상황을 막는다.
      const atBottom
        = window.innerHeight + window.scrollY
          >= document.documentElement.scrollHeight - 2
      if (atBottom) active.value = lastId
    }

    window.addEventListener('scroll', sync, { passive: true })
    // 뷰포트가 바뀌면 바닥 판정 기준(scrollHeight)도 달라진다
    window.addEventListener('resize', sync, { passive: true })
    sync()

    onScopeDispose(() => {
      observer.disconnect()
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    })
  })

  return { active }
}
