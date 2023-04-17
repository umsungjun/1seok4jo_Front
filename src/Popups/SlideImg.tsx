import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Scrollbar} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
SwiperCore.use([Navigation, Scrollbar]) // *
import {useNavigate} from 'react-router-dom'
import {FaExternalLinkAlt} from 'react-icons/fa'

interface SlideImgProps {
  show: boolean
  setShowHandleSlideImg: (value: boolean) => void
  imgs: string[]
  id: number
}

export default function SlideImg({show, setShowHandleSlideImg, imgs, id}: SlideImgProps) {
  const [swiper, setSwiper] = useState(null)
  const [scrollbar, setScrollbar] = useState<{
    el: string
    hide: boolean
  }>({
    el: '.swiper-scrollbar',
    hide: false,
  })
  const popupRef = useRef<HTMLDivElement>(null)
  // const slideRef = useRef<Swiper>(null)

  const prevRef = React.useRef<HTMLDivElement>(null)
  const nextRef = React.useRef<HTMLDivElement>(null)

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
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    scrollbar: {draggable: true},
    className: 'swiper-slide',
  }

  const handleLink = (id: number) => {
    navigate(`/PostDetail/${id}`)
  }
  return (
    <ModalBackdrop show={show} onClick={handleClickOutside}>
      <ModalContent ref={popupRef} onClick={handlePopup}>
        <Swiper {...slide_settings} scrollbar={scrollbar}>
          {imgs.map((url, index) => (
            <SwiperSlide key={`${index}${url}`}>
              <div className='swiper-slide'>
                <SwiperImage>
                  <ImgBox key={`${index}${url}`} imgUrl={url} onClick={() => handleLink(id)}></ImgBox>
                </SwiperImage>
              </div>
            </SwiperSlide>
          ))}
          <div className='swiper-scrollbar'></div>
          <NavigationArrow>
            <div ref={prevRef} className='swiper-button-prev' />
            <div ref={nextRef} className='swiper-button-next' />
          </NavigationArrow>
        </Swiper>
        <DetailLink onClick={() => handleLink(id)}>
          <FaExternalLinkAlt /> 상세 페이지로 이동
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
  background-color: rgb(122 122 122 / 10%);
  z-index: 1;
  .swiper-slide {
    height: 95%;
  }
  .swiper-scrollbar {
    height: 0.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    position: relative;
    bottom: 8%;
  }
`
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 60rem;
  height: 36rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
  border-radius: 1rem;
`

const SwiperImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0.8;
    color: #a0a0a0;
    :hover {
      opacity: 1;
    }
  }
  .swiper-button-prev {
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .swiper-button-next {
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`
const DetailLink = styled.div`
  font-size: 1.7rem;
  color: #000;
  cursor: pointer;
  position: relative;
  bottom: 1rem;
  &:hover {
    color: #1877f2;
  }
  svg {
    margin-right: 1rem;
  }
  transition: color ease-in 0.2s;
`
