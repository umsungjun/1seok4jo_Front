import axios from 'axios'

const remote = axios.create()

export const fetchPostWriteApi = async (formData: FormData, token: string, postId: number) => {
  const postWriteURL = `http://localhost:8080/post/${postId}`
  const headers = {
    'Content-Type': 'multipart/form-data',
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
