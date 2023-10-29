import {useEffect, useState} from "react";
import axiosInstance from "../../config/api/AxiosInstance";
import {Typography} from "@mui/material";
import Loading from "../util/loading/Loading";

function RankReport({timeType, timeValue, reRenderCount}) {

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [rankReport, setRankReport] = useState([]);
  const [rankReportLoading, setRankReportLoading] = useState(false);

  const getRankReport = () => {

    const path = `/api/v1/rank/report?page=${page}&size=${size}&type=${timeType}&value=${timeValue}`;

    axiosInstance.get(path)
      .then((response) => {

        setRankReportLoading(false);

        if (response.code === 200) {
          setRankReport(response.data.content);
        } else if (500 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert("서버와의 통신에 실패했습니다.");
      });
  }

  useEffect(() => {
    setRankReportLoading(true);
    getRankReport();
  }, [reRenderCount]);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        최근 {timeValue}{timeType === 'day' ? '일' : '주'} 신고 랭킹
      </Typography>
      {
        rankReportLoading ?
          <Loading isLoading={rankReportLoading}/>
          :
          rankReport.map((report, index) => {
            return (
              <Typography key={index} variant="body" gutterBottom>
                {page * size + index + 1}위 : {report.carPlateNumber} ({report.count}건)
              </Typography>
            );
          })
      }
    </>
  );
}

export default RankReport;