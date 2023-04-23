import {useState} from 'react'

import styled, {keyframes} from 'styled-components'
import {users} from '../Mock/users'
import SendMessage from '../Modal/SendMessage'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'

export default function MyPageBanner() {
  const user = useSelector((state: RootState) => state.user)
  console.log(user)

  const [showMessageModal, setShowMessageModal] = useState<boolean>(false)

  const {email, password, nickName, myPage} = users[0]
  const logined = false

  return (
    <Section>
      {logined ? (
        <ProfileWrapper background={myPage.background}>
          <ProfileImg src={myPage.profile} />
          <Name>{nickName}</Name>
          <Text>{myPage.ment}</Text>
        </ProfileWrapper>
      ) : (
        <ProfileWrapper background={myPage.background}>
          <ProfileImg src={myPage.profile} />
          <Name>{user.nickName}</Name>
          <Text>안녕하세요 저는 바다를 좋아하는 여행가 입니다!</Text>
          <MessageButton onClick={() => setShowMessageModal(true)}>메세지 하기</MessageButton>{' '}
          {/* onMouseEnter={handleEditOn} */}
        </ProfileWrapper>
      )}
      <SendMessage show={showMessageModal} setShowMessageModal={setShowMessageModal} />
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  width: 89%;
  flex-direction: column;
  padding-top: 6rem;
`

interface ProfileWrapperProps {
  background: string
}

const ProfileWrapper = styled.div<ProfileWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  box-sizing: border-box;
  width: 100%;
  height: 30rem;
  background-image: url(${props => props.background});
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
