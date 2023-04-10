import styled from 'styled-components'
import sangchu from '../Assets/sangchu.png'

const MessagePage = () => {
  return (
    <Message>
      <MessageInbox>
        <MessageUl>
          {MessageList.map(inbox => (
            <MessageLi key={inbox.user}>
              <MessageLiImg src={inbox.profile} />
              <MessageLiUser>{inbox.user}</MessageLiUser>
            </MessageLi>
          ))}
        </MessageUl>
      </MessageInbox>
      <MessageChannel>메시지</MessageChannel>
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
    profile:
      'https://external-preview.redd.it/ezVku7xWOYkKreYkAzi28nUYCagZtEHKZVn3X1EWKBQ.jpg?auto=webp&s=a0e1df8241f94b01fda64b18dac53e7820d029a2',
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
    profile: 'https://i.pinimg.com/originals/ae/b2/4b/aeb24b7dd0ee7b98f8f0c45fc06a373e.png',
  },
]

export default MessagePage

const Message = styled.section`
  padding-top: 5.2rem;
  display: flex;
`

const MessageInbox = styled.section`
  width: 30%;
  height: 50rem;
  overflow: scroll;
  overflow-x: hidden;
`

const MessageUl = styled.ul``

const MessageLi = styled.li`
  width: 100%;
  height: 7rem;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  padding: 2rem;
`
const MessageLiImg = styled.img`
  width: 3rem;
  height: 3rem;
  margin-right: 2rem;
  border-radius: 5rem;
`
const MessageLiUser = styled.div`
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MessageChannel = styled.section`
  width: 70%;
  height: 50rem;
  padding: 5rem;
  border-left: 5px solid #c0c0c0;
  overflow: scroll;
  overflow-x: hidden;
`
