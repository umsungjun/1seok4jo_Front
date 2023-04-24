import {useState} from 'react'

import styled, {keyframes} from 'styled-components'
import SendMessage from '../Modal/SendMessage'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import {basicUser} from '../Mock/users'

export default function MyPageBanner() {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const [showMessageModal, setShowMessageModal] = useState<boolean>(false)
  const [token, setToken] = useCookies(['token'])

  return (
    <Section>
      {Object.keys(token).length === 0 ? (
        <ProfileWrapper background={user.bannerUrl}>
          <ProfileImg src={user.profileUrl} />
          <Name>{user.nickName}</Name>
          <Text>{user.introduction}</Text>
          <MessageButton onClick={() => setShowMessageModal(true)}>메세지 하기</MessageButton>
          {/* onMouseEnter={handleEditOn} */}
        </ProfileWrapper>
      ) : (
        <ProfileWrapper background={user.bannerUrl === null ? basicUser.background : user.bannerUrl}>
          <ProfileImg src={user.profileUrl === null ? basicUser.profile : user.profileUrl} />
          <Name>{user.nickName}</Name>
          <Text>{user.introduction === null ? '나를 소개하는 한문장을 등록해주세요.' : user.introduction}</Text>
          <GoEditProfile onClick={() => navigate('/ProfileEdit')}>회원정보 수정</GoEditProfile>
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
const GoEditProfile = styled.button`
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
