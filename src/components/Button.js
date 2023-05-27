//버튼에 대한 컴포넌트
import '../App.css';
import styled from 'styled-components';

//prop.name: 버튼 안에 표시할 단어
//prop.show: 표시할 버튼 크기
//button은 absolute로 고정

//기본 버튼
const StyledButton = styled.button `
  background-color:lightgray;
  width:150px;
  height:70px;
  font-size:20px;
  position: relative;
  top: 20px;
  border:none;
  border-radius:10px;
`;

// MainPage의 측정시작 버튼(크기가 큰 버튼)
//StyledButton 상속받음
const StyledButtonBig = styled(StyledButton) `
  width:300px;
  height:100px;
  font-size:40px;
`;

//JoinMembership의 중복확인 버튼(크기가 작은 버튼)
const StyledButtonSmall = styled(StyledButton) `
  width:60px;
  height:30px;
  font-size:12px;
`
//하나의 버튼만 가운데정렬해서 나타낼 때
const SingleButtonWrapper = styled.div `
  position:relative;
  text-align:center;
  left:50%;
  transform:translateX(-50%);
`;

//하나의 버튼만 inline으로 나타낼 때
const SingleButtonWrapperInline = styled.div `
  display:inline-block;
  position:absolute;
  right:10px;

`;

const SingleButtonWrapperInline2 = styled.div `
  position:relative;
  text-align:center;
  left:130px;
  bottom:50px;
`;

//한 행에 두 개의 버튼을 나타낼 때
//inline속성이어야 두 개를 나타낼 수 있음
const ManyButtonWrapper = styled.div `
  display:inline-block;
  padding: 2px;
  position:relative;
  top:10px;
`;

const Button = (props) => {
    if(props.show === 'big') {
      return (<div>
        <SingleButtonWrapper >
         <StyledButtonBig >{props.name}</StyledButtonBig>
        </SingleButtonWrapper>

      </div>)
    }
    else if(props.show === 'small') {
      return (
        <>
        <SingleButtonWrapperInline>
         <StyledButtonSmall >{props.name}</StyledButtonSmall >
        </SingleButtonWrapperInline>
        </> 
      )
    }
    else if(props.show === '중복') {
      return (
        <>
        <SingleButtonWrapperInline2>
         <StyledButtonSmall >{props.name}</StyledButtonSmall >
        </SingleButtonWrapperInline2>
        </> 
      )
      }
    else if(props.show === 'many') {
      return (
        <>
        <ManyButtonWrapper>
         <StyledButton >{props.name}</StyledButton >
        </ManyButtonWrapper>
        </> 
      )
    }
    else {
    return (<div>
        <SingleButtonWrapper>
         <StyledButton >{props.name}</StyledButton>
        </SingleButtonWrapper>
      </div>)
    }
}

export default Button;