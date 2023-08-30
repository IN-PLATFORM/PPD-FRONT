import '../App.css'
import TopBar from '../components/TopBar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import React from 'react'
import cameraImg from '../images/camera.png'
import warnImg from '../images/warning.png'
import { FaCheck, FaArrowDown } from 'react-icons/fa6'

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
`

const Context = styled.div`
  margin: 6px 6px;
  font-size: 16px;
  padding-top: 20px;
  background-color: #c8d0db;
  border-radius: 40px;
  padding: 14px;
  color: #383838;
  font-weight: bolder;
`

const Context2 = styled(Context)`
  background-color: #a9b8c9;
`
const Context3 = styled(Context)`
  background-color: #95a9c2;
`

// 주의사항
const MemoContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const Memo = styled.div`
  background-color: #e0e0e0;
  width: 80%;
  height: 140px;
  border-radius: 40px;
  padding: 10px;
  font-size: 18px;
  font-weight: bolder;
  display: inline-block;
`
const MemoContext = styled.div`
  margin-top: 14px;
`
const WarnImageContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const WarnImage = styled.img`
  width: 60px;
  height: 60px;
  position: relative;
  top: 20px;
`

// 카메라모양 버튼
const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  background-color: #e3e3e3;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #383838;
  margin-top: 20px;
  transition: 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    background-color: #d16a64;
  }
`
const CameraImg = styled.img`
  width: 50px;
  height: 50px;
`

function Guideline() {
  return (
    <div style={{ height: '100%' }}>
      <TopBar text="가이드라인" />

      <ContextContainer>
        <Context>
          ① 핸드폰을 세우고 가이드라인에 자세를 맞춰본 뒤, 준비가 되면
          촬영버튼을 눌러주세요.
        </Context>
        <FaArrowDown size="24px" color="#041d63" style={{ margin: '0 auto' }} />
        <Context2>② 안내음성에 따라 보행을 시작해주세요.</Context2>
        <FaArrowDown size="24px" color="#041d63" style={{ margin: '0 auto' }} />
        <Context3>③ 녹화 종료 후, 결과확인 버튼을 눌러주세요</Context3>
      </ContextContainer>

      <WarnImageContainer>
        <WarnImage src={warnImg} />
      </WarnImageContainer>
      <MemoContainer>
        <Memo>
          <MemoContext>
            <FaCheck color="red" style={{ marginRight: '4px' }} />
            화면을 벗어날 때까지 걸어주세요.
          </MemoContext>

          <MemoContext>
            <FaCheck color="red" style={{ marginRight: '4px' }} />
            촬영 환경에 따라 신체를 인식하지 못할 수 있습니다.
          </MemoContext>

          <MemoContext>
            <FaCheck color="red" style={{ marginRight: '4px' }} />
            보호자를 동반하는 것을 권장합니다.
          </MemoContext>
        </Memo>
      </MemoContainer>

      <ButtonContainer>
        <Link to="/Record">
          <Button>
            <CameraImg src={cameraImg} />
          </Button>
        </Link>
      </ButtonContainer>
    </div>
  )
}

export default Guideline
