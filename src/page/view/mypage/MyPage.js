import {Box, Container, Divider, Stack, Tab, Tabs, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import MyPageInfo from "./info/MyPageInfo";
import MyPageSettings from "./settings/MyPageSettings";
import React, {useState} from "react";
import RankRecord from "../../component/RankRecord";

function MyPage() {

  const [tabValue, setTabValue] = useState("1");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xs"
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 height: 'calc(100vh - 50px)'
               }}
    >
      <TabContext value={tabValue}>
        <Box sx={{borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My Page" value="1"/>
            <Tab label="Report Log" value="2"/>
          </TabList>
        </Box>
        <TabPanel value="1">
          <Stack
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem/>}
          >
            <MyPageInfo/>
            <MyPageSettings/>
          </Stack>
        </TabPanel>
        <TabPanel value="2">
          <RankRecord type={"user"} reRenderCount={0}/>
        </TabPanel>
      </TabContext>
    </Container>
  )
}

export default MyPage;