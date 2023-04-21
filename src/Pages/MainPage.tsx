import React, {useEffect, useState} from 'react'
import MainBanner from '../Component/MainBanner'
import ThemeSlide from '../Common/ThemeSlide'
import PostList from '../Component/PostList'
import {scrollToTop} from '../util/scrollToTop'
import styled from 'styled-components'
import HeaderSearchBox from '../Component/Header/HeaderSearch'
import {fetchThemePostListApi} from '../Service/postThemeService'
import useIntersectionObserver from '../util/useIntersectionObserver'

export default function MainPage() {
  scrollToTop()
  const [themePostList, setThemePostList] = useState([])
  const [categoryId, setCategoryId] = useState(1)
  const [lastId, setLastId] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // const postList = await fetchThemePostListApi(categoryId)
    // setThemePostList(postList.result)
    getList()
    setIsLoaded(false)
  }, [categoryId])

  const getList = async () => {
    const postList = await fetchThemePostListApi(categoryId)
    setLastId(i => i + 1)
    setThemePostList(postList.concat(postList.slice(lastId, lastId + 10)))
    // setThemePostList(postList.result)
    console.log('test', postList.result)
  }

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target)
      await getList()
      observer.observe(entry.target)
    }
  }

  //현재 대상 및 option을 props로 전달
  const {setTarget} = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  })

  return (
    <MainSection>
      <MainBanner />
      <HeaderSearchBoxWarper>
        <HeaderSearchBox />
      </HeaderSearchBoxWarper>
      <ThemeSlideWrapper>
        <ThemeSlide setCategoryId={setCategoryId} />
      </ThemeSlideWrapper>
      <PostList themePostList={themePostList} isLoaded={isLoaded} setTarget={setTarget} />
    </MainSection>
  )
}

const HeaderSearchBoxWarper = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
    margin-top: 2rem;
  }
`

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ThemeSlideWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
