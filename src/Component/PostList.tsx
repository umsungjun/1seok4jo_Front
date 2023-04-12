import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsFillSuitHeartFill, BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'
import {PostFeed} from '../Mock/postFeed'
import type {PostFeedInterface} from '../Interface/interface'
import PostModal from '../Modal/PostModal'
import {users} from '../Mock/users'

import {AiOutlineMinusCircle} from 'react-icons/ai'
import {BsPencilSquare} from 'react-icons/bs'

const PostList = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [login, setLogin] = useState(users[0]) //null

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/PostDetail`)
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
  }

  // 모달 핸들링
  const handleOpenModal = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
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
      {PostFeed.map(data => (
        <FeedStyled key={data.id} onClick={handleClick}>
          {/* <PostModal isOpen={modalOpen} onClose={handleCloseModal}>
          <div>test</div>
        </PostModal> */}
          <img src={data.image} alt={data.name} />
          {/* <button type='button'>
          {isLiked ? <BsSuitHeartFill onClick={handleLikeClick} /> : <BsSuitHeart onClick={handleLikeClick} />}
        </button> */}
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
  ) : (
    <PostListStyled>
      {PostFeed.map(data =>
        data.nickName === login.nickName ? (
          <FeedStyled key={data.id} onClick={handleClick}>
            <ImgBox>
              <DeleteButton onClick={handleDeletePost} />
              <img src={data.image} alt={data.name} />
              <EditButton onClick={handleEditPost} />
            </ImgBox>

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
        ) : (
          <FeedStyled key={data.id} onClick={handleClick}>
            {/* <PostModal isOpen={modalOpen} onClose={handleCloseModal}>
          <div>test</div>
        </PostModal> */}
            <img src={data.image} alt={data.name} />
            {/* <button type='button'>
          {isLiked ? <BsSuitHeartFill onClick={handleLikeClick} /> : <BsSuitHeart onClick={handleLikeClick} />}
        </button> */}
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
        ),
      )}
    </PostListStyled>
  )
}

export default PostList

const PostListStyled = styled.ul`
  margin-top: 3rem;
  display: flex;
  flex-flow: row wrap;
  padding: 0px 5rem;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;
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

const ImgBox = styled.div`
  position: relative;

  svg {
    position: absolute;
    color: gray;
    opacity: 0.3;
    top: 0.5rem;
  }
`

const DeleteButton = styled(AiOutlineMinusCircle)`
  font-size: 2rem;
  left: 0.5rem;
  &:hover {
    color: red;
  }
`

const EditButton = styled(BsPencilSquare)`
  font-size: 1.8rem;
  right: 0.5rem;
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
