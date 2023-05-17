import {useEffect, useState, useCallback} from 'react'
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
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
import {darkTheme, lightTheme} from '../Theme/theme'

export default function MainPage() {
  scrollToTop()
  const theme = useSelector((state: RootState) => state.themeType.theme)
  const [themePostList, setThemePostList] = useState<ThemePostListProps['themePostList']>([])
  const [categoryId, setCategoryId] = useState(1)
  const [lastId, setLastId] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (themePostList.length === 0) {
      return
    }
    const lastPost = themePostList[themePostList.length - 1]
    if (lastPost) {
      setLastId(lastPost.postId)
    }
  }, [themePostList])

  const onLoadMore = useCallback(async () => {
    if (themePostList.length === 0) {
      return
    }
    if (lastId === null) {
      return
    }
    setIsLoading(true)
    const nextPosts = await fetchThemeScrollApi(categoryId, lastId)
    setThemePostList([...themePostList, ...nextPosts.result])
    setIsLoading(false)
  }, [categoryId, lastId, themePostList])

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: themePostList.length % 10 === 0 ? true : false,
    onLoadMore,
    disabled: false,
    rootMargin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const postList = await fetchThemePostListApi(categoryId)
      setThemePostList(postList.result)
      setIsLoading(false)
    })()
  }, [categoryId])

  return (
    <MainSection theme={theme}>
      <MainBanner />
      <HeaderSearchBoxWarper>
        <HeaderSearchBox />
      </HeaderSearchBoxWarper>
      <ThemeSlideWrapper>
        <ThemeSlide setCategoryId={setCategoryId} />
      </ThemeSlideWrapper>
      <PostList ref={infiniteRef} themePostList={themePostList} isLoading={isLoading} setIsLoading={setIsLoading} />
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
  ${props => (props.theme === 'light' ? lightTheme.background : darkTheme.background)}
`

const ThemeSlideWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
