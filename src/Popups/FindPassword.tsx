import React, {useRef} from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'

interface FindPasswordProps {
  show: boolean
  setFindPassForm: (value: boolean) => void
}

export default function FindPassword({show, setFindPassForm}: FindPasswordProps) {
  const emailSubmitButtonRef = useRef<HTMLButtonElement>(null)
  const mailRef = useRef<HTMLInputElement>(null)
  const handleInitMail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (mailRef.current?.value === null) return

    emailSubmitButtonRef.current?.style &&
      ((emailSubmitButtonRef.current.style.background = '#c0c0c0'),
      (emailSubmitButtonRef.current.style.cursor = 'context-menu'))
    // fetchMailPassWordApi()
  }

  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        <ModalCloseTitleBox>
          <CloseIcon onClick={() => setFindPassForm(false)} />
          <ModalTitle>비밀번호 찾기</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <EmailMent># 가입된 이메일 정보를 입력해주세요.</EmailMent>
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
  background-color: #fff;
  width: 35rem;
  height: 30rem;
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
    background-color: #f7f7f7;
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
  margin-bottom: 2rem;
`

const EmailMent = styled.h2`
  font-size: 1.3rem;
  margin-top: 1rem;
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
