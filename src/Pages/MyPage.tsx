import React from 'react'
import MyPageBanner from '../Common/MyPageBanner'
import styled from 'styled-components'
import PostList from '../Component/PostList'
import {scrollToTop} from '../util/scrollToTop'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'

export default function MyPage() {
  scrollToTop()
  return (
    <MyPageSection>
      <MyPageBanner />
      <TypeSelectBox>
        <TypeSelect>작성 글</TypeSelect>
        <TypeSelect>좋아요</TypeSelect>
      </TypeSelectBox>
      {/* <PostList /> */}
    </MyPageSection>
  )
}

const MyPageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TypeSelectBox = styled.div`
  width: 89%;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  color: #fff;
`

const TypeSelect = styled.div`
  width: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0rem;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 1rem;
  font-size: 1.3rem;
  min-height: 4rem;
  background: #1877f2;
  box-shadow: 0px 1px 5px 0px whitesmoke;
  &:hover {
    background: #fff;
    color: #1877f2;
    border: 2px solid;
  }
  &:active {
    background: #fff;
    color: #1877f2;
    border: 2px solid;
  }
`
