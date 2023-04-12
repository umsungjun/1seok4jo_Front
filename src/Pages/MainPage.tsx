import MainBanner from '../Component/MainBanner'
import ThemeSlide from '../Common/ThemeSlide'
import PostList from '../Component/PostList'
import {scrollToTop} from '../util/scrollToTop'

export default function MainPage() {
  scrollToTop()
  return (
    <>
      <MainBanner />
      <ThemeSlide />
      <PostList />
    </>
  )
}
