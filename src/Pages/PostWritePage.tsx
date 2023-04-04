import React from 'react'
import PageTitle from '../Common/PageTitle'
import styled from 'styled-components'
import ThemeSlide from '../Common/ThemeSlide'

export default function PostWritePage() {
  return (
    <>
      <PageTitle title='Writing post' sub='나의 여행 경험을 다른 사람들에게 들려주세요.' />
      <Section>
        <Title>#테마</Title>
        <ThemeSlide />
      </Section>
    </>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
`
