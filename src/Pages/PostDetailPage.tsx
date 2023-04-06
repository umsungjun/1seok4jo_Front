import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import banner1 from '../Assets/MainPage/banner-1.png'
import banner2 from '../Assets/MainPage/banner-2.png'
import banner3 from '../Assets/MainPage/banner-3.png'
import banner4 from '../Assets/MainPage/banner-4.png'
import banner5 from '../Assets/MainPage/banner-5.png'

export default function PostDetailPage() {
  const detailImage = [
    {
      image: banner1,
      name: '한국관광공사',
    },
    {
      image: banner2,
      name: '렛츠코레일',
    },
    {
      image: banner3,
      name: '가족여행카페',
    },
    {
      image: banner4,
      name: '비짓서울',
    },
    {
      image: banner5,
      name: '비짓서울',
    },
  ]

  return (
    <Detail>
      <Header>
        <Title>휴양지로 너무 좋습니다!</Title>
        <Buttons>
          <button>공유하기</button>
          <button>좋아요</button>
        </Buttons>
      </Header>
      <ImageArea>
        {detailImage.map((data, index) => (
          <Image key={index}>
            <img src={data.image} alt={data.name} />
          </Image>
        ))}
      </ImageArea>
    </Detail>
  )
}

const Detail = styled.section`
  padding: 10rem 5rem 0 5rem;
`
const Header = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`
const Title = styled.h1`
  font-size: 2rem;
`
const Buttons = styled.div`
  display: flex;
`
const ImageArea = styled.section`
  height: 30rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
`
const Image = styled.div`
  :nth-child(1) {
    grid-row: 1 / span 2;
    height: 30rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
