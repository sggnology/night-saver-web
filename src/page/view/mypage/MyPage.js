import {Box, Container, Divider, Stack, Tab, Tabs, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import MyPageInfo from "./info/MyPageInfo";
import MyPageSettings from "./settings/MyPageSettings";
import React, {useState} from "react";

function MyPage() {

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xs"
               sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 height: 'calc(100vh - 50px)'
               }}
    >
      <TabContext value={value}>
        <Box sx={{borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My Page" value="1"/>
            {/*<Tab label="Report Log" value="2"/>*/}
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
        {/*<TabPanel value="2">Item Two</TabPanel>*/}
      </TabContext>
    </Container>
  )
}

export default MyPage;