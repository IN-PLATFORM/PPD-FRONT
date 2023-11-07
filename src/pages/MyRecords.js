import React from "react";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import personImg from "../images/icon_person.png";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCircleXmark,
  FaPersonWalkingWithCane,
  FaPersonWalking,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

// 형광펜 효과
const PointColor = styled.span`
  background: linear-gradient(to top, #efbff2 40%, transparent 50%);
`;

const MyRecord = styled.div`
  height: 120px;
  background-color: #cce5ff;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 2px 2px 2px 2px grey;
  ${(props) => props.result === "abnormal" && `background-color: #ffd6e5;`}
`;
//이미지를 보여줄 때
const ShowImage = styled.img`
  width: 60px;
  height: 100%;
`;
// 아이콘 보여줄 때
const ShowIcon = styled.div`
  position: relative;
  top: 6px;
`;
// Record 아래 a
const MyRecordLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 100%;
  z-index: 1;
  &:hover {
    cursor: pointer; /* 마우스 커서 변경 */
  }
`;

const PurpleButton = styled.button`
  background-color: #8a2be2;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a1cb2;
  }
`;

function MyRecords() {
  const [records, setRecords] = useState([]);

  // token을 이용해서 요청을 보내기 위해 axios를 사용한다
  // 토큰이 필요한 api요청을 보내는 axios인스턴스
  const recordAxios = axios.create({
    //http://13.125.209.54:8080/api
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  // axios 넣어서 token으로 요청
  useEffect(() => {
    fetchRecords();
  }, []); // 빈 배열을 넣어 이 효과가 초기 렌더링 후에 한 번만 실행되도록 한다

  // Function to fetch records
  const fetchRecords = async () => {
    try {
      const response = await recordAxios.get("/joint");
      setRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Function to delete a record
  const deleteRecord = async (recordIdx) => {
    try {
      const response = await recordAxios.delete(`/joint/${recordIdx}`);
      // 성공적으로 삭제한 후에도 records를 업데이트해야 합니다.
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.idx !== recordIdx)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div>
      <TopBar text="보행기록"></TopBar>
      <div>
        <h3 style={{ margin: "20px" }}>
          <PointColor>
            <span style={{ fontSize: "30px" }}>{records.length}</span>개의
            기록이 있습니다.
          </PointColor>
        </h3>
        {records.map((it, idx) => (
          <MyRecord
            result={it.result === 0 ? "normal" : "abnormal"}
            key={it.idx}>
            <MyRecordLink
              to={`/Result/${it.idx}`}
              state={{ record: it }} // it 객체를 state로 전달
            >
              <div>
                <p>Record 번호: {it.idx}</p>
                <p>
                  결과 :{it.created_date} {it.result === 0 ? "" : "비"}정상
                </p>
              </div>
              <ShowIcon>
                {it.result === 0 ? (
                  <FaPersonWalking size="70" />
                ) : (
                  <FaPersonWalkingWithCane size="70" />
                )}
              </ShowIcon>
            </MyRecordLink>
            <PurpleButton onClick={() => deleteRecord(it.idx)}>
              <FaCircleXmark size="24" />
            </PurpleButton>
          </MyRecord>
        ))}
      </div>
    </div>
  );
}

// 기본은 빈 배열로 설정(기록이 없을때 오류 뜨지 않게)
MyRecord.defaultProps = {
  dummy_records: [],
};

export default MyRecords;
