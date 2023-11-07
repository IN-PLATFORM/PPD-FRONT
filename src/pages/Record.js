import "../App.css";
import "../styles/MyInformationStyles.css";
import "../styles/Video.css";
import Top from "../components/Top";
import Button from "../components/Button";
import Center from "../components/Center";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import sound from "../sound/beep.mp3";
import Walking from "../images/walking_image.png";
import Camera from "../images/record-camera.png";
import Result from "../images/record-result.png";
import TopBar from "../components/TopBar";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const StyledButton = styled.button`
  background-color: #13366e;
  color: white;
  border: none;
  width: 300px;
  height: 11.5rem;
  border-radius: 20px;
  margin: 40px;
  cursor: pointer;
  padding: 0;
  font-size: 34px;
  font-weight: bold;
  &:hover {
    box-shadow: 1px 1px 20px #656467;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  padding: 0;
  background-color: #f5f5f5;
  height: 8rem;
  width: 300px;
  margin-bottom: 8px;
  border-radius: 20px 20px 0 0;
`;

const ButtonImage = styled.img`
  width: 130px;
  height: 7rem;
  padding: 0;
  position: relative;
  top: 0.5rem;
`;

function isMobileDevice() {
  return window.innerWidth <= 768; // 예시로 최대 픽셀 너비를 768로 설정
}

