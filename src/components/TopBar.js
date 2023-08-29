import '../App.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import footprintImg from '../images/footprint.png';


export const TopContainer = styled.div `
  height: 70px;
  background-color: #0c2752;
  color: white;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: none;

`
export const Top = styled.div `
  display: inline-block;
  font-size: 34px;
  font-weight: bolder;
  position: absolute;
  margin: 0 auto;
`

const Home = styled.img `
  width: 34px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 20px;
`

const Logo = styled.div `
  display: inline-block;
  position: absolute;
  left: 10px;
  font-size: 13px;
`

export const TopBar = (props) => {
  return (
    <TopContainer>
      <Logo>
        𝓘𝓷-𝓟𝓵𝓪𝓽𝓯𝓸𝓻𝓶
      </Logo>
      <Top>
        {props.text}
      </Top>
      <Link to="/Main"><Home src={footprintImg} /></Link>
    </TopContainer>
  )
    
}

export default TopBar;