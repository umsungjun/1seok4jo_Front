import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsFillSuitHeartFill} from 'react-icons/bs'

import SlideImg from '../Popups/SlideImg'
import {IoLocationSharp} from 'react-icons/io5'
import {ImgBox} from './PostList'
import {FeedInfoStyled} from './PostList'
import {FeedLikeStyled} from './PostList'
import {LikeButtonStyled} from './PostList'

interface ThemePostListProps {
  themePostList: {
    baseUrl: string
    endDate: string
    likeCount: number
    location: string
    postId: number
    startDate: string
    storeFileUrl: string[]
    title: string
  }[]
}

const PostDetailFeed = ({themePostList}: ThemePostListProps) => {
  const [isLiked, setIsLiked] = useState(false)

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

  const handleLikeClick = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    console.log('좋아요 클릭')
    setIsLiked(!isLiked)
  }

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('옵션 클릭')
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
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
  if (!themePostList) {
    return null
  }
  return (
    <PostListStyled>
      {themePostList.map(post => {
        const {baseUrl, postId, storeFileUrl, title, location, startDate, endDate, likeCount} = post
        return (
          <FeedStyled key={postId}>
            <ImgBox onClick={() => setSlideImgAndShow(storeFileUrl, postId)}>
              <img src={`${baseUrl}${storeFileUrl[0]}`} />
            </ImgBox>
            <div className='text'>
              <FeedInfoStyled>
                <div className='title'>{title}</div>
                <div className='location'>
                  <IoLocationSharp />
                  <span>{location}</span>
                </div>
                <div className='date'>{`${startDate} ~ ${endDate}`}</div>
              </FeedInfoStyled>

              <FeedLikeStyled>
                <LikeButtonStyled>
                  <BsFillSuitHeartFill />
                </LikeButtonStyled>
                <div>{likeCount}</div>
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
  //   return login === null ? (
  //     <PostListStyled>
  //       {detailPostFeed.map(data => {
  //         const {id, title, location, date, likes, images, name} = data
  //         return (
  //           <FeedStyled key={id}>
  //             <ImgBox
  //               onClick={() =>
  //                 setSlideImgAndShow(
  //                   images.map(image => image.url),
  //                   id,
  //                 )
  //               }
  //             >
  //               <img src={images[0].url} alt={name} />
  //             </ImgBox>
  //             <div className='text'>
  //               <FeedInfoStyled>
  //                 <div className='title'>{title}</div>
  //                 <div className='location'>
  //                   <IoLocationSharp />
  //                   <span>{location}</span>
  //                 </div>
  //                 <div className='date'>{date}</div>
  //               </FeedInfoStyled>
  //
  //               <FeedLikeStyled>
  //                 <LikeButtonStyled>
  //                   <BsFillSuitHeartFill />
  //                 </LikeButtonStyled>
  //
  //                 <div>{likes}</div>
  //               </FeedLikeStyled>
  //             </div>
  //             {showHandleSlideImg && (
  //               <SlideImg
  //                 show={showHandleSlideImg}
  //                 setShowHandleSlideImg={setShowHandleSlideImg}
  //                 imgs={slideImgs}
  //                 id={slideId}
  //               />
  //             )}
  //           </FeedStyled>
  //         )
  //       })}
  //     </PostListStyled>
  //   ) : (
  //     <PostListStyled>
  //       {detailPostFeed.map(data => {
  //         const {id, nickName, title, location, date, likes, images, name} = data
  //         return nickName === login.nickName ? (
  //           <FeedStyled key={id}>
  //             <ImgBox
  //               onClick={() =>
  //                 setSlideImgAndShow(
  //                   images.map(image => image.url),
  //                   id,
  //                 )
  //               }
  //             >
  //               <img src={images[0].url} alt={name} />
  //               <div onClick={handleClickOutside}>
  //                 <MenuButton className='circle-button' onClick={handleOptionClick}>
  //                   <div className='circle'></div>
  //                   <div className='circle'></div>
  //                   <div className='circle'></div>
  //                 </MenuButton>
  //                 {isMenuOpen && (
  //                   <OptionList>
  //                     {menuOptions.map(option => (
  //                       <OptionsButton key={option} onClick={option === '삭제' ? handleDeletePost : handleEditPost}>
  //                         {option}
  //                       </OptionsButton>
  //                     ))}
  //                   </OptionList>
  //                 )}
  //               </div>
  //             </ImgBox>
  //             <div className='text'>
  //               <FeedInfoStyled>
  //                 <div className='title'>{title}</div>
  //                 <div className='location'>
  //                   <IoLocationSharp />
  //                   <span>{location}</span>
  //                 </div>
  //                 <div className='date'>{date}</div>
  //               </FeedInfoStyled>
  //
  //               <FeedLikeStyled>
  //                 <LikeButtonStyled>
  //                   <BsFillSuitHeartFill />
  //                 </LikeButtonStyled>
  //
  //                 <div>{likes}</div>
  //               </FeedLikeStyled>
  //             </div>
  //             {showHandleSlideImg && (
  //               <SlideImg
  //                 show={showHandleSlideImg}
  //                 setShowHandleSlideImg={setShowHandleSlideImg}
  //                 imgs={slideImgs}
  //                 id={slideId}
  //               />
  //             )}
  //           </FeedStyled>
  //         ) : (
  //           <FeedStyled key={id}>
  //             <ImgBox
  //               onClick={() =>
  //                 setSlideImgAndShow(
  //                   images.map(image => image.url),
  //                   id,
  //                 )
  //               }
  //             >
  //               <img src={images[0].url} alt={name} />
  //               <LikeButton type='submit'>
  //                 {isLiked ? (
  //                   <BsFillSuitHeartFill onClick={handleLikeClick} />
  //                 ) : (
  //                   <BsSuitHeart onClick={handleLikeClick} />
  //                 )}
  //               </LikeButton>
  //             </ImgBox>
  //             <div className='text'>
  //               <FeedInfoStyled>
  //                 <div className='title'>{title}</div>
  //                 <div className='location'>
  //                   <IoLocationSharp />
  //                   <span>{location}</span>
  //                 </div>
  //                 <div className='date'>{date}</div>
  //               </FeedInfoStyled>
  //
  //               <FeedLikeStyled>
  //                 <LikeButtonStyled>
  //                   <BsFillSuitHeartFill />
  //                 </LikeButtonStyled>
  //
  //                 <div>{likes}</div>
  //               </FeedLikeStyled>
  //             </div>
  //             {showHandleSlideImg && (
  //               <SlideImg
  //                 show={showHandleSlideImg}
  //                 setShowHandleSlideImg={setShowHandleSlideImg}
  //                 imgs={slideImgs}
  //                 id={slideId}
  //               />
  //             )}
  //           </FeedStyled>
  //         )
  //       })}
  //     </PostListStyled>
  //   )
}

export default PostDetailFeed

export const PostListStyled = styled.ul`
  margin: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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
