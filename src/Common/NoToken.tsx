import React from 'react'
import styled from 'styled-components'
import {darkTheme, lightTheme} from '../Theme/theme'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
export default function NoToken() {
  const theme = useSelector((state: RootState) => state.themeType.theme)

  return (
    <Section theme={theme}>
      <SectionContent>
        <NoTokenTitle theme={theme}>404 ERROR</NoTokenTitle>
        <NoTokenInfo theme={theme}>
          <Info>죄송합니다. 페이지를 찾을 수 없습니다.</Info>
          <Info>존재하지 않는 주소를 입력하셨거나,</Info>
          <Info>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</Info>
        </NoTokenInfo>
      </SectionContent>
    </Section>
  )
}

const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  ${props => (props.theme === 'light' ? lightTheme.background : darkTheme.background)}
`

const SectionContent = styled.div`
  position: absolute;
  top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NoTokenTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 4rem;
  margin-bottom: 4rem;
  ${props => (props.theme === 'light' ? '' : darkTheme.whiteColor)}
`

const NoTokenInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  gap: 2rem;
  ${props => (props.theme === 'light' ? '' : darkTheme.whiteColor)}
`

const Info = styled.span``
