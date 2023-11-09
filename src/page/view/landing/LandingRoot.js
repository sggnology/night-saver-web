import {Box, Button, Container, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import LandingView from "./LandingView";

function LandingRoot() {

  const {authenticated} = useSelector((state) => state.token);

  return (
    <Container
      maxWidth={false} disableGutters={true}
      sx={{
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 50px)',
        backgroundColor: '#9eb7f6',
      }}
    >
      {
        <LandingView/>
      }
    </Container>
  )
}

export default LandingRoot;