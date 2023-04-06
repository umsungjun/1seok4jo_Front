import React from 'react'
import MyPageBanner from '../Common/MyPageBanner'
import styled from 'styled-components'
import PostList from '../Common/PostList'

export default function MyPage() {
  return (
    <Section>
      <MyPageBanner />
      <TypeSelectBox>
        <TypeSelect>작성 글</TypeSelect>
        <TypeSelect>좋아요</TypeSelect>
      </TypeSelectBox>
      <PostList />
    </Section>
  )
}

const Section = styled.section`
  padding: 0 5rem;
`

const TypeSelectBox = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem;
  padding: 1rem 0;
  box-sizing: border-box;
`

const TypeSelect = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0rem;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 1rem;
  font-size: 1.3rem;
  min-height: 4rem;
  &:hover {
    border: 2px solid #1877fe;
  }
  &:active {
    border: 2px solid #1877fe;
  }
`
