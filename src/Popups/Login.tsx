import React, {useRef, useState} from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {ImBubble} from 'react-icons/im'
import {TbSlash} from 'react-icons/tb'
import {fetchJoinApi} from '../Service/joinService'
import {fetchLoginApi} from '../Service/loginService'
import {useCookies} from 'react-cookie'
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from '../Store/user'
import {RootState} from '../Store'
import {darkTheme, lightTheme} from '../Theme/theme'

interface PaymentModalProps {
  show: boolean
  setShowLoginModal: (value: boolean) => void
}

export default function Login({show, setShowLoginModal}: PaymentModalProps) {
  const theme = useSelector((state: RootState) => state.themeType.theme)
  const userDispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['token'])
  const [joinForm, setJoinForm] = useState(false)
  const [joinWelcomeText, setJoinWelcomeText] = useState('Compass에 오신 것을 환영합니다.')
  const [loginWelcomeText, setLoginWelcomeText] = useState('Compass에 오신 것을 환영합니다.')

  const loginEmailRef = useRef<HTMLInputElement>(null)
  const loginPasswordRef = useRef<HTMLInputElement>(null)

  const joinWelcomeTextRef = useRef<HTMLDivElement>(null)
  const joinEmailRef = useRef<HTMLInputElement>(null)
  const joinPasswordRef = useRef<HTMLInputElement>(null)
  const joinPassword2Ref = useRef<HTMLInputElement>(null)
  const joinNickNameRef = useRef<HTMLInputElement>(null)

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('이메일 : ', loginEmailRef.current?.value)
    console.log('비밀번호 : ', loginPasswordRef.current?.value)
    const loginEmail = loginEmailRef.current?.value as string
    const loginPassword = loginPasswordRef.current?.value as string

    if (loginEmail === '' || loginPassword === '') {
      setLoginWelcomeText('로그인 정보를 다시 기입하여 주십시오.')
      return
    }

    try {
      const loginResult = await fetchLoginApi(loginEmail, loginPassword)
      setCookie('token', `bearer ${loginResult.accessToken}`)
      userDispatch(setUser(loginResult))
      setShowLoginModal(false)
    } catch (error) {
      console.log(error)
      setLoginWelcomeText('로그인 정보가 일치하지 않습니다.')
    }
  }

  const handleJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (
      (joinEmailRef.current?.value as string) === '' ||
      (joinPasswordRef.current?.value as string) === '' ||
      (joinPassword2Ref.current?.value as string) === '' ||
      (joinNickNameRef.current?.value as string) === ''
    ) {
      setJoinWelcomeText('회원 정보를 모두 기입하여 주십시오.')
      return
    }

    if (joinPasswordRef.current?.value !== joinPassword2Ref.current?.value) {
      setJoinWelcomeText('비밀번호가 일치하지 않습니다.')
      return
    }

    console.log('이메일 : ', typeof joinEmailRef.current?.value)
    console.log('비밀번호 : ', typeof joinPasswordRef.current?.value)
    console.log('닉네임 : ', typeof joinNickNameRef.current?.value)

    fetchJoinApi(
      joinEmailRef.current?.value as string,
      joinPasswordRef.current?.value as string,
      joinNickNameRef.current?.value as string,
    )
    setJoinForm(false)
    setShowLoginModal(false)
  }

  return (
    <ModalBackdrop show={show}>
      <ModalContent theme={theme}>
        {joinForm ? (
          <>
            <ModalCloseTitleBox>
              <CloseIcon
                theme={theme}
                onClick={() => {
                  setShowLoginModal(false), setJoinForm(false)
                }}
              />
              <ModalTitle>회원가입</ModalTitle>
            </ModalCloseTitleBox>
            <Line theme={theme} />
            <WelcomeText ref={joinWelcomeTextRef}>{joinWelcomeText}</WelcomeText>
            <InputGroupJoin>
              <Input
                type='email'
                pattern='[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
                placeholder='이메일'
                required
                ref={joinEmailRef}
              />
              <Input type='password' placeholder='비밀 번호' required ref={joinPasswordRef} />
              <Input type='password' placeholder='비밀 번호 확인' required ref={joinPassword2Ref} />
              <Input type='text' placeholder='닉네임' required ref={joinNickNameRef} />
            </InputGroupJoin>
            <LoginButton onClick={e => handleJoin(e)}>회원가입</LoginButton>
          </>
        ) : (
          <>
            <ModalCloseTitleBox>
              <CloseIcon
                theme={theme}
                onClick={() => {
                  setShowLoginModal(false), setJoinForm(false)
                }}
              />
              <ModalTitle>로그인</ModalTitle>
            </ModalCloseTitleBox>
            <Line theme={theme} />
            <WelcomeText>{loginWelcomeText}</WelcomeText>
            <InputGroup>
              <Input
                type='email'
                pattern='[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
                placeholder='이메일'
                required
                ref={loginEmailRef}
              />
              <Input type='password' placeholder='비밀 번호' required ref={loginPasswordRef} />
            </InputGroup>
            <JoinFindPassBox>
              <JoinFindPassButton theme={theme} onClick={() => setJoinForm(true)}>
                회원가입
              </JoinFindPassButton>
              <TbSlash />
              <JoinFindPassButton theme={theme}>비밀번호 찾기</JoinFindPassButton>
            </JoinFindPassBox>
            <LoginButton onClick={e => handleLogin(e)}>로그인</LoginButton>
            <Hrspan>또는</Hrspan>
            <KaKaoLoginButton>
              <ImBubble />
              카카오 로그인
            </KaKaoLoginButton>
          </>
        )}
      </ModalContent>
    </ModalBackdrop>
  )
}

