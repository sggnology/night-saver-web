import {Box, Button, Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import AuthenticatedLanding from "./AuthenticatedLanding";
import NotAuthenticatedLanding from "./NotAuthenticatedLanding";

function Landing() {

  const {authenticated} = useSelector((state) => state.token);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Box sx={{
        width: '100%',
        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9eb7f6',
      }}>
        {
          authenticated ? <AuthenticatedLanding/> : <NotAuthenticatedLanding/>
        }
      </Box>
    </Container>
  )
}

export default Landing;