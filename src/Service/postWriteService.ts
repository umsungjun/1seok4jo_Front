import axios from 'axios'

const remote = axios.create()

export const fetchPostWriteApi = async (formData: FormData, token: string) => {
  const postWriteURL = `http://localhost:8080/post`
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  }
  // const data: {[key: string]: string} = {}
  // formData.forEach((value, key) => {
  //   data[key] = value
  // })
  try {
    const response = await remote.post(postWriteURL, {headers})
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
