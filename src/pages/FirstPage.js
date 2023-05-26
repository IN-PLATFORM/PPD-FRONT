import '../App.css';
import Top from '../components/Top'
import Button from '../components/Button'
import Center from '../components/Center'
import JoinMembership from './JoinMembership'
import MainPage from './MainPage'
import styled from 'styled-components';
import {Link} from 'react-router-dom'

//로그인 페이지에서 "아이디", "비밀번호" 텍스트
const LoginPageText = styled.div `
  margin-left:20px;
  font-size:30px;
  font-weight:bolder;
`

//아이디, 비밀번호 입력하는 부분
const LoginBox = styled.input `
  position:absolute;
  left:150px;
  width:200px;
  height:40px;
  font-size:20px;
  outline: none;
  border: 0;
  background-color:lightgray;
  padding-left:10px;
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
    <p><LoginPageText>비밀번호 <LoginBox /></LoginPageText></p>
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
