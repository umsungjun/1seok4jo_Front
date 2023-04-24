import axios from 'axios'

const remote = axios.create()

export const fetchPostWriteApi = async (formData: FormData) => {
  const postWriteURL = `http://localhost:8080/post`
  try {
    const response = await remote.post(postWriteURL, formData)
    return response.data
  } catch (error) {
    // Handle the error here
    console.error(error)
    throw error
  }
}
