import {useState} from 'react'
import styled from 'styled-components'
import {BsFillSuitHeartFill, BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'

interface LikeButtonProps {
  defaultLikes: number
}

export default function LikeButton({defaultLikes}: LikeButtonProps) {
  const [likes, setLikes] = useState(defaultLikes)
  const [isLiked, setIsLiked] = useState(false)
  //
  //   const handleLikeClick = (e: React.MouseEvent<SVGAElement>) => {
  //     e.stopPropagation()
  //     console.log('좋아요 클릭')
  //     setIsLiked(!isLiked)
  //   }

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <LikeButtonStyled>
      {isLiked ? <BsFillSuitHeartFill onClick={handleLikeClick} /> : <BsSuitHeartFill onClick={handleLikeClick} />}
      <div>{likes}</div>
    </LikeButtonStyled>
  )
}

const LikeButtonStyled = styled.div``
