import "../App.css";
import Top from "../components/Top";
import { JoinModal } from "../components/Modal";
import { useState } from "react";
import styled from "styled-components";
import { BlueButton, BlueButtonContainer } from "../components/Button";
import { TextInput, TextInputContainer } from "../components/Input";

// In-Platform
const Logo = styled.div`
  font-size: 40px;
  text-align: center;
  height: 100px;
  margin-top: 150px;
`;
// 가입하기 버튼
const JoinButton = styled(BlueButton)`
  margin: 30px;
`;
const JoinInput = styled(TextInput)`
  margin: 4px;
`;

export const InformationText = styled.span`
  font-size: 30px;
  font-weight: bolder;
`;
export const InputInformation = styled.input`
  position: absolute;
  left: 30%;
  width: 150px;
  height: 30px;
  font-size: 20px;
  border: 1px solid black;
  background-color: #f2f2f2;
  border-radius: 20px;
  ${(props) =>
    props.type === "password" &&
    `
     font: normal 62.5% "Lucida Sans Unicode",sans-serif;
    `}
`;

//개인정보 활용 동의 창
const TextContainer = styled.div`
  margin: auto;
  margin-top: 40px;
  text-align: center;
  top: 20px;
  overflow: scroll;
  width: 300px;
  height: 30px;
  border: 1px solid;
  border-radius: 4px;
  color: #4a4a4a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 체크박스
const CheckBoxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  position: absolute;
  right: 70px;
  bottom: 0px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: blue;
  }
`;

//이름~나이까지의 Information component를 포함하는 container
export const InformationContainer = styled.div`
  position: relative;
  width: 400px;
  margin: auto;
  padding-left: 10px;
`;

const CheckboxContainer = styled.div`
  position: relative;
  width: 400px;
  margin: auto;
  padding-left: 10px;
  padding-top: 30px;
`;

function JoinMembership() {
  // 회원 정보를 담는 state
  const [user, setUser] = useState({
    name: "",
    age: 0,
    email: "",
    password: "",
  });

  // 정보 입력 시(onChange) 실행
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 정보 활용 동의 여부에 대한 state
  const [agree, setAgree] = useState(false);

  const handleChangeAgree = (e) => {
    console.log(e.target.checked);
    setAgree(e.target.checked);
  };

  // 가입완료 모달창에 대한 상태변수
  const [modalOpen, setModalOpen] = useState(false);
  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }

  // 가입하기 버튼 누르면 실행
  function joinFetch() {
    // 형식 관련 조건들
    if (user.name === "" || user.email === "" || user.age === 0) {
      alert("모든 항목을 작성해주세요");
      return;
    }
    if (!user.email.includes("@")) {
      alert("이메일 형식을 제대로 작성해주세요(@)");
      return;
    }
    if (user.name.includes(" ") || user.email.includes(" ")) {
      alert("공백은 포함될 수 없습니다");
      return;
    }

    if (!agree) {
      alert("개인정보 활용에 동의해주세요.");
      return;
    }

    fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          alert("회원가입 성공!");
          openModal();
        } else if (response.status === "USER_DUPLICATED") {
          alert("이미 존재하는 사용자 입니다.");
        } else {
          alert("회원가입 실패!");
        }
      });
  }

  return (
    <div>
      <Logo>
        <p style={{ fontWeight: 800 }}>IN-PLATFORM</p>
      </Logo>

      <TextInputContainer>
        <JoinInput name="name" onChange={handleChange} placeholder="𝒏𝒂𝒎𝒆" />
      </TextInputContainer>

      <TextInputContainer>
        <JoinInput name="email" onChange={handleChange} placeholder="𝒆𝒎𝒂𝒊𝒍" />
      </TextInputContainer>

      <TextInputContainer>
        <JoinInput
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="𝒑𝒂𝒔𝒔𝒘𝒐𝒓𝒅"
        />
      </TextInputContainer>

      <TextInputContainer>
        <JoinInput
          name="age"
          onChange={handleChange}
          type="number"
          placeholder="𝒂𝒈𝒆"
        />
      </TextInputContainer>

      <TextContainer>
        <p>정보 및 데이터가 활용되는 것에 동의합니다.</p>
      </TextContainer>

      <CheckboxContainer>
        <div className="agreeText">동의</div>
        <CheckBoxInput
          name="agree"
          type="checkbox"
          onClick={handleChangeAgree}></CheckBoxInput>
      </CheckboxContainer>

      <BlueButtonContainer>
        <JoinButton onClick={joinFetch}>가입하기</JoinButton>
      </BlueButtonContainer>

      {modalOpen ? (
        <JoinModal
          header="가입이 완료되었습니다"
          open={modalOpen}
          cloas={closeModal}></JoinModal>
      ) : null}
    </div>
  );
}

export default JoinMembership;
