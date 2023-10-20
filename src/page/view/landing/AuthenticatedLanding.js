import {Box, Button, Fab, Modal, Stack, TextField, Typography} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import React, {useState} from "react";


function AuthenticatedLanding() {

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTypingModalOpen, setReportTypingModalOpen] = useState(false);

  const [carPlateNumber, setCarPlateNumber] = useState('');

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
    // TODO : 신고하기
    setTimeout(() => {
      setReportTypingModalOpen(false);
      alert(`차량번호 : ${carPlateNumber} 에 대한 신고가 완료되었습니다.`);
    }, 1000)
  }

  return (
    <>
      AuthenticatedLanding
      <Fab
        color="primary"
        onClick={handleReportClick}
        sx={{
          position: 'fixed',
          right: '2vh',
          bottom: '2vh',
        }}>
        <DirectionsCarIcon/>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 1, mb: 2}}
          >
            신고하기
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default AuthenticatedLanding;