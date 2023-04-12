import {UserInterface} from '../Interface/interface'

export const users: UserInterface[] = [
  {
    email: 'kikI@naver.com', // 이메일
    password: 'zero123', // 비밀번호
    nickName: 'kikI', // 닉네임
    myPage: {
      ment: '안녕하세요 저는 바다를 좋아하는 여행가 입니다!', // 나를 소개하는 한문장
      profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyVFUA_3HIX1imDdXcf51nRNyibm6cxC1FXw&usqp=CAU', // profile이미지
      background: 'https://blog.kakaocdn.net/dn/d2gF6H/btqXTm0xV6r/RoCwErZI7yKZYRbybrAouk/img.jpg', // background 배너 이미지
    },
  },
]
