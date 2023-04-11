import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import {ImAttachment} from 'react-icons/im'
import type {ChatBubbleProps} from '../Interface/interface'
import type {Props} from '../Interface/interface'

const ChatBubble: React.FC<ChatBubbleProps> = ({text}) => {
  return <div>{text}</div>
}

const Chat: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState('')
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('inputValue', inputValue)
    setChatHistory([...chatHistory, inputValue])
    setInputValue('')
    // if (file) {
    //   // file을 서버로 업로드하는 코드 작성
    // }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // 파일 업로드
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
    console.log(files)
  }

  return (
    <section>
      <ChatBox>
        {chatHistory.map((chat, index) => (
          <ChatBubble key={index} text={chat} />
        ))}
      </ChatBox>

      <ChatForm onSubmit={handleSubmit}>
        <label onClick={handleUpload} htmlFor='fileInput'>
          <ImAttachment />
        </label>
        <input type='file' id='fileInput' onChange={handleFileInputChange} style={{display: 'none'}} />

        <input type='text' value={inputValue} onChange={handleChange} />
        <button type='submit'>전송</button>
      </ChatForm>
    </section>
  )
}
export default Chat

const ChatBox = styled.div`
  width: 100%;
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 2rem;
  margin-bottom: 3rem;

  div {
    position: relative;
    width: 20rem;
    height: auto;
    padding: 1rem;
    border-radius: 10px;
    background-color: #1877f2;
    border: transparent;
    font-size: 1.2rem;
    line-height: 1.5;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-bottom: 1rem;
    color: #fff;
  }
`

const ChatForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-around;
  label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  input {
    width: 80%;
    height: 3rem;
    border-radius: 1rem;
    text-indent: 1.2rem;
    font-size: 1.2rem;
  }
  button {
    width: 10%;
    height: 3rem;
    color: #fff;
    font-size: 1.2rem;
    background-color: #1877f2;
    border: transparent;
    border-radius: 1rem;
  }
`
