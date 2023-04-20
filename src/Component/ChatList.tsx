import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {inboxList} from '../Mock/chatList'
import {InboxListInterface} from '../Interface/interface'

type ChatListProps = {
  chats: InboxListInterface[]
}

const ChatList: React.FC<ChatListProps> = ({chats}) => {
  return (
    <InboxUl>
      {inboxList.map(chat => (
        <InboxLi key={chat.id}>
          <InboxLiImg src={chat.profile} />
          <InboxLiUser>
            <Link to={`/Chat/${chat.id}`}>{chat.user}</Link>
          </InboxLiUser>
        </InboxLi>
      ))}
    </InboxUl>
  )
}

export default ChatList

const InboxUl = styled.ul``

const InboxLi = styled.li`
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

  @media (max-width: 576px) {
    padding-left: 5rem;
    border-bottom: 2px solid #c0c0c0;
    height: 7.5rem;
  }
`
const InboxLiImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 2rem;
  border-radius: 5rem;
  @media (max-width: 576px) {
    margin-right: 3.5rem;
    width: 4.5rem;
    height: 4.5rem;
  }
`
const InboxLiUser = styled.div`
  font-size: 1.5rem;
  width: 80%;
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`
