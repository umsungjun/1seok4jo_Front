import axios from 'axios'

const remote = axios.create()

export interface SearchType {
  count: number
  keyword: string
  searchPostList: {
    title: string
    detail: string
    location: string
    hashtag: string
    id: number
  }[]
}

export const fetchSearchApi = async (category: string, searchText: string, count: number) => {
  const searchURL = `http://localhost:8080/api/search/getList/${category}/${searchText}/${count}`

  const params = {
    method: 'GET',
    url: `${searchURL}`,
  }
  const response = await remote(params)

  //   console.log(response)
  return response.data.result
}
