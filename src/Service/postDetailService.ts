import axios from 'axios'

const remote = axios.create()

export interface PostDetailInterface {
  baseUrl: string
  commentCount: number
  detail: string
  endDate: string
  hashtag: string
  id: number
  likeCount: number
  location: string
  nickname: string
  startDate: string
  storeFileUrl: string[]
  themeId: number
  title: string
}

export const fetchThemePostDetailApi = async (postId: number) => {
  const postDetailURL = `http://localhost:8080/post/${postId}`

  const response = await remote.get(postDetailURL)

  return response.data
}
