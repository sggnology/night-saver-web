import React, {useEffect, useRef, useState} from "react";
import axiosInstance from "../../config/api/AxiosInstance";
import Loading from "../util/loading/Loading";
import {Box, Card, CardContent, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useSelector} from "react-redux";

function ReportRecord({type, reRenderCount}) {

  const {token} = useSelector((state) => state.token);

  const [rankRecords, setRankRecords] = useState([]);

  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const [rankRecordLoading, setRankRecordLoading] = useState(false);

  const target = useRef(null);

  const getRankRecord = () => {
    let path;

    if(type === "total"){
      path = `/api/v1/report/record?page=${page}&size=10`
    }
    else {
      path = `/api/v1/report/record/user?page=${page}&size=10`
    }

    const config = {
      headers: {
        Authorization: `${token}`
      }
    }

    setRankRecordLoading(true);

    axiosInstance.get(path, config)
      .then((response) => {

        setRankRecordLoading(false);

        if (response.code === 200) {
          setRankRecords(
            prev => [...prev, ...response.data.content]
          );
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

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  };

  const triggerPage = () => {
    setPage(prev => prev + 1);
  }

  const observer = new IntersectionObserver(triggerPage, observerOptions);

  useEffect(() => {
    observer.observe(target.current);
  }, []);

  useEffect(() => {
    if (isLastPage) {
      observer.unobserve(target.current);
    } else {
      getRankRecord();
    }
  }, [page]);

  useEffect(() => {
    setRankRecords(prev => []);
    setIsLastPage(false);
    setPage(prev => 0);
    setRankRecordLoading(false)
  }, [reRenderCount]);

  const simpleTypographies = (

    rankRecords.length === 0 ?
      <Typography variant="body" gutterBottom>
        신고 내역이 없습니다.
      </Typography>
      :
      rankRecords.map(
        (rankRecord) => {
          return (
            <Card
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
                      {rankRecord.carPlateNumber}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography variant="body2">
                      신고자 : {rankRecord.reporter}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <Typography color="body2">
                      {rankRecord.reportedAt}
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

        <Loading isLoading={rankRecordLoading}/>
        <div
          style={{
            display: isLastPage ? "none" : "block",
            height: "50px"
          }}
          ref={target}>
        </div>
      </Box>
    </>
  )
}

export default ReportRecord;