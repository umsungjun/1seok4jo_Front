import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router'
import {useNavigate, useLocation} from 'react-router-dom'
import MainPage from './Pages/MainPage'
import PostDetailPage from './Pages/PostDetailPage'
import PostWritePage from './Pages/PostWritePage'
import MyPage from './Pages/MyPage'
import MessagePage from './Pages/MessagePage'
import ChatList from './Component/ChatList'
import Chat from './Component/Chat'
import ProfileEditPage from './Pages/ProfileEditPage'
import PostEditPage from './Pages/PostEditPage'
import SearchDetailPage from './Pages/SearchDetailPage'

export default function PageNavigator() {
  const [shouldShowDesktop, setShouldShowDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 577px)')

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      const shouldShowDesktop = e.matches
      setShouldShowDesktop(shouldShowDesktop)
    }
    setShouldShowDesktop(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/PostWrite' element={<PostWritePage />} />
      <Route path='/PostDetail/:id' element={<PostDetailPage />} />
      <Route path='/PostEdit/:id' element={<PostEditPage />} />
      <Route path='/MyPage' element={<MyPage />} />
      <Route path='/Message' element={shouldShowDesktop ? <MessagePage /> : <ChatList chats={[]} />} />
      <Route path='/Chat/:id' element={<Chat />} />
      <Route path='/ProfileEdit' element={<ProfileEditPage />} />
      <Route path='/SearchDetail/:category/:searchText' element={<SearchDetailPage />} />
    </Routes>
  )
}
