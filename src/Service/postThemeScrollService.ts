import axios from 'axios'

const remote = axios.create()

export const fetchThemeScrollApi = async (categoryId: number, lastId: number) => {
  const themePostListScrollURL = `http://localhost:8080/post?themeId=${categoryId}&lastId=${lastId}`

  const response = await remote.get(themePostListScrollURL)

  return response.data
}
