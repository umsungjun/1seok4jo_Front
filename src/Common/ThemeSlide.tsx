import {useState} from 'react'
// import styled from 'styled-components'
import styled from '@emotion/styled'

export default function ThemeSlide() {
  const [category, setCategory] = useState('')

  return (
    <TabBtnWrapStyled>
      <ul>
        {themeSlide.map((data, index) => (
          <li key={index}>
            <TabBtnStyled
              // active
              active={category === `${data.category}` ? true : false}
              onClick={() => setCategory(`${data.category}`)}
            >
              {data.category}
            </TabBtnStyled>
          </li>
        ))}
      </ul>
    </TabBtnWrapStyled>
  )
}

const themeSlide = [
  {
    category: '레저',
  },
  {
    category: '맛집',
  },
  {
    category: '자연',
  },
  {
    category: '문화',
  },
  {
    category: '쇼핑',
  },
  {
    category: '체험',
  },
  {
    category: '종교',
  },
  {
    category: '가족',
  },
  {
    category: '반려동물',
  },
  {
    category: '건강',
  },
]

// 탭
const TabBtnWrapStyled = styled.div`
  position: relative;
  top: 150px;
  z-index: 1;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  ul {
    display: flex;
    margin: 0 30px;
  }
  ul li + li {
    margin-left: 30px;
  }
`

// 탭 버튼
const TabBtnStyled = styled.div<{active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  border-bottom: solid 1px ${props => (props.active ? '#1877f2' : 'none')};
  font-size: 1.6rem;
  color: ${props => (props.active ? '#1877f2' : '#a4a4a4')};
  height: 53px;
  cursor: pointer;
  :hover {
    color: #1877f2;
  }
`