function Record() {
  const navigate_normal = useNavigate();
  const navigate_abnormal = useNavigate();
  const navigate_record = useNavigate();
  const navigate = useNavigate();
  let videoTagRef = useRef(null);
  let videoMediaStream = null;
  let inputRef = useRef(null);
  let [videoBlob] = useState(null);
  let [recordedVideoURL] = useState("");

  let videoRecorder = null;

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        videoMediaStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: 480,
            height: 240,
            facingMode: "environment",
          },
        });

        if (videoTagRef.current) {
          videoTagRef.current.srcObject = videoMediaStream;
        }
      } catch (error) {
        console.error("영상 스트림을 가져올 수 없습니다.", error);
      }
    };

    getVideoStream();

    return () => {
      if (videoMediaStream) {
        videoMediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  // 모바일 디바이스에서 실행
  if (isMobileDevice()) {
    // mobileTTS();
    // handleBeepSound();
    const uploadVideo = async (file) => {
      try {
        let formData = new FormData();
        let fname = new Date().toString() + ".mp4";
        let f = new File([file], fname);
        console.log("f:", f);

        formData.append("type", "video/webm");
        formData.append("name", fname);
        formData.append("file", f);

        // 서버에서 파일을 식별할 고유한 이름 생성
        const fileName = new Date().toISOString() + ".mp4";

        // 서버 업로드 URL에 POST 요청을 보냄
        const response = await fetch("http://127.0.0.1:8000/video", {
          method: "POST",
          headers: {
            //'Content-Type': 'multipart/form-data'
          },
          body: formData,
        });

        // 업로드 완료 후 서버 응답 처리
        console.log("Video uploaded successfully", response);
        // post -> response 데이터 받아옴
        const responseData = await response.json();
        console.log(responseData);

        // 종합 결과 0->정상 1->비정상
        const result = responseData.result;
        // 종합 결과가 정상일 시, 정상 판별하는 페이지로 이동
        if (result === 0) {
          navigate_normal("/Normal", { state: { record: responseData } }); // 객체 전달
        }
        // 종합 결과가 비정상일 시, 비정상 판별하는 페이지로 이동
        else if (result === 1) {
          navigate_abnormal("/Abnormal", { state: { record: responseData } });
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        alert("걸음이 인식되지 않았습니다. 다시 시도해주세요");
        navigate_record("./");
      }
    };
    let handleBeepSound = () => {
      setTimeout(() => {
        new Audio(sound).play();
      }, 10000);
    };

    const mobileTTS = () => {
      const message = "촬영버튼을 눌러주세요. 지정된 장소로 가주세요.";

      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = "ko-KR"; // 한국어로 설정, 필요에 따라 조정할 수 있습니다.
        speech.rate = 0.8; // 음성 속도를 느리게 설정

        speechSynthesis.speak(speech);
      } else {
        console.error("이 브라우저에서는 SpeechSynthesis를 지원하지 않습니다.");
      }
    };
    const mobileTTS3 = () => {
      const message = "5초 뒤에 촬영이 시작됩니다. 시작소리에 맞춰 걸어주세요.";

      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = "ko-KR"; // 한국어로 설정, 필요에 따라 조정할 수 있습니다.
        speech.rate = 0.8; // 음성 속도를 느리게 설정

        speechSynthesis.speak(speech);
      } else {
        console.error("이 브라우저에서는 SpeechSynthesis를 지원하지 않습니다.");
      }
    };

    const mobileTTS2 = () => {
      setTimeout(() => {
        const message = "5, 4, 3, 2, 1 시작";

        if ("speechSynthesis" in window) {
          const speech = new SpeechSynthesisUtterance(message);
          speech.lang = "ko-KR"; // 한국어로 설정, 필요에 따라 조정할 수 있습니다.
          speech.rate = 0.35; // 음성 속도를 느리게 설정

          speechSynthesis.speak(speech);
        } else {
          console.error(
            "이 브라우저에서는 SpeechSynthesis를 지원하지 않습니다."
          );
        }
      }, 5000); // 3초 (3,000 밀리초) 뒤에 실행
    };

    return (
      <>
        <TopBar text="측정" />
        <ButtonContainer>
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            capture="camera"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                uploadVideo(file);
              }
            }}
          />
          {recordedVideoURL && <video controls src={recordedVideoURL} />}
          <StyledButton
            onClick={() => {
              mobileTTS();
              setTimeout(() => {
                mobileTTS3();
              }, 6000); // 10초 (10000 밀리초) 후에 실행

              setTimeout(() => {
                mobileTTS2();
              }, 4000); // 10초 (10000 밀리초) 후에 실행

              inputRef.current.click();
            }}>
            <ImageContainer>
              <ButtonImage src={Camera} />
            </ImageContainer>
            촬영
          </StyledButton>
          <Link to="/Loading" style={{ textDecoration: "none" }}>
            <StyledButton onClick={uploadVideo}>
              <ImageContainer>
                <ButtonImage src={Result} />
              </ImageContainer>
              결과확인
            </StyledButton>
          </Link>
        </ButtonContainer>
      </>
    );
  }

  // 녹화 시작
  const VideoCaptureStart = () => {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("video capture start");

      let videoData = [];

      // 1) MediaStream을 매개변수로 MediaRecorder 생성자를 호출
      videoRecorder = new MediaRecorder(videoMediaStream, {
        mimeType: "video/webm; codecs=vp9",
      });

      // 2) 전달받는 데이터를 처리하는 이벤트 핸들러 등록
      videoRecorder.ondataavailable = (event) => {
        if (event.data?.size > 0) {
          videoData.push(event.data);
        }
      };

      // 3) 녹화 중지 이벤트 핸들러 등록
      videoRecorder.onstop = () => {
        videoBlob = new Blob(videoData, { type: "video/webm" });
        console.log("videoBlob:", videoBlob);
        recordedVideoURL = window.URL.createObjectURL(videoBlob);
        videoFetch();
      };
      // 4) 녹화 시작
      videoRecorder.start();
    }
  };

  // 5) 녹화 중지
  const VideoCaptureEnd = () => {
    if (videoRecorder) {
      console.log("video capture end");
      videoRecorder.stop();
      videoRecorder = null;
      navigate("/Loading");
      // our final videoBlob
      // sendAvi(videoBlob);
      // -> 이벤트의 비동기로 인해 순서가 꼬이므로 이벤트 발생 시에 선언한다
    }
  };
  // 가이드 보이스
  const handleTTS = () => {
    const message =
      "촬영을 시작하겠습니다. 화면에 나타난 빨간 네모박스에 맞춰서, 삐 소리가 나면 걸음을 시작해 주십시오."; // 재생할 메시지

    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = "ko-KR"; // 한국어로 설정, 필요에 따라 조정할 수 있습니다.
      speech.rate = 0.85; // 음성 속도를 느리게 설정

      speechSynthesis.speak(speech);
    } else {
      console.error("이 브라우저에서는 SpeechSynthesis를 지원하지 않습니다.");
    }
  };

  // 삐 소리
  let handleBeepSound = () => {
    new Audio(sound).play();
  };

  // 촬영한 동영상을 FAST API로 넘기기
  const videoFetch = async () => {
    try {
      let formData = new FormData();

      let fname = new Date().toString() + ".mp4";
      let f = new File([videoBlob], fname);
      console.log("f:", f);

      formData.append("type", "video/webm");
      formData.append("name", fname);
      formData.append("file", f);
      formData.append("url", recordedVideoURL);
      console.log("url:", recordedVideoURL);

      // fast api 서버
      let response = await fetch("http://127.0.0.1:8000/video", {
        method: "POST",
        headers: {
          //'Content-Type': 'multipart/form-data'
        },
        body: formData,
      });
      console.log("Video uploaded successfully");

      // post -> response 데이터 받아옴
      const responseData = await response.json();
      console.log(responseData);

      // 종합 결과 0->정상 1->비정상
      const result = responseData.result;
      // 종합 결과가 정상일 시, 정상 판별하는 페이지로 이동
      if (result === 0) {
        navigate_normal("/Normal", { state: { record: responseData } }); // 객체 전달
      }
      // 종합 결과가 비정상일 시, 비정상 판별하는 페이지로 이동
      else if (result === 1) {
        navigate_abnormal("/Abnormal", { state: { record: responseData } });
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("걸음이 인식되지 않았습니다. 다시 시도해주세요");
      navigate_record("./");
    }
  };

  // 가이드 음성을 재생하고
  // 5초 뒤에 촬영을 시작하게 하는 함수
  const StartRecording = () => {
    handleTTS(); // handleTTS() 함수 호출

    setTimeout(() => {
      // 삐 소리
      handleBeepSound();
      VideoCaptureStart(); // VideoCaptureStart() 함수 호출
    }, 1000); // 10초 (10000 밀리초) 후에 실행

    setTimeout(() => {
      // 삐 소리
      handleBeepSound();
      VideoCaptureEnd(); // VideoCaptureEnd() 함수 호출
    }, 5000); // 20초 (20000 밀리초) 후에 촬영 종료
  };

  return (
    <div className="video-container">
      <video className="user-video" ref={videoTagRef} autoPlay muted></video>
      <div className="red-box"></div>
      <button onClick={StartRecording}>촬영</button>
      <Link to="/Loading">
        <button onClick={VideoCaptureEnd}>종료</button>
      </Link>
    </div>
  );
}

export default Record;
