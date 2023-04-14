import MainBanner from '../Component/MainBanner'
import ThemeSlide from '../Common/ThemeSlide'
import PostList from '../Component/PostList'
import {scrollToTop} from '../util/scrollToTop'
import styled from 'styled-components'

export default function MainPage() {
  scrollToTop()
  return (
    <MainSection>
      <MainBanner />
      <ThemeSlideWrapper>
        <ThemeSlide />
      </ThemeSlideWrapper>
      <PostList />
    </MainSection>
  )
}

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
