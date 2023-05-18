import axios from 'axios'

const remote = axios.create()

// 글 작성
export const fetchPostWriteApi = async (formData: FormData, token: string) => {
  const postWriteURL = `http://localhost:8080/post`
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  }
  try {
    const response = await remote.post(postWriteURL, formData, {headers})
    return response.data
  } catch (error) {
    throw error
  }
}

// 글 수정
export const fetchPostEditApi = async (formData: FormData, token: string, postId: number) => {
  const postEditURL = `http://localhost:8080/post/${postId}`
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  }
  try {
    const response = await remote.put(postEditURL, formData, {headers})
    return response.data
  } catch (error) {
    throw error
  }
}

// 글 삭제
export const fetchPostDeleteApi = async (token: string, id: number) => {
  const postDeleteURL = `http://localhost:8080/post/${id}`
  const headers = {
    Authorization: token,
  }
  try {
    const response = await remote.delete(postDeleteURL, {headers})
    return response.data
  } catch (error) {
    throw error
  }
}
