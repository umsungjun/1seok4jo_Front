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
      <Body>
        <Info>
          <Text>강릉 / 2023-01.05 ~ 2023.01.09</Text>
          <Status>댓글 21개 좋아요 10</Status>
        </Info>
        <ContentBox>
          <TextArea readOnly />
        </ContentBox>
        <Suggest>
          <Title># 이런 분들에게 추천합니다</Title>
          <Hashtag>#여행 #사진 # 가족여행</Hashtag>
        </Suggest>
      </Body>
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

const Body = styled.section`
  padding: 5rem 0;
  width: 90%;
  // border: 1px solid red;
`

const Info = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`
const Text = styled.h2``
const Status = styled.div`
  font-size: 16px;
`
const ContentBox = styled.section`
  max-height: 50rem;
  margin-bottom: 3rem;
  display: flex;
`

const TextArea = styled.textarea`
  font-size: 1.3rem;
  padding: 1rem;
  width: 100%;
  height: 15rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
  border: none;
  resize: none;
`

const Suggest = styled.h3``

const Hashtag = styled.h5`
  color: gray;
  padding-top: 2rem;
`
