import axios from 'axios'

const remote = axios.create()

// 글 작성
export const fetchPostWriteApi = async (formData: FormData, token: string) => {
  const postWriteURL = `http://localhost:8080/post`
  const headers = {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: token,
  }
  try {
    const response = await remote.post(postWriteURL, {headers})
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
