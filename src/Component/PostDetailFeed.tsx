import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsFillSuitHeartFill, BsSuitHeart} from 'react-icons/bs'
import {PostFeed} from '../Mock/postFeed'
import {users} from '../Mock/users'
import {CgMenuRound} from 'react-icons/cg'
import {IoLocationSharp} from 'react-icons/io5'

const PostDetailFeed = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [login, setLogin] = useState(users[0]) //null
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const menuOptions = ['삭제', '편집']

  const handleLikeClick = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    console.log('좋아요 클릭')
    setIsLiked(!isLiked)
  }

  const handleOptionClick = (e: React.MouseEvent<SVGElement>) => {
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
            <img src={images[0].url} alt={name} />
            <MenuButton onClick={handleOptionClick} />
            {isMenuOpen && (
              <OptionList>
                {menuOptions.map(option => (
                  <OptionsButton key={option} onClick={option === '삭제' ? handleDeletePost : handleEditPost}>
                    {option}
                  </OptionsButton>
                ))}
              </OptionList>
            )}

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
          </FeedStyled>
        ) : (
          <FeedStyled key={id}>
            <img src={images[0].url} alt={name} />
            <LikeButton type='submit'>
              {isLiked ? <BsFillSuitHeartFill onClick={handleLikeClick} /> : <BsSuitHeart onClick={handleLikeClick} />}
            </LikeButton>

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
          </FeedStyled>
        )
      })}
    </PostListStyled>
  )
}

export default PostDetailFeed

const PostListStyled = styled.ul`
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  width: 89%;
  justify-content: space-around;
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
`
const MenuButton = styled(CgMenuRound)`
  font-size: 1.8rem;
  right: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`
const OptionList = styled.div`
  position: relative;
  top: -88%;
  left: 80%;
  font-weight: bold;
  color: white;
`
const OptionsButton = styled.button`
  display: block;
  position: relative;
  right: 2%;
  width: 3.3rem;
  padding: 0.2rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #fff;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  :first-child {
    border-bottom: none;
    border-radius: 0.3rem 0.3rem 0 0;
  }
  :last-child {
    border-radius: 0 0 0.3rem 0.3rem;
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
    font-size: 19.2px;
    padding-top: 0.2rem;
  }
  .location {
    display: flex;
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    svg {
      font-size: 1.2rem;
      padding-right: 0.2rem;
      color: #1877f2;
    }
  }
  .date {
    font-size: 0.9rem;
    color: gray;
  }
`
const FeedLikeStyled = styled.div`
  font-weight: semi-bold;
  font-size: 1.35rem;
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
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
  }
`
