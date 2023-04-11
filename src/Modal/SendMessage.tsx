import React from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

interface SendMessageProps {
  show: boolean
  setShowMessageModal: (value: boolean) => void
}

export default function SendMessage({show, setShowMessageModal}: SendMessageProps) {
  const navigate = useNavigate()
  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/message')
  }

  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        <ModalCloseTitleBox>
          <CloseIcon onClick={() => setShowMessageModal(false)} />
          <ModalTitle>메시지 하기</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <MessageMent># 메시지를 시작하는 첫 마디를 입력해주세요.</MessageMent>
        <MessageInputBox>
          <MessageInput type='text' required placeholder='메시지를 전송하면 채팅방이 생성됩니다.' />
          <MessageSubmitButton onClick={handleSendMessage}>전송</MessageSubmitButton>
        </MessageInputBox>
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
  height: 17rem;
  z-index: 1000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.3s ease-in-out;
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

const MessageMent = styled.h2`
  font-size: 1.3rem;
  margin-top: 1rem;
`

const MessageInputBox = styled.div`
  margin-top: 2rem;
  position: relative;
`

const MessageInput = styled.input`
  font-size: 1.3rem;
  width: 20rem;
  padding: 0.3rem 4rem 0.3rem 1rem;
  border: 1px solid #c0c0c0;
  border-radius: 1rem;
  &:focus {
    outline: none;
  }
`

const MessageSubmitButton = styled.button`
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
