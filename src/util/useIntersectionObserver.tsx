import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

interface useIntersectionObserverProps {
  root?: null
  rootMargin?: string
  threshold?: number
  onIntersect: IntersectionObserverCallback
}

const useIntersectionObserver = ({
  root = null,
  rootMargin,
  threshold = 0,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

  useEffect(() => {
    if (!target) return

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {root, rootMargin, threshold})
    //observer 관찰 시작
    observer.observe(target)

    //observer 관찰 종료
    return () => observer.unobserve(target)
  }, [onIntersect, root, rootMargin, target, threshold])

  return {setTarget}
}

export default useIntersectionObserver
