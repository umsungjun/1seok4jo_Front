import React, {useRef} from 'react'
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
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setShowHandleSlideImg(false)
    }
  }
  const navigate = useNavigate()

  const slide_settings = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0,
    className: 'swiper-slide',
    navigation: true,
  }
  const prevRef = React.useRef<HTMLDivElement>(null)
  const nextRef = React.useRef<HTMLDivElement>(null)

  const handleLink = (id: number) => {
    navigate(`/PostDetail/${id}`)
  }
  return (
    <ModalBackdrop onClick={handleClickOutside}>
      <ModalContent ref={popupRef} onClick={event => event.stopPropagation()}>
        <Swiper {...slide_settings} navigation={{prevEl: prevRef.current, nextEl: nextRef.current}}>
          {imgs.map((url, index) => (
            <SwiperSlide key={`${index}${url}`}>
              <div className='swiper-slide'>
                <SwiperImage>
                  <ImgBox key={`${index}${url}`} imgUrl={url}>
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

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(122 122 122 / 10%);
  z-index: 1;
  .swiper-slide {
    height: 100%;
  }
`
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 60rem;
  height: 37rem;
  z-index: 1000;
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
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
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
    z-index: 100;
    color: #fff;
    opacity: 0.8;
    :hover {
      opacity: 1;
      scale: 1.2;
    }
  }
`
const DetailLink = styled.div`
  z-index: 2;
  font-size: 1.7rem;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  top: 90%;
  right: 0.5rem;
  padding: 1rem;
  color: #fff;
  &:hover {
    color: #1877f2;
  }
  svg {
    margin-right: 1rem;
  }
  transition: color ease-in 0.2s;
`
