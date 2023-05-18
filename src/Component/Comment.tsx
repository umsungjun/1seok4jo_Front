import React, {useState, useRef, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import styled from 'styled-components'
import type {CommentBubbleProps} from '../Interface/interface'
import type {CommentProps} from '../Interface/interface'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
import {basicUser} from '../Mock/users'
import {
  fetchPostCommentApi,
  fetchGetCommentApi,
  fetchEditCommentApi,
  fetchDeleteCommentApi,
} from '../Service/postCommentService'

const Comment: React.FC<CommentProps> = () => {
  const {id} = useParams()
  const user = useSelector((state: RootState) => state.user)
  const userId = user.userId
  const userNickName = user.nickName
  const userImage =
    user.profileUrl === 'https://s3.ap-northeast-2.amazonaws.com/compass-s3-bucket/null'
      ? basicUser.profile
      : user.profileUrl
  const [newCommentText, setNewCommentText] = useState<string>('')
  const [editedCommentText, setEditedCommentText] = useState<string>('')
  const [prevCommentText, setPrevCommentText] = useState<string>('')
  const [comments, setComments] = useState<CommentBubbleProps[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [cookies] = useCookies(['token'])
  const token = cookies.token

  useEffect(() => {
    ;(async () => {
      try {
        const commentsResponse = await fetchGetCommentApi(Number(id), token)
        setComments(commentsResponse)
        setEditingCommentId(commentsResponse[0]?.commentId)
        setImageUrl(commentsResponse[0]?.imageUrl)
      } catch (error) {
        throw error
      }
    })()
  }, [id])

  const handleNewCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newComment: CommentBubbleProps = {
      userId: userId,
      postId: Number(id),
      content: newCommentText,
      createdTime: new Date(),
      nickName: '',
      commentId: 1,
    }
    setComments([...comments, newComment])
    setNewCommentText('')

    try {
      const success = await fetchPostCommentApi(Number(id), userId, newCommentText, token)
      if (success) {
        const commentsResponse = await fetchGetCommentApi(Number(id), token)
        setComments(commentsResponse)
        setEditingCommentId(commentsResponse[0]?.commentId)
        setImageUrl(commentsResponse[0]?.imageUrl)
      } else {
        alert('댓글 작성 에러')
      }
    } catch (error) {
      throw error
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>, editingCommentId: number) => {
    e.preventDefault()

    try {
      const success = await fetchEditCommentApi(Number(id), editingCommentId, userId, editedCommentText, token)
      if (success) {
        const updatedComments = comments.map(comment => {
          if (comment.commentId === editingCommentId) {
            return {
              ...comment,
              content: editedCommentText,
            }
          } else {
            return comment
          }
        })
        setComments(updatedComments)
        setNewCommentText('')
        alert('수정 완료')
      } else {
        alert('수정 에러')
      }
    } catch (error) {
      throw error
    }

    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(e.target.value)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCommentText(e.target.value)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, commentId: number) => {
    e.preventDefault()
    setIsEditing(true)
    setEditingCommentId(commentId)
    const comment = comments.find(comment => comment.commentId === commentId)
    if (comment) {
      setPrevCommentText(comment.content)
      setEditedCommentText(comment.content)
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, commentId: number) => {
    e.preventDefault()
    const confirmed = window.confirm('정말 삭제하시겠습니까?')
    if (!confirmed) {
      return
    }
    try {
      const success = await fetchDeleteCommentApi(commentId, token)
      if (success) {
        setComments(comments.filter(comment => comment.commentId !== commentId))
        alert('삭제 완료!')
      } else {
        alert('삭제 에러')
      }
    } catch (error) {
      alert('삭제 에러')
    }
  }
  // 인풋빈값일때 전송버튼 disabled
  const isInputEmpty = newCommentText.trim() === ''

  return (
    <CommentContainer>
      <CommentBox>
        {comments.map(comment => (
          <NewComment key={comment.commentId}>
            <div className='info'>
              {userId === comment.userId ? (
                <>
                  <img src={userImage} alt='유저프로필' />
                  <h1>{userNickName}</h1>
                </>
              ) : (
                <>
                  <img src={`https://s3.ap-northeast-2.amazonaws.com/compass-s3-bucket/${imageUrl}`} alt='유저프로필' />
                  <h1>{comment.nickName}</h1>
                </>
              )}

              <div className='date'>
                {new Date(comment.createdTime).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            {isEditing && comment.commentId === editingCommentId ? (
              <form onSubmit={e => handleEditSubmit(e, comment.commentId)}>
                <input type='text' value={editedCommentText} onChange={e => handleEditChange(e)} />
                <button type='submit'>수정 완료</button>
              </form>
            ) : (
              <>
                <div className='content'>{comment.content}</div>

                {userId === comment.userId ? (
                  <>
                    <div className='buttons'>
                      <button className='delete' onClick={e => handleDelete(e, comment.commentId)}>
                        삭제
                      </button>
                      <button className='edit' onClick={e => handleEdit(e, comment.commentId)}>
                        수정
                      </button>
                    </div>
                  </>
                ) : null}
              </>
            )}
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
  }
  @media (max-width: 576px) {
    padding: 1.5rem;
  }
  form {
    display: flex;
    width: 100%;
    input {
      width: 80%;
      height: 2.8rem;
      border-radius: 1rem;
      text-indent: 1.2rem;
      font-size: 1.2rem;
      border: 2px solid #f0f0f0;
      margin-right: 1rem;
      &:focus {
        outline: none;
        border: 2px solid #c0c0c0;
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
    }
  }
  .info {
    display: block;
    text-align: left;
    width: 30%;
    .date {
      margin-right: auto;
      margin-top: 0.5rem;
      color: #a0a0a0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      @media (max-width: 576px) {
        width: 35%;
      }
    }
    img {
      border-radius: 50rem;
      // border: 2px solid lightgray;
      margin-bottom: 0.5rem;
      width: 3.5rem;
      height: 3.5rem;
    }
  }
  .content {
    position: relative;
    left: 0;
    width: 80%;
    height: auto;
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    color: #000;
    padding-top: 0.5rem;
    overflow-wrap: anywhere;
  }
  .buttons button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    font-size: 1.2rem;
    width: 3.5rem;
    height: 2rem;
    background-color: #c0c0c0;
    color: #fff;
    border: transparent;
    border-radius: 0.5rem;
    cursor: pointer;

    :not(:last-child) {
      margin-bottom: 0.5rem;
    }
    :hover {
      background-color: #1877f2;
      color: #fff;
    }
  }
`
