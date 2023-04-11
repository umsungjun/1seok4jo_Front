import React from 'react'
import styled from 'styled-components'
import sangchu from '../Assets/sangchu.png'

interface SpeechBubbleProps {
  text: string
  position: 'left' | 'right'
  isUser: boolean
}

interface MyComponentState {
  speechBubbleProps: SpeechBubbleProps[]
}

class MyComponent extends React.Component<{}, MyComponentState> {
  state: MyComponentState = {
    speechBubbleProps: [],
  }

  addSpeechBubble = (text: string, isUser: boolean) => {
    const newSpeechBubble: SpeechBubbleProps = {
      text: text,
      position: isUser ? 'right' : 'left',
      isUser: isUser,
    }

    this.setState(prevState => ({
      speechBubbleProps: [...prevState.speechBubbleProps, newSpeechBubble],
    }))
  }
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({text, isUser}) => {
  return (
    <Bubble>
      <div className={`speech-bubble ${isUser ? 'user' : 'bot'}`}>{text}</div>
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
  .speech-bubble.left {
    margin-right: auto;
  }
`
