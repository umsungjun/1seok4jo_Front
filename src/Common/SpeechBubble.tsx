import React from 'react'
import styled from 'styled-components'
import sangchu from '../Assets/sangchu.png'

interface SpeechBubbleProps {
  text: string
  position: 'left' | 'right'
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({text, position}) => {
  return (
    <Bubble>
      <div className={`speech-bubble ${position}`}>{text}</div>
      {/* <div className={`date ${position}`}>2022년 10월</div> */}
    </Bubble>
  )
}

export default SpeechBubble

const Bubble = styled.div`
  display: flex;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 5rem;
    margin-right: 1rem;
  }
  .speech-bubble {
    position: relative;
    width: 20rem;
    height: auto;
    padding: 1rem;
    border-radius: 10px;
    background-color: #e0e0e0;
    border: transparent;
    font-size: 1.1rem;
    line-height: 1.5;
    display: flex;
    align-items: center;
  }

  // .speech-bubble:before {
  //   content: '';
  //   position: absolute;
  //   border-style: solid;
  //   border-width: 15px 15px 0 0;
  //   border-color: #fff transparent transparent transparent;
  //   top: 100%;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }

  .speech-bubble.left {
    margin-right: auto;
  }

  .speech-bubble.right {
    margin-left: auto;
    background-color: #1877f2;
    color: white;
  }
`
