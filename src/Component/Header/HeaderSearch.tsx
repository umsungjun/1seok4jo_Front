import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'

import {GoSearch} from 'react-icons/go'

const searchCondition = ['제목', '내용', '해시태그']

export default function HeaderSearchBox() {
  const [searchSelect, setSearchSelect] = useState('제목')
  const [selectUl, setSelectUl] = useState(false)

  const handleSearchSelect = () => {
    setSelectUl(true)
  }

  const handleSearchValue = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectUl(false)
    setSearchSelect(e.currentTarget.innerText)
  }

  return (
    <SearchBox>
      <SearchSelect onClick={handleSearchSelect}>{searchSelect}</SearchSelect>
      {selectUl && (
        <SearchUl>
          {searchCondition.map(searchStr => {
            if (searchSelect !== searchStr) {
              return (
                <SearchLi onClick={handleSearchValue} value={searchStr}>
                  {searchStr}
                </SearchLi>
              )
            }
          })}
        </SearchUl>
      )}
      <Bar />
      <Search />
      <SearchButton>
        <GoSearch />
      </SearchButton>
    </SearchBox>
  )
}

const SearchBox = styled.div`
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  border: 1px solid #c0c0c0;
  border-radius: 2rem;
  box-shadow: 0px 1px 1px 1px #dbdbdb;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 1px 2px 2px #dbdbdb;
  }

  &:focus {
    box-shadow: 0px 1px 2px 2px #dbdbdb;
  }
`

const SearchSelect = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  min-width: 4rem;
  font-size: 1rem;
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
