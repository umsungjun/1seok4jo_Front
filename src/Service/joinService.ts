import axios from 'axios'

const remote = axios.create()

// interface fetchJoinApi {
//   email: string
//   password: string
//   nickname: string
// }

export const fetchJoinApi = async (email: string, password: string, nickname: string) => {
  const postJoinURL = `http://localhost:8080/api/member/signup`
  const params = {
    method: 'POST',
    url: `${postJoinURL}`,
    data: {
      email: `${email}`,
      password: `${password}`,
      nickname: `${nickname}`,
    },
  }

  const response = await remote(params)

  return response.data
}
