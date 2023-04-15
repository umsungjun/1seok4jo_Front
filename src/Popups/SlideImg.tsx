import React from 'react'
import styled from 'styled-components'

import {AiOutlineClose} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

import {FaExternalLinkAlt} from 'react-icons/fa'

interface SlideImgProps {
  show: boolean
  setShowHandleSlideImg: (value: boolean) => void
  imgs: string[]
  id: number
}

export default function SlideImg({show, setShowHandleSlideImg, imgs, id}: SlideImgProps) {
  const navigate = useNavigate()

  const handleLink = (id: number) => {
    navigate(`/PostDetail/${id}`)
  }
  return (
    <ModalBackdrop show={show}>
      <ModalContent>
        <ModalCloseTitleBox>
          <CloseIcon onClick={() => setShowHandleSlideImg(false)} />
          <ModalTitle>상세 이미지</ModalTitle>
        </ModalCloseTitleBox>
        <Line />
        <SlideImgBox>
          {imgs.map((url, index) => {
            return <ImgBox key={`${index}${url}`} imgUrl={url} />
          })}
        </SlideImgBox>
        <DetailLink onClick={() => handleLink(id)}>
          <FaExternalLinkAlt /> 더 자세한 정보가 알고싶다면
        </DetailLink>
      </ModalContent>
    </ModalBackdrop>
  )
}

interface ModalProps {
  show: boolean
}

const ModalBackdrop = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(122 122 122 / 2%);
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 999;
`
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 100rem;
  height: 55rem;
  z-index: 1000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.3s ease-in-out;
`

const ModalCloseTitleBox = styled.div`
  padding: 1rem;
`

const ModalTitle = styled.h1`
  font-size: 1.5rem;
`
const CloseIcon = styled(AiOutlineClose)`
  font-size: 1.5rem;
  position: absolute;
  left: 1rem;
  top: 0.6rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    background-color: #f7f7f7;
  }
`

const Line = styled.hr`
  background: #f0f0f0;
  height: 1px;
  width: 100%;
  border: 0px;
  margin: 0;
  margin-bottom: 2rem;
`

const SlideImgBox = styled.div`
  width: 95%;
  height: 40rem;
  overflow: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0.5rem;
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
`
interface ImgBoxProps {
  imgUrl: string
}

const ImgBox = styled.div<ImgBoxProps>`
  background: url(${props => props.imgUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 95rem;
  height: 100%;
  display: inline-block;
`

const DetailLink = styled.span`
  margin-top: 2rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  &:hover {
    color: #1877f2;
  }
  svg {
    margin-right: 1rem;
  }
  transition: color ease-in 0.2s;
`
