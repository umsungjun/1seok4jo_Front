import styled, {keyframes} from 'styled-components'

import {SlCompass} from 'react-icons/sl'
import {GoSearch} from 'react-icons/go'
import {useState} from 'react'

export default function Header() {
  const [searchSelect, setSerachSelect] = useState('검색')
  const [selectUl, setSelectUl] = useState(false)

  const handleSearchSelect = () => {
    setSelectUl(true)
  }

  const handleSearchValue = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectUl(false)
    setSerachSelect(e.currentTarget.innerText)
  }
  return (
    <HeaderSection>
      <LogoBox>
        <SlCompass />
        <LogoText>Compass</LogoText>
      </LogoBox>
      <SearchBox>
        <SearchSelect onClick={handleSearchSelect}>{searchSelect}</SearchSelect>
        {selectUl && (
          <SearchUl>
            <SearchLi onClick={handleSearchValue} value='title'>
              제목
            </SearchLi>
            <SearchLi onClick={handleSearchValue} value='detail'>
              내용
            </SearchLi>
            <SearchLi onClick={handleSearchValue} value='hashtag'>
              해시태그
            </SearchLi>
          </SearchUl>
        )}
        <Bar />
        <Search />
        <SearchButton>
          <GoSearch />
        </SearchButton>
      </SearchBox>
      <LoginBox>
        <LoginText>로그인</LoginText>
      </LoginBox>
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
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  color: #1877f2;
  svg {
    font-size: 2rem;
  }
`

const LogoText = styled.span`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`

const SearchBox = styled.div`
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  border: 1px solid #c0c0c0;
  border-radius: 2rem;
  box-shadow: 0px 1px 1px 1px #e0e0e0;
  position: relative;
`

const SearchSelect = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  min-width: 4rem;
  &:focus {
    outline: none;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(15%);
  }
`

const SearchUl = styled.ul`
  position: absolute;
  top: 2rem;
  left: 0.6rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  animation: ${slideIn} 0.3s ease-in-out forwards;
  li:last-child {
    border-bottom: none;
  }
`

const SearchLi = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
`

const SelectBox = styled.select`
  border: none;
  &:focus {
    outline: none;
  }
`

const Option = styled.option`
  background-color: #fff;
  color: #333;
  font-size: 14px;
  padding: 5px;
`

const Bar = styled.span`
  width: 1px;
  height: 2rem;
  background: #c0c0c0;
  margin: 0 0.7rem;
`

const Search = styled.input`
  border: none;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border-radius: 50%;
  border: none;
  background-color: #1877f2;
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 1rem;
  }
`

const LoginBox = styled.div``

const LoginText = styled.span`
  cursor: pointer;
`
