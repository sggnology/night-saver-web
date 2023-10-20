import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotAuthenticatedLanding = () => {

  const navigate = useNavigate();

  const handleStartButton = () => {
    navigate('/signin');
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Night Saver
      </Typography>
      <Typography variant="body1" gutterBottom>
        Prevent Danger Of Night Driving
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50px',
        }}
      >
        <Button
          variant="contained"
          onClick={handleStartButton}
          sx={{
            width: '100px'
          }}
        >시작하기</Button>
      </Box>
    </>
  );
}

export default NotAuthenticatedLanding;