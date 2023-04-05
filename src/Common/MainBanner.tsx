import {Link} from 'react-router-dom'
import styled from 'styled-components'
import banner1 from '../Assets/MainPage/banner-1.png'
import banner2 from '../Assets/MainPage/banner-2.png'
import banner3 from '../Assets/MainPage/banner-3.png'
import banner4 from '../Assets/MainPage/banner-4.png'
import banner5 from '../Assets/MainPage/banner-5.png'
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
      link: 'https://www.visitkorea.or.kr/',
      content: '한국 여행 정보 여기서 알아보자!',
      subcontent: '한국관광공사 홈페이지 바로가기',
    },
    {
      image: banner2,
      name: '렛츠코레일',
      link: 'https://www.letskorail.com/',
      content: '꽃길따라 KTX타고 여행가자!',
      subcontent: '렛츠코레일 홈페이지 바로가기',
    },
    {
      image: banner3,
      name: '가족여행카페',
      link: 'https://cafe.naver.com/travelwithkids/',
      content: '아이와 함께 여행을~',
      subcontent: '가족여행 카페 링크 바로가기',
    },
    {
      image: banner4,
      name: '비짓서울',
      link: 'https://www.visitseoul.net/index',
      content: 'Welcome To Seoul',
      subcontent: '비짓서울 링크 바로가기',
    },
  ]

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
  // className='swiper-container'

  return (
    <BannerSwiper>
      <Swiper {...slide_settings}>
        {bannerSwiper.map((data, index) => (
          <SwiperSlide key={index}>
            <div className='swiper-slide'>
              <SwiperImage>
                <img src={data.image} alt={data.name} />
                <TextContentStyled>
                  <div>{data.content}</div>
                  <Link to={data.link} target='_blank'>
                    {data.subcontent}
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

const BannerSwiper = styled.div`
  padding-top: 5rem;
  border-bottom: 1px solid lightgray;
`
const SwiperImage = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 35rem;
    object-fit: cover;
  }
`
const TextContentStyled = styled.div`
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
