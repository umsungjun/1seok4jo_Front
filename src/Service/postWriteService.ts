import axios from 'axios'

const remote = axios.create()

export interface PostWriteInterface {
  id: number
  title: string
  detail: string
  location: string
  hashtag: string
  startDate: string
  endDate: string
  baseUrl: string
  storeFileUrl: string[]
  nickname: string
  themeId: number
}

// "createdAt": "2023-04-16T22:29:22.7857178",
// "user": {
//     "userId": 1,
//     "nickName": "내가일빠당"
// },

export const fetchPostWriteApi = async (postId: number) => {
  const postWriteURL = `http://localhost:8080/post/${postId}`

  const response = await remote.post(postWriteURL)

  return response.data
}
