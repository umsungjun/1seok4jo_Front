import React from 'react'
import styled from 'styled-components'

interface PageTitleProps {
  title: string
  sub: string
}

export default function PageTitle({title, sub}: PageTitleProps) {
  return (
    <Section>
      <Title>{title}</Title>
      <SubTitle>{sub}</SubTitle>
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 3rem;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3.5rem;
`

const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  color: #6b7280;
`
