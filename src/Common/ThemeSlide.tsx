import {useState} from 'react'
// import styled from 'styled-components'
import styled from 'styled-components'
import {MdOutlineSportsHandball, MdOutlineFoodBank, MdSportsTennis, MdFamilyRestroom} from 'react-icons/md'
import {TbPhotoHeart, TbCross, TbTrees} from 'react-icons/tb'
import {HiShoppingBag} from 'react-icons/hi'
import {FaDog} from 'react-icons/fa'
import {GiStrong} from 'react-icons/gi'

export default function ThemeSlide() {
  const [category, setCategory] = useState('레저')

  const handleCategory = (categoryStr: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setCategory(categoryStr)
  }

  return (
    <TabBtnWrapStyled>
      <TabBtnUl>
        {themeSlide.map(data => (
          <li key={data.category}>
            <TabBtnStyled
              active={category === `${data.category}` ? true : false}
              onClick={e => handleCategory(data.category, e)}
            >
              {data.icon}
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
    icon: <MdOutlineSportsHandball />,
  },
  {
    category: '맛집',
    icon: <MdOutlineFoodBank />,
  },
  {
    category: '자연',
    icon: <TbTrees />,
  },
  {
    category: '문화',
    icon: <TbPhotoHeart />,
  },
  {
    category: '쇼핑',
    icon: <HiShoppingBag />,
  },
  {
    category: '가족',
    icon: <MdFamilyRestroom />,
  },
  {
    category: '반려동물',
    icon: <FaDog />,
  },
  {
    category: '건강',
    icon: <GiStrong />,
  },
  {
    category: '종교',
    icon: <TbCross />,
  },
  {
    category: '체험',
    icon: <MdSportsTennis />,
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
  svg {
    width: 1.8rem;
    height: 1.8rem;
    padding-right: 0.5rem;
  }
`
