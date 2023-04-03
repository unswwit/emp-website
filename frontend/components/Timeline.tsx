import * as React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextalignJustifycenter, Grid2 } from "iconsax-react";
import {
  StyledCalendar,
  StyledTabs,
  StyledTab,
} from "../styles/Timeline.module";
import { timeline } from "../data/timeline";

// Test Calendar 1: ToastUI Calendar
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

// Test Calendar 2: FullCalendar
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

// docs: https://mui.com/material-ui/react-tabs/
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TimelineTabs(data: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="timeline tabs"
      >
        <StyledTab
          label="List"
          icon={<TextalignJustifycenter size="13" />}
          iconPosition="start"
        />
        <StyledTab
          label="Calendar"
          icon={<Grid2 size="13" />}
          iconPosition="start"
        />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <TimelineList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <TimelineCalendarTUI data={data} /> */}
        <TimelineCalendarFC data={data} />
      </TabPanel>
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
  const timelineEvent = timeline.map((e: any, id: any) => {
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
  const events = timeline.map((e: any, id: any) => {
    return {
      title: e.title,
      start: e.start,
      end: e.end,
    };
  });

  return (
    <StyledCalendar>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        // initialView="dayGridWeek"
        weekends={true}
        eventColor="#313638"
        eventTextColor="#feb14b"
        titleFormat={{ year: "numeric", month: "short" }}
        buttonText={{ today: "Today" }}
        eventClick={() => {
          alert("Hello");
        }}
        events={events}
      />
    </StyledCalendar>
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
