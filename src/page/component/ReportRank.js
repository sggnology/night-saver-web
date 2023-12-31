import {useEffect, useState} from "react";
import axiosInstance from "../../config/api/AxiosInstance";
import {Box, Typography} from "@mui/material";
import Loading from "../util/loading/Loading";

function ReportRank({timeType, timeValue, reRenderCount}) {

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [rankReport, setRankReport] = useState([]);
  const [rankReportLoading, setRankReportLoading] = useState(false);

  const getRankReport = () => {

    const path = `/api/v1/report/rank?page=${page}&size=${size}&type=${timeType}&value=${timeValue}`;

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
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 0 20px',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{textAlign: 'left'}}>
          최근 {timeValue}{timeType === 'day' ? '일' : '주'} 신고 랭킹
        </Typography>
        {
          rankReportLoading ?
            <Loading isLoading={rankReportLoading}/>
            :
            rankReport.length === 0 ?
              <Typography variant="body" gutterBottom>
                신고 내역이 없습니다.
              </Typography>
              :
              rankReport.map((report, index) => {
                return (
                  <Typography key={index} variant="body" gutterBottom sx={{textAlign: 'left'}}>
                    {page * size + index + 1}위 : {report.carPlateNumber} ({report.count}건)
                  </Typography>
                );
              })
        }
      </Box>
    </>
  );
}

export default ReportRank;