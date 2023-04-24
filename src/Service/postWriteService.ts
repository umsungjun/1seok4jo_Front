import axios from 'axios'

const remote = axios.create()

export const fetchPostWriteApi = async (formData: FormData) => {
  // postId: number,
  // title: string,
  // detail: string,
  // location: string,
  // hashtag: string,
  // startDate: string,
  // endDate: string,
  // baseUrl: string,
  // storeFileUrl: string,
  // nickname: string,
  // themeId: number,
  // "createdAt": "2023-04-16T22:29:22.7857178",
  // "user": {
  //     "userId": 1,
  //     "nickName": "내가일빠당"
  // },
  // ) => {
  const postWriteURL = `http://localhost:8080/post/write`
  // const params = {
  //   method: 'POST',
  //   url: `${postWriteURL}`,
  //   data: {
  //     id: `${postId}`,
  //     title: `${title}`,
  //     detail: `${detail}`,
  //     location: `${location}`,
  //     hashtag: `${hashtag}`,
  //     startDate: `${startDate}`,
  //     endDate: `${endDate}`,
  //     baseUrl: `${baseUrl}`,
  //     storeFileUrl: `${storeFileUrl}`,
  //     nickname: `${nickname}`,
  //     themeId: `${themeId}`,
  //   },
  // }
  const response = await remote.post(postWriteURL, formData)

  return response.data
}
