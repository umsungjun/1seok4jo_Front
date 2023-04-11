import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
SwiperCore.use([Navigation, Pagination, Autoplay]) // *
import {bannerSwiper} from '../Mock/mainBanner'
import {FaExternalLinkAlt} from 'react-icons/fa'

export default function MainBanner() {
  const slide_settings = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    speed: 700,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    className: 'picture-swiper',
  }

  return (
    <BannerSwiper>
      <Swiper {...slide_settings}>
        {bannerSwiper.map(data => (
          <SwiperSlide key={data.name}>
            <div className='swiper-slide'>
              <SwiperImage>
                <img src={data.image} alt={data.name} />
                <TextContentStyled>
                  <div>{data.content}</div>
                  <Link to={data.link} target='_blank'>
                    <FaExternalLinkAlt />
                    {data.subContent}
                  </Link>
                </TextContentStyled>
              </SwiperImage>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerSwiper>
  )
}

const BannerSwiper = styled.section`
  padding-top: 5rem;
  border-bottom: 1px solid lightgray;
`
const SwiperImage = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 50rem;
    object-fit: cover;
  }
`
const TextContentStyled = styled.section`
  position: absolute;
  bottom: 5%;
  right: 3%;
  width: 37rem;
  height: 12rem;
  background-color: rgba(239, 239, 240, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  white-space: pre-line;
  div {
    font-size: 3rem;
    font-weight: bold;
    font-align: left;
    color: black;
    z-index: 1;
    margin-bottom: 1rem;
  }
  svg {
    padding-right: 0.5rem;
  }
  a {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
    margin: auto;
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`
