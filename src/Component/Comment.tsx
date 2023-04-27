import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import sangchu from '../Assets/sangchu.png'
import type {ChatBubbleProps} from '../Interface/interface'
import type {CommentProps} from '../Interface/interface'

const Comment: React.FC<CommentProps> = () => {
  const [newCommentText, setNewCommentText] = useState<string>('')
  const [comments, setComments] = useState<ChatBubbleProps[]>([])

  const handleNewCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('inputValue', newCommentText)
    const newComment: ChatBubbleProps = {
      text: newCommentText,
      createdAt: new Date(),
    }

    setComments([...comments, newComment])
    setNewCommentText('')
    // if (file) {
    //   // file을 서버로 업로드하는 코드 나중에 작성
    // }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(e.target.value)
  }

  // 인풋빈값일때 전송버튼 disabled
  const isInputEmpty = newCommentText.trim() === ''

  return (
    <ChatContainer>
      <ChatBox>
        {comments.map((comment, index) => (
          <NewChat key={index}>
            <div className='date'>
              {comments.createdAt.toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </div>
            {/* <h1>{user}</h1> */}
            <div className='new-text'>{comments.content}</div>
            <img src={sangchu} alt='유저프로필' />
            {/* <p>Chat room id: {id}</p>s */}
          </NewChat>
        ))}
      </ChatBox>

      <ChatForm onSubmit={handleNewCommentSubmit}>
        <input type='text' value={newCommentText} onChange={handleChange} />
        <button type='submit' disabled={isInputEmpty}>
          전송
        </button>
      </ChatForm>
    </ChatContainer>
  )
}
export default Comment

const ChatContainer = styled.section`
  width: 80%;
  height: 100%;
  @media (max-width: 576px) {
    width: 90%;
    height: 85vh;
    position: absolute;
    top: 12.5%;
    left: 5%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 1rem 0.5rem;
  }
`
const ChatBox = styled.div`
  height: 90%;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0.625rem;
    height: 0.3125rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
  img {
    width: 3rem;
    height: 3rem;
    @media (max-width: 576px) {
      width: 4rem;
      height: 4rem;
    }
  }
`
const ChatForm = styled.form`
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 10%;
  @media (max-width: 576px) {
    position: absolute;
    bottom: 0;
    height: 12%;
    justify-content: space-evenly;
    width: 98%;
  }
  label {
    cursor: pointer;
    color: #c0c0c0;
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
    border: 2px solid #f0f0f0;
    &:focus {
      outline: none;
      border: 2px solid #c0c0c0;
    }
    @media (max-width: 576px) {
      width: 70%;
      height: 3rem;
    }
  }
  button {
    width: 10%;
    height: 3rem;
    color: #fff;
    font-size: 1.2rem;
    background-color: #1877f2;
    border: transparent;
    border-radius: 1rem;
    cursor: pointer;
    :disabled {
      background-color: #c0c0c0;
      color: #fff;
      cursor: not-allowed;
    }
  }
`

const NewChat = styled.div`
  display: flex;
  padding: 2rem;
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
  .date {
    margin-left: auto;
    margin-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    @media (max-width: 576px) {
      width: 35%;
    }
  }
  .new-text {
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
    color: #fff;
    overflow-wrap: anywhere;
  }
  img {
    border-radius: 5rem;
    margin-left: 1rem;
  }
`
