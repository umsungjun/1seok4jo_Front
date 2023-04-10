import React, {useState} from 'react'
import MyPageBanner from '../Common/MyPageBanner'
import styled from 'styled-components'

import ChangePassword from '../Popups/ChangePassword'

import {users} from '../Mock/users'

export default function ProfileEditPage() {
  const {email, password, nickName, myPage} = users[0]

  const [changePassword, setChangePassword] = useState<boolean>(false)
  const [profilePreview, setProfilePreview] = useState<string>(myPage.profile)

  const handlePasswordChange = (e: React.MouseEvent) => {
    e.preventDefault()
    setChangePassword(true)
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setProfilePreview(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <MyPageBanner />
      <PageTitle>회원정보 수정</PageTitle>
      <EditForm>
        <Content>
          <Title># 이메일</Title>
          <Input value={email} type='email' readOnly />
        </Content>
        <Content>
          <Title># 비밀번호</Title>
          <Input type='password' />
          <PassWordChange onClick={e => handlePasswordChange(e)}>*비밀번호 변경</PassWordChange>
        </Content>
        <Content>
          <Title># 닉네임</Title>
          <Input value={nickName} type='text' readOnly />
        </Content>
        <Content>
          <Title># 나를 소개하는 한 줄</Title>
          <Input type='text' maxLength={40} placeholder='나를 소개하는 한줄을 작성해주세요.(최대 40자)' />
        </Content>
        <Content>
          <Title># 프로필 이미지</Title>
          <ProfileImgBox>
            <ProfileImg src={profilePreview} alt='Preview' />
            <ProfileImgLabel htmlFor='profileImg'>이미지 선택</ProfileImgLabel>
            <InputImg id='profileImg' type='file' accept='.jpg, .jpeg, .png' onChange={handleProfileImageChange} />
          </ProfileImgBox>
        </Content>
      </EditForm>
      <ChangePassword show={changePassword} setChangePassword={setChangePassword} />
    </>
  )
}

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-top: 4rem;
  text-align: center;
`
const EditForm = styled.form`
  width: 92%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: rgb(247, 247, 247);
  margin-top: 2rem;
  border-radius: 1rem;
  padding: 0 2rem 2rem 2rem;
  box-sizing: border-box;
  margin-bottom: 4rem;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-right: 2rem;
  width: 15rem;
`

const Input = styled.input`
  font-size: 1.3rem;
  width: 30rem;
  border: none;
  padding: 0.8rem 0.8rem 0.8rem 1.3rem;
  border-radius: 1.5rem;
  &:focus {
    outline: none;
  }
`
const PassWordChange = styled.button`
  margin-left: 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background: inherit;
  cursor: pointer;

  &:hover {
    color: #1877f2;
  }
`

const ProfileImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
`

const InputImg = styled.input`
  display: none;
`

const ProfileImgLabel = styled.label`
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 1.5rem;

  &:hover {
    color: #1877f2;
  }
`
