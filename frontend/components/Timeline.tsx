import * as React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function TimelineTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="timeline tabs">
            <Tab label="List" value="1" />
            <Tab label="Calendar" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TimelineList />
        </TabPanel>
        <TabPanel value="2">
          <TimelineCalendar />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

function TimelineList() {
  return <div>Timeline stuff</div>;
}

function TimelineCalendar() {
  return <div>Calendar stuff</div>;
}

export default function Timeline() {
  return (
    <div className={styles.wrapper}>
      {/* <Image
        src="/timeline.png"
        alt="Timeline"
        className={styles.heroImage}
        width={1100}
        height={130}
        priority
      /> */}
      <TimelineTabs />
    </div>
  );
}
