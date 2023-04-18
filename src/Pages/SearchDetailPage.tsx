import React from 'react'
import PageTitle from '../Common/PageTitle'
import {useParams} from 'react-router-dom'
import PostList from '../Component/PostList'
import styled from 'styled-components'
export default function SearchDetailPage() {
  const {category, searchText} = useParams()

  return (
    <Section>
      <PageTitle title={'Search Result'} sub={`"${searchText}" 으로 검색한 결과 입니다.`} />
      <PostList />
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`
