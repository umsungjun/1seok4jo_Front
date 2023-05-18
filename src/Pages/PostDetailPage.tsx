import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RWebShare} from 'react-web-share'
import {FiShare} from 'react-icons/fi'
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Scrollbar} from 'swiper'
SwiperCore.use([Navigation, Scrollbar])
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

import MapContainer from '../Component/MapContainer'
import PostDetailFeed from '../Component/PostDetailFeed'
import Comment from '../Component/Comment'

import {PostDetailInterface, fetchThemePostDetailApi} from '../Service/postDetailService'
import {fetchThemePostListApi} from '../Service/postThemeService'
import {fetchGetCommentApi} from '../Service/postCommentService'

import {RootState} from '../Store'
import {scrollToTop} from '../util/scrollToTop'
import {basicUser} from '../Mock/users'

import {PostDetailInfo} from '../Mock/postDetail'
import type {PostDetailInfoInterface} from '../Interface/interface'
import type {PostCommentInterface} from '../Interface/interface'

const PostDetailPage = () => {
  scrollToTop()
  const {id} = useParams()
  const [themePostList, setThemePostList] = useState<
    {
      baseUrl: string
      endDate: string
      likeCount: number
      location: string
      postId: number
      startDate: string
      storeFileUrl: string[]
      title: string
    }[]
  >([])
  const [categoryId] = useState(1)
  const [postDetail, setPostDetail] = useState<PostDetailInterface>({
    baseUrl: '',
    commentCount: 0,
    detail: '',
    endDate: '',
    hashtag: '',
    id: 0,
    likeCount: 0,
    location: '',
    nickname: '',
    startDate: '',
    storeFileUrl: [],
    themeId: 0,
    title: '',
    userProfileImage: '',
  })
  const [commentList, setCommentList] = useState<PostCommentInterface[]>([])
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postDetailResponse = await fetchThemePostDetailApi(Number(id))
        const commentListResponse = await fetchGetCommentApi(Number(id))
        setPostDetail(postDetailResponse.result)
        setCommentList(commentListResponse.result)
      } catch (error) {
        console.error({error})
        throw error
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const fetchThemePostList = async () => {
      try {
        const postList = await fetchThemePostListApi(categoryId)
        const currentPost = postList?.result.find((post: {postId: string | undefined}) => post.postId === id)
        const randomPosts: number[] = []
        const postListLength = postList?.result.length

        while (randomPosts.length < 4) {
          const randomIndex = Math.floor(Math.random() * postListLength)
          const randomPost = postList?.result[randomIndex]
          if (randomPost.postId !== currentPost?.postId && randomPost.categoryId === currentPost?.categoryId) {
            randomPosts.push(randomIndex)
          }
        }

        const randomPostList = randomPosts.map(index => postList?.result[index])
        console.log(randomPostList)
        setThemePostList(randomPostList)
      } catch (error) {
        console.error('Error fetching theme post list:', error)
        throw error
      }
    }

    fetchThemePostList()
  }, [categoryId, id])

  useEffect(() => {
    const selectedPost = PostDetailInfo.find(post => post.id === parseInt(id as string))
    setPost(selectedPost)
  }, [id])

  const [post, setPost] = useState<PostDetailInfoInterface | undefined>()
  const [isLiked, setIsLiked] = useState(false)
  const [scrollbar] = useState<{
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

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Detail>
      {/* Header component */}
      <Header>
        <Title>{postDetail.title}</Title>
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

          {/* LikeButton component */}
          <LikeButton type='submit'>
            {isLiked ? <BsSuitHeartFill onClick={handleClick} /> : <BsSuitHeart onClick={handleClick} />}
            좋아요
          </LikeButton>
        </Buttons>
      </Header>

      {/* ImageArea component */}
      <ImageArea>
        {postDetail.storeFileUrl.map((url, index) => (
          <Image key={`${url}${index}`}>
            <img src={`https://compass-s3-bucket.s3.ap-northeast-2.amazonaws.com/${url}`} alt={'postDetailImg'} />
          </Image>
        ))}
      </ImageArea>

      {/* SwiperArea component */}
      <SwiperArea>
        <Swiper {...slide_settings} scrollbar={scrollbar}>
          {postDetail.storeFileUrl.map((url, index) => (
            <SwiperSlide key={`${url}${index}`}>
              <div className='swiper-slide'>
                <Image>
                  <img src={`https://compass-s3-bucket.s3.ap-northeast-2.amazonaws.com/${url}`} alt={'postDetailImg'} />
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
            {postDetail.location} / {postDetail.startDate} ~ {postDetail.endDate}
          </Text>
          <Status>
            댓글 {postDetail.commentCount}개 · 좋아요 {postDetail.likeCount}
          </Status>
        </Info>

        {/* ContentBox component */}
        <ContentBox>
          <PostArea>
            <ProfileInfo>
              <ProfileImage>
                <img
                  src={`https://s3.ap-northeast-2.amazonaws.com/compass-s3-bucket/${postDetail.userProfileImage}`}
                  alt='작성자 프로필'
                />
              </ProfileImage>
              <NickName>{postDetail.nickname}</NickName>
            </ProfileInfo>
            {postDetail.detail}
          </PostArea>
        </ContentBox>

        {/* HashtagTitle component */}
        <HashtagTitle>
          <Suggest># 이런 분들에게 추천합니다</Suggest>
          <Hashtag>{postDetail.hashtag}</Hashtag>
        </HashtagTitle>
      </Body>
      <Bottom>
        <CommentBox>
          <Comment commentId={0} userId={0} nickname={''} imageUrl={[]} content={''} createdAt={''} updatedAt={''} />
        </CommentBox>
        <MapContainer />
      </Bottom>

      {/* ThemePostList component */}
      <h4>같은 테마의 이런 곳은 어떨까요?</h4>
      <PostDetailFeed themePostList={themePostList} />
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

  // .scroll-box {
  //   width: 100%;
  //   height: 45rem;
  //   ::-webkit-scrollbar {
  //     width: 0.5rem;
  //     height: 0.2rem;
  //     background-color: transparent;
  //   }
  //   ::-webkit-scrollbar-thumb {
  //     border-radius: 1rem;
  //     background-color: #c0c0c0;
  //   }
  //   @media (max-width: 576px) {
  //     width: 100%;
  //   }
  // }
`
const CommentList = styled.li`
  display: block;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
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
