import {Routes, Route} from 'react-router'
import MainPage from './Pages/MainPage'

export default function PageNavigator() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
    </Routes>
  )
}
