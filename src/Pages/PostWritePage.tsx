import React from 'react'
import {useState} from 'react'
import PageTitle from '../Common/PageTitle'
import styled from 'styled-components'
import ThemeSlide from '../Common/ThemeSlide'
import DaumPostcode from 'react-daum-postcode'

import {FaMapMarkerAlt} from 'react-icons/fa'

export default function PostWritePage() {
  const [address, setAddress] = useState('')
  const [isOpenPost, setIsOpenPost] = useState(false)
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost)
  }

  const onCompletePost = (data: any) => {
    let addr = data.address

    setAddress(addr)
    setIsOpenPost(false)
  }

  return (
    <>
      <PageTitle title='Writing post' sub='나의 여행 경험을 다른 사람들에게 들려주세요.' />
      <Section>
        <Title># 테마</Title>
        <ThemeSlide />
        <ContentBox>
          <Title># 제목</Title>
          <TitleInput type='text' maxLength={20} placeholder='# 제목을 입력하세요 (최대 20자)' required />
        </ContentBox>
        <ContentBox>
          <Title># 주소</Title>
          <AddresBox>
            <AddresInput type='text' value={address} placeholder='# 주소' required readOnly />
            <FaMapMarkerAlt onClick={onChangeOpenPost} />
            {isOpenPost ? (
              <div>
                <DaumPostcode
                  style={{
                    position: 'absolute',
                    marginTop: '0.2rem',
                    borderRadius: '0.5rem',
                    width: '25rem',
                    height: '29rem',
                    display: 'block',
                    padding: '0.5rem',
                    border: '2px solid #cacaca',
                  }}
                  autoClose
                  onComplete={onCompletePost}
                />
              </div>
            ) : null}
          </AddresBox>
        </ContentBox>
      </Section>
    </>
  )
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px 20rem 5rem;
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-right: 2rem;
`

const TitleInput = styled.input`
  border: none;
  border-bottom: 1px solid #c0c0c0;
  flex: 1 1 0;
  font-size: 1.5rem;
  width: 25%;
  margin-top: 3rem;

  &:focus {
    outline: none;
    border-bottom: 2px solid #6b7280;
  }
`

const AddresBox = styled.div`
  svg {
    font-size: 1.8rem;
    margin-left: 1rem;

    &:hover {
      cursor: pointer;
      color: #1877f2;
    }
  }
`

const AddresInput = styled.input`
  border: none;
  border-bottom: 1px solid #c0c0c0;
  flex: 1 1 0;
  font-size: 1.5rem;
  width: 25%;
  margin-top: 3rem;
  &:focus {
    outline: none;
  }
`
