import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsFillSuitHeartFill, BsSuitHeart} from 'react-icons/bs'
import {PostFeed} from '../Mock/postFeed'
import {users} from '../Mock/users'
import SlideImg from '../Popups/SlideImg'
import {IoLocationSharp} from 'react-icons/io5'

const PostList = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [login, setLogin] = useState(users[0]) //null
  const [showHandleSlideImg, setShowHandleSlideImg] = useState<boolean>(false)
  const [slideImgs, setSlideImgs] = useState<string[]>([])
  const [slideId, setSlideId] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const menuOptions = ['삭제', '편집']

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

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('옵션 클릭')
    setIsMenuOpen(!isMenuOpen)
  }

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('삭제 클릭')
    confirm('정말 삭제하시겠습니까?') // TODO 팝업
    setIsMenuOpen(!isMenuOpen)
  }

  const handleEditPost = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <ImgBox
              onClick={() =>
                setSlideImgAndShow(
                  images.map(image => image.url),
                  id,
                )
              }
            >
              <img src={images[0].url} alt={name} />
            </ImgBox>
            <div className='text'>
              <FeedInfoStyled>
                <div className='title'>{title}</div>
                <div className='location'>
                  <IoLocationSharp />
                  <span>{location}</span>
                </div>
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
              <img src={images[0].url} alt={name} />
              <MenuButton className='circle-button' onClick={handleOptionClick}>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
              </MenuButton>
              {isMenuOpen && (
                <OptionList>
                  {menuOptions.map(option => (
                    <OptionsButton key={option} onClick={option === '삭제' ? handleDeletePost : handleEditPost}>
                      {option}
                    </OptionsButton>
                  ))}
                </OptionList>
              )}
            </ImgBox>
            <div className='text'>
              <FeedInfoStyled>
                <div className='title'>{title}</div>
                <div className='location'>
                  <IoLocationSharp />
                  <span>{location}</span>
                </div>
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
                <div className='location'>
                  <IoLocationSharp />
                  <span>{location}</span>
                </div>
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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.5rem;
  width: 90%;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

  @media (max-width: 960px) {
    .text {
      width: 75%;
      display: flex;
      justify-content: space-between;
      margin: 0.625rem 0 1.25rem 0;
    }
  }
  @media (max-width: 576px) {
    .text {
      width: 80%;
      display: flex;
      justify-content: space-between;
      margin: 0.625rem 0 1.25rem 0;
    }
  }
`
const ImgBox = styled.div`
  position: relative;
  height: 19rem;
  img {
    width: 19rem;
    height: 19rem;
    object-fit: cover;
    border-radius: 1.25rem;
  }
  svg {
    position: absolute;
    top: 0.5rem;
  }
  @media (max-width: 576px) {
    height: 25rem;
    img {
      width: 25rem;
      height: 25rem;
    }
  }
`
const MenuButton = styled.div`
  position: relative;
  bottom: 95%;
  left: 91%;
  border: none;
  cursor: pointer;
  width: 1rem;
  .circle-button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #fff;
    margin-bottom: 5px;
    display: block;
    @media (max-width: 576px) {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`
const OptionList = styled.div`
  position: relative;
  bottom: 109%;
  left: 75%;
  font-weight: bold;
`
const OptionsButton = styled.button`
  display: block;
  position: relative;
  right: 2%;
  width: 3rem;
  padding: 0.3rem;
  background: #fff;
  border: 1px solid #c0c0c0;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  :first-child {
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: none;
  }
  :last-child {
    margin-bottom: 0.2rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }
  @media (max-width: 576px) {
    width: 4rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }
`
const LikeButton = styled(BsSuitHeart)`
  font-size: 1.5rem;
  right: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  :hover {
    opacity: 1;
    color: red;
  }
  @media (max-width: 576px) {
    font-size: 2.5rem;
    right: 1rem;
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
    width: 14rem;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.2rem;
    padding-top: 0.2rem;
    @media (max-width: 576px) {
      width: 20rem;
      font-size: 1.7rem;
    }
  }
  .location {
    display: flex;
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @media (max-width: 576px) {
        font-size: 1.5rem;
      }
    }
    svg {
      font-size: 1.2rem;
      padding-right: 0.2rem;
      color: #1877f2;
      @media (max-width: 576px) {
        font-size: 1.7rem;
      }
    }
  }
  .date {
    font-size: 0.9rem;
    color: gray;
    @media (max-width: 576px) {
      font-size: 1.35rem;
    }
  }
`
const FeedLikeStyled = styled.div`
  font-weight: semi-bold;
  font-size: 1.35rem;
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  @media (max-width: 576px) {
    font-size: 1.7rem;
  }
`
const LikeButtonStyled = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  width: 1.2rem;
  height: 1.2rem;
  color: rgba(255, 0, 0, 0.7);
  margin-right: 0.5rem;
  svg {
    width: 1.2rem;
    height: 1.2rem;
    @media (max-width: 576px) {
      width: 1.55rem;
      height: 1.55rem;
    }
  }
`
