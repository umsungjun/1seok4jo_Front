import {BrowserRouter} from 'react-router-dom'
import Header from './Common/Header'
import MainBanner from './Common/MainBanner'
import PageNavigator from './PageNavigator'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageNavigator />
      <MainBanner />
    </BrowserRouter>
  )
}

export default App
