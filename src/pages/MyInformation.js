import '../App.css'
import '../styles/MyInformationStyles.css'
import {TopBar} from '../components/TopBar'
import { Modal, EditModal } from '../components/Modal'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import personImg from '../images/free-icon-person-2815428.png'
import editImg from '../images/edit.png'
import axios from 'axios'

export const ShowInformation = styled.div`
  display: inline-box;
  position: absolute;
  left: 30%;
  width: 150px;
  height: 30px;
  font-size: 20px;
  font-weight: normal;
  padding: 6px;
`

export const InformationContainer = styled.div `
  display: flex;  
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`

export const InformationBox = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #13366e;
  width: 85%;
  height: 670px;
  border-radius: 60px;
`

// 사람 모양 아이콘 띄우는 컴포넌트
export const PersonImageContainer = styled.div `
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: white;
  margin-top: 30px;
`
export const PersonImage = styled.img `
  width: 220px;
  height: 220px;
`
// 이름
export const NameContainer = styled.div `
  color: white;
  font-size: 30px;
  font-weight: bolder;
  margin-top: 30px;
`
// 이름 밑 horizen
export const Hr = styled.hr `
  background-color: #e0dee0;
  width: 220px;
  height: 3px;
  margin-top: 10px;
  border: 0;
`

// 이메일, 나이 
export const InformationText = styled.div `
  font-size: 30px;
  color: white;
  font-weight: bolder;
  margin-top: 20px;
`
export const Information = styled.div `
  font-size: 20px;
  color: white;
  margin-top: 4px;
`

//정보 수정 버튼
export const EditButton = styled.div `
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  margin-top: 80px;  
  display: flex;  
  justify-content: center;
  align-items: center;
`
export const EditImage = styled.img `
  width: 40px;
  height: 40px;
`

function MyInformation() {
  //모달의 open상태. true이면 모달 open
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const openEditModal = () => {
    setEditModalOpen(true)
  }
  const closeEditModal = () => {
    setEditModalOpen(false)
  }
  //openModal함수가 호출되면 modalOpen이 true로 변경된다
  const openModal = () => {
    setModalOpen(true)
  }
  //openModal함수가 호출되면 modalOpen이 false로 변경된다
  const closeModal = () => {
    setModalOpen(false)
  }

  // 사용자 정보를 담는 state
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    infoFetch()
  }, []) // 빈 배열을 넣어 이 효과가 초기 렌더링 후에 한 번만 실행되도록 한다

  const infoFetch = () => {
    //'http://13.125.209.54:8080/api/user/me'
    fetch('http://13.125.209.54:8080/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setUserInfo(response.data)
      })
  }

  return (
    <div>
      <TopBar text="내 정보"></TopBar>

      <InformationContainer>
        <InformationBox>
          <>
            <PersonImageContainer>
              <PersonImage src={personImg} />
            </PersonImageContainer>
          </>
          <>
            <NameContainer>{userInfo.name}</NameContainer>
            <Hr />
          </>
          <>
            <InformationText>
              email
              <Information>{userInfo.email}</Information>
            </InformationText>
          </>
          <>
            <InformationText>
              age
              <Information>{userInfo.age}</Information>
            </InformationText>
          </>
          <>
            <Link to="/EditInfo" state={{ userInfo: userInfo }}>
              <EditButton>
                <EditImage src={editImg} />
              </EditButton>
            </Link>
          </>
        </InformationBox>
        
      </InformationContainer>

      {/*리액트 컴포넌트에는 이벤트 설정이 불가한데, onClick을 발생시켜야 하기 때문에 Button컴포넌트가 아닌 div를 이용한다. "회원탈퇴"를 누르면 openModal의 상태가 true로 변한다.
      회원탈퇴기능 보류*/}
      <Modal open={modalOpen} close={closeModal} header="탈퇴하시겠습니까?">
        회원 탈퇴시, 회원님의 모든 정보는 삭제됩니다.
      </Modal>
    </div>
  )
}

export default MyInformation
