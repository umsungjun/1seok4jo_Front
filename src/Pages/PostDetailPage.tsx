import {useState, useEffect} from 'react'
import styled from 'styled-components'
import MapContainer from '../Component/MapContainer'
import sangchu from '../Assets/sangchu.png'
import {RWebShare} from 'react-web-share'
import {FiShare} from 'react-icons/fi'
import {BsSuitHeart} from 'react-icons/bs'
import {BsSuitHeartFill} from 'react-icons/bs'
import {DetailImage} from '../Mock/postDetail'
import {PostDetailInfo} from '../Mock/postDetail'
import {HashtagList} from '../Mock/postDetail'
import {CommentBoxList} from '../Mock/postDetail'

const PostDetailPage: React.FC = () => {
  //페이지 로딩시 상단부터 노출되도록
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [isLiked, setIsLiked] = useState(false)

  const handleClick = () => {
    setIsLiked(!isLiked)
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Detail>
      <Header>
        <Title>{PostDetailInfo.title}</Title>
        <Buttons>
          <RWebShare
            data={{
              text: `${PostDetailInfo.post}`,
              url: currentUrl,
              title: 'Compass: ' + `${PostDetailInfo.title}`,
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
        {DetailImage.map(data => (
          <Image key={data.name}>
            <img src={data.image} alt={data.name} />
          </Image>
        ))}
      </ImageArea>
      <Body>
        <Info>
          <Text>
            {PostDetailInfo.location} / {PostDetailInfo.startDate} ~ {PostDetailInfo.endDate}
          </Text>
          <Status>
            댓글 {PostDetailInfo.comment}개 · 좋아요 {PostDetailInfo.likes}
          </Status>
        </Info>
        <ContentBox>
          <PostArea>
            <ProfileInfo>
              <ProfileImage>
                <img src={sangchu} alt='하상츄' />
              </ProfileImage>
              <NickName>{PostDetailInfo.user}</NickName>
            </ProfileInfo>
            {PostDetailInfo.post}
          </PostArea>
        </ContentBox>
        <HashtagTitle>
          <Suggest># 이런 분들에게 추천합니다</Suggest>
          <Hashtag>
            {HashtagList.map((hashtag, index) => (
              <span key={index}> #{hashtag}</span>
            ))}
          </Hashtag>
        </HashtagTitle>
      </Body>
      <Bottom>
        <CommentBox>
          {CommentBoxList.map(data => (
            <Comment key={data.user}>
              <UserProfile>
                <img src={sangchu} alt='하상츄' />
                <UserInfo>
                  <div>{data.user}</div>
                  <div>{data.date}</div>
                </UserInfo>
              </UserProfile>
              <div>{data.comment}</div>
            </Comment>
          ))}
        </CommentBox>
        <MapContainer />
      </Bottom>
    </Detail>
  )
}

export default PostDetailPage

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
`
const Image = styled.div`
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
`
const Text = styled.h2`
  font-size: 1.5rem;
`
const Status = styled.h2`
  font-size: 1rem;
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
`
const PostArea = styled.section`
  font-size: 1.2rem;
  padding: 1.3rem;
  width: 100%;
  height: 15rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
`
const HashtagTitle = styled.div``

const Suggest = styled.h2`
  font-size: 1.5rem;
`

const Hashtag = styled.h3`
  color: gray;
  padding-top: 2rem;
  font-size: 1.2rem;
`

const Bottom = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  height: 80rem;
`
const CommentBox = styled.section`
  width: 60rem;
  height: 50rem;
  overflow: scroll;
  overflow-x: hidden;
  border: 1px solid #c0c0c0;
  border-radius: 3rem;
  padding: 2rem;
  box-sizing: border-box;
`
const Comment = styled.li`
  display: block;
  margin-bottom: 3rem;
  font-size: 1.2rem;
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
