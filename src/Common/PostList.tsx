import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import feed1 from '../Assets/MainPage/feed-1.png'
import feed2 from '../Assets/MainPage/feed-2.png'
import feed3 from '../Assets/MainPage/feed-3.png'
import feed4 from '../Assets/MainPage/feed-4.png'
import feed5 from '../Assets/MainPage/feed-5.png'
import feed6 from '../Assets/MainPage/feed-6.png'
import feed7 from '../Assets/MainPage/feed-7.png'
import feed8 from '../Assets/MainPage/feed-8.png'
import {BsFillSuitHeartFill} from 'react-icons/bs'
// import LikeButton from './LikeButton'

export default function PostList() {
  const [isActive, setIsActive] = useState(false)

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/PostDetail`)
  }

  return (
    <PostListStyled>
      {feedLists.map((data, index) => (
        <FeedStyled key={index} onClick={handleClick}>
          {/* <button type='button'>
            <BsSuitHeart
              onClick={() => setIsActive(current => !current)}
              style={{
                color: isActive ? 'red' : 'gray',
              }}
            />
          </button> */}
          <img src={data.image} alt={data.name} />

          <div className='text'>
            <FeedInfoStyled>
              <div className='title'>{data.title}</div>
              <div className='location'>{data.location}</div>
              <div className='date'>{data.date}</div>
            </FeedInfoStyled>

            <FeedLikeStyled>
              <LikeButtonStyled>
                <BsFillSuitHeartFill />
              </LikeButtonStyled>

              <div>{data.likes}</div>
            </FeedLikeStyled>
          </div>
        </FeedStyled>
      ))}
    </PostListStyled>
  )
}

const feedLists = [
  {
    image: feed1,
    name: '사진',
    title: '한국관광공사',
    location: '강릉',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed2,
    name: '사진',
    title: '렛츠코레일',
    location: '설악산',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed3,
    name: '사진',
    title: '가족여행카페',
    location: '제주도',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed4,
    name: '사진',
    title: '한국관광공사',
    location: '제주도',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },

  {
    image: feed5,
    name: '사진',
    title: '렛츠코레일',
    location: '강릉',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed6,
    name: '사진',
    title: '렛츠코레일',
    location: '강릉',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed7,
    name: '사진',
    title: '렛츠코레일',
    location: '경주',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed8,
    name: '사진',
    title: '렛츠코레일',
    location: '부산',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed1,
    name: '사진',
    title: '한국관광공사',
    location: '강릉',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed2,
    name: '사진',
    title: '렛츠코레일',
    location: '설악산',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed3,
    name: '사진',
    title: '가족여행카페',
    location: '제주도',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed4,
    name: '사진',
    title: '한국관광공사',
    location: '제주도',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },

  {
    image: feed5,
    name: '사진',
    title: '렛츠코레일',
    location: '강릉',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed6,
    name: '사진',
    title: '렛츠코레일',
    location: '강릉',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed7,
    name: '사진',
    title: '렛츠코레일',
    location: '경주',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
  {
    image: feed8,
    name: '사진',
    title: '렛츠코레일',
    location: '부산',
    date: '2023.01.05 - 2023.01.09',
    likes: '5',
  },
]

const PostListStyled = styled.ul`
  margin-top: 3rem;
  display: flex;
  flex-flow: row wrap;
  padding: 0px 5rem;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  gap: 3.7rem;
`

const FeedStyled = styled.li`
  list-style: none;
  cursor: pointer;
  // &:hover {
  //   transform: scale(1.1);
  // }
  // 호버액션 넣을까말까
  img {
    width: 18.75rem;
    height: 18.75rem;
    object-fit: cover;
    border-radius: 1.25rem;
  }
  .text {
    display: flex;
    justify-content: space-between;
    margin: 0.625rem 0 1.25rem 0;
  }
`
const FeedInfoStyled = styled.label`
  div {
    margin: 0.5rem;
  }
  span {
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: 19.2px;
  }
  .date {
    font-size: 0.9rem;
    color: gray;
  }
`
const FeedLikeStyled = styled.div`
  font-weight: semi-bold;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
`
const LikeButtonStyled = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
  color: red;
  margin-right: 0.625rem;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`
