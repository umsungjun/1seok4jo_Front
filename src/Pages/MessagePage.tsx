import styled from 'styled-components'
import Chat from '../Component/Chat'
import {inboxList} from '../Mock/chatList'
import {scrollToTop} from '../util/scrollToTop'

const MessagePage = () => {
  scrollToTop()
  const handleSubmit = (input: string) => {
    console.log(`test: ${input}`)
  }

  const handleInbox = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(e.currentTarget)
  }
  return (
    <Message>
      <Inbox>
        <ul>
          {inboxList.map(inbox => (
            <InboxLi key={inbox.user}>
              <InboxLiImg src={inbox.profile} />
              <InboxLiUser>{inbox.user}</InboxLiUser>
            </InboxLi>
          ))}
        </ul>
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
`

export const Inbox = styled.section`
  width: 20%;
  min-width: 20rem;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
    transition: width 0.2s ease-in-out;
  }
`

export const InboxLi = styled.li`
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #c0c0c0;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`
export const InboxLiImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 2rem;
  border-radius: 5rem;
`
export const InboxLiUser = styled.div`
  font-size: 1.5rem;
`
