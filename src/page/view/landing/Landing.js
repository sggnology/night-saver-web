import {Box, Button, Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import AuthenticatedLanding from "./AuthenticatedLanding";
import NotAuthenticatedLanding from "./NotAuthenticatedLanding";

function Landing() {

  const {authenticated} = useSelector((state) => state.token);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 50px)',
        backgroundColor: '#9eb7f6',
      }}>
        {
          authenticated ? <AuthenticatedLanding/> : <NotAuthenticatedLanding/>
        }
        {/*<Typography variant="h2" gutterBottom>*/}
        {/*  Night Saver*/}
        {/*</Typography>*/}
        {/*<Typography variant="body1" gutterBottom>*/}
        {/*  Prevent Danger Of Night Driving*/}
        {/*</Typography>*/}
        {/*<Box*/}
        {/*  sx={{*/}
        {/*    display: 'flex',*/}
        {/*    flexDirection: 'row',*/}
        {/*    justifyContent: 'center',*/}
        {/*    alignItems: 'center',*/}
        {/*    width: '100%',*/}
        {/*    height: '50px',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Button*/}
        {/*    variant="contained"*/}
        {/*    onClick={handleStartButton}*/}
        {/*    sx={{*/}
        {/*      width: '100px'*/}
        {/*    }}*/}
        {/*  >시작하기</Button>*/}
        {/*</Box>*/}
      </Box>
    </Container>
  )
}

export default Landing;