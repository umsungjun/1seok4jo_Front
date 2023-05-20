import axios from 'axios'

const remote = axios.create()

export interface PostCommentInterface {
  commentId: number
  userId: number
  nickname: string
  imageUrl: string[]
  content: string
  createdAt: string
  updatedAt: string
}

// 댓글 조회
export const fetchGetCommentApi = async (id: number, token: string) => {
  const postCommentURL = `http://localhost:8080/post/${id}/comment`

  try {
    const response = await remote.get(postCommentURL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    if (response.data.code === 200) {
      return response.data.result
    } else {
      console.error('에러')
      return []
    }
  } catch (error) {
    console.error('에러', error)
    return []
  }
}

// 댓글 생성
export const fetchPostCommentApi = async (id: number, userId: number, content: string, token: string) => {
  const url = `http://localhost:8080/${id}/comment`

  try {
    const response = await axios.post(
      url,
      {
        userId: userId,
        postId: Number(id),
        content: content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )

    if (response.data.code === 200) {
      return true // Successful comment post
    } else {
      console.error('댓글 작성 에러')
      return false // Comment post error
    }
  } catch (error) {
    console.error('댓글 작성 에러', error)
    return false // Comment post error
  }
}

// 댓글 수정
export const fetchEditCommentApi = async (
  id: number,
  editingCommentId: number,
  userId: number,
  editedCommentText: string,
  token: string,
) => {
  const url = `http://localhost:8080/${id}/comment/${editingCommentId}`

  try {
    const response = await axios.put(
      url,
      {
        userId: userId,
        postId: Number(id),
        content: editedCommentText,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    )

    if (response.data.code === 200) {
      return true
    } else {
      console.error('수정 에러')
      return false
    }
  } catch (error) {
    console.error('수정 에러', error)
    return false
  }
}

// 댓글 삭제
export const fetchDeleteCommentApi = async (commentId: number, token: string) => {
  const url = `http://localhost:8080/comment/${commentId}`

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    })

    if (response.data.code === 200) {
      return true
    } else {
      console.error('삭제 에러')
      return false
    }
  } catch (error) {
    console.error('삭제 에러', error)
    return false
  }
}
