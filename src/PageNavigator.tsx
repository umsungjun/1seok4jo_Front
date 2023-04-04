import {Routes, Route} from 'react-router'
import MainPage from './Pages/MainPage'
import PostWritePage from './Pages/PostWritePage'

export default function PageNavigator() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/PostWrite' element={<PostWritePage />} />
    </Routes>
  )
}
