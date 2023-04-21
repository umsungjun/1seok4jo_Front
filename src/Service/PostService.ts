import axios from 'axios'

const remote = axios.create()

export const fetchThemePostListApi = async () => {
  const themePostListURL = `http://localhost:8080/post?themeId=${1}`

  const response = await remote.get(themePostListURL)

  return response.data
}
