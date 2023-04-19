import {Routes, Route} from 'react-router'
import MainPage from './Pages/MainPage'
import PostDetailPage from './Pages/PostDetailPage'
import PostWritePage from './Pages/PostWritePage'
import MyPage from './Pages/MyPage'
import MessagePage from './Pages/MessagePage'
import ChatList from './Component/ChatList'
import ProfileEditPage from './Pages/ProfileEditPage'
import PostEditPage from './Pages/PostEditPage'
import SearchDetailPage from './Pages/SearchDetailPage'

export default function PageNavigator() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/PostWrite' element={<PostWritePage />} />
      <Route path='/PostDetail/:id' element={<PostDetailPage />} />
      <Route path='/PostEdit' element={<PostEditPage />} />
      <Route path='/MyPage' element={<MyPage />} />
      {/* <Route path='/Message' element={<MessagePage />} /> */}
      <Route path='/Message' element={<ChatList chats={[]} />} />
      <Route path='/ProfileEdit' element={<ProfileEditPage />} />
      <Route path='/SearchDetail/:category/:searchText' element={<SearchDetailPage />} />
    </Routes>
  )
}
