import React, {useEffect, useState} from 'react'
import PageTitle from '../Common/PageTitle'
import {Link, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {SearchType, fetchSearchApi} from '../Service/searchService'

import {IoLocationSharp} from 'react-icons/io5'

let FetchCount = 0

export default function SearchDetailPage() {
  const [postList, setPostList] = useState<SearchType>({
    count: 0,
    keyword: '',
    searchPostList: [{title: '', detail: '', location: '', hashtag: '', id: 0}],
  })
  const {category, searchText} = useParams()
  let engCategory = ''
  if (category === '제목') {
    engCategory = 'title'
  } else if (category === '내용') {
    engCategory = 'detail'
  } else {
    engCategory = 'hashtag'
  }

  useEffect(() => {
    ;(async () => {
      const response = await fetchSearchApi(engCategory, searchText as string, FetchCount)
      // console.log(response)
      setPostList(response)
    })()
  }, [category, searchText])

  // console.log(postList)

  const handleMore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('더 불러오기 ')
    FetchCount++
    if (FetchCount * 10 >= postList.count) {
      alert('더 이상 불러올 게시글이 없습니다.') //TODO 버튼이 사라지는 식으로
      return
    }
    const response = await fetchSearchApi(engCategory, searchText as string, FetchCount)
    console.log(response)

    setPostList({
      ...postList,
      searchPostList: [...postList.searchPostList, ...response.searchPostList],
    })
  }

  return (
    <Section>
      <PageTitle title={'Search Result'} sub={`"${searchText}" 으로 검색한 결과는 총 ${postList.count}개입니다.`} />
      <PostList>
        {postList.searchPostList.map(({id, title, location, detail, hashtag}) => {
          return (
            <Post key={`${id}+${title}`}>
              <PostTitle to={`/PostDetail/${id}`}>[제목] {title}</PostTitle>
              <Location>
                <IoLocationSharp />
                {location}
              </Location>
              <Detail>{detail}</Detail>
              <Hashtag>{hashtag}</Hashtag>
            </Post>
          )
        })}
      </PostList>
      <MoreButton onClick={e => handleMore(e)}>+ 더보기</MoreButton>
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PostList = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid #c0c0c0;
  padding-bottom: 1rem;
`

const PostTitle = styled(Link)`
  color: #1877f2;
  font-size: 1.5rem;
`

const Location = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  svg {
    color: #1877f2;
    margin-right: 0.3rem;
  }
`

const Detail = styled.div`
  font-size: 1.2rem;
  padding-left: 0.5rem;
`

const Hashtag = styled.div`
  padding-left: 0.5rem;
`

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  margin: 2rem 0px;
  font-size: 1.4rem;
  cursor: pointer;
  border: none;
  background: inherit;

  &:hover {
    color: #1877f2;
  }
`
