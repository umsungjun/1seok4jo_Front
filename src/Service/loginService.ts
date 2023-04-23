import axios from 'axios'

const remote = axios.create()

// interface fetchJoinApi {
//   email: string
//   password: string
//   nickname: string
// }

export const fetchLoginApi = async (email: string, password: string) => {
  const postLoginURL = `http://localhost:8080/api/member/sign-in`
  const params = {
    method: 'POST',
    url: `${postLoginURL}`,
    data: {
      email: `${email}`,
      password: `${password}`,
    },
  }
  const response = await remote(params)

  return response.data
}
