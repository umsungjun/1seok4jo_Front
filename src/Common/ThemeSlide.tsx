import {useState} from 'react'
// import styled from 'styled-components'
import {FcSportsMode} from 'react-icons/fc'
import styled from 'styled-components'

export default function ThemeSlide() {
  const [category, setCategory] = useState('')

  return (
    <TabBtnWrapStyled>
      <ul>
        {themeSlide.map((data, index) => (
          <li key={index}>
            <TabBtnStyled
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
    icon: {FcSportsMode},
    category: '맛집',
  },
  {
    icon: {FcSportsMode},
    category: '자연',
  },
  {
    icon: {FcSportsMode},
    category: '문화',
  },
  {
    icon: {FcSportsMode},
    category: '쇼핑',
  },
  {
    icon: {FcSportsMode},
    category: '체험',
  },
  {
    icon: {FcSportsMode},
    category: '종교',
  },
  {
    icon: {FcSportsMode},
    category: '가족',
  },
  {
    icon: {FcSportsMode},
    category: '반려동물',
  },
  {
    icon: {FcSportsMode},
    category: '건강',
  },
]

// 탭
const TabBtnWrapStyled = styled.div`
  margin-top: 2rem;
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
  font-size: 1.5rem;
  color: ${props => (props.active ? '#1877f2' : '#a4a4a4')};
  // font-weight: ${props => (props.active ? '700' : '500')};
  height: 53px;
  cursor: pointer;
  :hover {
    color: #1877f2;
  }
`
