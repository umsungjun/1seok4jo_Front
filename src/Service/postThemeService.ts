import axios from 'axios'

const remote = axios.create()

export const fetchThemePostListApi = async (categoryId: number) => {
  //   const scroll = `&lastId=22`

  const themePostListURL = `http://localhost:8080/post?themeId=${categoryId}`
  // &lastId=${lastId}

  const response = await remote.get(themePostListURL)

  return response.data
}
// http://localhost:8080/post?themeId=1&lastId=10
// const themePostListURL = `http://localhost:8080/post?themeId=${categoryId}&lastId=${lastId}`
