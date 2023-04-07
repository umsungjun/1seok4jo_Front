import {useState} from 'react'
// import styled from 'styled-components'
import {FcSportsMode} from 'react-icons/fc'
import styled from 'styled-components'

export default function ThemeSlide() {
  const [category, setCategory] = useState('레저')

  const handleCategoty = (categoryStr: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCategory(categoryStr)
  }

  return (
    <TabBtnWrapStyled>
      <TabBtnUl>
        {themeSlide.map((data, index) => (
          <li key={index}>
            <TabBtnStyled
              active={category === `${data.category}` ? true : false}
              onClick={e => handleCategoty(data.category, e)}
            >
              {data.category}
            </TabBtnStyled>
          </li>
        ))}
      </TabBtnUl>
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
  {
    icon: {FcSportsMode},
    category: '종교',
  },
  {
    icon: {FcSportsMode},
    category: '체험',
  },
]

// 탭
const TabBtnWrapStyled = styled.section`
  margin-top: 2rem;
  padding-bottom: 1rem;
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  // ::-webkit-scrollbar {
  //   display: none;
  // }
  ul {
    display: flex;
  }
  ul li + li {
    margin-left: 30px;
  }
`

const TabBtnUl = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 3rem;
`

// 탭 버튼
const TabBtnStyled = styled.button<{active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  border: solid 0.15rem ${props => (props.active ? '#1877f2' : 'transparent')};
  background-color: transparent;
  border-radius: 3rem;
  font-size: 1.5rem;
  color: ${props => (props.active ? '#1877f2' : '#a4a4a4')};
  height: 53px;
  cursor: pointer;
  :hover {
    color: #1877f2;
  }
`
