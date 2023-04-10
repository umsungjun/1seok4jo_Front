import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

interface Notification {
  setNotification: (value: boolean) => void
}

export default function Notification({setNotification}: Notification) {
  return (
    <Wrapper onMouseLeave={() => setNotification(false)}>
      <LinkBox>
        <NotificationLink to='Message'># (닉네임)님에게 메세지가 도착했습니다.</NotificationLink>
        <NotificationLink to='Message'># 안읽은 메세지가 있습니다.</NotificationLink>
        <NotificationLink to='MyPage'># (닉네임)님이 (게시글 제목)에 좋아요를 누르셨습니다.</NotificationLink>
        <NotificationLink to='MyPage'># (게시글 제목)에 좋아요가 추가되었습니다.</NotificationLink>
      </LinkBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 22rem;
  height: 7rem;
  background: rgb(255, 255, 255);
  top: 3.5rem;
  right: 2rem;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #e9ebee;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  box-sizing: content-box;
  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0px 16px 20px 17.5px;
    border-color: rgb(255, 255, 255) transparent;
    display: block;
    width: 0px;
    z-index: 1;
    top: -1.25rem;
    left: 17.9rem;
  }

  &:before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0px 16px 20px 17.5px;
    border-color: #e9ebee transparent;
    width: 0px;
    z-index: 0;
    top: -1.3rem;
    left: 17.9rem;
  }
`

const LinkBox = styled.div`
  min-height: 7rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
`

const NotificationLink = styled(Link)`
  margin-bottom: 1rem;
  padding: 0.3rem;

  &:hover {
    color: #1877fe;
  }
`
