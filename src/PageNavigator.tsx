import {Routes, Route} from 'react-router'
import MainPage from './Pages/MainPage'
import PostDetailPage from './Pages/PostDetailPage'
import PostWritePage from './Pages/PostWritePage'

export default function PageNavigator() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/PostWrite' element={<PostWritePage />} />
      <Route path='/PostDetail' element={<PostDetailPage />} />
    </Routes>
  )
}
