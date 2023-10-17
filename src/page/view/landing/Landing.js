import {Box, Container, Typography} from "@mui/material";

function Landing() {
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
        <Typography variant="h2" gutterBottom>
          Night Saver
        </Typography>
        <Typography variant="body1">
          Prevent Danger Of Night Driving
        </Typography>
      </Box>
    </Container>
  )
}

export default Landing;