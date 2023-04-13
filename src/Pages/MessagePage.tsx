import styled from 'styled-components'
import Chat from '../Component/Chat'
import {inboxList} from '../Mock/inboxList'
import {scrollToTop} from '../util/scrollToTop'

const MessagePage = () => {
  scrollToTop()
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
      <Chat />
    </Message>
  )
}
export default MessagePage

const Message = styled.section`
  padding-top: 5.2rem;
  display: flex;
  height: 100vh;
  // border: 5px solid black;
`

const Inbox = styled.section`
  width: 25%;
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
