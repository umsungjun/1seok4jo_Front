import React, {useRef, useState} from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {fetchMailPassWordApi, fetchInitPassWordApi} from '../Service/userService'
import {darkTheme, lightTheme} from '../Theme/theme'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'

interface FindPasswordProps {
  show: boolean
  setFindPassForm: (value: boolean) => void
}

export default function FindPassword({show, setFindPassForm}: FindPasswordProps) {
  const theme = useSelector((state: RootState) => state.themeType.theme)
  const [emailMent, setEmailMent] = useState('# 가입된 이메일 정보를 입력해주세요.')
  const [afterEmailMent, setAfterEmailMent] = useState('# 인증번호와 새로운 비밀번호를 기입해주세요.')

  const emailSubmitButtonRef = useRef<HTMLButtonElement>(null)
  const mailRef = useRef<HTMLInputElement>(null)

  const uuidRef = useRef<HTMLInputElement>(null)
  const newPassword1Ref = useRef<HTMLInputElement>(null)
  const newPassword2Ref = useRef<HTMLInputElement>(null)

  const handleInitMail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const mail = mailRef.current?.value as string

    if (!mailRef.current || mailRef.current.value === '') return

    emailSubmitButtonRef.current?.style &&
      ((mailRef.current.style.color = '#c0c0c0'),
      (emailSubmitButtonRef.current.style.background = '#c0c0c0'),
      (emailSubmitButtonRef.current.style.cursor = 'context-menu'))

    setEmailMent('# 기입된 메일정보로 메일이 발송되었습니다.')

    try {
      await fetchMailPassWordApi(mail)
    } catch (error) {
      setEmailMent('# 잘못된 메일형식이거나 존재하지않는 회원입니다.')
    }
  }

  const handleInitPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const mail = mailRef.current?.value as string
    const uuid = uuidRef.current?.value as string
    const newPassword1 = newPassword1Ref.current?.value as string
    const newPassword2 = newPassword2Ref.current?.value as string

    if (!uuid || !newPassword1 || !newPassword2) {
      setAfterEmailMent('# 모든 정보를 기입해주세요.')
      return
    }

    if (newPassword1 !== newPassword2) {
      setAfterEmailMent('# 비밀번호가 일치하지 않습니다.')
      return
    }
    fetchInitPassWordApi(mail, uuid, newPassword1)
    setFindPassForm(false)

    setEmailMent('# 가입된 이메일 정보를 입력해주세요.')
    setAfterEmailMent('# 인증번호와 새로운 비밀번호를 기입해주세요.')
    if (uuidRef.current !== null) {
      uuidRef.current.value = ''
    }
    if (newPassword1Ref.current !== null) {
      newPassword1Ref.current.value = ''
    }
    if (newPassword2Ref.current !== null) {
      newPassword2Ref.current.value = ''
    }
    if (mailRef.current !== null) {
      mailRef.current.style.color = '#black'
      mailRef.current.value = ''
    }
    if (emailSubmitButtonRef.current) {
      emailSubmitButtonRef.current.style.background = '#1652fe'
    }
  }

  return (
    <ModalBackdrop show={show}>
      <ModalContent theme={theme}>
        <ModalCloseTitleBox>
          <CloseIcon
            theme={theme}
            onClick={() => {
              if (mailRef.current) {
                mailRef.current.value = '' // set to empty string
                mailRef.current.style.color = 'black' // set to black color
              }
              emailSubmitButtonRef.current?.style &&
                ((emailSubmitButtonRef.current.style.background = '#1877fe'),
                (emailSubmitButtonRef.current.style.cursor = 'pointer'))
              setEmailMent('# 가입된 이메일 정보를 입력해주세요.')
              setFindPassForm(false)
            }}
          />
          <ModalTitle>비밀번호 찾기</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <EmailMent>{emailMent}</EmailMent>
        <MailInputBox>
          <MailInput
            type='email'
            pattern='[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.]+[a-zA-Z]+[.]*[a-zA-Z]*'
            placeholder='이메일을 입력하세요.'
            required
            ref={mailRef}
          />
          <EmailSubmitButton ref={emailSubmitButtonRef} onClick={e => handleInitMail(e)}>
            전송
          </EmailSubmitButton>
        </MailInputBox>
        <AfterEmailMent>{afterEmailMent}</AfterEmailMent>
        <InputGroup>
          <Input type='text' placeholder='인증번호' required ref={uuidRef} />
          <Input type='password' placeholder='새로운 비밀 번호' required ref={newPassword1Ref} />
          <Input type='password' placeholder='비밀 번호 확인' required ref={newPassword2Ref} />
        </InputGroup>
        <SubmitButton onClick={e => handleInitPassword(e)}>비밀번호 재 설정</SubmitButton>
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

  @media (max-width: 576px) {
    width: 30rem;
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

const Line = styled.hr`
  background: #f0f0f0;
  height: 1px;
  width: 100%;
  border: 0px;
  margin: 0;
`

const EmailMent = styled.h2`
  font-size: 1.3rem;
  margin-top: 2rem;
`

const MailInputBox = styled.div`
  margin-top: 2rem;
  position: relative;
`

const MailInput = styled.input`
  font-size: 1.3rem;
  width: 17rem;
  padding: 0.3rem 4rem 0.3rem 1rem;
  border: 1px solid #c0c0c0;
  border-radius: 1rem;
  &:focus {
    outline: none;
  }
`

const EmailSubmitButton = styled.button`
  position: absolute;
  right: -0.5px;
  top: 1px;
  height: 95%;
  width: 4rem;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  color: #fff;
  background: #1877f2;
`
const InputGroup = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 80%;
  input:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  input:nth-child(2) {
    border-top: none;
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

const AfterEmailMent = styled.h2`
  font-size: 1.3rem;
  margin-top: 2rem;
`
const SubmitButton = styled.button`
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
