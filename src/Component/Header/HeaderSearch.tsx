import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'

import {GoSearch} from 'react-icons/go'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from '../../Store'
import {darkTheme, lightTheme} from '../../Theme/theme'

const searchCondition = ['제목', '내용', '해시태그']

export default function HeaderSearchBox() {
  const theme = useSelector((state: RootState) => state.themeType.theme)
  // console.log(theme)

  const navigate = useNavigate()

  const [searchSelect, setSearchSelect] = useState('제목')
  const [selectUl, setSelectUl] = useState(false)
  const [searchText, setSearchText] = useState('')

  const handleSearchSelect = () => {
    setSelectUl(true)
  }

  const handleSearchValue = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectUl(false)
    setSearchSelect(e.currentTarget.innerText)
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchText.length < 1) return
    if (e.key === 'Enter') {
      navigate(`/SearchDetail/${searchSelect}/${searchText}`)
    }
  }

  const handleSearchClick = () => {
    if (searchText.length < 1) return
    navigate(`/SearchDetail/${searchSelect}/${searchText}`)
  }

  return (
    <SearchBox theme={theme}>
      <SearchSelect theme={theme} onClick={handleSearchSelect}>
        {searchSelect}
      </SearchSelect>
      {selectUl && (
        <SearchUl>
          {searchCondition.map(searchStr => {
            if (searchSelect !== searchStr) {
              return (
                <SearchLi onClick={handleSearchValue} value={searchStr} key={searchStr}>
                  {searchStr}
                </SearchLi>
              )
            }
          })}
        </SearchUl>
      )}
      <Bar />
      <Search theme={theme} onChange={e => handleSearchInput(e)} onKeyDown={e => handleSearchEnter(e)} />
      <SearchButton onClick={handleSearchClick}>
        <GoSearch />
      </SearchButton>
    </SearchBox>
  )
}

const SearchBox = styled.div`
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  ${props => (props.theme === 'light' ? 'border: 1px solid #c0c0c0;' : 'border: 1px solid #4B5563;')}

  border-radius: 2rem;
  ${props =>
    props.theme === 'light' ? 'box-shadow: 0px 1px 1px 1px #dbdbdb;' : 'box-shadow: 0px 1px 1px 1px #4B5563;'}
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    ${props =>
      props.theme === 'light' ? 'box-shadow: 0px 1px 2px 2px #dbdbdb;' : 'box-shadow: 0px 1px 2px 2px #4B5563;'}
  }

  &:focus {
    ${props =>
      props.theme === 'light' ? 'box-shadow: 0px 1px 2px 2px #dbdbdb;' : 'box-shadow: 0px 1px 2px 2px #4B5563;'}
  }
`

const SearchSelect = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  min-width: 4rem;
  font-size: 1rem;
  ${props => (props.theme === 'light' ? '' : darkTheme.whiteColor)}
  &:focus {
    outline: none;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(15%);
    opacity: 1;
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
  min-width: 4rem;
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
  height: 1.7rem;
  border-radius: 0.2rem;
  padding-left: 0.5rem;

  ${props => (props.theme === 'light' ? '' : darkTheme.whiteColor)};
  ${props => (props.theme === 'light' ? lightTheme.background : darkTheme.background)}
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
  margin-left: 0.5rem;
  svg {
    color: #fff;
    font-size: 1rem;
  }
`
