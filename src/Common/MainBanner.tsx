import styled from 'styled-components'
import banner1 from '../Assets/MainPage/banner-1.png'
import banner2 from '../Assets/MainPage/banner-2.png'
import banner3 from '../Assets/MainPage/banner-3.png'
import banner4 from '../Assets/MainPage/banner-4.png'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
SwiperCore.use([Navigation, Pagination, Autoplay]) // *

export default function MainBanner() {
  const bannerSwiper = [
    {
      image: banner1,
      name: '한국관광공사',
      link: 'https://www.letskorail.com/',
    },
    {
      image: banner2,
      name: '렛츠코레일',
      link: 'https://www.letskorail.com/',
    },
    {
      image: banner3,
      name: '가족여행카페',
      link: 'https://cafe.naver.com/travelwithkids/',
    },
    {
      image: banner1,
      name: '한국관광공사',
      link: 'https://www.letskorail.com/',
    },
    {
      image: banner2,
      name: '렛츠코레일',
      link: 'https://www.letskorail.com/',
    },

    // {
    //   image: banner4,
    //   name: '비짓서울',
    // },
  ]

  const slide_settings = {
    slidesPerView: 2.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    speed: 700,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    className: 'picture-swiper',
  }
  // className='swiper-container'

  return (
    <BannerSwiper>
      <Swiper {...slide_settings}>
        {bannerSwiper.map((data, index) => (
          <SwiperSlide key={index}>
            <div className='swiper-slide'>
              <SwiperImage>
                <img src={data.image} alt={data.name} />
              </SwiperImage>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerSwiper>
  )
}

const BannerSwiper = styled.div`
  padding-top: 5rem;
  border-bottom: 1px solid lightgray;
`
const SwiperImage = styled.div`
  img {
    width: 100%;
    height: 380px;
    object-fit: cover;
  }
`
