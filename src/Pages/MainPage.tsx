import React, {useEffect, useState} from 'react'
import MainBanner from '../Component/MainBanner'
import ThemeSlide from '../Common/ThemeSlide'
import PostList from '../Component/PostList'
import {scrollToTop} from '../util/scrollToTop'
import styled from 'styled-components'
import HeaderSearchBox from '../Component/Header/HeaderSearch'
import {fetchThemePostListApi} from '../Service/postThemeService'

export default function MainPage() {
  scrollToTop()
  const [themePostList, setThemePostList] = useState([])
  const [categoryId, setCategoryId] = useState(1)

  useEffect(() => {
    ;(async () => {
      const postList = await fetchThemePostListApi(categoryId)
      setThemePostList(postList.result)
    })()
  }, [categoryId])

  return (
    <MainSection>
      <MainBanner />
      <HeaderSearchBoxWarper>
        <HeaderSearchBox />
      </HeaderSearchBoxWarper>
      <ThemeSlideWrapper>
        <ThemeSlide setCategoryId={setCategoryId} />
      </ThemeSlideWrapper>
      <PostList themePostList={themePostList} />
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
