import '../App.css';
import Top from '../components/Top'
import Button from '../components/Button'
import Center from '../components/Center'
import JoinMembership from './JoinMembership'
import MainPage from './MainPage'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import React from 'react';
import { useMediaQuery } from 'react-responsive';



// 반응형으로 바꿔야함
//로그인 페이지에서 "아이디", "비밀번호" 텍스트
const LoginPageText = styled.div `
  text-align : center;
  margin-left: -140px;
  font-size:30px;
  font-weight:bolder;
`
// 반응형으로 바꿔야함
//아이디, 비밀번호 입력하는 부분
const LoginBox = styled.input `
  position:relative;
  left:40px;
  width:200px;
  height:40px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`
//position을 relative해서 맞추려니 아이디, 비밀번호 글자수에 따라서 위치가 변경돼
//loginbox2만든 것임. 더 좋은 방법 있을 것.
const LoginBox2 = styled.input `
  position:relative;
  left:27px;
  width:200px;
  height:40px;
  font-size:20px;
  border: 0;
  background-color:lightgray;
`

//회원가입 글자
const Join = styled.div `
  text-align:center;
  position:relative;
  top:50px;
`
function Login(props) {
  return <div>
    <p><LoginPageText>아이디 <LoginBox /></LoginPageText></p>
    <p><LoginPageText>비밀번호 <LoginBox2 /></LoginPageText></p>
  </div>
}

function FirstPage() {
  return (
    <div>
      <Top state='invisible'></Top>
      <Center img='person'></Center>
      <Login></Login>
      <Link to="/Main"><Button name="로그인"></Button></Link>
      <Join><Link to="/Join">회원가입</Link></Join>
    </div>
  );
}

export default FirstPage;
