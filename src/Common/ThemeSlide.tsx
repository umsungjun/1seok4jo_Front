import {useState, useEffect} from 'react'
// import styled from 'styled-components'
import styled from 'styled-components'
import {MdOutlineSportsHandball, MdOutlineFoodBank, MdSportsTennis, MdFamilyRestroom} from 'react-icons/md'
import {TbPhotoHeart, TbCross, TbTrees} from 'react-icons/tb'
import {HiShoppingBag} from 'react-icons/hi'
import {FaDog} from 'react-icons/fa'
import {GiStrong} from 'react-icons/gi'

interface ThemeSlideProps {
  setCategoryId: (value: number) => void
}

export default function ThemeSlide({setCategoryId}: ThemeSlideProps) {
  const [category, setCategory] = useState('레저')

  const handleCategory = (categoryStr: string, e: React.MouseEvent<HTMLButtonElement>, categoryId: number) => {
    e.preventDefault()
    setCategory(categoryStr)
    setCategoryId(categoryId)
  }

  return (
    <TabBtnWrapStyled>
      <TabBtnUl>
        {themeSlide.map(data => (
          <li key={data.id}>
            <TabBtnStyled
              active={category === `${data.category}` ? true : false}
              onClick={e => handleCategory(data.category, e, data.id)}
            >
              {data.icon}
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
    id: 1,
    category: '레저',
    icon: <MdOutlineSportsHandball />,
  },
  {
    id: 2,
    category: '맛집',
    icon: <MdOutlineFoodBank />,
  },
  {
    id: 3,
    category: '자연',
    icon: <TbTrees />,
  },
  {
    id: 4,
    category: '문화',
    icon: <TbPhotoHeart />,
  },
  {
    id: 5,
    category: '쇼핑',
    icon: <HiShoppingBag />,
  },
  {
    id: 6,
    category: '가족',
    icon: <MdFamilyRestroom />,
  },
  {
    id: 7,
    category: '반려동물',
    icon: <FaDog />,
  },
  {
    id: 8,
    category: '건강',
    icon: <GiStrong />,
  },
  {
    id: 9,
    category: '종교',
    icon: <TbCross />,
  },
  {
    id: 10,
    category: '체험',
    icon: <MdSportsTennis />,
  },
]

// 탭
const TabBtnWrapStyled = styled.section`
  margin-top: 3rem;
  overflow: scroll hidden;
  padding-bottom: 1rem;
  width: 90%;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    // gap: 2rem;
  }
`

const TabBtnUl = styled.ul``

// 탭 버튼
const TabBtnStyled = styled.button<{active: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.5rem;
  height: 3.3rem;
  border: solid 0.2rem ${props => (props.active ? '#1877f2' : 'transparent')};
  background-color: transparent;
  border-radius: 3rem;
  font-size: 1.2rem;
  color: ${props => (props.active ? '#1877f2' : '#a4a4a4')};
  cursor: pointer;
  :hover {
    color: #1877f2;
  }
  svg {
    width: 1.7rem;
    height: 1.7rem;
    padding-right: 0.5rem;
  }
  span {
    position: relative;
    top: 2%;
  }
`
