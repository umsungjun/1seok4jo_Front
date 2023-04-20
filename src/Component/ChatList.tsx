import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {inboxList} from '../Mock/chatList'
import {InboxListInterface} from '../Interface/interface'
import {Inbox} from '../Pages/MessagePage'
import {InboxLi} from '../Pages/MessagePage'
import {InboxLiImg} from '../Pages/MessagePage'
import {InboxLiUser} from '../Pages/MessagePage'

type ChatListProps = {
  chats: InboxListInterface[]
}

const ChatList: React.FC<ChatListProps> = ({chats}) => {
  return (
    <MobileInbox>
      <ul>
        {inboxList.map(chat => (
          <MobileInboxLi key={chat.id}>
            <MobileInboxLiImg src={chat.profile} />
            <MobileInboxLiUser>
              <Link to={`/Chat/${chat.id}`}>{chat.user}</Link>
            </MobileInboxLiUser>
          </MobileInboxLi>
        ))}
      </ul>
    </MobileInbox>
  )
}

export default ChatList

const MobileInbox = styled(Inbox)`
  width: 100%;
  padding-top: 5rem;
`

const MobileInboxLi = styled(InboxLi)`
  height: 7.5rem;
  border-bottom: 2px solid #c0c0c0;
  padding-left: 5rem;
`
const MobileInboxLiImg = styled(InboxLiImg)`
  margin-right: 3.5rem;
  width: 4.5rem;
  height: 4.5rem;
`
const MobileInboxLiUser = styled(InboxLiUser)`
  font-size: 1.8rem;
  width: 80%;
`
