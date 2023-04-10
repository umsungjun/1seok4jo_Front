import React, {useState} from 'react'
import styled from 'styled-components'

interface ChatBubbleProps {
  text: string
}

const ChatBubble: React.FC<ChatBubbleProps> = ({text}) => {
  return <div>{text}</div>
}

interface Props {}

const Chat: React.FC<Props> = () => {
  const [inputValue, setInputValue] = useState('')
  const [chatHistory, setChatHistory] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('inputValue', inputValue)
    setChatHistory([...chatHistory, inputValue])
    setInputValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <section>
      <ChatBox>
        {chatHistory.map((chat, index) => (
          <ChatBubble key={index} text={chat} />
        ))}
      </ChatBox>

      <ChatForm onSubmit={handleSubmit}>
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
`
