import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import MapContainer from '../Component/MapContainer'
import {PostListStyled} from '../Component/PostDetailFeed'
import PostDetailFeed from '../Component/PostDetailFeed'
import sangchu from '../Assets/sangchu.png'
import {RWebShare} from 'react-web-share'
import {FiShare} from 'react-icons/fi'
import {BsSuitHeart} from 'react-icons/bs'
import {BsSuitHeartFill} from 'react-icons/bs'
import {PostDetailInfo} from '../Mock/postDetail'
import type {PostDetailInfoInterface} from '../Interface/interface'
import {scrollToTop} from '../util/scrollToTop'
import {useParams} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Scrollbar} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
SwiperCore.use([Navigation, Scrollbar]) // *

const PostDetailPage = () => {
  //페이지 로딩시 상단부터 노출되도록
  scrollToTop()
  const {id} = useParams()
  const [post, setPost] = useState<PostDetailInfoInterface>()
  const [isLiked, setIsLiked] = useState(false)
  const [scrollbar, setScrollbar] = useState<{
    el: string
    hide: boolean
  }>({
    el: '.swiper-scrollbar',
    hide: false,
  })

  const prevRef = React.useRef<HTMLDivElement>(null)
  const nextRef = React.useRef<HTMLDivElement>(null)

  const slide_settings = {
    slidesPerView: 1,
    loop: true,
    navigation: {
      prevEl: prevRef.current ? prevRef.current : undefined,
      nextEl: nextRef.current ? nextRef.current : undefined,
    },
    scrollbar: {draggable: true},
    className: 'swiper-slide',
  }

  const handleClick = () => {
    setIsLiked(!isLiked)
  }

  useEffect(() => {
    console.log('id', id)
    const selectedPost = PostDetailInfo.find(post => post.id === parseInt(id as string))
    setPost(selectedPost)
  }, [id])

  if (!post) {
    return <div>존재하지 않는 게시물입니다.</div>
  }
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Detail>
      <Header>
        <Title>{post?.title}</Title>
        <Buttons>
          <RWebShare
            data={{
              text: `${post?.post}`,
              url: currentUrl,
              title: 'Compass: ' + `${post?.title}`,
            }}
            onClick={() => console.log('공유 완료')}
          >
            <ShareButton>
              <FiShare />
              공유하기
            </ShareButton>
          </RWebShare>

          <LikeButton type='submit'>
            {isLiked ? <BsSuitHeartFill onClick={handleClick} /> : <BsSuitHeart onClick={handleClick} />}
            좋아요
          </LikeButton>
        </Buttons>
      </Header>
      <ImageArea>
        {post?.images?.map(data => (
          <Image key={data.name}>
            <img src={data.url} alt={data.name} />
          </Image>
        ))}
      </ImageArea>
      <SwiperArea>
        <Swiper {...slide_settings} scrollbar={scrollbar}>
          {post?.images?.map(data => (
            <SwiperSlide key={data.name}>
              <div className='swiper-slide'>
                <Image>
                  <img src={data.url} alt={data.name}></img>
                </Image>
              </div>
            </SwiperSlide>
          ))}
          <div className='swiper-scrollbar'></div>
          {prevRef.current && <div className='swiper-button-prev' ref={prevRef} />}
          {nextRef.current && <div className='swiper-button-next' ref={nextRef} />}
        </Swiper>
      </SwiperArea>
      <Body>
        <Info>
          <Text>
            {post?.location} / {post?.startDate} ~ {post?.endDate}
          </Text>
          <Status>
            댓글 {post?.comment}개 · 좋아요 {post?.likes}
          </Status>
        </Info>
        <ContentBox>
          <PostArea>
            <ProfileInfo>
              <ProfileImage>
                <img src={sangchu} alt='하상츄' />
              </ProfileImage>
              <NickName>{post?.user}</NickName>
            </ProfileInfo>
            {post?.post}
          </PostArea>
        </ContentBox>
        <HashtagTitle>
          <Suggest># 이런 분들에게 추천합니다</Suggest>
          <Hashtag>
            {post?.hashtags?.map((hashtag, index) => (
              <span key={index}> #{hashtag}</span>
            ))}
          </Hashtag>
        </HashtagTitle>
      </Body>
      <Bottom>
        <CommentBox>
          <div className='scroll-box'>
            {post?.comments?.map(data => {
              const {nickName, date, comment} = data
              return (
                <CommentList key={nickName}>
                  <UserProfile>
                    <img src={sangchu} alt='하상츄' />
                    <UserInfo>
                      <div>{nickName}</div>
                      <div>{date}</div>
                    </UserInfo>
                  </UserProfile>
                  <Comment>{comment}</Comment>
                </CommentList>
              )
            })}
          </div>
        </CommentBox>
        <MapContainer />
      </Bottom>
      <h4>같은 테마의 이런 곳은 어떨까요?</h4>
      <PostDetailFeed />
    </Detail>
  )
}

