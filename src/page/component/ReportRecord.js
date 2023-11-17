import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../../config/api/AxiosInstance";
import Loading from "../util/loading/Loading";
import {Box, Card, CardContent, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";

function ReportRecord({type, reRenderCount}) {

  const {token} = useSelector((state) => state.token);

  const [ref, inView] = useInView();

  const [reportRecords, setReportRecords] = useState([]);

  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [reportRecordLoading, setReportRecordLoading] = useState(false);

  const getReportRecord = () => {
    let path;
    let config = {};

    if (type === "total") {
      path = `/api/v1/report/record?page=${page}&size=10`
    } else {
      path = `/api/v1/report/record/user?page=${page}&size=10`
      config = {
        ...config,
        headers: {
          Authorization: `${token}`
        }
      }
    }

    setReportRecordLoading(true);

    axiosInstance.get(path, config)
      .then((response) => {

        setReportRecordLoading(false);

        if (response.code === 200) {
          setReportRecords(
            prev => [...prev, ...response.data.content]
          );

          setPage(prev => prev + 1);

          // 페이징 데이터 마지막 도달 여부
          setIsLastPage(
            response.data.last
          );
        } else if (400 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("서버와의 통신에 실패했습니다.");
      });
  }

  useEffect(() => {
    setReportRecords(prev => []);
    setIsLastPage(false);
    setPage(prev => 0);
    setReportRecordLoading(false);
  }, [reRenderCount]);

  useEffect(() => {
    if (inView && !isLastPage && !reportRecordLoading) {
      getReportRecord();
    }
  }, [inView]);

  const simpleTypographies = (
    reportRecords.length === 0 ?
      reportRecordLoading ?
        <Loading isLoading={reportRecordLoading}/>
        :
        <Typography variant="body" gutterBottom sx={{mt: 3}}>
          신고 내역이 없습니다.
        </Typography>
      :
      reportRecords.map(
        (reportRecord, index) => {
          return (
            <Card
              key={index}
              variant={"outlined"}
              sx={{
                width: '100%',
                mb: 1
              }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid xs={12}>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                      신고 대상
                    </Typography>
                    <Typography variant="h5" component="div">
                      {reportRecord.carPlateNumber}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2">
                      신고자 : {reportRecord.reporter}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography color="body2">
                      {reportRecord.reportedAt}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )
        }
      )
  );

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{textAlign: 'left'}}>
          최근 신고 내역
        </Typography>

        {simpleTypographies}

        {(reportRecords.length !== 0 && reportRecordLoading) && <Loading isLoading={reportRecordLoading}/>}

        <div
          style={{
            display: isLastPage ? "none" : "block",
            height: "50px"
          }}
          ref={ref}>
        </div>
      </Box>
    </>
  )
}

export default ReportRecord;