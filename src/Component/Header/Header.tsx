import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import {SlCompass} from 'react-icons/sl'

import HeaderSearchBox from './HeaderSearch'
import HeaderProfile from './HeaderProfile'

export default function Header() {
  return (
    <HeaderSection>
      <LogoBox>
        <Logo to='/'>
          <SlCompass />
          Compass
        </Logo>
      </LogoBox>
      <HeaderSearchBox />
      <HeaderProfile />
    </HeaderSection>
  )
}

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  border-bottom: 1px solid #d0d0d0;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  background: #fff;
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  color: #1877f2;
  font-weight: 600;
  svg {
    font-size: 2rem;
  }
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }
`
