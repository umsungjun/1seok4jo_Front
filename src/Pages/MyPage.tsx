import React, {useState, useEffect} from 'react'
import MyPageBanner from '../Common/MyPageBanner'
import styled from 'styled-components'

import {scrollToTop} from '../util/scrollToTop'
import {useSelector} from 'react-redux'
import {RootState} from '../Store'
import {MyPostListType, fetchPostListApi} from '../Service/myPageService'
import {useCookies} from 'react-cookie'
import MyPageList from '../Component/MyPageList'

export default function MyPage() {
  scrollToTop()
  const [active, setActive] = useState(true)
  const [chooseMyPost, setChooseMyPost] = useState(true)
  const user = useSelector((state: RootState) => state.user)
  const [cookie, setCookie] = useCookies(['token'])
  const token = cookie.token
  const [myPostList, setMyPostList] = useState<MyPostListType>({
    count: 0,
    postResponseList: [
      {
        id: 0,
        title: '',
        detail: '',
        location: '',
        hashtag: '',
        likeCount: 0,
        startDate: '',
        endDate: '',
        baseUrl: '',
        storeFileUrl: [],
      },
    ],
  })

  useEffect(() => {
    ;(async () => {
      const response = await fetchPostListApi('list', token)
      setMyPostList(response)
    })()
  }, [])

  const handleMyPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (chooseMyPost) return
    setChooseMyPost(true)
    setActive(true)
    const response = await fetchPostListApi('list', token)
    setMyPostList(response)
  }

  const handleLikePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!chooseMyPost) return
    setChooseMyPost(false)
    setActive(false)
    const response = await fetchPostListApi('like', token)
    setMyPostList(response)
  }

  return (
    <MyPageSection>
      <MyPageBanner />
      <TypeSelectBox>
        <TypeSelect onClick={e => handleMyPost(e)} active={active}>
          작성 글
        </TypeSelect>
        <TypeSelect onClick={e => handleLikePost(e)} active={!active}>
          좋아요
        </TypeSelect>
      </TypeSelectBox>
      <MyPageList myPostList={myPostList.postResponseList} />
    </MyPageSection>
  )
}

const MyPageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TypeSelectBox = styled.div`
  width: 89%;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  color: #fff;
`
interface ActiveProps {
  active: boolean
}

const TypeSelect = styled.button<ActiveProps>`
  width: 47%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0rem;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 1rem;
  font-size: 1.3rem;
  min-height: 4rem;
  background: ${props => (props.active ? '#fff' : '#1877f2')};
  color: ${props => (props.active ? '#1877f2' : '#fff')};
  border: ${props => (props.active ? '2px solid #1877f2' : 'none')};
  transition: all 0.2s ease-in-out;
`
