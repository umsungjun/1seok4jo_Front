import styled from 'styled-components'
import {AiOutlineClose} from 'react-icons/ai'
import {useRef, useState} from 'react'
import {fetchEditPassWordApi} from '../Service/userService'
import {useCookies} from 'react-cookie'

interface ChangePasswordModalProps {
  show: boolean
  setChangePassword: (value: boolean) => void
}

export default function ChangePassword({show, setChangePassword}: ChangePasswordModalProps) {
  const [text, SetText] = useState('Compass에 오신 것을 환영합니다.')
  const [cookies, setCookie] = useCookies(['token'])
  const currentPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const token = cookies.token
  const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    console.log('현재 비밀번호 ', currentPasswordRef.current?.value as string)
    console.log('새 비밀번호', newPasswordRef.current?.value as string)
    const password = currentPasswordRef.current?.value as string
    const newPassword = newPasswordRef.current?.value as string
    fetchEditPassWordApi(password, newPassword, token)
  }

  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        <ModalCloseTitleBox>
          <CloseIcon onClick={() => setChangePassword(false)} />
          <ModalTitle>비밀번호 변경</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <Text>{text}</Text>
        <InputGroupJoin>
          <Input type='password' placeholder='현재 비밀번호' required ref={currentPasswordRef} />
          <Input type='password' placeholder='새 비밀번호' required ref={newPasswordRef} />
          <Input type='password' placeholder='새 비밀번호 확인' required />
        </InputGroupJoin>
        <FindPassButton onClick={e => handleChangePassword(e)}>비밀번호 변경</FindPassButton>
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
const InputGroupJoin = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 2rem;
  input:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
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

const FindPass = styled.button`
  margin-left: auto;
  margin-right: 3.5rem;
  border: none;
  background: none;
  cursor: pointer;
`

const FindPassButton = styled.button`
  margin-top: 2rem;
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
