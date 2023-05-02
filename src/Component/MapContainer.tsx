import styled from 'styled-components'
import {useEffect, useRef} from 'react'
import marker from '../Assets/sangchu.png'

declare global {
  interface Window {
    kakao: any
  }
}

export default function Map() {
  const {kakao} = window
  const mapRef = useRef<HTMLDivElement>(null) // mapRef와 연결할 엘리먼트는 div이기 때문에 <HTMLDivElement>로 타입을 지정

  useEffect(() => {
    const mapContainer = mapRef.current
    const options = {
      center: new kakao.maps.LatLng(37.577589, 126.986554),
      level: 5,
    }
    // 지도 객체 생성
    const map = new kakao.maps.Map(mapContainer, options)

    // console.log(mapContainer)
    new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(37.506502, 127.053617),
      // image: icon,
    }).setMap(map)
  }, [])

  return (
    <>
      <MapSection ref={mapRef}></MapSection>
    </>
  )
}

const MapSection = styled.div`
  width: 50%;
  height: 50rem;
  border-radius: 3rem;
  margin-left: 2rem;
  @media (max-width: 960px) {
    width: 50rem;
    height: 60rem;
    margin-top: 3.5rem;
    margin: 3.5rem 0 0 0;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`
