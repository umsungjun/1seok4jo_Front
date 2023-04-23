import styled, {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'
import {SlCompass} from 'react-icons/sl'

import HeaderSearchBox from './HeaderSearch'
import HeaderProfile from './HeaderProfile'
import {useSelector} from 'react-redux'
import {RootState} from '../../Store'
import {ThemeState} from '../../Store/themeTypeSlice'

export default function Header() {
  const theme = useSelector((state: RootState) => state.themeType.theme)

  return (
    <HeaderSection theme={theme}>
      <LogoBox>
        <Logo to='/'>
          <SlCompass />
          Compass
        </Logo>
      </LogoBox>
      <HeaderSearchWarper>
        <HeaderSearchBox />
      </HeaderSearchWarper>
      <HeaderProfile />
    </HeaderSection>
  )
}

const HeaderSearchWarper = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`

const HeaderSection = styled.section<ThemeState>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  ${props => (props.theme === 'light' ? 'background-color: #fff;' : 'background-color: #1b1b1d;')}

  @media (max-width: 576px) {
    padding: 1rem 1rem;
  }
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
