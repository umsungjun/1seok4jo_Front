import React, {useState} from 'react'

import Login from '../../Popups/Login'

import Notification from '../../Popups/Notification'

import {AiOutlineBell} from 'react-icons/ai'
import {RxHamburgerMenu} from 'react-icons/rx'
import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../Store'
import {changeThemeType} from '../../Store/themeTypeSlice'

import {MdSunny} from 'react-icons/md'
import {IoMdMoon} from 'react-icons/io'
import {useCookies} from 'react-cookie'

export default function HeaderProfile() {
  const themeDispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.themeType.theme)
  const user = useSelector((state: RootState) => state.user)
  const [token, setToken] = useCookies(['token']) // TODO 로그인 상태
  const [userUlList, setUserUlList] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [notification, setNotification] = useState(false)

  const handleOpenUserUl = () => {
    setUserUlList(!userUlList)
  }

  const handleLogout = () => {
    setToken('token', '', {expires: new Date(0)})
    // TODO reducer함수를 통해서 그 회원정보의 값을 초기화 해줘야한다.
  }

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  return (
    <>
      {Object.keys(token).length === 0 ? (
        <LoginText onClick={handleLogin}>로그인</LoginText>
      ) : (
        <LoginBox onClick={() => themeDispatch(changeThemeType())}>
          <ThemeBox>{theme === 'light' ? <MdSunny /> : <IoMdMoon style={{color: 'fff'}} />}</ThemeBox>
          <Notifications
            onMouseEnter={() => {
              setNotification(true)
            }}
          >
            <AiOutlineBell />
            <Count />
          </Notifications>
          {notification && <Notification setNotification={setNotification} />}
          <UserButton onClick={handleOpenUserUl}>
            <RxHamburgerMenu />
            <UserImg src={user.profileUrl} alt='userImg' />
            {userUlList && (
              <UserUl>
                <UserLiLink to='PostWrite'>글쓰기</UserLiLink>
                <UserLiLink to='Message'>메시지함</UserLiLink>
                <UserLiLink to='MyPage'>마이페이지</UserLiLink>
                <UserLiLink to='ProfileEdit'>회원정보 수정</UserLiLink>
                <UserLiButton onClick={handleLogout}>로그아웃</UserLiButton>
              </UserUl>
            )}
          </UserButton>
        </LoginBox>
      )}
      <Login show={showLoginModal} setShowLoginModal={setShowLoginModal} />
    </>
  )
}

const LoginText = styled.span`
  cursor: pointer;
  min-width: 9rem;
  text-align: right;
`

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const ThemeBox = styled.div`
  display: flex;
  font-size: 2rem;
  padding: 0px 0px 0.1rem 0px;
  margin-right: 1rem;
  cursor: pointer;
`

const Notifications = styled.div`
  position: relative;
  margin-right: 1rem;
  border-radius: 1rem;
  padding: 0.2rem;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  svg {
    font-size: 2rem;
  }

  &:hover {
    background-color: #f7f7f7;
    color: #1877fe;
  }
`

const Count = styled.span`
  position: absolute;
  background: rgb(24, 119, 254);
  color: rgb(255, 255, 255);
  font-size: 0.8rem;
  padding: 0.2rem;
  border-radius: 50%;
  right: 0.2rem;
  top: 0.3rem;
`
const UserButton = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid #c0c0c0;
  padding: 0.3rem 0.3rem 0.3rem 0.5rem;
  gap: 0.8rem;
  cursor: pointer;
  border-radius: 1.2rem;
  background: inherit;
  transition: box-shadow 0.3s ease-in-out;
  position: relative;
  svg {
    font-size: 1.2rem;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }

  &:active {
    border: none;
  }
`

const UserImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const slideIn = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(15%);
    opacity: 1;
  }
`

const UserUl = styled.ul`
  position: absolute;
  top: 1rem;
  right: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  animation: ${slideIn} 0.3s ease-in-out forwards;
  li:last-child {
    border-bottom: none;
  }
`

const UserLiLink = styled(Link)`
  min-width: 8rem;
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
  font-size: 0.9rem;
`

const UserLiButton = styled.li`
  min-width: 8rem;
  padding: 0.5rem;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  border: none;
  border-bottom: 1px solid #d0d0d0;
`
