import React from 'react'
import styled from 'styled-components'
import type {ModalProps} from '../Interface/interface'

const PostModal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <Modal>
            <CloseButton onClick={onClose}>Close</CloseButton>
            {children}
          </Modal>
        </ModalOverlay>
      )}
    </>
  )
}

export default PostModal

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
`

const CloseButton = styled.button` {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`
