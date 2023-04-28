import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import sangchu from '../Assets/sangchu.png'
import type {CommentBubbleProps} from '../Interface/interface'
import type {CommentProps} from '../Interface/interface'
import axios from 'axios'

const Comment: React.FC<CommentProps> = () => {
  const [newCommentText, setNewCommentText] = useState<string>('')
  const [comments, setComments] = useState<CommentBubbleProps[]>([])

  const handleNewCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('inputValue', newCommentText)
    const newComment: CommentBubbleProps = {
      content: newCommentText,
      createdAt: new Date().toISOString(),
      commentId: 0,
      userId: 0,
      nickname: '',
      imageUrl: [],
      updatedAt: '',
    }
    setComments([...comments, newComment])
    setNewCommentText('')
    //     try {
    //       const response = await fetch('/comments', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newComment),
    //       })
    //
    //       if (response.ok) {
    //         // The comment was successfully added to the server.
    //         setComments([...comments, newComment])
    //         setNewCommentText('')
    //       } else {
    //         console.error('Failed to add comment to server.')
    //       }
    //     } catch (error) {
    //       console.error('Failed to fetch comments from server.', error)
    //     }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(e.target.value)
  }

  // 인풋빈값일때 전송버튼 disabled
  const isInputEmpty = newCommentText.trim() === ''

  return (
    <CommentContainer>
      <CommentBox>
        {comments.map((comment, index) => (
          <NewComment key={index}>
            <div className='info'>
              <img src={sangchu} alt='유저프로필' />
              <h1>{comment.nickname}</h1>
              <div className='date'>
                {new Date(comment.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            <div className='content'>{comment.content}</div>
            <div className='buttons'>
              <button className='delete'>삭제</button>
              <button className='edit'>수정</button>
            </div>

            {/* <p>Comment room id: {id}</p>s */}
          </NewComment>
        ))}
      </CommentBox>

      <CommentForm onSubmit={handleNewCommentSubmit}>
        <input type='text' value={newCommentText} onChange={handleChange} />
        <button type='submit' disabled={isInputEmpty}>
          댓글추가
        </button>
      </CommentForm>
    </CommentContainer>
  )
}
export default Comment

const CommentContainer = styled.section`
  width: 100%;
  height: 50rem;
  // @media (max-width: 576px) {
  //   width: 90%;
  //   height: 85vh;
  //   // position: relative;
  //   top: 12.5%;
  //   left: 5%;
  // }
`
const CommentBox = styled.div`
  width: 100%;
  height: 42rem;
  overflow: scroll;
  padding-bottom: 2rem;
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
const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 10%;
  // @media (max-width: 576px) {
  //   position: absolute;
  //   bottom: 0;
  //   height: 12%;
  //   justify-content: space-evenly;
  //   width: 98%;
  // }
  input {
    width: 76%;
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
    width: 20%;
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

const NewComment = styled.div`
  display: flex;
  width: 90%;
  :not(:last-child) {
    margin-bottom: 3rem;
  ]
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
  .info {
    display: flex;
    width: 30%;
    border: 1px solid red;
    .date {
      margin-right: auto;
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      @media (max-width: 576px) {
        width: 35%;
      }
    }
    img {
      border-radius: 5rem;
    }
  }
  .content {
    position: relative;
    left: 0;
    border: 1px solid red;
    width: 80%;
    height: auto;
    padding: 1rem;
    border-radius: 10px;
    border: transparent;
    font-size: 1.5rem;
    line-height: 1.5;
    display: flex;
    align-items: center;
    color: #000;
    overflow-wrap: anywhere;
  }
  .buttons {
    display: flex;
    width: 20%;
    justify-content: flex-end;
    .delete {
      padding: 0;
      margin: 0;
      
    }
  }
 

`
