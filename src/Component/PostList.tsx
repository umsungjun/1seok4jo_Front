import React, {useState, forwardRef, ForwardedRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {BsFillSuitHeartFill, BsSuitHeart} from 'react-icons/bs'
import SlideImg from '../Popups/SlideImg'
import {IoLocationSharp} from 'react-icons/io5'
import {BeatLoader} from 'react-spinners'
import {RiErrorWarningLine} from 'react-icons/ri'
import {darkTheme, lightTheme} from '../Theme/theme'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
import {useCookies} from 'react-cookie'

export interface ThemePostListProps {
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
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const PostList = forwardRef<HTMLDivElement, ThemePostListProps>(function PostList(props, infiniteRef) {
  const theme = useSelector((state: RootState) => state.themeType.theme)
  const [isLiked, setIsLiked] = useState(false)
  const [login, setLogin] = useState(null) // users[0]
  const [showHandleSlideImg, setShowHandleSlideImg] = useState<boolean>(false)
  const [slideImgs, setSlideImgs] = useState<string[]>([])
  const [slideId, setSlideId] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [openMenuPostId, setOpenMenuPostId] = useState<number | null>(null) // Add new state variable

  const [cookies] = useCookies(['token'])
  const token = cookies.token
  const navigate = useNavigate()
  const remote = axios.create()
  // const menuOptions = ['삭제', '편집']

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

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    e.stopPropagation()
    console.log('옵션 클릭')
    // setIsMenuOpen(!isMenuOpen)
    setOpenMenuPostId(postId === openMenuPostId ? null : postId) // Set the postId to open the menu only for the selected post
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>, postId: number) => {
    e.stopPropagation()
    if (openMenuPostId === postId) {
      setOpenMenuPostId(null)
    }
  }

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    e.stopPropagation()
    console.log('삭제 클릭')
    confirm('정말 삭제하시겠습니까?') // TODO 팝업
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    }
    try {
      const response = await remote.delete(`http://localhost:8080/post/${postId}`, {headers})
      console.log(response.data)
      if (response.data.code === 200) {
        alert('게시글이 삭제되었습니다.')
        navigate('/MyPage')
      } else {
        alert(response.data.message)
        console.log(response.data.message)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
    setIsMenuOpen(!isMenuOpen)
  }

  const handleEditPost = (e: React.MouseEvent<HTMLButtonElement>, postId: number) => {
    e.stopPropagation()
    console.log('편집 클릭')
    navigate(`/PostEdit/${postId}`)
  }

  return (
    <>
      <PostListStyled>
        {props.themePostList.map(post => {
          const {baseUrl, postId, storeFileUrl, title, location, startDate, endDate, likeCount} = post
          return (
            <FeedStyled key={post.postId}>
              <ImgBox onClick={() => setSlideImgAndShow(storeFileUrl, postId)}>
                <img src={`${baseUrl}${storeFileUrl[0]}`} />
                <div onClick={e => handleClickOutside(e, postId)}>
                  <MenuButton className='circle-button' onClick={e => handleOptionClick(e, postId)}>
                    <div className='circle'></div>
                    <div className='circle'></div>
                    <div className='circle'></div>
                  </MenuButton>
                  {openMenuPostId === postId && ( // Render the menu only for the selected post
                    <OptionList>
                      <OptionsButton onClick={e => handleDeletePost(e, postId)}>삭제</OptionsButton>
                      <OptionsButton onClick={e => handleEditPost(e, postId)}>편집</OptionsButton>
                    </OptionList>
                  )}
                </div>
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
      <div ref={infiniteRef}>{props.isLoading && <BeatLoader color='#1877f2' loading={true} size={21} />}</div>
      <div>
        {props.themePostList.length === 0 && (
          <PostNone theme={theme}>
            <RiErrorWarningLine />
            해당 테마의 게시물이 존재하지 않습니다.
          </PostNone>
        )}
      </div>
    </>
  )

  // return login === null ? (
  //   <PostListStyled>
  //     {PostFeed.map(data => {
  //       const {id, title, location, date, likes, images, name} = data
  //       return (
  //         <FeedStyled key={id}>
  //           <ImgBox
  //             onClick={() =>
  //               setSlideImgAndShow(
  //                 images.map(image => image.url),
  //                 id,
  //               )
  //             }
  //           >
  //             <img src={images[0].url} alt={name} />
  //           </ImgBox>
  //           <div className='text'>
  //             <FeedInfoStyled>
  //               <div className='title'>{title}</div>
  //               <div className='location'>
  //                 <IoLocationSharp />
  //                 <span>{location}</span>
  //               </div>
  //               <div className='date'>{date}</div>
  //             </FeedInfoStyled>

  //             <FeedLikeStyled>
  //               <LikeButtonStyled>
  //                 <BsFillSuitHeartFill />
  //               </LikeButtonStyled>

  //               <div>{likes}</div>
  //             </FeedLikeStyled>
  //           </div>
  //           {showHandleSlideImg && (
  //             <SlideImg
  //               show={showHandleSlideImg}
  //               setShowHandleSlideImg={setShowHandleSlideImg}
  //               imgs={slideImgs}
  //               id={slideId}
  //             />
  //           )}
  //         </FeedStyled>
  //       )
  //     })}
  //   </PostListStyled>
  // ) : (
  //   <PostListStyled>
  //     {PostFeed.map(data => {
  //       const {id, nickName, title, location, date, likes, images, name} = data
  //       return nickName === login.nickName ? (
  //         <FeedStyled key={id}>
  //           <ImgBox
  //             onClick={() =>
  //               setSlideImgAndShow(
  //                 images.map(image => image.url),
  //                 id,
  //               )
  //             }
  //           >
  //             <img src={images[0].url} alt={name} />
  //             <div onClick={handleClickOutside}>
  //               <MenuButton className='circle-button' onClick={handleOptionClick}>
  //                 <div className='circle'></div>
  //                 <div className='circle'></div>
  //                 <div className='circle'></div>
  //               </MenuButton>
  //               {isMenuOpen && (
  //                 <OptionList>
  //                   {menuOptions.map(option => (
  //                     <OptionsButton key={option} onClick={option === '삭제' ? handleDeletePost : handleEditPost}>
  //                       {option}
  //                     </OptionsButton>
  //                   ))}
  //                 </OptionList>
  //               )}
  //             </div>
  //           </ImgBox>
  //           <div className='text'>
  //             <FeedInfoStyled>
  //               <div className='title'>{title}</div>
  //               <div className='location'>
  //                 <IoLocationSharp />
  //                 <span>{location}</span>
  //               </div>
  //               <div className='date'>{date}</div>
  //             </FeedInfoStyled>

  //             <FeedLikeStyled>
  //               <LikeButtonStyled>
  //                 <BsFillSuitHeartFill />
  //               </LikeButtonStyled>

  //               <div>{likes}</div>
  //             </FeedLikeStyled>
  //           </div>
  //           {showHandleSlideImg && (
  //             <SlideImg
  //               show={showHandleSlideImg}
  //               setShowHandleSlideImg={setShowHandleSlideImg}
  //               imgs={slideImgs}
  //               id={slideId}
  //             />
  //           )}
  //         </FeedStyled>
  //       ) : (
  //         <FeedStyled key={id}>
  //           <ImgBox
  //             onClick={() =>
  //               setSlideImgAndShow(
  //                 images.map(image => image.url),
  //                 id,
  //               )
  //             }
  //           >
  //             <img src={images[0].url} alt={name} />
  //             <LikeButton type='submit'>
  //               {isLiked ? (
  //                 <BsFillSuitHeartFill onClick={handleLikeClick} />
  //               ) : (
  //                 <BsSuitHeart onClick={handleLikeClick} />
  //               )}
  //             </LikeButton>
  //           </ImgBox>
  //           <div className='text'>
  //             <FeedInfoStyled>
  //               <div className='title'>{title}</div>
  //               <div className='location'>
  //                 <IoLocationSharp />
  //                 <span>{location}</span>
  //               </div>
  //               <div className='date'>{date}</div>
  //             </FeedInfoStyled>

  //             <FeedLikeStyled>
  //               <LikeButtonStyled>
  //                 <BsFillSuitHeartFill />
  //               </LikeButtonStyled>

  //               <div>{likes}</div>
  //             </FeedLikeStyled>
  //           </div>
  //           {showHandleSlideImg && (
  //             <SlideImg
  //               show={showHandleSlideImg}
  //               setShowHandleSlideImg={setShowHandleSlideImg}
  //               imgs={slideImgs}
  //               id={slideId}
  //             />
  //           )}
  //         </FeedStyled>
  //       )
  //     })}
  //   </PostListStyled>
  // )
})

export default PostList

const PostListStyled = styled.ul`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.5rem;
  width: 90%;
  // min-height: 40rem;
  min-height: auto;

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
export const ImgBox = styled.div`
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
export const MenuButton = styled.button`
  position: relative;
  bottom: 18rem;
  left: 90%;
  border: none;
  cursor: pointer;
  width: 1rem;
  background: transparent;
  // border: 1px solid red;
  @media (max-width: 576px) {
    bottom: 23.5rem;
    left: 90%;
  }
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
export const OptionList = styled.div`
  position: relative;
  bottom: 21rem;
  left: 76%;
  font-weight: bold;
  @media (max-width: 576px) {
    bottom: 27.2rem;
    left: 75%;
  }
`
export const OptionsButton = styled.button`
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
export const LikeButton = styled(BsSuitHeart)`
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
export const FeedInfoStyled = styled.label`
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
export const FeedLikeStyled = styled.div`
  font-weight: semi-bold;
  font-size: 1.35rem;
  display: flex;
  flex-direction: row;
  margin: 0.5rem;
  @media (max-width: 576px) {
    font-size: 1.7rem;
  }
`
export const LikeButtonStyled = styled.button`
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

const PostNone = styled.div`
  display: flex;
  height: 50vh;
  font-size: 1.5rem;
  font-weight: bold;
  ${props => (props.theme === 'light' ? lightTheme.grayColor : darkTheme.whiteColor)}
  display: flex;
  align-items: center;

  svg {
    font-size: 2.2rem;
    margin-right: 0.5rem;
  }
`
