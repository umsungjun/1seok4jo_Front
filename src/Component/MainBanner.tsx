import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
SwiperCore.use([Navigation, Pagination, Autoplay]) // *
import {bannerSwiper} from '../Mock/mainBanner'

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
  width: 30rem;
  height: 7rem;
  background-color: white;
  opacity: 0.65;
  border-radius: 1rem;
  padding: 2rem;
  div {
    font-size: 3rem;
    font-align: left;
    color: black;
    opacity: 1;
    margin-bottom: 1rem;
  }
`
