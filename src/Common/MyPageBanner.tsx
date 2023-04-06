import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'

export default function MyPageBanner() {
  const [editUl, setEditUl] = useState(false)
  const logined = true

  const handleEditOn = () => {
    setEditUl(true)
  }

  const handleEditOff = () => {
    setEditUl(false)
  }

  return (
    <Section>
      {logined ? (
        <ProfileWrapper>
          <ProfileImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVFUA_3HIX1imDdXcf51nRNyibm6cxC1FXw&usqp=CAU' />
          <Name>KiKI</Name>
          <Text>안녕하세요 저는 바다를 좋아하는 여행가 입니다!</Text>
          <EditButton onMouseEnter={handleEditOn}>편집하기</EditButton>
          {editUl && (
            <EditUl onMouseLeave={handleEditOff}>
              <EditLi value='title'>프로필</EditLi>
              <EditLi value='detail'>배경</EditLi>
            </EditUl>
          )}
        </ProfileWrapper>
      ) : (
        <ProfileWrapper>
          <ProfileImg src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVFUA_3HIX1imDdXcf51nRNyibm6cxC1FXw&usqp=CAU' />
          <Name>KiKI</Name>
          <Text>안녕하세요 저는 바다를 좋아하는 여행가 입니다!</Text>
          <MessageButton onMouseEnter={handleEditOn}>메세지 하기</MessageButton>
        </ProfileWrapper>
      )}
    </Section>
  )
}

const Section = styled.section`
  padding: 7rem 5rem;
  display: flex;
  flex-direction: column;
`

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  box-sizing: border-box;
  width: 100%;
  height: 30rem;
  background-image: url('https://blog.kakaocdn.net/dn/d2gF6H/btqXTm0xV6r/RoCwErZI7yKZYRbybrAouk/img.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  box-shadow: 0px 5px 5px 1px rgb(247, 247, 247);
`

const ProfileImg = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const Name = styled.span`
  font-size: 1.8rem;
  margin-top: 1rem;
`

const Text = styled.span`
  font-size: 1.4rem;
  margin-top: 2rem;
`

const EditButton = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background: #fff;
  opacity: 1;
  transition: opacity ease-in 0.2s;
`

const MessageButton = styled.button`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  background: #fff;
  opacity: 1;
  transition: opacity ease-in 0.2s;
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

const EditUl = styled.ul`
  position: absolute;
  right: 2rem;
  bottom: 5rem;
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

const EditLi = styled.li`
  width: 4rem;
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`
