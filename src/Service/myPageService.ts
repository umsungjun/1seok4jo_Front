import axios from 'axios'

const remote = axios.create()

export interface MyPostListType {
  count: number
  postResponseList: {
    id: number
    title: string
    detail: string
    location: string
    hashtag: string
    likeCount: number
    startDate: string
    endDate: string
    baseUrl: string
    storeFileUrl: string[]
  }[]
}

export const fetchPostListApi = async (type: string, token: string) => {
  const myPostListURL = `http://localhost:8080/api/member/post/${type}`

  const params = {
    method: 'GET',
    url: `${myPostListURL}`,
    headers: {Authorization: token},
  }
  const response = await remote(params)

  return response.data.result
}
