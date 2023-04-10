import styled from 'styled-components'
import sangchu from '../Assets/sangchu.png'
import SpeechBubble from '../Common/SpeechBubble'
import Chat from '../Common/Chat'

const MessagePage = () => {
  const handleSubmit = (input: string) => {
    console.log(`test: ${input}`)
  }
  return (
    <Message>
      <Inbox>
        <InboxUl>
          {MessageList.map(inbox => (
            <InboxLi key={inbox.user}>
              <InboxLiImg src={inbox.profile} />
              <InboxLiUser>{inbox.user}</InboxLiUser>
            </InboxLi>
          ))}
        </InboxUl>
      </Inbox>
      <Channel>
        <Box>
          <SpeechBubble text='안녕하세요!' position='left' isUser={false} />
          <Chat />
        </Box>
      </Channel>
    </Message>
  )
}

const MessageList = [
  {user: 'sangchu', message: '안녕하세요', date: '2022년 10월', profile: sangchu},
  {
    user: 'user1',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRttkqmIlP0nsDqi0EcJvAOSn48rpY_wF8kdg&usqp=CAU',
  },
  {
    user: 'user2',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://avatarfiles.alphacoders.com/337/337515.png',
  },
  {
    user: 'user3',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://pbs.twimg.com/profile_images/1149685638641397764/A9WroJHp_400x400.png',
  },
  {
    user: 'user4',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vm1xUrUraOZl7sCS1yixp5n4_D6sEeZ1rg&usqp=CAU',
  },
  {
    user: 'user5',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://i.pinimg.com/originals/ae/b2/4b/aeb24b7dd0ee7b98f8f0c45fc06a373e.png',
  },
  {
    user: 'user6',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzs051kQDAbJqDFnedPIyjCF5OBhskFfAh6g&usqp=CAU',
  },
  {
    user: 'user7',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://avatarfiles.alphacoders.com/337/337515.png',
  },
  {
    user: 'user8',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRttkqmIlP0nsDqi0EcJvAOSn48rpY_wF8kdg&usqp=CAU',
  },
  {
    user: 'user9',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://avatarfiles.alphacoders.com/337/337515.png',
  },
  {
    user: 'user10',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://pbs.twimg.com/profile_images/1149685638641397764/A9WroJHp_400x400.png',
  },
  {
    user: 'user11',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vm1xUrUraOZl7sCS1yixp5n4_D6sEeZ1rg&usqp=CAU',
  },
  {
    user: 'user12',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://i.pinimg.com/originals/ae/b2/4b/aeb24b7dd0ee7b98f8f0c45fc06a373e.png',
  },
  {
    user: 'user13',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzs051kQDAbJqDFnedPIyjCF5OBhskFfAh6g&usqp=CAU',
  },
  {
    user: 'user14',
    message: '안녕하세요',
    date: '2022년 10월',
    profile: 'https://avatarfiles.alphacoders.com/337/337515.png',
  },
]

export default MessagePage

const Message = styled.section`
  padding-top: 5.2rem;
  display: flex;
`

const Inbox = styled.section`
  width: 30%;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
`

const InboxUl = styled.ul``

const InboxLi = styled.li`
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  padding: 2rem 0 2rem 3.5rem;
`
const InboxLiImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 2rem;
  border-radius: 5rem;
`
const InboxLiUser = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Channel = styled.section`
  width: 70%;
  height: 100vh;
  padding: 5rem;
  border-left: 5px solid #c0c0c0;
  overflow: scroll;
  overflow-x: hidden;
`

const Box = styled.div`
  width: 100%;
  // height: 60vh;
  // overflow: scroll;
  // overflow-x: hidden;
`
