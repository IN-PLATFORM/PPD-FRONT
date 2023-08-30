import '../App.css'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import styled from 'styled-components'
import '../styles/Loading.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { InformationText, InformationContainer } from './JoinMembership'
import {FiSmile, FiFrown, FiFilePlus} from 'react-icons/fi'
import { useState } from 'react'
import footprintImg from '../images/footprint.png';

// 진단결과: 정상 / 비정상
const ResultContainer = styled.div `
  background-color: #0c2752;
  height: 170px;
`
const Home = styled.img `
  width: 34px;
  height: 44px;
  position: absolute;
  top: 10px;
  left: 20px;
`
const ResultTypeContainer = styled.div `
  color: white;
  padding-top: 70px;
  padding-left: 20px;
  font-size: 20px;
`
const ResultType = styled.div `
  display: inline-block;
  font-size: 40px;
  font-weight: bolder;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const FeatureResultContainer = styled.div `
  background-color: white;
  margin: 0 auto;
  border-radius: 40px;

`
const FeatureIcon = styled.span `
  position: absolute;
  left: 10px;
  top: 28px;
`

const FeatureResult = styled.div`
  text-align: center;
  width: 280px;
  height: 80px;
  margin: auto;
  margin-top: 20px;
  background-color: #cce5ff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  box-shadow: 2px 2px 2px 2px grey;
  ${props =>
    props.result === 'abnormal' &&
    ` background-color: #ffd6e5;`}
`

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
const SaveButtonContainer = styled.div `
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 80px;
`

function Result() {
  const location = useLocation()
  const [record, setRecord] = useState(location.state && location.state.record)

  
  // 기록 서버에 저장
  const saveRecord = () => {
    //http://13.125.209.54:8080/api/joint/new
    fetch('http://13.125.209.54:8080/api/joint/new', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
                //"Accept" : "application/json"
            },
            body: JSON.stringify(record)
        })
        .then((response) => response.json())
        .then((response) =>{
            console.log('saveRecord');
            console.log(response);
        })
    }

  return (
    <>
      <ResultContainer>
        <Link to="/Main"><Home src={footprintImg} /></Link>
        <ResultTypeContainer>
          당신의 보행 진단 결과는
          <br />
          <ResultType>
            {record.result === 0 ? '' : '비'}정상
          </ResultType>
          입니다.
        </ResultTypeContainer>
        <SaveButtonContainer>
          <FiFilePlus 
            size= "60"
            style={{"color":"white"}}
            onClick={saveRecord} 
            />
        </SaveButtonContainer>
      </ResultContainer>

      <FeatureResultContainer>
        <StyledLink state={{record: record, idx_: 0}}
          to='/ResultDetail'
        >
          <FeatureResult
            result={record.resultTypes[0] === 1 ? 'abnormal' : undefined}
          >
            <FeatureIcon>
              {record.resultTypes[0] === 0 ? <FiSmile/> : <FiFrown/>}
            </FeatureIcon>
            속도
          </FeatureResult>
        </StyledLink>

        <StyledLink state={{record: record, idx_: 1}}
          to='/ResultDetail'
        >
          <FeatureResult
            result={record.resultTypes[1] === 1 ? 'abnormal' : undefined}
          >
            <FeatureIcon>
              {record.resultTypes[1] === 0 ? <FiSmile/> : <FiFrown/>}
            </FeatureIcon>
            발목 사이 거리
          </FeatureResult>
        </StyledLink>
        <StyledLink state={{record: record, idx_: 2}}
          to='/ResultDetail'
        >
          <FeatureResult
            result={record.resultTypes[2] === 1 ? 'abnormal' : undefined}
          >
            <FeatureIcon>
              {record.resultTypes[2] === 0 ? <FiSmile/> : <FiFrown/>}
            </FeatureIcon>
            무릎 사이 거리
          </FeatureResult>
        </StyledLink>
        <StyledLink state={{record: record, idx_: 3}}
          to='/ResultDetail'
        >
          <FeatureResult
            result={record.resultTypes[3] === 1 ? 'abnormal' : undefined}
          >
            <FeatureIcon>
              {record.resultTypes[3] === 0 ? <FiSmile/> : <FiFrown/>}
            </FeatureIcon>
            무릎 각도
          </FeatureResult>
        </StyledLink>
        <StyledLink state={{record: record, idx_: 4}}
          to='/ResultDetail'
        >
          <FeatureResult
            result={record.resultTypes[4] === 1 ? 'abnormal' : undefined}
          >
            <FeatureIcon>
              {record.resultTypes[4] === 0 ? <FiSmile/> : <FiFrown/>}
            </FeatureIcon>
            팔꿈치 각도
          </FeatureResult>
        </StyledLink>
        <StyledLink state={{record: record, idx_: 5}}
          to='/ResultDetail'
        >
          <FeatureResult
            result={record.resultTypes[5] === 1 ? 'abnormal' : undefined}
          >
            <FeatureIcon>
              {record.resultTypes[5] === 0 ? <FiSmile/> : <FiFrown/>}
            </FeatureIcon>
            허리 각도
          </FeatureResult>
        </StyledLink>
      </FeatureResultContainer>
    </>
  )
}

export default Result;
