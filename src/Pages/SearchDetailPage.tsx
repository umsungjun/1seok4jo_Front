import React from 'react'
import PageTitle from '../Common/PageTitle'
import {useParams} from 'react-router-dom'
import PostList from '../Component/PostList'
import styled from 'styled-components'
export default function SearchDetailPage() {
  const {category, searchText} = useParams()

  return (
    <Section>
      <SectionInfo>
        전체글 / {category} / "{searchText}" 검색 결과
      </SectionInfo>
      <PostList />
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionInfo = styled.div`
  padding-top: 8rem;
  font-size: 3rem;
`
