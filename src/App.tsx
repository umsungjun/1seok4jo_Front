import {BrowserRouter} from 'react-router-dom'
import Header from './Common/Header'
import MainBanner from './Common/MainBanner'
import ThemeSlide from './Common/ThemeSlide'
import PostList from './Common/PostList'
import PageNavigator from './PageNavigator'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageNavigator />
      <MainBanner />
      <ThemeSlide />
      <PostList />
    </BrowserRouter>
  )
}

export default App
