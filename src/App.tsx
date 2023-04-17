import {BrowserRouter} from 'react-router-dom'
import Header from './Component/Header/Header'
import PageNavigator from './PageNavigator'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageNavigator />
    </BrowserRouter>
  )
}

export default App
