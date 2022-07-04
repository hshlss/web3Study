import DemoOne from '@/components/demoOne';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import React, { useState } from 'react';

export type IndexProps = {};

const index: React.FC<IndexProps> = ({}) => {
  const [value, setValue] = useState<string>('1');
  const handleChange = (e: any, newValue: string) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DemoOne />
      </TabPanel>
      <TabPanel value="2">Item Two</TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
    </TabContext>
  );
};

export default index;
