import {BrowserRouter} from 'react-router-dom'
import Header from './Component/Header/Header'
import PageNavigator from './PageNavigator'
import {Provider} from 'react-redux'
import {store} from './Store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <PageNavigator />
      </BrowserRouter>
    </Provider>
  )
}

export default App
