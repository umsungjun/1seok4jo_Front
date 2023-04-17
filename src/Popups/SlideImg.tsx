import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
SwiperCore.use([Navigation]) // *
import {useNavigate} from 'react-router-dom'
import {FaExternalLinkAlt} from 'react-icons/fa'

interface SlideImgProps {
  show: boolean
  setShowHandleSlideImg: (value: boolean) => void
  imgs: string[]
  id: number
}

export default function SlideImg({show, setShowHandleSlideImg, imgs, id}: SlideImgProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  const handlePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowHandleSlideImg(true)
    e.stopPropagation()
  }

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setShowHandleSlideImg(false)
    }
  }

  const navigate = useNavigate()

  const slide_settings = {
    slidesPerView: 1,
    loop: true,
    navigation: true,
    scrollbar: {draggable: true},
    className: 'swiper-slide',
  }
  const prevRef = React.useRef<HTMLDivElement>(null)
  const nextRef = React.useRef<HTMLDivElement>(null)

  const handleLink = (id: number) => {
    navigate(`/PostDetail/${id}`)
  }
  return (
    <ModalBackdrop show={show} onClick={handleClickOutside}>
      <ModalContent ref={popupRef} onClick={handlePopup}>
        <Swiper {...slide_settings} navigation={{prevEl: prevRef.current, nextEl: nextRef.current}}>
          {imgs.map((url, index) => (
            <SwiperSlide key={`${index}${url}`}>
              <div className='swiper-slide'>
                <SwiperImage>
                  <ImgBox key={`${index}${url}`} imgUrl={url} onClick={() => handleLink(id)}>
                    <DetailLink onClick={() => handleLink(id)}>
                      <FaExternalLinkAlt /> 여기 더 자세히 볼게요!
                    </DetailLink>
                  </ImgBox>
                </SwiperImage>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <NavigationArrow>
          <div ref={prevRef} className='swiper-button-prev' />
          <div ref={nextRef} className='swiper-button-next' />
        </NavigationArrow>
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
  background-color: rgb(122 122 122 / 10%);
  z-index: 1;
  .swiper-slide {
    height: 90%;
  }
`
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 60rem;
  height: 35rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
  // padding-bottom: 2.5rem;
  border-radius: 1rem;
`

const SwiperImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  width: 100%;
  height: 100%;
  display: inline-block;
  border-radius: 1rem;
`
const NavigationArrow = styled.div`
  z-index: 999;
  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0.8;
    :hover {
      opacity: 1;
      scale: 1.2;
    }
  }
`
const DetailLink = styled.div`
  font-size: 1.7rem;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  top: 85%;
  right: 1rem;
  margin: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  text-align: center;
  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }
  svg {
    margin-right: 1rem;
  }
  transition: color ease-in 0.2s;
`
