import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsFillSuitHeartFill, BsSuitHeart} from 'react-icons/bs'
import {PostFeed} from '../Mock/postFeed'

import {users} from '../Mock/users'

import {MdDeleteOutline} from 'react-icons/md'
import {BiEditAlt} from 'react-icons/bi'
import SlideImg from '../Popups/SlideImg'

const PostList = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [login, setLogin] = useState(users[0]) //null
  const [showHandleSlideImg, setShowHandleSlideImg] = useState<boolean>(false)
  const [slideImgs, setSlideImgs] = useState<string[]>([])
  const [slideId, setSlideId] = useState<number>(0)

  const navigate = useNavigate()

  const setSlideImgAndShow = (images: string[], id: number) => {
    setSlideImgs(images)
    setShowHandleSlideImg(true)
    setSlideId(id)
  }

  // const handleSlideImg = (images: {url: string; name: string}[]) => {
  //   const urls = images.map(image => image.url)
  //   setSlideImgs(urls)
  //   setShowHandleSlideImg(true)
  //   console.log(urls)
  // }

  const handleLikeClick = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    console.log('좋아요 클릭')
    setIsLiked(!isLiked)
  }

  const handleDeletePost = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    console.log('삭제 클릭')
    confirm('정말 삭제하시겠습니까?') // TODO 팝업
  }

  const handleEditPost = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    console.log('편집 클릭')
    navigate(`/PostEdit`)
  }

  return login === null ? (
    <PostListStyled>
      {PostFeed.map(data => {
        const {id, title, location, date, likes, images, name} = data
        return (
          <FeedStyled key={id}>
            <ImgBox>
              <img src={images[0].url} alt={name} />
            </ImgBox>
            <div className='text'>
              <FeedInfoStyled>
                <div className='title'>{title}</div>
                <div className='location'>{location}</div>
                <div className='date'>{date}</div>
              </FeedInfoStyled>

              <FeedLikeStyled>
                <LikeButtonStyled>
                  <BsFillSuitHeartFill />
                </LikeButtonStyled>

                <div>{likes}</div>
              </FeedLikeStyled>
            </div>
          </FeedStyled>
        )
      })}
    </PostListStyled>
  ) : (
    <PostListStyled>
      {PostFeed.map(data => {
        const {id, nickName, title, location, date, likes, images, name} = data
        return nickName === login.nickName ? (
          <FeedStyled key={id}>
            <ImgBox
              onClick={() =>
                setSlideImgAndShow(
                  images.map(image => image.url),
                  id,
                )
              }
            >
              <DeleteButton onClick={handleDeletePost} />
              <img src={images[0].url} alt={name} />
              <EditButton onClick={handleEditPost} />
            </ImgBox>
            <div className='text'>
              <FeedInfoStyled>
                <div className='title'>{title}</div>
                <div className='location'>{location}</div>
                <div className='date'>{date}</div>
              </FeedInfoStyled>

              <FeedLikeStyled>
                <LikeButtonStyled>
                  <BsFillSuitHeartFill />
                </LikeButtonStyled>

                <div>{likes}</div>
              </FeedLikeStyled>
            </div>
            {showHandleSlideImg && (
              <SlideImg
                show={showHandleSlideImg}
                setShowHandleSlideImg={setShowHandleSlideImg}
                imgs={slideImgs}
                id={slideId}
              />
            )}
          </FeedStyled>
        ) : (
          <FeedStyled key={id}>
            <ImgBox
              onClick={() =>
                setSlideImgAndShow(
                  images.map(image => image.url),
                  id,
                )
              }
            >
              <img src={images[0].url} alt={name} />
              <LikeButton type='submit'>
                {isLiked ? (
                  <BsFillSuitHeartFill onClick={handleLikeClick} />
                ) : (
                  <BsSuitHeart onClick={handleLikeClick} />
                )}
              </LikeButton>
            </ImgBox>
            <div className='text'>
              <FeedInfoStyled>
                <div className='title'>{title}</div>
                <div className='location'>{location}</div>
                <div className='date'>{date}</div>
              </FeedInfoStyled>

              <FeedLikeStyled>
                <LikeButtonStyled>
                  <BsFillSuitHeartFill />
                </LikeButtonStyled>

                <div>{likes}</div>
              </FeedLikeStyled>
            </div>
            {showHandleSlideImg && (
              <SlideImg
                show={showHandleSlideImg}
                setShowHandleSlideImg={setShowHandleSlideImg}
                imgs={slideImgs}
                id={slideId}
              />
            )}
          </FeedStyled>
        )
      })}
    </PostListStyled>
  )
}

export default PostList

const PostListStyled = styled.ul`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  width: 89%;
  justify-content: space-between;
`

const FeedStyled = styled.li`
  list-style: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0.625rem 0 1.25rem 0;
  }
`

const ImgBox = styled.div`
  position: relative;
  img {
    width: 19rem;
    height: 19rem;
    object-fit: cover;
    border-radius: 1.25rem;
  }
  svg {
    position: absolute;
    color: gray;
    opacity: 0.3;
    top: 0.5rem;
  }
`

const DeleteButton = styled(MdDeleteOutline)`
  font-size: 2rem;
  left: 0.8rem;
  :hover {
    opacity: 1;
    color: red;
  }
`

const EditButton = styled(BiEditAlt)`
  font-size: 2rem;
  right: 0.8rem;
  :hover {
    opacity: 1;
    color: red;
  }
`

const LikeButton = styled(BsSuitHeart)`
  font-size: 1.8rem;
  right: 0.8rem;
  :hover {
    opacity: 1;
    color: red;
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
    width: 13.5rem;
    // overflow: hidden;
    // white-space: nowrap;
    text-overflow: ellipsis;
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
