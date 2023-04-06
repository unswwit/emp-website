import * as React from "react";

import { Montserrat } from "@next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

import styles from "../styles/Timeline.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import {
  TextalignJustifycenter,
  Grid2,
  Link2,
  Calendar,
  Clock,
  Global,
} from "iconsax-react";
import {
  StyledCalendar,
  StyledTabs,
  StyledTab,
} from "../styles/Timeline.module";
import { timeline } from "../data/timeline";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";

// FullCalendar
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Button, Container } from "@mui/material";

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

function TimelineTabs({ events, handleDrawer, handleEventNo }: any) {
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
        {/* <TimelineCalendarFC data={data} /> */}
        <TimelineCalendarFC
          events={events}
          handleDrawer={handleDrawer}
          handleEventNo={handleEventNo}
        />
      </TabPanel>
    </Box>
  );
}

function TimelineList() {
  return <div>Timeline stuff</div>;
}

function TimelineCalendarFC({ events, handleDrawer, handleEventNo }: any) {
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
        eventClick={(e) => {
          handleEventNo(parseInt(e.event.id));
          handleDrawer();
        }}
        events={events}
      />
    </StyledCalendar>
  );
}

function InfoPanel({ drawer, handleDrawer, events, eventNo }: any) {
  const eventDate = new Date(events[eventNo].start);

  const date = eventDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // console.log(events);

  return (
    <Drawer anchor="right" open={drawer} onClose={handleDrawer}>
      <Container maxWidth="sm">
        {/* <div className={montserrat.className}> */}
        <div>
          {/* Header */}
          <div className={styles.header}>
            <button>
              <KeyboardDoubleArrowRightRoundedIcon />
            </button>
          </div>
          {/* Banner */}
          <div className={styles.banner}>
            <img
              src={events[eventNo].data.photo.src || "WIT-banner.png"}
              alt={events[eventNo].data.photo.alt || "wit-banner"}
              width="100%"
            />
          </div>
          {/* Heading */}
          <div className={styles.heading}>
            <h1>{events[eventNo].title}</h1>
          </div>
          {/* Subheading */}
          <div className={styles.subheading}>
            {/* Link */}
            <div>
              <Link2 style={{ rotate: "135deg" }} />
              <a href={events[eventNo].data.link}>
                {events[eventNo].data.link}
              </a>
            </div>
            {/* Start date */}
            <div>
              <Calendar />
              <span>{date}</span>
            </div>
            {/* Days left until event starts */}
            <div>
              <Clock />
              <span>n days</span>
            </div>
            {/* Location */}
            <div>
              <Global />
              <span>{events[eventNo].data.location}</span>
            </div>
            {/* Labels */}
            <div className={styles.labels}>
              <span>upskilling</span>
              <span>workshop</span>
            </div>
          </div>
          {/* Body */}
          <div className={styles.body}>
            <h2>Description</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              {events[eventNo].data.description}
            </p>
          </div>
        </div>
      </Container>
    </Drawer>
  );
}

export default function Timeline() {
  const [drawer, setDrawer] = React.useState(false);
  const [events, setEvents] = React.useState(
    timeline.map((e: any, id: number) => {
      return {
        id: id,
        title: e.title,
        start: e.start,
        end: e.end,
        data: e.data,
      };
    })
  );
  const [eventNo, setEventNo] = React.useState(0);

  const handleDrawer = () => {
    setDrawer((open) => !open);
  };

  const handleEventNo = (n: any) => {
    setEventNo(n);
  };

  return (
    // <div className={styles.wrapper}>
    <div>
      <TimelineTabs
        events={events}
        handleDrawer={handleDrawer}
        handleEventNo={handleEventNo}
      />
      <InfoPanel
        drawer={drawer}
        handleDrawer={handleDrawer}
        events={events}
        eventNo={eventNo}
      />
    </div>
  );
}
