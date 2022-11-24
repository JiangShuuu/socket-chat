import React from 'react'
import styled from 'styled-components'

export default function LeaveModal() {
  return (
    <Modal>
      <section className="box"></section>
      <div className="box_item">
        <h3>確定要離開嗎？</h3>
        <h4>離開將清除雙方的對話紀錄！</h4>
        <div className="btn_area">
          <button>取消</button>
          <button>確定離開</button>
        </div>
      </div>
    </Modal>
  )
}

const Modal = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 40%;
  }
  .box_item {
    position: absolute;
    margin-top: 6rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    gap: 0.45rem;
    background-color: white;
  }
  .btn_area {
    width: 100%;
    padding-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    all: unset;
    cursor: pointer;
    transition: all 0.25s;
  }
  button:hover {
    color: blue;
  }
`
