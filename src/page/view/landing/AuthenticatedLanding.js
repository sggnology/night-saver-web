import {
  Box,
  Button,
  CircularProgress, Container,
  Fab,
  Modal,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ReportIcon from '@mui/icons-material/Report';
import React, {useState} from "react";
import Loading from "../../util/loading/Loading";
import axiosInstance from "../../../config/api/AxiosInstance";
import {useSelector} from "react-redux";
import RankReport from "../../component/RankReport";
import RankRecord from "../../component/RankRecord";


function AuthenticatedLanding() {

  const {token} = useSelector((state) => state.token);

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTypingModalOpen, setReportTypingModalOpen] = useState(false);

  const [carPlateNumber, setCarPlateNumber] = useState('');
  const [rankReportReRenderCount, setRankReportReRenderCount] = useState(0);
  const [timeType, setTimeType] = useState('day');
  const [timeValue, setTimeValue] = useState(7);

  const [reportLoading, setReportLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleReportClick = () => {
    setReportModalOpen(true);
  }

  const handleReportTypingClick = () => {
    setReportModalOpen(false);
    setReportTypingModalOpen(true);
  }

  const handleCarPlateNumberTextField = (event) => {
    setCarPlateNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setReportLoading(true);

    const path = `/api/v1/report/car-plate-number?carPlateNumber=${carPlateNumber}`;

    axiosInstance.get(path, {headers: {Authorization: `${token}`}})
      .then((response) => {

        setReportLoading(false);

        if (response.code === 200) {
          alert(`차량번호 : ${carPlateNumber} 에 대한 신고가 완료되었습니다.`);
          setCarPlateNumber('');
          setReportTypingModalOpen(false);
          setRankReportReRenderCount(rankReportReRenderCount + 1);
        } else if (500 <= response.code) {
          alert(response.message);
        }
      })
      .catch((error) => {

        setReportLoading(false);

        alert("서버와의 통신에 실패하였습니다.");
        console.error(error);
      });
  }

  return (
    <>
      <Container
        maxWidth={"sm"}
        sx={{
          display: 'flex',
          direction: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            margin: '20px 0 0'
          }}
        >
          <RankReport timeType={timeType} timeValue={timeValue} reRenderCount={rankReportReRenderCount}/>
          <RankRecord reRenderCount={rankReportReRenderCount}/>
        </Box>
      </Container>
      <Fab
        color="primary"
        onClick={handleReportClick}
        sx={{
          position: 'fixed',
          right: isMobile ? '3vh' : '2vh',
          bottom: isMobile ? '6vh' : '2vh',
        }}>
        <ReportIcon/>
      </Fab>
      <Modal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4
          }}
        >
          <Stack spacing={2}>
            <Typography variant="subtitle1" gutterBottom>
              차량의 번호판을 직접 입력합니다.
            </Typography>
            <Button
              variant="contained"
              onClick={handleReportTypingClick}
            >
              직접신고
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={reportTypingModalOpen}
        onClose={() => setReportTypingModalOpen(false)}
      >
        <Box
          component="form" onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="carPlateNumber"
            label="Car Plate Number"
            name="carPlateNumber"
            value={carPlateNumber}
            onChange={handleCarPlateNumberTextField}
            disabled={reportLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 1, mb: 2}}
            disabled={reportLoading}
          >
            {reportLoading ? <Loading isLoading={reportLoading}/> : '신고하기'}
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AuthenticatedLanding;