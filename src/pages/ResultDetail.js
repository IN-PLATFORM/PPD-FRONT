import '../App.css';
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import styled from 'styled-components';
import '../styles/Loading.css'
import {Link, useNavigate, useLocation} from 'react-router-dom';
import featureImg from '../images/feature_1.png'
import Chart from "react-apexcharts";
import ApexCharts from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import '../styles/Graph.css'


const GraphSpace = styled.div`
    text-align: center;
    margin-top: 90px;
`

const dataList = ['보행 속도', '발목 사이 거리', '무릎 사이 거리', '무릎 각도', '팔꿈치 각도', '허리 각도']


const chart = {
    options: {
        chart: {
        height: 200,
        type: 'radialBar',
        },
        plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                margin: 5,
                size: '5%',
                background: 'transparent',
                image: undefined,
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: false,
                }
            }
        }
        },
        colors: ['#6b9ccf', '#cf7897', '#7d7c7c'],
        labels: ['정상', '비정상', '결과'],
        responsive: [{
            breakpoint: 480,
            options: {
            }
        }]
    }
}




function ResultDetail() {
    const location = useLocation()
    const record = location.state.record;
    const idx_ = location.state.idx_;

    // 퍼센트로 바꿔서 배열로 return
    const toPercent = (e) => {
        const actual = record.actualValues[e];
        const normal = record.normalValues[e];
        const abnormal = record.abnormalValues[e];
        const max = Math.max(actual, normal, abnormal);

        return [(normal / max) * 100, (abnormal / max) * 100, (actual / max) * 100]
    }

    function description(idx) {
        if(record.resultTypes[idx] === 0) {
            return '수치가 정상 평균에 가깝습니다.'
        }
        else if(record.actualValues[idx] > record.normalValues[idx]) {
            return '수치가 정상 평균보다 높습니다.'
        }
        else {
            return '수치가 정상 평균보다 낮습니다.'
        }
    }


    return (
        <div>
            <TopBar text="상세결과"></TopBar>

            <GraphSpace>
                <ReactApexChart 
                    options={chart.options}
                    series={toPercent(idx_)}
                    type="radialBar" 
                    width="420"
                    style={{"display":"inline-block"}}
                />
            </GraphSpace>

            <div style={{"text-align": "center"}}>
                <span 
                    class={record.resultTypes[idx_] === 0 ? 
                    "normalhighlight" :"abnormalhighlight"}
                    style={{"font-size":"30px"}}>
                {dataList[idx_]}</span>
            </div>

            <div class="descript">
                {description(idx_)}
            </div>
            
            <div class="label">
                <span class="normalhighlight">정상 평균</span>
                <br/>
                <span class="abnormalhighlight">병적 평균</span>
                <br/>
                <span class="myhighlight">나의 결음 분석 결과</span>
            </div>

        </div>

    )
}

export default ResultDetail;