import axios from 'axios'

const remote = axios.create()

export const fetchThemeScrollApi = async (categoryId: number, lastId: number) => {
  const scroll = `lastId=22`

  const themePostListScrollURL = `http://localhost:8080/post?themeId=${categoryId}&lastId=${lastId}`
  // &lastId=${lastId}

  const response = await remote.get(themePostListScrollURL)

  return response.data
}
// http://localhost:8080/post?themeId=1&lastId=10
// const themePostListURL = `http://localhost:8080/post?themeId=${categoryId}&lastId=${lastId}`
