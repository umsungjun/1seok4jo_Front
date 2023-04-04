import React, {useState} from 'react'
import styled from 'styled-components'
import feed1 from '../Assets/MainPage/feed-1.png'
import feed2 from '../Assets/MainPage/feed-2.png'
import feed3 from '../Assets/MainPage/feed-3.png'
import feed4 from '../Assets/MainPage/feed-4.png'
import feed5 from '../Assets/MainPage/feed-5.png'
import feed6 from '../Assets/MainPage/feed-6.png'
import feed7 from '../Assets/MainPage/feed-7.png'
import feed8 from '../Assets/MainPage/feed-8.png'
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import {BsFillSuitHeartFill} from 'react-icons/bs'
// import LikeButton from './LikeButton'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import {Button} from '@mui/material'

export default function PostList() {
  const [isActive, setIsActive] = useState(false)

  return (
    <PostListStyled>
      {feedLists.map((data, index) => (
        <FeedStyled key={index}>
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

const PostListStyled = styled.div`
  position: relative;
  top: 200px;
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 30px;
`

const FeedStyled = styled.div`
  margin-right: 30px;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
  }
  .text {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }
`
const FeedInfoStyled = styled.div`
  div {
    margin: 8px;
  }
  span {
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: 1.2rem;
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
  justify-content: flex-end;
  // border: 1px solid red;
`
const LikeButtonStyled = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: red;
  margin-right: 10px;
  svg {
    width: 25px;
    height: 25px;
  }
`
