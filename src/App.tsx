import {BrowserRouter} from 'react-router-dom'
import Header from './Common/Header'
import MainBanner from './Common/MainBanner'
import ThemeSlide from './Common/ThemeSlide'
import PageNavigator from './PageNavigator'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageNavigator />
      <MainBanner />
      <ThemeSlide />
    </BrowserRouter>
  )
}

export default App
