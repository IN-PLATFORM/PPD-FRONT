import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopBar } from "../components/TopBar";
import {
  ShowInformation,
  InformationContainer,
  InformationBox,
  PersonImageContainer,
  PersonImage,
  NameContainer,
  Hr,
  InformationText,
  Information,
  EditButton,
  EditImage,
} from "./MyInformation";
import styled from "styled-components";
import personImg from "../images/free-icon-person-2815428.png";
import "../styles/DivButton.css";
import checkImg from "../images/check.png";
import axios from "axios";

const NameEdit = styled.input`
  border: none;
  width: 150px;
  height: 40px;
  font-size: 26px;
  margin-top: 30px;
  text-align: center;
  border-radius: 20px;
`;

const AgeEdit = styled.input`
  border: none;
  width: 60px;
  height: 40px;
  font-size: 26px;
  margin-top: 4px;
  text-align: center;
  border-radius: 20px;
`;

function EditInformation() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(
    location.state && location.state.userInfo
  );
  console.log(userInfo);

  const navigate = useNavigate();

  // 회원정보 수정(onChange)시 실행
  const handleChangeInfo = (e) => {
    console.log("handleChangeInfo");
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const editFetch = () => {
    console.log("editFetch");
    // 형식 관련 조건들
    if (userInfo.name === "" || userInfo.email === "" || userInfo.age === 0) {
      alert("모든 항목을 작성해주세요");
      return;
    }
    if (userInfo.name.includes(" ") || userInfo.email.includes(" ")) {
      alert("공백은 포함될 수 없습니다");
      return;
    }
    if (userInfo.age > 150) {
      alert("나이는 150까지 입력 가능합니다.");
      return;
    }

    // post 요청
    //http://13.125.209.54:8080/api/user/me/update
    fetch("http://localhost:8080/api/user/me/update", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "OK") {
          alert(response.message);
          navigate("/MyInfo");
        }
      });
  };

  return (
    <div>
      <TopBar text="정보 수정"></TopBar>

      <InformationContainer>
        <InformationBox>
          <>
            <PersonImageContainer>
              <PersonImage src={personImg} />
            </PersonImageContainer>
          </>
          <>
            <NameEdit
              defaultValue={userInfo.name}
              onChange={handleChangeInfo}
              name="name"></NameEdit>
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
              <br />
              <AgeEdit
                type="number"
                defaultValue={userInfo.age}
                onChange={handleChangeInfo}
                name="age"
              />
            </InformationText>
          </>
          <>
            <EditButton onClick={editFetch}>
              <EditImage src={checkImg} />
            </EditButton>
          </>
        </InformationBox>
      </InformationContainer>
    </div>
  );
}

export default EditInformation;
