import {useState} from 'react'
// import styled from 'styled-components'
import {FcSportsMode} from 'react-icons/fc'
import styled from 'styled-components'
import Wakesurfing from '../Assets/MainPage/wakesurfing.png'
import Restaurant from '../Assets/MainPage/restaurant.png'
import Nature from '../Assets/MainPage/nature.png'
import Culture from '../Assets/MainPage/culture.png'
import Shopping from '../Assets/MainPage/shopping.png'
import Family from '../Assets/MainPage/family.png'
import Cute from '../Assets/MainPage/cute.png'
import Health from '../Assets/MainPage/health.png'
import Religion from '../Assets/MainPage/religion.png'
import Activity from '../Assets/MainPage/activity.png'

export default function ThemeSlide() {
  const [category, setCategory] = useState('레저')

  const handleCategory = (categoryStr: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCategory(categoryStr)
  }

  return (
    <TabBtnWrapStyled>
      <TabBtnUl>
        {themeSlide.map((data, index) => (
          <li key={index}>
            <TabBtnStyled
              type='submit'
              active={category === `${data.category}` ? true : false}
              onClick={e => handleCategory(data.category, e)}
            >
              <img src={data.icon} alt={data.category} />
              <span>{data.category}</span>
            </TabBtnStyled>
          </li>
        ))}
      </TabBtnUl>
    </TabBtnWrapStyled>
  )
}

const themeSlide = [
  {
    icon: Wakesurfing,
    category: '레저',
  },
  {
    icon: Restaurant,
    category: '맛집',
  },
  {
    icon: Nature,
    category: '자연',
  },
  {
    icon: Culture,
    category: '문화',
  },
  {
    icon: Shopping,
    category: '쇼핑',
  },
  {
    icon: Family,
    category: '가족',
  },
  {
    icon: Cute,
    category: '반려동물',
  },
  {
    icon: Health,
    category: '건강',
  },
  {
    icon: Religion,
    category: '종교',
  },
  {
    icon: Activity,
    category: '체험',
  },
]

// 탭
const TabBtnWrapStyled = styled.section`
  margin-top: 2rem;
  padding-bottom: 1rem;
  // overflow-x: scroll;
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
  background-color: transparent;
  border-radius: 3rem;
  font-size: 1.5rem;
  padding: 1rem;
  border: solid 0.15rem ${props => (props.active ? '#1877f2' : 'transparent')};
  color: ${props => (props.active ? '#1877f2' : '#a4a4a4')};
  height: 3.3125rem;
  cursor: pointer;
  :hover {
    color: #1877f2;
  }
  img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.5rem;
  }
`
