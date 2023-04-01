import * as React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Test Calendar 1: ToastUI Calendar
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

// Test Calendar 2: FullCalendar
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import { timeline } from "../data/timeline";
import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

function TimelineTabs(data: any) {
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
          {/* <TimelineCalendarTUI data={data} /> */}
          <TimelineCalendarFC data={data} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

function TimelineList() {
  return <div>Timeline stuff</div>;
}

function TimelineCalendarTUI(data: any) {
  /*
  docs:
  - https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/calendar.md
  - https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md
  */
  const calendars = [
    {
      id: "emp",
      name: "Empowerment",
      // backgroundColor: "#313638",
      // backgroundColor: "#e85f5c",
      backgroundColor: "#FEB14B",
      borderColor: "#313638",
      color: "#313638",
      // borderColor: "#e85f5c",
      // color: "#e85f5c",
      // borderColor: "#FEB14B",
      // color: "#FEB14B",
    },
  ];

  // docs: https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/event-object.md
  const timelineEvent = data.map((e: any, id: any) => {
    return {
      key: id,
      id: `${id}`,
      calendarId: "emp",
      category: "time",
      title: e.title,
      start: e.start,
      end: e.end,
    };
  });

  return (
    <>
      <Calendar
        isReadOnly={true}
        height="550px"
        view="month"
        calendars={calendars}
        events={timelineEvent}
        month={{
          isAlways6Weeks: false,
        }}
        week={{
          taskView: false,
        }}
      />
    </>
  );
}

function TimelineCalendarFC(data: any) {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "Lorem Ipsum Party", date: "2023-04-14" },
          { title: "Mock Technical Interview Workshop", date: "2023-04-20" },
        ]}
      />
    </>
  );
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
      <TimelineTabs data={timeline} />
    </div>
  );
}
