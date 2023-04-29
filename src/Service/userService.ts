import axios from 'axios'

const remote = axios.create()

// 회원가입
export const fetchJoinApi = async (blobData: Blob) => {
  const postJoinURL = `http://localhost:8080/api/member/signup`
  // console.log(blobData)

  const joinData = new FormData()
  joinData.append('data', blobData)

  const params = {
    method: 'POST',
    url: `${postJoinURL}`,
    data: joinData,
  }
  const response = await remote(params)

  // console.log(response.data)
}

// 로그인
export const fetchLoginApi = async (email: string, password: string) => {
  const postLoginURL = `http://localhost:8080/api/member/sign-in`
  const params = {
    method: 'POST',
    url: `${postLoginURL}`,
    data: {
      email: `${email}`,
      password: `${password}`,
    },
  }
  const response = await remote(params)

  return response.data
}

// TODO 회원정보 수정
// export const fetchProfileEditApi = async () => {
//   const postEditURL = `http://localhost:8080/api/member/update`
//   const params = {
//     method: 'PUT',
//     url: `${postEditURL}`,
//     data: {
//       email: `${email}`,
//       password: `${password}`,
//     },
//   }
//   const response = await remote(params)

//   return response.data
// }

// 비밀번호 수정
export const fetchEditPassWordApi = async (password: string, newPassword: string, token: string) => {
  // console.log(token)

  const postEditPasswordURL = `http://localhost:8080/api/member/password/update`
  const params = {
    method: 'PUT',
    url: `${postEditPasswordURL}`,
    data: {
      password: `${password}`,
      newPassword: `${newPassword}`,
    },
    headers: {Authorization: token},
  }
  const response = await remote(params)
  // console.log(response)

  return response.data
}

// 비밀번호 초기화
export const fetchInitPassWordApi = async (uuid: string, password: string) => {
  const postInitPasswordURL = `http://localhost:8080/api/member/password/reset`

  // const paramsInit = {
  //   method: 'POST',
  //   url: `${postInitPasswordURL}`,
  //   data: {
  //     password: `${password}`,
  //     uuid: `${newPassword}`,
  //   },
  //   headers: {Authorization: token},
  // }
  // const responseInit = await remote(paramsInit)
  // console.log(responseInit)
}

// 초기화 메일
export const fetchMailPassWordApi = async () => {
  const sendMailURL = `http://localhost:8080/api/member/password/send`

  const paramsMail = {
    method: 'POST',
    url: `${sendMailURL}`,
  }
  const responseMail = await remote(paramsMail)
  console.log(responseMail)
}
