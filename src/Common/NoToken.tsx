import React from 'react'
import styled from 'styled-components'

export default function NoToken() {
  return (
    <Section>
      <NoTokenTitle>잘못된 접근입니다.</NoTokenTitle>
    </Section>
  )
}

const Section = styled.section`
  position: absolute;
  top: 50%;
`

const NoTokenTitle = styled.h1`
  font-size: 2rem;
`
