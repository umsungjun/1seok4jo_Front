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
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 5,
    }
    // 지도 객체 생성
    const map = new kakao.maps.Map(mapContainer, options)

    console.log(mapContainer)
    new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(37.506502, 127.053617),
      // image: icon,
    }).setMap(map)
  }, [])

  // const icon = new kakao.maps.MarkerImage({marker}, new kakao.maps.Size(31, 35), {
  //   offset: new kakao.maps.Point(16, 34),
  //   alt: '마커 이미지 예제',
  //   shape: 'poly',
  //   coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
  // })

  return (
    <>
      <MapSection ref={mapRef}></MapSection>
    </>
  )
}

const MapSection = styled.div`
  width: 40rem;
  height: 50rem;
  border-radius: 3rem;
  margin-left: 2rem;
`
