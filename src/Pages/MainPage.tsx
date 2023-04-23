import {useEffect, useState, useRef, useCallback} from 'react'
import MainBanner from '../Component/MainBanner'
import ThemeSlide from '../Common/ThemeSlide'
import PostList from '../Component/PostList'
import {scrollToTop} from '../util/scrollToTop'
import styled from 'styled-components'
import HeaderSearchBox from '../Component/Header/HeaderSearch'
import {fetchThemePostListApi} from '../Service/postThemeService'
import {fetchThemeScrollApi} from '../Service/postThemeScrollService'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import {ThemePostListProps} from '../Component/PostList'
import {ThemeScrollProps} from '../Component/PostList'

export default function MainPage() {
  scrollToTop()
  const [themePostList, setThemePostList] = useState<ThemePostListProps['themePostList']>([])
  const [themeScrollList, setThemeScrollList] = useState<ThemeScrollProps['themeScrollList']>([])
  const [categoryId, setCategoryId] = useState(1)
  const [lastId, setLastId] = useState<number | null>(null)

  useEffect(() => {
    console.log('themePostList', themePostList)
    console.log('themeScrollList', themeScrollList)
    console.log('lastId', lastId)
    setLastId(themePostList.length > 0 ? themePostList[0].postId - 9 : 0)
  }, [themePostList, themeScrollList])

  const onLoadMore = useCallback(async () => {
    if (lastId !== null) {
      const nextPosts = await fetchThemeScrollApi(categoryId, lastId)
      setThemePostList([...themePostList, ...nextPosts.result])
      console.log('nextPosts:', nextPosts)
      console.log('more')
    }
  }, [categoryId, lastId])

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: true,
    onLoadMore,
    disabled: false,
    rootMargin: '0px 0px 500px 0px',
  })

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
      <PostList ref={infiniteRef} themePostList={themePostList} themeScrollList={themeScrollList} />
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
