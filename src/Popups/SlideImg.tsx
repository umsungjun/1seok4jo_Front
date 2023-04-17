import React, {useRef} from 'react'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
SwiperCore.use([Navigation, Pagination, Autoplay]) // *
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
    spaceBetween: 50,

    className: 'swiper-slide',
  }
  const handleLink = (id: number) => {
    navigate(`/PostDetail/${id}`)
  }
  return (
    <ModalBackdrop onClick={handleClickOutside}>
      <ModalContent ref={popupRef} onClick={event => event.stopPropagation()}>
        {/* <CloseIcon onClick={() => setShowHandleSlideImg(false)} /> */}
        <Swiper {...slide_settings}>
          {imgs.map((url, index) => (
            <SwiperSlide key={`${index}${url}`}>
              <div className='swiper-slide'>
                <SwiperImage>
                  <ImgBox key={`${index}${url}`} imgUrl={url} />
                </SwiperImage>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <DetailLink onClick={() => handleLink(id)}>
          <FaExternalLinkAlt /> 여기 더 자세히 볼게요!
        </DetailLink>
      </ModalContent>
    </ModalBackdrop>
  )
}

interface ModalProps {
  show: boolean
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(122 122 122 / 10%);
  z-index: 999;
`
const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 60rem;
  height: 40rem;
  z-index: 1000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
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

const SwiperImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 41rem;
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
  height: 80%;
  display: inline-block;
  // border: 5px solid red;
  border-radius: 1rem;
`

const DetailLink = styled.span`
  font-size: 1.7rem;
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
