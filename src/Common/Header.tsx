import styled, {keyframes} from 'styled-components'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {SlCompass} from 'react-icons/sl'
import {GoSearch} from 'react-icons/go'
import {AiOutlineBell} from 'react-icons/ai'
import {RxHamburgerMenu} from 'react-icons/rx'
import Login from '../Popups/Login'

export default function Header() {
  const [searchSelect, setSerachSelect] = useState('검색')
  const [selectUl, setSelectUl] = useState(false)
  const [token, setToken] = useState(true) // TODO 로그인 상태
  const [userUlList, setUserUlList] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleSearchSelect = () => {
    setSelectUl(true)
  }

  const handleSearchValue = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectUl(false)
    setSerachSelect(e.currentTarget.innerText)
  }

  const handleOpenUserUl = () => {
    setUserUlList(!userUlList)
  }

  const handleLogout = () => {
    setToken(false)
  }

  const handleLogin = () => {
    setShowLoginModal(true)
    const modalBack = document.querySelector('#modalBackdrop') as HTMLElement
    modalBack.style.display = 'block'
  }

  return (
    <HeaderSection>
      <LogoBox>
        <SlCompass />
        <LogoText>Compass</LogoText>
      </LogoBox>
      <SearchBox>
        <SearchSelect onClick={handleSearchSelect}>{searchSelect}</SearchSelect>
        {selectUl && (
          <SearchUl>
            <SearchLi onClick={handleSearchValue} value='title'>
              제목
            </SearchLi>
            <SearchLi onClick={handleSearchValue} value='detail'>
              내용
            </SearchLi>
            <SearchLi onClick={handleSearchValue} value='hashtag'>
              해시태그
            </SearchLi>
          </SearchUl>
        )}
        <Bar />
        <Search />
        <SearchButton>
          <GoSearch />
        </SearchButton>
      </SearchBox>
      {!token ? (
        <LoginText onClick={handleLogin}>로그인</LoginText>
      ) : (
        <LoginBox>
          <NotificationsLink to='/notifications'>
            <AiOutlineBell />
            <Count>10</Count>
          </NotificationsLink>
          <UserButton onClick={handleOpenUserUl}>
            <RxHamburgerMenu />
            <UserImg src='https://a0.muscache.com/defaults/user_pic-36x36.png?im_w=240' alt='userImg' />
            {userUlList && (
              <UserUl>
                <UserLiLink to='PostWrite'>글쓰기</UserLiLink>
                <UserLiLink to='Message'>메시지함</UserLiLink>
                <UserLiLink to='MyPage'>마이페이지</UserLiLink>
                <UserLiButton>회원정보 수정</UserLiButton>
                <UserLiButton onClick={handleLogout}>로그아웃</UserLiButton>
              </UserUl>
            )}
          </UserButton>
        </LoginBox>
      )}
      <Login show={showLoginModal} />
    </HeaderSection>
  )
}

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  border-bottom: 1px solid #d0d0d0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  color: #1877f2;
  font-weight: 600;
  svg {
    font-size: 2rem;
  }
`

const LogoText = styled.span`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`

const SearchBox = styled.div`
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  border: 1px solid #c0c0c0;
  border-radius: 2rem;
  box-shadow: 0px 1px 1px 1px #dbdbdb;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 1px 2px 2px #dbdbdb;
  }

  &:focus {
    box-shadow: 0px 1px 2px 2px #dbdbdb;
  }
`

const SearchSelect = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  min-width: 4rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
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

const SearchUl = styled.ul`
  position: absolute;
  top: 2rem;
  left: 0.6rem;
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

const SearchLi = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
`

const Bar = styled.span`
  width: 1px;
  height: 2rem;
  background: #c0c0c0;
  margin: 0 0.7rem;
`

const Search = styled.input`
  border: none;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 50%;
  border: none;
  background-color: #1877f2;
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 1rem;
  }
`
const LoginText = styled.span`
  cursor: pointer;
  min-width: 9rem;
  text-align: right;
`

const LoginBox = styled.div`
  display: flex;
  align-items: center;
`

const NotificationsLink = styled(Link)`
  position: relative;
  margin-right: 1rem;
  border-radius: 1rem;
  padding: 0.2rem;
  transition: background-color 0.3s ease-in-out;
  color: #1877f2;
  svg {
    font-size: 2rem;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`

const Count = styled.span`
  position: absolute;
  background: #ff385c;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.2rem;
  border-radius: 50%;
  right: -2px;
  top: -3px;
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
