import '../App.css'
import { Center, Image } from './FirstPage'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TopBar } from '../components/TopBar'
import RecordButton from '../images/free-icon-one-man-walking-76905.png'
import './MainPage.css'
import Camera from '../images/camera.png'
import Info from '../images/icon-info.png'
import History from '../images/icon-file.png'
// 상단바

const Button = styled.button`
  width: 300px;
  height: 100%;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 30px;
  border: none;
  background-color: rgb(200, 208, 219);
  color: black;
`
// button 부모요소
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-around;
`

//메인페이지
function MainPage() {
  return (
    <div className="mainpage-container">
      <TopBar text="Main" />

      <ButtonContainer>
        <Link className="mp-button-ct" to="/Guideline" style={{"textDecoration":"none"}}>
          <Button className="mp-button">
            <img src={Camera}></img>
            <p>측정</p>
          </Button>
        </Link>

        <Link className="mp-button-ct" to="/MyRecords" style={{"textDecoration":"none"}}>
          <Button
            style={{ backgroundColor: 'rgb(169, 184, 201)' }}
            className="mp-button"
          >
            <img src={History}></img>
            <p>보행 기록</p>
          </Button>
        </Link>
        <Link className="mp-button-ct" to="/MyInfo" style={{"textDecoration":"none"}}>
          <Button
            style={{ backgroundColor: 'rgb(149, 169, 194)' }}
            className="mp-button"
          >
            <img src={Info}></img>
            <p>내 정보</p>
          </Button>
        </Link>
      </ButtonContainer>
    </div>
  )
}

export default MainPage
