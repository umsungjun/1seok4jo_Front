// Chat
export interface ChatBubbleProps {
  text: string
  createdAt: Date
}
export interface Props {}

// ChatBubble
export interface SpeechBubbleProps {
  text: string
  position: 'left' | 'right'
  isUser: boolean
}
export interface MyComponentState {
  speechBubbleProps: SpeechBubbleProps[]
}

// MainBanner
export interface MainBannerInterface {
  name: string
  image: string
  link: string
  content: string
  subContent: string
}

// PostFeed
export interface PostFeedInterface {
  id: number
  images: {
    url: string
    name: string
  }[]
  name: string
  title: string
  location: string
  date: string
  likes: string
  nickName: string
}

// PostDetail
export interface PostDetailInfoInterface {
  id: number
  images: {
    url: string
    name: string
  }[]
  user: string
  title: string
  location: string
  startDate: string
  endDate: string
  comment: string
  likes: string
  post: string
  hashtags: string[]
  comments: {
    nickName: string
    comment: string
    date: string
  }[]
}

// InboxList
export interface InboxListInterface {
  user: string
  message: string
  date: string
  profile: string
}

// users
export interface UserInterface {
  email: string
  password: string
  nickName: string
  myPage: {
    profile: string
    background: string
    ment: string
  }
}
