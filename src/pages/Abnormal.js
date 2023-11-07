import "../App.css";
import TopBar from "../components/TopBar";
import { BlueButton, BlueButtonContainer } from "../components/Button";
import "../styles/Loading.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";

const RedButton = styled(BlueButton)`
  background-color: #ad232a;
`;

const ButtonContainer = styled(BlueButtonContainer)`
  margin-top: 33rem;
`;

function Abnormal() {
  const location = useLocation();
  const [record, setRecord] = useState(location.state && location.state.record);

  return (
    <div>
      <TopBar text="분석결과"></TopBar>
      <div className="textShow">
        당신의 보행은{" "}
        <span style={{ color: "red", fontWeight: "bolder" }}>비정상</span>
        입니다.
      </div>
      <div className="svg-loader">
        <svg
          className="svg-container"
          height="100"
          width="100"
          viewBox="0 0 100 100">
          <circle className="loader-svg bg red" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
      <ButtonContainer>
        <Link
          to={"/Result"}
          state={{ record: record }} // s 객체를 state로 전달
        >
          <BlueButton>
            <HiMagnifyingGlass style={{ marginRight: "4px" }} />
            결과확인
          </BlueButton>
        </Link>
      </ButtonContainer>
    </div>
  );
}

export default Abnormal;
