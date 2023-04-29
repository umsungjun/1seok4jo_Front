import React, {useRef, useState} from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {fetchDeleteUserApi} from '../Service/userService'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

interface SecessionModalProps {
  show: boolean
  setSecession: (value: boolean) => void
}

export default function Secession({show, setSecession}: SecessionModalProps) {
  const [cookies, setCookie] = useCookies(['token'])
  const token = cookies.token
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const secessionButtonRef = useRef<HTMLButtonElement>(null)
  const checkRef = useRef<HTMLInputElement>(null)

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.checked)

    if (e.target.checked && secessionButtonRef.current !== null) {
      setChecked(true)
    } else if (secessionButtonRef.current !== null) {
      setChecked(false)
    }
  }

  const handleSecession = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (checkRef.current === null || !checkRef.current.checked) return

    try {
      await fetchDeleteUserApi(token)
      setCookie('token', '', {expires: new Date(0)})
      localStorage.setItem(
        'USER',
        JSON.stringify({
          accessToken: '',
          bannerUrl: '',
          email: '',
          introduction: '',
          nickName: '',
          profileUrl: '',
          userId: 0,
        }),
      )
      alert('회원 탈퇴가 정상적으로 완료되었습니다.')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        <ModalCloseTitleBox>
          <CloseIcon onClick={() => setSecession(false)} />
          <ModalTitle>회월 탈퇴</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <Title># 주의 및 약관사항</Title>
        <TextBox>
          <Checkbox type='checkbox' ref={checkRef} onChange={e => handleCheck(e)} />
          <Text>탈퇴 후에는 해당 아이디로 다시 가입할 수 없으며, 아이디와 데이터는 복구 할 수 없습니다.</Text>
        </TextBox>
        <SecessionButton onClick={e => handleSecession(e)} ref={secessionButtonRef} checked={checked}>
          탈퇴 하기
        </SecessionButton>
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
  height: 18rem;
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
const Title = styled.h2`
  width: 85%;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 3rem;
`

const TextBox = styled.div`
  width: 85%;
  display: flex;
`

const Checkbox = styled.input`
  scale: 1.5;
  margin-right: 1rem;
`
const Text = styled.span`
  font-size: 1.2rem;
`

interface ButtonProps {
  checked?: boolean
}

const SecessionButton = styled.button<ButtonProps>`
  margin-left: auto;
  margin-top: 2rem;
  margin-right: 1rem;
  padding: 0.5rem 1.3rem;
  font-size: 1.2rem;
  cursor: pointer;
  ${props => (props.checked ? 'color:red ;' : 'color: #fff;')}
  ${props => (props.checked ? 'background: #fff;' : 'background: #c0c0c0;')}
  ${props => (props.checked ? 'border: 1px solid red;' : 'border: none;')}
  
  border-radius: 0.5rem;
  margin-right: 1rem;

  &:hover {
    background: #fff;
    color: red;
  }
`
