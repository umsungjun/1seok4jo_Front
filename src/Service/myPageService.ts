import axios from 'axios'

const remote = axios.create()

export const fetchMyPostApi = async () => {
  const searchURL = `http://localhost:8080/api/search/getList/`

  const params = {
    method: 'GET',
    url: `${searchURL}`,
  }
  const response = await remote(params)

  //   console.log(response)
  return response.data.result
}