export default PostDetailPage

const Detail = styled.section`
  padding: 10rem 5rem 0 5rem;
  @media (max-width: 576px) {
    padding: 10rem 2rem 0 2rem;
    .swiper-button-prev,
    .swiper-button-next {
      color: #000;
      :hover {
        color: #c0c0c0;
        scale: 1.1;
        transition: all 0.3s ease-in-out;
      }
    }
  }
  h4 {
    font-size: 2rem;
    padding-top: 5rem;
    @media (max-width: 960px) {
      display: flex;
      justify-content: center;
    }
  }
`
const Header = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media (max-width: 576px) {
    display: block;
    margin-bottom: 1rem;
  }
`
const Title = styled.h1`
  font-size: 2rem;
  @media (max-width: 576px) {
    margin-bottom: 2rem;
  }
`
const Buttons = styled.div`
  display: flex;
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
  button {
    display: flex;
    background-color: #fff;
    border: 1px solid transparent;
    font-size: 1.25rem;
    cursor: pointer;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }
`
const ShareButton = styled.button`
  margin-right: 1rem;
`
const LikeButton = styled.button`
  svg {
    fill: red;
  }
`
const ImageArea = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
  @media (max-width: 576px) {
    display: none;
  }
`
const SwiperArea = styled.section`
  display: none;
  @media (max-width: 576px) {
    display: flex;
  }
`
const Image = styled.div`
  height: 19.25rem;
  :nth-child(1) {
    grid-row: 1 / span 2;
    height: 39rem;
  }
  background-color: #c0c0c0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Body = styled.section`
  padding: 5rem 0;
  width: 100%;
  border-bottom: 1px solid #c0c0c0;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  @media (max-width: 576px) {
    display: block;
    margin-bottom: 1rem;
  }
`
const Text = styled.h2`
  font-size: 1.5rem;
  @media (max-width: 960px) {
    font-size: 1.75rem;
  }
`
const Status = styled.h2`
  font-size: 1rem;
  @media (max-width: 960px) {
    font-size: 1.3rem;
  }
  @media (max-width: 576px) {
    margin: 1.5rem 0;
    display: flex;
    justify-content: flex-end;
  }
`
const ContentBox = styled.section`
  max-height: 50rem;
  margin-bottom: 3rem;
  display: flex;
`
const ProfileInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
`
const ProfileImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  background-color: #c0c0c0;
  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 5rem;
  }
`
const NickName = styled.span`
  font-size: 1.3rem;
  padding: 1rem 0 0 1rem;
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`
const PostArea = styled.section`
  font-size: 1.2rem;
  padding: 1.3rem;
  width: 100%;
  height: 15rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`
const HashtagTitle = styled.div``

const Suggest = styled.h2`
  font-size: 1.5rem;
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`

const Hashtag = styled.h3`
  color: gray;
  padding-top: 2rem;
  font-size: 1.2rem;
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`

const Bottom = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  height: auto;
  padding-bottom: 8rem;
  border-bottom: 1px solid #c0c0c0;
  @media (max-width: 960px) {
    display: block;
  }
`
const CommentBox = styled.section`
  width: 50%;
  height: 50rem;
  border: 1px solid #c0c0c0;
  border-radius: 3rem;
  padding: 2rem;

  @media (max-width: 576px) {
    width: 100%;
    padding: 1.5rem;
  }

  .scroll-box {
    width: 45.5%;
    height: 45rem;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.2rem;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background-color: #c0c0c0;
    }
    @media (max-width: 576px) {
      width: 100%;
    }
  }
`
const CommentList = styled.li`
  display: block;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`
const Comment = styled.div`
  width: auto;
`

const UserProfile = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  img {
    width: 4rem;
    height: 4rem;
    background-color: #c0c0c0;
    border-radius: 5rem;
    margin-right: 1.5rem;
  }
`
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
