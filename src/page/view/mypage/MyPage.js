import {Box, Container, Divider, Stack, Typography} from "@mui/material";
import MyPageInfo from "./info/MyPageInfo";
import MyPageSettings from "./settings/MyPageSettings";

function MyPage() {

  return (
    <Container maxWidth="xs"
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: 'calc(100vh - 50px)'
               }}
    >
      <Typography variant="h5" sx={{mb: 4}}>
        My Page
      </Typography>

      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <MyPageInfo/>
        <MyPageSettings/>
      </Stack>
    </Container>
  )
}

export default MyPage;