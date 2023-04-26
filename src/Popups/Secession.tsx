import React from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'

interface SecessionModalProps {
  show: boolean
  setSecession: (value: boolean) => void
}

export default function Secession({show, setSecession}: SecessionModalProps) {
  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        <ModalCloseTitleBox>
          <CloseIcon onClick={() => setSecession(false)} />
          <ModalTitle>회월 탈퇴</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <Text>#주의 및 약관사항</Text>
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
  height: 33rem;
  z-index: 1000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 576px) {
    width: 30rem;
  }

  transition: all 0.3s ease-in-out;
`
const ModalCloseTitleBox = styled.div`
  padding: 1rem;
`

const ModalTitle = styled.h1`
  font-size: 1.5rem;
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

const Line = styled.hr`
  background: #f0f0f0;
  height: 1px;
  width: 100%;
  border: 0px;
  margin: 0;
  margin-bottom: 2rem;
`
const Text = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 3rem;
`
