import React from 'react'
import styled from 'styled-components'
import { useSocketContext } from '../context/SocketContext'
import { useWebRtcContext } from '../context/WebRtcContext'

export default function ChatMsg() {
  const { isMenuOpen, messages, start, end, socket, room } = useSocketContext()
  const { checkVideo, setCheckVideo, openVideoInfo, setOpenVideoInfo } =
    useWebRtcContext()
  // const msgLength = messages.filter((e) => e.fromSelf === false).length

  const sumbitVideoComfirm = () => {
    socket.emit('videoConfirm', room)
  }

  const checkVideoAgree = () => {
    socket.emit('videoCheckInfo', { room, result: true })
    setCheckVideo(false)
    setOpenVideoInfo('open')
  }
  const checkVideoDisagree = () => {
    socket.emit('videoCheckInfo', { room, result: false })
    setCheckVideo(false)
  }

  return (
    <Container menu={isMenuOpen}>
      <div className="content">
        <div className="chatbox">
          {end ? (
            <p>對方已離開聊天室！</p>
          ) : (
            <>
              {start ? <p>開始聊天！！</p> : <p>找尋中...</p>}

              {/* 判斷三次沒 */}
              {start && openVideoInfo !== 'open' && (
                <>
                  {messages.length < 3 ? (
                    <p>再傳送{3 - messages.length}次訊息即可開啟視訊功能！</p>
                  ) : (
                    <button onClick={sumbitVideoComfirm}>開始視訊</button>
                  )}
                </>
              )}

              {/* 拒絕消息 */}
              {openVideoInfo === 'reject' && (
                <h3>對方拒絕這次邀約, 請稍後再試一次！</h3>
              )}

              {checkVideo && (
                <div>
                  <h3>對方想與你視訊, 同意或拒絕？</h3>
                  <p onClick={checkVideoAgree}>是</p>
                  <p onClick={checkVideoDisagree}>否</p>
                </div>
              )}

              {messages.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={item.fromSelf ? 'text-right' : 'text-left'}
                  >
                    <p className="text">{item.msg}</p>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  transition: 0.5s;
  opacity: ${(props) => (props.menu ? 1 : 0)};
  .content {
    max-width: 600px;
    padding: 0 0 4rem 0;
    margin: auto;
    border-radius: 20px 20px 0 0;
    background-color: #ffffffa2;
    backdrop-filter: opacity(50%);
  }
  .chatbox {
    margin: 0 2rem;
    max-height: 80vh;
    overflow: scroll;
  }
  .chatbox::-webkit-scrollbar {
    display: none;
  }
  .text {
    border: 1px solid;
    border-radius: 10px;
    padding: 0.5rem;
    background: gray;
    color: white;
  }
  .text-left {
    display: flex;
    justify-content: start;
    padding: 0.25rem 0;
  }
  .text-right {
    display: flex;
    justify-content: end;
    padding: 0.25rem 0;
  }
`
