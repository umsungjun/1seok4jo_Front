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

export const fetchGetCommentApi = async (postId: number) => {
  const postCommentURL = `http://localhost:8080/post/${postId}/comment`

  const response = await remote.get(postCommentURL)

  return response.data
}

export const fetchPostCommentApi = async (postId: number) => {
  const postCommentURL = `http://localhost:8080/${postId}/comment`

  const response = await remote.post(postCommentURL)

  return response.data
}
