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
  userProfileImage: string
}

export const fetchThemePostDetailApi = async (id: number) => {
  const postDetailURL = `http://localhost:8080/post/${id}`

  const response = await remote.get(postDetailURL)

  return response.data
}
