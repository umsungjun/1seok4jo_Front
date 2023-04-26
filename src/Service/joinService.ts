import axios from 'axios'

const remote = axios.create()

// interface fetchJoinApi {
//   email: string
//   password: string
//   nickname: string
// }

export const fetchJoinApi = async (blobData: Blob) => {
  const postJoinURL = `http://localhost:8080/api/member/signup`
  // console.log(blobData)

  const joinData = new FormData()
  joinData.append('data', blobData)

  const params = {
    method: 'POST',
    url: `${postJoinURL}`,
    data: joinData,
  }
  const response = await remote(params)

  // console.log(response.data)
}
