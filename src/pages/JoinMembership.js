import '../App.css';
import Top from '../components/Top'
import Button from '../components/Button'
import Center from '../components/Center'
import {Link} from 'react-router-dom'
import {memo} from 'react';
import styled from 'styled-components';



// InformationText1~5 FirstPage에서 LoginBox와 마찬가지로 진행
// 더 좋은 방법 있을 것
const InformationText = styled.div `
  text-align : center;
  margin-left: -180px;
  font-size:30px;
  font-weight:bolder;
`
const InputInformation1 = styled.input `
  position:relative;
  left:60px;
  width:150px;
  height:30px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`
const InputInformation2 = styled.input `
  position:relative;
  left:47px;
  width:150px;
  height:30px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`
const InputInformation3 = styled.input `
  position:relative;
  left:34px;
  width:150px;
  height:30px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`
const InputInformation4 = styled.input `
  position:relative;
  left:47px;
  width:150px;
  height:30px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`
const InputInformation5 = styled.input `
  position:relative;
  left:60px;
  width:150px;
  height:30px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`

//개인정보 활용 동의 스크롤 창
const TextContainer = styled.div `
  display: inline-box;
  position:relative;
  text-align:center;
  left:50%;
  top:20px;
  transform:translateX(-50%);
  overflow:scroll;
  width:300px;
  height:250px;
  border: 1px solid black;
`

//체크박스
const CheckBoxWrapper = styled.div `
  text-align : center;
  position :relative;
  left:125px;
  top:20px;
`

//코드 긁어왔습니다..
const CheckBoxInput = styled.input `
  appearance: none; 
  width: 20px;
  height:20px;
  border: 1px solid black;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: blue;
  }
`

function Information(){
  return (
  <div>
    <p>
      <InformationText>이름<InputInformation1 /></InformationText>
    </p>

    <p>
      <InformationText>아이디<InputInformation2 /></InformationText>
      <Button name="중복확인" show="중복"></Button>
    </p>
    <p><InformationText>비밀번호<InputInformation3 /></InformationText></p>
    <p><InformationText>이메일<InputInformation4 /></InformationText></p>
    <p><InformationText>나이<InputInformation5 /></InformationText></p>
  </div>
  )
}

//회원가입 페이지
function JoinMembership() {
    return (
      <div>
        <Top state='visible' text='회원가입'></Top>
        <Information></Information>
        <TextContainer> 개인정보 활용 동의 text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text t</TextContainer>
        <CheckBoxWrapper>동의<CheckBoxInput type="checkbox"></CheckBoxInput>
        </CheckBoxWrapper>
        <p><Link to="/Main"><Button name="가입하기"></Button></Link></p>
      </div>
    )
}

export default JoinMembership