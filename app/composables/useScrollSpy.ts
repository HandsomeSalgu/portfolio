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

    // 맨 위(히어로)로 돌아오면 어떤 섹션도 활성이 아니어야 한다
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) active.value = ''
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    onScopeDispose(() => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    })
  })

  return { active }
}