interface ModalProps {
  show: boolean
}

const ModalBackdrop = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(122 122 122 / 20%);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 999;
`

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${props => (props.theme === 'light' ? lightTheme.background : darkTheme.background)}
  ${props => (props.theme === 'light' ? '' : darkTheme.whiteColor)}
  width: 35rem;
  height: 33rem;
  z-index: 1000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.3s ease-in-out;

  @media (max-width: 567px) {
    width: 30rem;
    height: 33rem;
  }
`

const CloseIcon = styled(AiOutlineClose)`
  font-size: 1.5rem;
  position: absolute;
  left: 1rem;
  top: 0.6rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    ${props => (props.theme === 'light' ? lightTheme.hoverBackground : darkTheme.hoverBackground)}
  }
`

const ModalCloseTitleBox = styled.div`
  padding: 1rem;
`

const ModalTitle = styled.h1`
  font-size: 1.5rem;
`

const InputGroup = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  input:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  input:last-child {
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
  }
`

const InputGroupJoin = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 2rem;
  input:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: none;
  }
  input:nth-child(2) {
    border-bottom: none;
  }

  input:last-child {
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
  }
`
const Input = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0 1rem;
  font-size: 1.3rem;
  box-sizing: border-box;
  border: 1px solid #c0c0c0;
  &:focus {
    outline: none;
  }
`

const JoinFindPassBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  align-items: center;
`

const JoinFindPassButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  ${props => (props.theme === 'light' ? '' : darkTheme.whiteColor)}
`

const Line = styled.hr`
  ${props => (props.theme === 'light' ? 'background: #f0f0f0;' : 'background: #7a7a7a;')}
  height: 1px;
  width: 100%;
  border: 0px;
  margin: 0;
  margin-bottom: 2rem;
`

const WelcomeText = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 3rem;
`

const LoginButton = styled.button`
  margin-top: 1rem;
  width: 80%;
  height: 3rem;
  background: #1877f2;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0.5rem;
`

const Hrspan = styled.span`
  position: relative;
  width: 80%;
  text-align: center;
  color: #7a7a7a;
  margin: 2rem 0;
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 50%;
    width: 45%;
    height: 1px;
    background-color: #7a7a7a;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`

const KaKaoLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 3rem;
  background: #fee500;
  border: none;
  color: #3c1e1e;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0.5rem;
  svg {
    margin-right: 1rem;
  }
`
