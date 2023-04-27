import axios from 'axios'

const remote = axios.create()

export interface PostCommentInterface {
  map(arg0: (data: {nickName: any; createdAt: any; content: any}) => JSX.Element): import('react').ReactNode
  commentId: number
  userId: number
  nickname: string
  imageUrl: string[]
  content: string
  createdAt: string
  updatedAt: string
}

export const fetchPostCommentApi = async (postId: number) => {
  const postCommentURL = `http://localhost:8080/post/${postId}/comment`

  const response = await remote.get(postCommentURL)

  return response.data
}
