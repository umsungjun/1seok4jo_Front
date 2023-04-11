import styled from 'styled-components'
import SpeechBubble from '../Component/SpeechBubble'
import Chat from '../Component/Chat'
import {inboxList} from '../Mock/inboxList'

const MessagePage = () => {
  const handleSubmit = (input: string) => {
    console.log(`test: ${input}`)
  }
  return (
    <Message>
      <Inbox>
        <InboxUl>
          {inboxList.map(inbox => (
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
