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

// PostModal
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

// PostFeed
export interface PostFeedInterface {
  id: number
  image: string
  name: string
  title: string
  location: string
  date: string
  likes: string
}

// PostDetail
export interface PostDetailInfoInterface {
  id: number
  image: string[]
  name: string[]
  title: string
  location: string
  startDate: string
  endDate: string
  comment: string
  likes: string
  post: string
  hashtags: string[]
  comments: string[]
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
