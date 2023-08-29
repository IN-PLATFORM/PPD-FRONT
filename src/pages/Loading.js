import '../App.css';
import TopBar from '../components/TopBar'
import '../styles/Loading.css'

// 결과 받아서 정상이면 -> Normal.js
// 비정상이면 -> Abnormal.js로 이동

function Loading() {
    return (
        <div>
            <TopBar text='분석중'></TopBar>
            <div className="textShow">결과를 계산중입니다.</div>
            <div className="svg-loader">
                <svg className="svg-container" height="100" width="100" viewBox="0 0 100 100">
                    <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
                    <circle className="loader-svg animate" cx="50" cy="50" r="45"></circle>
                </svg>
            </div>
            
        </div>
    )
}

export default Loading;